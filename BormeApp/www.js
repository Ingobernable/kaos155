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
        require('./node_app/sql_common.js')(app, function (SQL) {
            app.commonSQL = SQL
            //SQL.init({ SQL: { db: null } },  'BORME', function (options) {
            //    app.SQL.BORME.db = options.SQL.db
                app.Relaciones = require('./node_www/RelacionesDB.js')(app)
                //SQL.init({ SQL: { db: null } }, 'VISUALCIF', function (options) {
                    //app.Relaciones.SQL.db = options.SQL.db
                    SQL.init({ SQL: { db: null } },  'BOE', function (options) {
                        app.SQL.db = options.SQL.db
                        //SQL.init({ SQL: { db: null } }, 'BOCM', function (options) {
                        //    app.SQL.BOCM.db = options.SQL.db
                        //    app.commonSQL = SQL
                            
                                console.log('www abierto port ' + app.webport)
                                app.commonSQL.ActualizeCounters(options, function (options) {
                                    app.SQL.getListas(app, {
                                        key:  '' 
                                    }, function (err, lst,key ) {
                                        app.httpServer = app.http.createServer(function (request, response) {
                                            app.responseHttp.listener(request, response)
                                        }).listen(app.webport);
                                        console.log('io abre port ' + app.webport)
                                        app.io = app._io.listen(require('socket.io')(app.httpServer, { pingInterval: 60000 }).listen(app.httpServer), require('./node_app/elasticIO.js')(app))
                                    })
                                })
                            
                        //})
                    })
                //})
            //})
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
            getLstTipo: function (app, type, key, callback) {
                var _this =this
                var cadsql = 'SELECT DISTINCT boletin.Tipo_Boletin as code, _tipo_contrato_aux.descripcion FROM boletin INNER JOIN _tipo_contrato_aux ON boletin.Tipo_Boletin = _tipo_contrato_aux.codigo WHERE boletin.Type="' + type + '";' //'SELECT DISTINCT Tipo_TRAMITE  FROM boe INNER JOIN  strings ON boe.BOE = strings.BOE WHERE length(Tipo_Tramite)-length(replace(Tipo_Tramite," " ,""))=0 AND length(replace(Tipo_Tramite," " ,""))>0 '
                //if (key.key != null) {
                //    if (key.key.length > 0) {
                //        var cadsql_Tramite = 'SELECT DISTINCT Tipo_TRAMITE  FROM boe INNER JOIN strings ON boe.BOE = strings.BOE WHERE length(Tipo_Tramite)-length(replace(Tipo_Tramite," " ,""))=0 AND length(replace(Tipo_Tramite," " ,""))>0 AND strings._keys LIKE \'%' + key.key + '%\''
                //    }
                //}
                _this.getLstAuxFromdb(app,cadsql,callback)
            },
            getLstTramite: function (app, type, key, callback) {
                var _this = this
                var cadsql = 'SELECT DISTINCT boletin.Tipo_Tramite as code, _tipo_tramitacion_aux.descripcion FROM boletin RIGHT JOIN  _tipo_tramitacion_aux ON boletin.Tipo_Tramite = _tipo_tramitacion_aux.codigo WHERE boletin.Type="' + type + '";' //'SELECT DISTINCT Tipo_TRAMITE  FROM boe INNER JOIN  strings ON boe.BOE = strings.BOE WHERE length(Tipo_Tramite)-length(replace(Tipo_Tramite," " ,""))=0 AND length(replace(Tipo_Tramite," " ,""))>0 '
                //if (key.key != null) {
                //    if (key.key.length > 0) {
                //        var cadsql_Tramite = 'SELECT DISTINCT Tipo_TRAMITE  FROM boe INNER JOIN strings ON boe.BOE = strings.BOE WHERE length(Tipo_Tramite)-length(replace(Tipo_Tramite," " ,""))=0 AND length(replace(Tipo_Tramite," " ,""))>0 AND strings._keys LIKE \'%' + key.key + '%\''
                //    }
                //}
                _this.getLstAuxFromdb(app, cadsql, callback)
            },
            getLstAuxFromdb: function (app, params, callback) {

                app.SQL.db.query(' call getLST_Aux(?,?)', params, function (err, data) {
                    callback(err,data)
                })
            }

            
        },
        getLsts: function (app, key, callback) {
            callback(null, { BOCM: app._lData.LTipoBOCM, tipo: app._lData.LTipoBOE, tramite: app._lData.LTramite, data: app._xData }, key)
            return
        },
        getListas: function (app, key, callback) {
            app.SQL.commands.getLstAuxFromdb(app, ['BOE', key.key ], function (err, data) {
                app._lData.LTipoBOE = data[0]
                //app.SQL.commands.getLstTramite(app, 'BOE', key, function (err, data) {
                    app._lData.LTramite = data[1]
                    app.SQL.commands.getLstAuxFromdb(app, 'BOCM', key.key , function (err, data) {
                        app._lData.LTipoBOCM = data
                        callback(err, { BOCM: app._lData.LTipoBOCM, tipo: app._lData.LTipoBOE, tramite: app._lData.LTramite, tramas: null, data: app._xData }, key)
                    })
                //})
            })

            return
            var _this = {}
            //debugger
            var cadsql_Tramite = 'SELECT DISTINCT boletin.Tipo_Boletin, _tipo_contrato_aux.descripcion FROM boletin INNER JOIN _tipo_contrato_aux ON boletin.Tipo_Boletin = _tipo_contrato_aux.codigo WHERE boletin.Type="BOE";' //'SELECT DISTINCT Tipo_TRAMITE  FROM boe INNER JOIN  strings ON boe.BOE = strings.BOE WHERE length(Tipo_Tramite)-length(replace(Tipo_Tramite," " ,""))=0 AND length(replace(Tipo_Tramite," " ,""))>0 '
            var cadsql_BOE = 'SELECT DISTINCT boletin.Tipo_Tramite, _tipo_tramitacion_aux.descripcion FROM boletin RIGHT JOIN  _tipo_tramitacion_aux ON boletin.Tipo_Tramite = _tipo_tramitacion_aux.codigo ;' //'SELECT DISTINCT Tipo_BOE FROM boe INNER JOIN  strings ON boe.BOE = strings.BOE'

            if (key.key != null) {
                if (key.key.length > 0) {
                    var cadsql_Tramite = 'SELECT DISTINCT Tipo_TRAMITE  FROM boe INNER JOIN strings ON boe.BOE = strings.BOE WHERE length(Tipo_Tramite)-length(replace(Tipo_Tramite," " ,""))=0 AND length(replace(Tipo_Tramite," " ,""))>0 AND strings._keys LIKE \'%' + key.key + '%\''
                    var cadsql_BOE = 'SELECT DISTINCT Tipo_BOE  FROM boe INNER JOIN  strings ON boe.BOE = strings.BOE WHERE strings._keys LIKE \'%' + key.key + '%\''
                }
            }
            app.SQL.db.query(cadsql_Tramite, function (err, data) {
                app._lData.LTramite = []
                for (e in data) {
                    if (data[e].Tipo_TRAMITE.length > 0)
                        if (data[e].Tipo_TRAMITE != null)
                            app._lData.LTramite[app._lData.LTramite.length] = data[e] //app.Rutines.getCleanedString(data[e].Tipo_TRAMITE)
                }
                app.SQL.db.query(cadsql_BOE, function (err, data) {
                    app._lData.LTipoBOE = []
                    for (e in data) {
                        if (data[e].Tipo_BOE != null)
                            app._lData.LTipoBOE[app._lData.LTipoBOE.length] = data[e] //app.Rutines.getCleanedString(data[e].Tipo_BOE)
                    }


                    var cadsql_BOCM = 'SELECT DISTINCT Tipo_TRAMITE  FROM bocm INNER JOIN  strings ON bocm.BOCM = strings.BOCM WHERE length(Tipo_Tramite)-length(replace(Tipo_Tramite," " ,""))=0 AND length(replace(Tipo_Tramite," " ,""))>0 '
                    if (key.key != null) {
                        var cadsql_BOCM = 'SELECT DISTINCT Tipo_TRAMITE  FROM bocm INNER JOIN  strings ON bocm.BOCM = strings.BOCM WHERE length(Tipo_Tramite)-length(replace(Tipo_Tramite," " ,""))=0 AND length(replace(Tipo_Tramite," " ,""))>0 AND strings._keys LIKE \'%' + key.key + '%\''
                    }
                    app.SQL.db.query(cadsql_BOCM, function (err, data) {
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