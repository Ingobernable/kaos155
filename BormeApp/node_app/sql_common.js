module.exports = function (app , callback) {
    callback({
        poolSql: [],
        //connection:[],
        getConnect: function (options, type, callback, SqlIP, sqlPss) {
            _this = this
            var _exit = function (options, type, callback) {
                if (type=='CREATE') {
                    //_this.SQL.tables[type].drop(_this.SQL, options.SQL.db, function () {
                        _this.SQL.tables[type].create(_this.SQL,options.SQL.db, function () {
                            callback(options)
                        })
                    //})
                } else {
                    //if (options.SQL.actions) {
                    //_this.SQL.tables[type].create(_this.SQL, options.SQL.db, drop, function () {
                        callback(options)
                    //})
                }
            }
            if (this.poolSql[sqlPss==null? type: sqlPss] != null) {
                if (options.SQL.db == null) {
                    this.poolSql[ type].getConnection(function (err, connection) {
                        // connected! (unless `err` is set)
                        if (err == null) {
                            console.log('new connection ' + type + ' mysql OK')
                            options.SQL.db = connection // _this.connection[type] = connection
                            _exit(options, type, callback)
                        } else {
                            console.log(err)
                            process.exit(1);
                        }
                    })
                } else {
                    _exit(options,  type, callback)
                }
            }else{
                this.init(options, type, callback)
            }
 
        },
        init: function (options, type, callback, SqlIP, sqlPss) {
            var _this = this
            app.fs.readFile(app.path.normalize('../sqlfiles/ACCESO_mysql.sql'), function (err, _JSON) {
                if (err) {
                    console.log('faltan Credenciales mysql, sistema detenido')
                    process.exit(1)
                } else {  
                    try {
                        var _sql = JSON.parse(_JSON.toString())
                        sqlPss = _sql.mySQL.password
                    }
                    catch (e) {
                        console.log('error en el fichero de Credenciales mysql, json no valido, sistema detenido',e)
                        process.exit(1)
                    }
                    
                    if (_this.poolSql[ type ] == null) {
                        if (type != 'CREATE') {
                            _this.poolSql[ type ] = app.mysql.createPool({
                                host: _sql.mySQL.host, //, //'localhost', //'66.70.184.214',
                                user: _sql.mySQL.user,
                                password: _sql.mySQL.password,
                                database: 'bbdd_kaos155', //+ type.toLowerCase(),//(type == 'RELACIONES' ? 'visualcif' : type.toLowerCase()),
                                multipleStatements: true,
                                waitForConnection: true,
                            })

                            _this.getConnect(options, type, callback, SqlIP, sqlPss)
                        } else {
                            var con = app.mysql.createConnection(_sql.mySQL)
                            con.connect(function (err) {
                                if (err) throw err;
                                console.log("Connected to mysql!");
                                con.query("CREATE DATABASE bbdd_kaos155", function (err, result) {
                                    if (!err) {
                                        console.log("Database creada");
                                    }
                                    _this.poolSql[ type ] = app.mysql.createPool({
                                        host: _sql.mySQL.host, //, //'localhost', //'66.70.184.214',
                                        user: _sql.mySQL.user,
                                        password: _sql.mySQL.password,
                                        database: 'bbdd_kaos155', //+ type.toLowerCase(),//(type == 'RELACIONES' ? 'visualcif' : type.toLowerCase()),
                                        multipleStatements: true,
                                        waitForConnection: true,
                                    })

                                    _this.getConnect(options, type, callback, SqlIP, sqlPss)
                                });
                            });
                        }
                    } else {
                        callback(options)
                    }
                }
            })
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
                                _cadsql = "SELECT * FROM lastread  WHERE Type = 'BORME'"    
                                _options.SQL.db.query(_cadsql, function (err, Record) {
                                    if (Record.length == 0) {
                                        _cadsql = "INSERT INTO lastread (type,SUMARIO_NEXT) VALUES ('BORME','BORME-S-20090102')"
                                        _options.SQL.db.query(_cadsql, function (err, Record) {
                                            app._xData.Sumario.BORME = { SUMARIO_LAST: '', SUMARIO_NEXT: 'BORME-S-20090102' }
                                        })

                                    } else {
                                        app._xData.Sumario.BORME = Record[0]
                                        app._xData.Sumario.BORME.SUMARIO_LAST = app._xData.Sumario.BORME.ID_LAST.split("#")[0]
                                        //app._xData.Sumario.BORME.SUMARIO_NEXT= app._xData.Sumario.BORME.ID_LAST.split("#")[0] //'BORME-S-20090102'
                                    }

                                    _options.SQL.db.query("SELECT count(*) FROM sumarios WHERE Type='BORME'", function (err, Record) {
                                        app._xData.TSUMARIOS.BORME = Record[0]["count(*)"]
                                        _options.SQL.db.query("SELECT count(*) FROM boletin", function (err, Record) {
                                            app._xData.TBORME = Record[0]["count(*)"]

                                            //_this.getConnect({ SQL: { db: null } }, false, 'BOCM', function (_options) {
                                            _options.SQL.db.query("SELECT * FROM lastread WHERE Type='BOCM'", function (err, Record) {
                                                if (Record.length == 0) {
                                                    _options.SQL.db.query("INSERT INTO lastread (type,SUMARIO_NEXT) VALUES ('BOCM','BOCM-20100301')", function (err, Record) {
                                                        app._xData.Sumario.BOCM = { SUMARIO_LAST: '', SUMARIO_NEXT: 'BOCM-20100301' }
                                                    })

                                                } else {
                                                    app._xData.Sumario.BOCM = Record[0]
                                                }
                                                _options.SQL.db.query("SELECT count(*) FROM sumarios WHERE Type='BORME'", function (err, Record) {
                                                    app._xData.TSUMARIOS.BOCM = Record[0]["count(*)"]
                                                    _options.SQL.db.query("SELECT count(*) FROM boletin WHERE Type='BORME'", function (err, Record) {
                                                        app._xData.TBOCM = Record[0]["count(*)"]
                                                        callback(obj)
                                                    })
                                                })
                                            })
                                            //})
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
                create: function (cadsql, db, callback) {
                    db.query(cadsql, function (err, results) {
                        if (err) {
                            console.log(err)

                        }
                        callback()
                    })
                }
            },
            tables: {
                CREATE: {
                    create: function (_this, db, callback) {
                        app.fs.readFile(app.path.normalize('../sqlfiles/CREATE_Procs.sql'), function (err, _sql) {
                            if (err) {
                                console.log(err)
                                debugger
                            } else {
                                
                                _this.commands.create(_sql.toString(), db, function () {
                                    console.log('procedimientos almacenados y funciones creadas......')
                                    app.fs.readFile(app.path.normalize('../sqlfiles/CREATE_Tables.sql'), function (err, _sql) {
                                        if (err) {
                                            console.log(err)
                                            debugger
                                        } else {
                                            _this.commands.create(_sql.toString(), db, function () {
                                                console.log('tablas vacias creadas......')
                                                callback()
                                            })
                                        }
                                    })

                                })
                            }
                        })
                    },
                }
            }
        }
    })
}