var Version = '0.1.3'
//debugger
console.log('loading App - version -' + Version)
var myArgs = process.argv.slice(2);
 
if (myArgs.length == 0)
    myArgs = ['SCRAP','BORME', '2012'] //, 'BOE-B-2003-31017' ]

if (myArgs[1] != 'BORME') {

    var date = new Date(myArgs[2].substr(0, 4), 0, 1) //myArgs[2])

    if (date.getDay() == 0) {
        date.setDate(date.getDate() + 1)
    }
} else {

    var date = new Date(myArgs[2].substr(0, 4), 0, 2) //myArgs[2])
    if (date.getDay() == 6) {
        date.setDate(date.getDate() + 1)

    }
    if (date.getDay() == 0) {
        date.setDate(date.getDate() + 1)

    }
}

//myArgs[2] = myArgs[2].substr(2, myArgs[3].length - 2)

//console.log(myArgs)
//process.exit(1)

var App = {
    command : myArgs[0],
    Commands: ['SCRAP', 'PARSER'],
    _fileCredenciales:'ACCESO_mysql_' ,
    
    TypeBoletines: ["BORME", "BOE", "BOCM"],

    update: myArgs[3] ,
    anyo: !isNaN(myArgs[2]) ? myArgs[2] : date.getFullYear(),
    Command: myArgs[0],

    Mins: { BOE: 1995, BOCM: 2010, BORME: 2009 },
    _lb: { BOCM: 5, BOE: 6, BORME: 8 },
    timeDelay: 1500,
    drop:false,
    SqlIP:null, //'192.168.0.3',
    urlBOE: 'http://81.89.32.200/',
    urlBORME: 'http://81.89.32.200/',
    urlBOCM: 'http://w3.bocm.es/boletin/CM',
    PDFStore: "../DataFiles/_almacen/PDF/",
    mysql: require('mysql'),
    iconv: require('iconv-lite'),
    request: require('request'),
    mkdirp: require('mkdirp'),
    cheerio: require('cheerio'),
    path:require('path'),
    fs: require("fs"),
    http: require('http'),
    moment:require("moment"),
    curl: require('./node_app/_curl.js'),
    _xData: {
        VisualCif: {
            Ranking: {
                Directivos: [],
                Empresas: []
            },
            Empresa: 0,
            Directivo: 0,
            counter: 1
        },
        Sumario: {
            BOE: { SUMARIO_LAST: '', SUMARIO_NEXT: 'BOE-S-19950102' },
            BORME: { SUMARIO_LAST: '', SUMARIO_NEXT: 'BORME-S-20090102' },
            BOCM: { SUMARIO_LAST: '', SUMARIO_NEXT: 'BOCM-S-20100212' }
        },
        TSUMARIOS: {
            BOE: 0,
            BORME: 0,
            BOCM: 0
        },
        TBOE: 0,
        TBORME: 0,
        TBOCM: 0
    },
    _lData: {},
    poolSql: [],
    Rutines: function (app) {
        _this = this
        return require('./node_app/func_common.js')(app)
    },
    init: function (app, cb) {
        //app._io = require('./node_www/IO.js')(app)

                //= app._io.listen(require('socket.io').listen(80), require('./node_app/elasticIO.js')(app))

        this.pdftotext = require('./node_app/pdftotext.js')
        require('./node_app/sql_common.js')(app, function (SQL) {
            app.commonSQL = SQL
            
            cb({
                EXEC: function (type) {
                    require('./node_app/elasticIO.js')(app).init(function (options) {
                        app.io = { elasticIO: options }
                   
                        //cargamos la rutina de escrapeo específica del tipo de BOLETIN
                        //cuando cargamos la rutina incorporamos en la llamada app y la funcion de retorno una vez cargado el objeto
                        //el retorno es el objeto encargado del escrapeo                 
                        var prefix = app.command.substr(0,3).toLowerCase() + "_"
                        require('./node_app/' + app.Command.toLowerCase() + '/' + prefix + type.toLowerCase() + '.js')(app, function (options) {
                            //options = objeto que realiza el escrapeo
                            //app.BOE.SQL.db = objeto para acceder directamente a la db en todas las funciones y rutinas
                            app.BOLETIN = options
                            //cargamos los contadores para poder continuar donde se dejó
                            app.commonSQL.SQL.getCounter(app, options, type, function (options) {
                                //realizamos el proceso de escrapeo
                                options._common.Actualize(options, type, { desde: app._xData.Sumario[type].SUMARIO_NEXT.substr(app._lb[type], 8), into: app._xData.Sumario[type].ID_LAST, type: type, Secciones: "5A", hasta: new Date() })
                            })
                        })
                    })
                },
                CREATE: function (datafile) {
                    app.commonSQL.init({ SQL: { db:null} }, 'CREATE', function () { 
                        process.exit(1)
                    })

                }
            })
            //})
        })
    },        
    logStop : function (i, text) {
            console.log( i +'.-'+text)
            console.log('SISTEMA DETENIDO')
            process.exit(i)
    },
    parameters: function (app, myArgs,callback) {


        var arg = myArgs[3]
        //app.SqlIP = myArgs[1]
        if (app.SqlIP != null && app.SqlIP != 'localhost') {
            if (app.SqlIP.match(/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/g).length != 1) {
                app.SqlIP = 'localhost'
            }
        } else {
            app.SqlIP = 'localhost'
        }

        if (app.Commands.indexOf(myArgs[0]) == -1) {
            app.logStop(1,'comando no valido falta SCRAP PARSE BORME')
           
        } else {

            if (app.TypeBoletines.indexOf(myArgs[1]) == -1) {
                app.logStop(2, 'parametros no validos falta BOCM BOE BORME')
            }
        }

        app.Type = myArgs[1]
        callback(app)
    },
    getCounter: function (app, _options, type, callback) {
        _cadsql = "SELECT * FROM lastread WHERE Type = '" + type + "' AND Anyo = " + app.anyo
        _options.SQL.db.query(_cadsql, function (err, Record) {
            if (err)
                debugger
            if (Record.length == 0) {
                _cadsql = "INSERT INTO lastread (Type, Anyo, SUMARIO_NEXT) VALUES ('" + type + "'," + app.anyo + ",'" + type + "-S-" + app.initDate + "')"  //2001
                _options.SQL.db.query(_cadsql, function (err, _data) {
                    app._xData.Sumario[type] = { SUMARIO_LAST: '', SUMARIO_NEXT: type + '-S-' + app.initDate }
                })
            } else {
                app._xData.Sumario[type] = Record[0]
            }
            var _cadsql = "SELECT count(*) FROM sumarios WHERE Type='" + type + "'"
            _options.SQL.db.query(_cadsql, function (err, Record) {
                //if (err)
                    app._xData.TSUMARIOS[type] = Record[0]["count(*)"]

                _cadsql = "SELECT count(*) FROM boletin where Type='" + type + "'"
                _options.SQL.db.query(_cadsql, function (err, Record) {
                    app._xData['T'+type] = Record[0]["count(*)"]
                    callback(_options)
                })
            })
        })
    }

}

