var Version = '0.1.3'

//para propositos de testeo//
process.argv.push('SCRAP')
process.argv.push('BORME')
process.argv.push('2017')
/////////////////////////////

console.log('kaos155 App - version -' + Version+'.' )

var App = {
    version: Version,
    //datos generales
    _fileCredenciales: 'ACCESO_mysql_',

    TypeBoletines: ["BORME", "BOE", "BOCM"],
    Commands: ['SCRAP', 'EXIT'],
    Mins: { BOE: 2001, BOCM: 2010, BORME: 2009 },

    //Plugins
    fs: require("fs"),
    path:require('path'),
    http: require('http'),
    merge: require('merge'),
    mysql: require('mysql'),
    moment: require("moment"),

    mkdirp: require('mkdirp'),
    cheerio: require('cheerio'),
    request: require('request'),

    iconv: require('iconv-lite'),
    inquirer: require('inquirer'),
    DOMParser: require('xmldom'),
    schedule: require('node-schedule')
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

String.prototype.pad = function (size) {
    var s = "000000000" + this;
    return s.substr(s.length - size);
}

String.prototype.Between = function (init, last, contains, not) {
    var string = this.toString()
    var _exit = ""
    var _i = 0
    while (string.indexOf(last, _i) > 0) {
        var _str = ""
        var pf = pi = string.indexOf(last, _i)
        //var found = false
        while (pi > 0 && string.substr(pi, 1) != init) {
            var char = string.substr(pi, 1)
            if (char != not)
                _str = char + _str
            pi--
        }
        if (_str.indexOf(contains) > -1)
            _exit = ''.Trim(_str.substr(0, _str.indexOf(contains))) + (_exit.length > 0 ? ';' : '') + _exit
        string = string.substr(pf + 1, string.length)
    }
    return _exit.length > 0 ? _exit : null
};
String.prototype.replaceAll = function (target, replacement) {
    return this.split(target).join(replacement);
};
String.prototype.indexOfRegex = function (regex) {
    var match = this.match(regex);
    return match ? this.indexOf(match[0]) : -1;
};
String.prototype.lastIndexOfRegex = function (regex) {
    var match = this.match(regex);
    return match ? this.lastIndexOf(match[match.length - 1]) : -1;
};

//
 require("./node_app/options_menu.js")(App, process.argv.slice(2), function (app, myArgs, date) {
     if (myArgs[0]=='EXIT')
         process.exit(1)

     debugger

     var App = app.merge(app, {
             date:new Date(),
             command: myArgs[0],
               
            update: myArgs[3] ,
            anyo: !isNaN(myArgs[2]) ? myArgs[2] : date.getFullYear(),
            Command: myArgs[0],

           
            _lb: { BOCM: 5, BOE: 6, BORME: 8 },
            timeDelay: 1500,
            drop:false,
            SqlIP:null,
            urlBOE: 'http://81.89.32.200/',
            urlBORME: 'http://81.89.32.200/',
            urlBOCM: 'http://w3.bocm.es/boletin/CM',
            PDFStore: "../DataFiles/_almacen/PDF/",

            _xData: {
                Sumario: {
                    BOE: { SUMARIO_LAST: '', SUMARIO_NEXT: 'BOE-S-20010102' },
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
            //rutina principal de entrada a la aplicacion
            //entra la propia aplicación y la funcion a ejecutar
            init: function (app, cb) {
                //cargamos el plugin de conversion de PDF a TEXTO
                this.pdftotext = require('./node_app/_utils/pdftotext.js')
                //arrancamos el pugin general de intreracciones con la DB
                require('./node_app/sql_common.js')(app, function (SQL) {
                    app.commonSQL = SQL
            
                    cb({
                        EXEC: function (type) {

                                //cargamos la rutina de escrapeo específica del tipo de BOLETIN
                                //cuando cargamos la rutina incorporamos en la llamada app y la funcion de retorno una vez cargado el objeto
                                //el retorno (options) es el objeto encargado del escrapeo         
                                var prefix = app.command.substr(0,3).toLowerCase() + "_"
                                require('./node_app/' + app.Command.toLowerCase() + '/' + prefix + type.toLowerCase() + '.js')(app, function (options) {
                                    //options = objeto que realiza el escrapeo
                                    //app.BOE.SQL.db = objeto para acceder directamente a la db en todas las funciones y rutinas de app
                                    app.BOLETIN = options
                                    //cargamos los contadores para poder continuar donde se dejó
                                    app.commonSQL.SQL.getCounter(app, options, type, function (options) {
                                        //realizamos el proceso de escrapeo  en sí
                                        options._common.Actualize(options, type, { desde: app._xData.Sumario[type].SUMARIO_NEXT.substr(app._lb[type], 8), into: app._xData.Sumario[type].ID_LAST, type: type, Secciones: "5A", hasta: new Date() })
                                        
                                    })
                                })
                            
                        }
                    })

                })
            },        
            logStop : function (i, text) {
                console.log( i +'.-'+text)
                console.log('SISTEMA DETENIDO')
                process.exit(i)
            },
            //normalización de parametros de entrada
            parameters: function (app, myArgs,callback) {
                var arg = myArgs[3]

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
            //rutina para obtener los contadores de inicio de SCRAPEO
            getCounter: function (app, _options, type, callback) {
                _cadsql = "SELECT * FROM lastread WHERE Type = '" + type + "' AND Anyo = " + app.anyo
                _options.SQL.db.query(_cadsql, function (err, Record) {
                    if (err) {
                        debugger
                    } else {
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
                                app._xData['T' + type] = Record[0]["count(*)"]
                                callback(_options)
                            })
                        })
                    }
                })
            }
 
        })
        

        // standarizamos los parametros
        App.parameters(App, myArgs, function (app) {
            if (myArgs[1] == 'BOCM' && app.Mins[myArgs[1]] == app.anyo) {
                myArgs[2] = (date.getFullYear() + '').pad(4) + '0212'
            } else {
                if (myArgs[1] == 'BORME' && app.Mins[myArgs[0]] == app.anyo) {
                    myArgs[2] = (date.getFullYear() + '').pad(4) + "0102"
                } else {
                    myArgs[2] = (date.getFullYear() + '').pad(4) + (date.getMonth() + 1 + '').pad(2) + (date.getDate() + '').pad(2)

                }
            }


            //comprobamos si el año es superior al minimo del type
            if (app.Mins[myArgs[1]] <= app.anyo) {
                app.initDate = myArgs[2]
                console.log('MySQL IP:' + app.SqlIP)
                console.log('PROCESS:' + app.Type)
                console.log('Anyo:' + app.anyo)
                //debugger                                              //antes de inicar la aplicacion en sí
                app.init(app, function (_f) { _f.EXEC(app.Type) })
            } else {
                console.log( 'no se puede analizar ' + myArgs[1] + ' con fecha anterior a ' + app.Mins[myArgs[1]] )
            }
        })
 })


