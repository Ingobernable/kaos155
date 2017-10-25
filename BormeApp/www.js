var Version = '0.2.0'
console.log('loading App - version -' + Version)

var myArgs = process.argv.slice(2);
if (myArgs.length == 0)
    myArgs = ['127.0.0.1']
/////////////////////////////////////////////////////////////
var App = {
    sockets: [],
    webport: 80,

    mysql: require('mysql'),
    noSqlDb: require('nedb'),

    fs: require("fs"),
    path: require('path'),
    http: require('http'),
    request: require('request'),
    urlencode: require('urlencode'),
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
    semaforo:{
        BOE: false,
        BOCM: false,
        Relaciones:false
    },
    db: {
        Content: {
            Records: { Directivo: null, Empresa: null },
            Relations: { Directivo: null, Empresa: null }
        },
        Relations: null,
        CajaNegra: { Empresa: null, Directivo: null }
    },
    init: function (app, callback) {

        app._io = require('./node_www/IO.js')(app)
        //app.secureContext = require('./node-app/secureContext')(app)
        app.responseHttp = require('./node_www/httpServer.js')(app, 'www')
        app.commonSQL = require('./node_app/sql_common.js')(app, function (SQL) {
            
            SQL.init({ SQL: { db: null } }, false, 'BORME', function (options) {
                app.SQL.BORME.db = options.SQL.db
                app.Relaciones = require('./node_www/RelacionesDB.js')(app)
                SQL.init({ SQL: { db: null } }, false, 'VISUALCIF', function (options) {
                    app.Relaciones.SQL.db = options.SQL.db
                    SQL.init({ SQL: { db: null } }, false, 'BOE', function (options) {
                        app.SQL.BOE.db = options.SQL.db
                        SQL.init({ SQL: { db: null } }, false, 'BOCM', function (options) {
                            app.SQL.BOCM.db = options.SQL.db
                            app.commonSQL = SQL
                            
                                console.log('www abierto port ' + app.webport)
                                app.SQL.ActualizeCounters(app, function (app) {
                                    app.httpServer = app.http.createServer(function (request, response) {
                                        app.responseHttp.listener(request, response)
                                    }).listen(app.webport);
                                    console.log('io abre port ' + app.webport)
                                    app.io = app._io.listen(require('socket.io')(app.httpServer, { pingInterval: 60000 }).listen(app.httpServer), require('./node_app/elasticIO.js')(app))
                                })
                            
                        })
                    })
                })
            })
        })
    },
   
    SQL: {

        commands: {
            getLstEmpresas: function (app, _this, callback) {

                callback(app, _this, { Directivo: null, Empresa: null , trama:null})
                /*
                //var _r = {}
                ///var getSqlst = function (app, db, type, _callback) {
                    if (type == 2) {
                        _cadsql = 'SELECT * FROM Directivo WHERE ActiveRelations>100 or Mark>0 order by ActiveRelations DESC'
                        db.query(_cadsql, function (err, Directivos) {
                            if (err) {
                                debugger
                            }
                            _callback(Directivos)
                            //app.io.emit('lst_cif', { Directivo: Directivos, Empresa: null })
                            console.log('SEND Lista Directivos')
                        })
                    } else {
                        _cadsql = 'SELECT * FROM Empresa order by nBOE DESC LIMIT 100'
                        db.query(_cadsql,{}, function (err, BOE) {
                           if (err)
                               debugger
                           _cadsql = 'SELECT * FROM Empresa order by nBOCM DESC LIMIT 100'
                           db.query(_cadsql,{}, function (err, BOCM) {
                               if (err)
                                   debugger

                               //debugger
                               _callback({ BOE: BOE, BOCM: BOCM })
                               //app.io.emit('lst_cif', { Directivo: null, Empresa: Empresas })
                               console.log('SEND Lista Empresas')
                           })
                       })
                    }
                    //_callback({ Directivo: null, Empresa: null })
                }
                getSqlst(app, app.SQL.BORME.db, 1, function ( data) {
                    _r.Empresa = data
                    getSqlst(app, app.SQL.BORME.db, 2, function ( data) {
                        _r.Directivo = data
                        app.db.Relations.find({}, function (err, tramas) {
                            _r.trama = tramas
                            callback(app, _this, _r)
                        })

                    })
                })
                */
            },
            
        },
        getLsts: function (app, key, callback) {
            callback(null, { BOCM: app._lData.LTipoBOCM, tipo: app._lData.LTipoBOE, tramite: app._lData.LTramite, data: app._xData }, key)
            return
        },
        getTipos: function (app, key, callback){

            var _this = {}
            //debugger
            var cadsql_Tramite = 'SELECT DISTINCT Tipo_TRAMITE  FROM boe INNER JOIN  strings ON boe.BOE = strings.BOE WHERE length(Tipo_Tramite)-length(replace(Tipo_Tramite," " ,""))=0 AND length(replace(Tipo_Tramite," " ,""))>0 '
            var cadsql_BOE = 'SELECT DISTINCT Tipo_BOE FROM boe INNER JOIN  strings ON boe.BOE = strings.BOE'

            if (key.key != null) {
                if (key.key.length > 0) {
                    var cadsql_Tramite = 'SELECT DISTINCT Tipo_TRAMITE  FROM boe INNER JOIN strings ON boe.BOE = strings.BOE WHERE length(Tipo_Tramite)-length(replace(Tipo_Tramite," " ,""))=0 AND length(replace(Tipo_Tramite," " ,""))>0 AND strings._keys LIKE \'%' + key.key + '%\''
                    var cadsql_BOE = 'SELECT DISTINCT Tipo_BOE  FROM boe INNER JOIN  strings ON boe.BOE = strings.BOE WHERE strings._keys LIKE \'%' + key.key + '%\''
                }
            }
            app.SQL.BOE.db.query(cadsql_Tramite, function (err, data) {
                app._lData.LTramite = []
                for (e in data) {
                    if (data[e].Tipo_TRAMITE.length > 0)
                        if (data[e].Tipo_TRAMITE != null)
                            app._lData.LTramite[app._lData.LTramite.length] = app.Rutines.getCleanedString(data[e].Tipo_TRAMITE)
                }
                app.SQL.BOE.db.query(cadsql_BOE, function (err, data) {
                    app._lData.LTipoBOE = []
                    for (e in data) {
                        if (data[e].Tipo_BOE != null)
                            app._lData.LTipoBOE[app._lData.LTipoBOE.length] = app.Rutines.getCleanedString(data[e].Tipo_BOE)
                    }


                    var cadsql_BOCM = 'SELECT DISTINCT Tipo_TRAMITE  FROM bocm INNER JOIN  strings ON bocm.BOCM = strings.BOCM WHERE length(Tipo_Tramite)-length(replace(Tipo_Tramite," " ,""))=0 AND length(replace(Tipo_Tramite," " ,""))>0 '
                    if (key.key != null) {
                        var cadsql_BOCM = 'SELECT DISTINCT Tipo_TRAMITE  FROM bocm INNER JOIN  strings ON bocm.BOCM = strings.BOCM WHERE length(Tipo_Tramite)-length(replace(Tipo_Tramite," " ,""))=0 AND length(replace(Tipo_Tramite," " ,""))>0 AND strings._keys LIKE \'%' + key.key + '%\''
                    }
                    app.SQL.BOCM.db.query(cadsql_BOCM, function (err, data) {
                        app._lData.LTipoBOCM = []
                        for (e in data) {
                            if (data[e].Tipo_TRAMITE != null)
                                app._lData.LTipoBOCM[app._lData.LTipoBOCM.length] = app.Rutines.getCleanedString(data[e].Tipo_TRAMITE)
                        }
                        if (callback != null) {
                            app.db.Relations.find({}, function (err, tramas) {
                                //debugger
                                callback(err, { BOCM: app._lData.LTipoBOCM, tipo: app._lData.LTipoBOE, tramite: app._lData.LTramite, tramas: tramas, data: app._xData }, key)
                            })
                        } else {
                            //_this = { tipo: app._lData.LTipoBOE, tramite: app._lData.LTramite }
                            _this = { tipo: [], tramite: [] }
                        }
                    })

                })
            })
        },
        ActualizeCounters: function (app, callback) {
            var _cadsql = "SELECT * FROM lastread"
            app.Relaciones.SQL.db.query(_cadsql, function (err, Record) {
                if (err)
                    console.log(err)
                if (Record.length == 0) {
                    _cadsql = "INSERT INTO lastread (Empresa,Directivo) VALUES (1,1)"
                    app.Relaciones.SQL.db.query(_cadsql, function (err, _data) {
                        app._xData.VisualCif.Empresa = 1
                        app._xData.VisualCif.Directivo = 1
                    })

                } else {
                    app._xData.VisualCif.Empresa = Record[0].Empresa
                    app._xData.VisualCif.Directivo = Record[0].Directivo
                }
                _cadsql = 'SELECT * FROM directivo WHERE ActiveRelations>100 or Mark>0 order by ActiveRelations DESC'
                app.Relaciones.SQL.db.query(_cadsql, function (err, rows) {
                    app._xData.VisualCif.Ranking.Directivos = rows
                    _cadsql = "SELECT * FROM lastread"
                    app.SQL.BOE.db.query(_cadsql, function (err, Record) {
                        if (Record.length == 0) {
                            _cadsql = "INSERT INTO lastread (SUMARIO_NEXT) VALUES ('BOE-S-20010101')"
                            app.Boe.SQL.db.query(_cadsql, function (err, _data) {
                                app._xData.Sumario.BOE = { SUMARIO_LAST: '', SUMARIO_NEXT: 'BOE-S-20010101' }
                            })

                        } else {
                            app._xData.Sumario.BOE = Record[0]
                        }
                        var _cadsql = "SELECT count(*) FROM sumarios_boe"
                        app.SQL.BOE.db.query(_cadsql, function (err, Record) {
                            app._xData.TSUMARIOS.BOE = Record[0]["count(*)"]
                            _cadsql = "SELECT count(*) FROM boe"
                            app.SQL.BOE.db.query(_cadsql, function (err, Record) {
                                app._xData.TBOE = Record[0]["count(*)"]
                                _cadsql = "SELECT * FROM lastread"
                                app.SQL.BORME.db.query(_cadsql, function (err, Record) {
                                    if (Record.length == 0) {
                                        _cadsql = "INSERT INTO lastread (SUMARIO_NEXT) VALUES ('BORME-S-20090102')"
                                        app.SQL.BORME.db.query(_cadsql, function (err, Record) {
                                            app._xData.Sumario.BORME = { SUMARIO_LAST: '', SUMARIO_NEXT: 'BORME-S-20090102' }
                                        })

                                    } else {
                                        app._xData.Sumario.BORME = Record[0]
                                    }

                                    app.SQL.BORME.db.query("SELECT count(*) FROM sumarios_borme", function (err, Record) {
                                        app._xData.TSUMARIOS.BORME = Record[0]["count(*)"]
                                        app.SQL.BORME.db.query("SELECT count(*) FROM borme", function (err, Record) {
                                            app._xData.TBORME = Record[0]["count(*)"]

                                            app.SQL.BOCM.db.query("SELECT * FROM lastread", function (err, Record) {
                                                if (Record.length == 0) {
                                                    app.SQL.BOCM.db.query("INSERT INTO lastread (SUMARIO_NEXT) VALUES ('BOCM-20100212')", function (err, Record) {
                                                        app._xData.Sumario.BOCM = { SUMARIO_LAST: '', SUMARIO_NEXT: 'BOCM-20100212' }
                                                    })

                                                } else {
                                                    app._xData.Sumario.BOCM = Record[0]
                                                }
                                                app.SQL.BOCM.db.query("SELECT count(*) FROM sumarios_bocm", function (err, Record) {
                                                    app._xData.TSUMARIOS.BOCM = Record[0]["count(*)"]
                                                    app.SQL.BOCM.db.query("SELECT count(*) FROM bocm", function (err, Record) {
                                                        app._xData.TBOCM = Record[0]["count(*)"]

                                                        app.SQL.getTipos(app, { key:null }, function () {
                                                            callback(app)
                                                        })

                                                    })
                                                })
                                            })

                                        })
                                        //
                                    })
                                })
                            })

                        })
                    })
                })
            })

        }
    },
    Rutines:{
            parameters: function (app, myArgs, callback) {
                var arg = myArgs[2]
                app.SqlIP = myArgs[0]
                if (app.SqlIP != null && app.SqlIP != 'localhost') {
                    if (app.SqlIP.match(/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/g).length != 1) {
                        app.SqlIP = 'localhost'
                    }
                } else {
                    app.SqlIP = 'localhost'
                }
                callback(app)
            },
            getCleanedString: function (cadena) {
                // Definimos los caracteres que queremos eliminar
                var specialChars = "!@#$^&%*()+=-[]\/{}|:<>?,.";

                // Los eliminamos todos
                for (var i = 0; i < specialChars.length; i++) {
                    cadena = cadena.replace(new RegExp("\\" + specialChars[i], 'gi'), '');
                }

                cadena = cadena.replace(/á/gi, "a");
                cadena = cadena.replace(/é/gi, "e");
                cadena = cadena.replace(/í/gi, "i");
                cadena = cadena.replace(/ó/gi, "o");
                cadena = cadena.replace(/ú/gi, "u");

                return cadena;
            }
        }
}
App.Rutines.parameters(App, myArgs, function (app) {

    app.SQL.BOE = require("./node_app/web_app/BOE")(app),
    app.SQL.BOCM = require("./node_app/web_app/BOCM")(app),
    app.SQL.BORME = require("./node_app/web_app/BORME")(app),

    console.log('MySQL IP:' + app.SqlIP)

    app.db.Relations = new app.noSqlDb({ filename: '/home/pi/BBDD/__Database/NoSQL/VisualCif.db', autoload: true })
    app.db.CajaNegra.Empresa = new app.noSqlDb({ filename: '/home/pi/BBDD/__Database/NoSQL/CajaNegraEmpresas.db', autoload: true })
    app.db.CajaNegra.Directivo = new app.noSqlDb({ filename: '/home/pi/BBDD/__Database/NoSQL/CajaNegraDirectivos.db', autoload: true })

    App.init(App)
});