String.prototype.Trim = function Trim(x) {
    if (typeof x === 'object') {
        for (i in x) {
            x[i] = x[i].replace(/^\s+|\s+$/gm, '');
        }
        return x
    } else {
        return x.replace(/^\s+|\s+$/gm, '');
    }
}
 
String.prototype.pad = function(size) {
    var s = "000000000" + this;
    return s.substr(s.length - size);
}

String.prototype.Between = function(init, last, contains, not) {
    var string = this.toString()
    var _exit = ""
    var _i = 0
    while (string.indexOf(last, _i) > 0) {
        var _str = ""
        var pf = pi = string.indexOf(last, _i)
        //var found = false
        while (pi > 0 && string.substr(pi,1)!=init){
            var char = string.substr(pi, 1)
            if (char != not)
                _str = char + _str
            pi--
        }
        if (_str.indexOf(contains) > -1)
            _exit = ''.Trim(_str.substr(0, _str.indexOf(contains))) + (_exit.length>0?';':'') + _exit
        string = string.substr(pf+1,string.length)
    }
    return _exit.length>0?_exit:null
}

String.prototype.replaceAll = function (target, replacement) {
    return this.split(target).join(replacement);
};
String.prototype.indexOfRegex = function (regex) {
    var match = this.match(regex);
    return match ? this.indexOf(match[0]) : -1;
}

String.prototype.lastIndexOfRegex = function (regex) {
    var match = this.match(regex);
    return match ? this.lastIndexOf(match[match.length - 1]) : -1;
}

App.parameters(App, myArgs, function (app) {
   // if (myArgs[1] == 'BOCM' && app.Mins[myArgs[1]] == app.anyo) {
    //    myArgs[2] = (date.getFullYear() + '').pad(4) + '0212'
    //} else {
    //    myArgs[2] = (date.getFullYear() + '').pad(4) + (date.getMonth() + 1 + '').pad(2) + (date.getDate() + '').pad(2)
    //}

    if (myArgs[1] == 'BOCM' && app.Mins[myArgs[1]] == app.anyo) {
        myArgs[2] = (date.getFullYear() + '').pad(4) + '0212'
    } else {
        if (myArgs[1] == 'BORME' && app.Mins[myArgs[0]] == app.anyo) {
            myArgs[2] = (date.getFullYear() + '').pad(4) + "0102"
        } else {
            myArgs[2] = (date.getFullYear() + '').pad(4) + (date.getMonth() + 1 + '').pad(2) + (date.getDate() + '').pad(2)

        }
    }


    //debugger
    if (app.Mins[myArgs[1]] <= app.anyo) {
        app.initDate = myArgs[2]
        console.log('MySQL IP:' + app.SqlIP)
        console.log('PROCESS:' + app.Type)

        //console.log('DELETE DATA:' + app.drop)
        // app.fs.readFile(app.path.normalize('../DataFiles/cargos.json'), 'utf-8', function (err, dataFile) {
        //     console.log(JSON.parse(dataFile))

        app.init(app, function (_f) { _f.EXEC(app.Type) })
        //})
    } else {
        console.log( 'no se puede analizar ' + myArgs[1] + ' con fecha anterior a ' + app.Mins[myArgs[1]] )
    }
})