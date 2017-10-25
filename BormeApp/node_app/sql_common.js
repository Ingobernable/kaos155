module.exports = function (app , callback) {
    callback({
        poolSql: [],
        //connection:[],
        getConnect: function (options, drop, type, callback, SqlIP, sqlPss) {
            _this = this
            var _exit = function (options, drop,type, callback) {
                if (drop) {
                    _this.SQL.tables[type].drop(_this.SQL, options.SQL.db, function () {
                        _this.SQL.tables[type].create(_this.SQL,options.SQL.db, drop, function () {
                            callback(options)
                        })
                    })
                } else {
                    //if (options.SQL.actions) {
                    //_this.SQL.tables[type].create(_this.SQL, options.SQL.db, drop, function () {
                        callback(options)
                    //})
                }
            }
            if (this.poolSql[sqlPss==null? type: sqlPss] != null) {
                if (options.SQL.db == null) {
                    this.poolSql[sqlPss==null? type: sqlPss].getConnection(function (err, connection) {
                        // connected! (unless `err` is set)
                        if (err == null) {
                            console.log('new connection ' + type + ' mysql OK')
                            options.SQL.db = connection // _this.connection[type] = connection
                            _exit(options, drop,  type, callback)
                        } else {
                            console.log(err)
                            process.exit(1);
                        }
                    })
                } else {
                    _exit(options, drop, type, callback)
                }
            }else{
                this.init(options, false, type, callback)
            }
 
        },
        init: function (options, drop, type, callback, SqlIP, sqlPss) {
            if (this.poolSql[sqlPss==null?type:sqlPss] == null) {
                this.poolSql[sqlPss==null?type:sqlPss] = app.mysql.createPool({
                    host: SqlIP == null ? app.SqlIP : SqlIP , //, //'localhost', //'66.70.184.214',
                    user: 'root',
                    password: sqlPss == null ? '$TakeThePower_2007' : sqlPss, //'ia155', //'$TakeThePower_2007',
                    database: 'bbdd_' + type.toLowerCase(),//(type == 'RELACIONES' ? 'visualcif' : type.toLowerCase()),
                    multipleStatements: true,
                    waitForConnection: true,
                })
                this.getConnect(options, drop, type, callback,SqlIP, sqlPss)
            } else {
                callback(options)
            }
            //return options
        },
        ActualizeCounters: function (obj, callback) {
            var _this = this
            //this.getConnect({ SQL: { db: null } }, false, 'RELACIONES', function (options) {


            _this.getConnect({ SQL: { db :null } }, false, 'BOE',function(_options){
                _cadsql = "SELECT * FROM lastread WHERE Type = 'BOE'"
                _options.SQL.db.query(_cadsql, function (err, Record) {
                    if (err)
                        debugger
                    if (Record.length == 0) {
                        _cadsql = "INSERT INTO lastread (Type,SUMARIO_NEXT) VALUES ('BOE','BOE-S-20010101')"
                        _options.SQL.db.query(_cadsql, function (err, _data) {
                            app._xData.Sumario.BOE = { SUMARIO_LAST: '', SUMARIO_NEXT: 'BOE-S-20010101' }
                        })
                    } else {
                        app._xData.Sumario.BOE = Record[0]
                    }
                    var _cadsql = "SELECT count(*) FROM sumarios WHERE Type='BOE'"
                    _options.SQL.db.query(_cadsql, function (err, Record) {
                        if(err)
                        app._xData.TSUMARIOS.BOE = Record[0]["count(*)"]
                        _cadsql = "SELECT count(*) FROM boletin where Type='BOE'"
                        _options.SQL.db.query(_cadsql, function (err, Record) {
                            app._xData.TBOE = Record[0]["count(*)"]
                            
                            _this.getConnect({ SQL: { db :null } }, false, 'BORME',function(_options){
                                _cadsql = "SELECT * FROM lastread"    
                                _options.SQL.db.query(_cadsql, function (err, Record) {
                                    if (Record.length == 0) {
                                        _cadsql = "INSERT INTO lastread (SUMARIO_NEXT) VALUES ('BORME-S-20090102')"
                                        _options.SQL.db.query(_cadsql, function (err, Record) {
                                            app._xData.Sumario.BORME = { SUMARIO_LAST: '', SUMARIO_NEXT: 'BORME-S-20090102' }
                                        })

                                    } else {
                                        app._xData.Sumario.BORME = Record[0]
                                        app._xData.Sumario.BORME.SUMARIO_LAST = app._xData.Sumario.BORME.ID_LAST.split("#")[0]
                                        //app._xData.Sumario.BORME.SUMARIO_NEXT= app._xData.Sumario.BORME.ID_LAST.split("#")[0] //'BORME-S-20090102'
                                    }

                                    _options.SQL.db.query("SELECT count(*) FROM sumarios_borme", function (err, Record) {
                                        app._xData.TSUMARIOS.BORME = Record[0]["count(*)"]
                                        _options.SQL.db.query("SELECT count(*) FROM borme", function (err, Record) {
                                            app._xData.TBORME = Record[0]["count(*)"]

                                            _this.getConnect({ SQL: { db: null } }, false, 'BOCM', function (_options) {
                                                _options.SQL.db.query("SELECT * FROM lastread", function (err, Record) {
                                                    if (Record.length == 0) {
                                                        _options.SQL.db.query("INSERT INTO lastread (SUMARIO_NEXT) VALUES ('BOCM-20100301')", function (err, Record) {
                                                            app._xData.Sumario.BOCM = { SUMARIO_LAST: '', SUMARIO_NEXT: 'BOCM-20100301' }
                                                        })

                                                    } else {
                                                        app._xData.Sumario.BOCM = Record[0]
                                                    }
                                                    _options.SQL.db.query("SELECT count(*) FROM sumarios_bocm", function (err, Record) {
                                                        app._xData.TSUMARIOS.BOCM = Record[0]["count(*)"]
                                                        _options.SQL.db.query("SELECT count(*) FROM bocm", function (err, Record) {
                                                            app._xData.TBOCM = Record[0]["count(*)"]
                                                            callback(obj)
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        },
        SQL: {
            commands:{
                drop: function(_tables, db, callback){
                    var cadsql = ''
                    for (n in _tables) {
                        cadsql = "DROP TABLE if EXISTS " + _tables[n] + ';\n' + cadsql  
                    }
                    db.query(cadsql, function (err, results) {
                        if (err)
                            debugger
                        callback()
                    })
                },
                create: function (cadsql, db, callback) {
                    db.query(cadsql, function (err, results) {
                        //if (err)
                            //debugger
                        callback()
                    })
                }
            },
            tables: {
                BOE: {
                    drop: function (_this, db, callback) {
                        var _tables = ['boletin', 'strings', 'boletin_contratos', 'boletin_materias', 'sumarios', 'lastread', '_materias_aux', '_ambito_geografico_aux','_adjudicador_aux', 'errores']
                        _this.commands.drop(_tables, db, callback)
                    },
                    create: function (_this, db, drop, callback) {
                        app.fs.readFile(app.path.normalize('../sqlfiles/BOE_CREATE.sql'), function (err, _sql) {
                            if (err)
                                console.log(err)

                            _this.commands.create(_sql.toString(), db, callback)
                        })
                    },
                },
                BOCM: {
                    drop: function (_this, db, callback) {
                        var _tables = ['strings', 'bocm', 'sumarios_bocm', 'lastread', ]
                        _this.commands.drop(_tables, db, callback)
                    },
                    create: function (_this, db, drop, callback) {
                        app.fs.readFile(app.path.normalize('../sqlfiles/BOCM_CREATE.sql'), function (err, _sql) {
                            if (err)
                                console.log(err)
                            _this.commands.create(_sql.toString(), db, callback)
                        })
                    },
                },
                BORME: {
                    drop: function (_this, db, callback) {
                        var _tables = ['diario', 'strings', 'borme', 'sumarios_borme', 'lastread', 'empresa', 'directivo', 'relaciones', 'errores']
                        _this.commands.drop(_tables, db, callback)
                    },
                    create: function (_this, db, drop, callback) {
                        app.fs.readFile(app.path.normalize('../sqlfiles/BORME_CREATE.sql'), function (err, _sql) {
                            if (err)
                                console.log(err)

                            _this.commands.create(_sql.toString(), db, callback)
                        })
                    },
                },
                VISUALCIF: {
                    drop: function (_this, db, callback) {
                        var _tables = ['empresa', 'directivo', 'lastread']
                        _this.commands.drop(_tables, db, callback)
                    },
                    create: function (_this, db, drop, callback) {
                        app.fs.readFile(app.path.normalize('../sqlfiles/VISUAL_CREATE.sql'), function (err, _sql) {
                            if (err)
                                console.log(err)

                            _this.commands.create(_sql.toString(), db, callback)
                        })
                    },
                }
            }
        }
    })
}