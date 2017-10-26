var Version = '0.1.3'
//debugger
console.log('loading App - version -' + Version)
var myArgs = process.argv.slice(2);

if (myArgs.length == 0)
    myArgs = ['BOCM']//['142.44.166.218', 'BORME',  false]

//myArgs[1] = myArgs[1].substr(2, myArgs[2].length - 2)

//console.log(myArgs)
//process.exit(1)

var App = {
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
            BOE: { SUMARIO_LAST: '', SUMARIO_NEXT: 'BOE-S-20000101' },
            BORME: { SUMARIO_LAST: '', SUMARIO_NEXT: 'BORME-S-20090102' },
            BOCM: { SUMARIO_LAST: '', SUMARIO_NEXT: 'BOCM-S-20100212' }
        },
        TSUMARIOS: {
            BOE: {},
            BORME: {},
            BOCM: {}
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
        app._io = require('./node_www/IO.js')(app)
        app.io = app._io.listen(require('socket.io').listen(80), require('./node_app/elasticIO.js')(app))

        this.pdftotext = require('./node_app/pdftotext.js')
        require('./node_app/sql_common.js')(app, function (SQL) {
            app.commonSQL = SQL
            
            cb({
                BOCM: function (dataFile) {
                   // require('./node_app/parser/borme.js')(app, false, dataFile, function (options) {
                        //app.Borme = options
                        require('./node_app/parser/bocm.js')(app, function (options) {
                            app.commonSQL.ActualizeCounters(options, function (options) {                                
                                options._common.Actualize(options, 'BOCM', { desde: app._xData.Sumario.BOCM.SUMARIO_NEXT.substr(5, 8), type: "BOCM", hasta: new Date() })
                            })
                        })
                    //})
                },
                BOE: function (dataFile) {
                    //require('./node_app/parser/borme.js')(app, false, dataFile, function (Borme) {
                        //app.Borme = options
                        require('./node_app/parser/boe.js')(app, function (options) {
                            app.BOE = options
                            //options.Borme = Borme
                            app.commonSQL.ActualizeCounters(options, function (options) {
                                options._common.Actualize(options, 'BOE', { desde: app._xData.Sumario.BOE.SUMARIO_NEXT.substr(6, 8), type: "BOE", Secciones: "5A", hasta: new Date() })
                            })
                        })
                    //})
                },
                BORME: function (dataFile) {
                        require('./node_app/parser/borme.js')(app, dataFile, function (options) {
                            app.commonSQL.ActualizeCounters(options, function (options) {
                                console.log('actualización de contadores OK')
                                options._common.Actualize(options, 'BORME', { desde: app._xData.Sumario.BORME.SUMARIO_NEXT.substr(8, 8), into:app._xData.Sumario.BORME.ID_LAST , type: "BORME", hasta: new Date() })
                            })
                        })
                    //})
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
    parameters: function (app, myArgs,callback) {
 

        var arg = myArgs[2]
        //app.SqlIP = myArgs[0]
        if (app.SqlIP != null && app.SqlIP != 'localhost') {
            if (app.SqlIP.match(/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/g).length != 1) {
                app.SqlIP = 'localhost'
            }
        } else {
            app.SqlIP = 'localhost'
        }

        if (myArgs[0] == "BORME" || myArgs[0] == "BOE" || myArgs[0] == "BOCM") {
            //if (myArgs[2]) { // = (myArgs[1] == 'true' ? true : false)
            //    if (typeof (myArgs[2]) === "boolean") {
            //        app.drop = myArgs[2]
            //    } else {
            //        var arg = myArgs[2]
             //       app.drop = (arg.toLowerCase() == 'true' ? true : false)
             //   }
           // }
        } else {
            console.log('parametros no validos falta BOCM,BOE,BORME')
            process.exit(1)
        }
        
        app.Type = myArgs[0]
        callback(app)
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

    console.log('MySQL IP:' + app.SqlIP)
    console.log('PROCESS:' + app.Type)
    console.log('DELETE DATA:' + app.drop)
   // app.fs.readFile(app.path.normalize('../DataFiles/cargos.json'), 'utf-8', function (err, dataFile) {
   //     console.log(JSON.parse(dataFile))
        app.init(app, function (_f) { _f[app.Type]([]) })
    //})
})