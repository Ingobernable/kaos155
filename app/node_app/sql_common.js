module.exports = function (app , callback) {
    callback({
        poolSql: [],
        //connection:[],
        getConnect: function (options, type, callback, SqlIP, sqlPss) {
            _this = this
            var _exit = function (options, type, callback) {
                callback(options)
            }
            if (this.poolSql[app.command] != null) {
                if (options.SQL.db == null) {
                    this.poolSql[app.command].getConnection(function (err, connection) {
                        // connected! (unless `err` is set)
                        if (err == null) {
                            console.log('new connection ' + app.command + ' mysql OK')
                            options.SQL.db = connection // _this.connection[type] = connection
                            _exit(options, app.command, callback)
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
        init: function (options, type, callback) {
            var _this = this

            if (process.env['KAOS_MYSQL_' + app.command + '_PASS']) {

                _this.poolSql[app.command] = app.mysql.createPool({
                    host: process.env['KAOS_MYSQL_' + app.command + '_HOST'], //_sql.mySQL.host, //, //'localhost', //'66.70.184.214',
                    user: process.env['KAOS_MYSQL_' + app.command + '_USER'], // _sql.mySQL.user,
                    password: process.env['KAOS_MYSQL_' + app.command + '_PASS'], // _sql.mySQL.password,
                    database: process.env['KAOS_MYSQL_' + app.command + '_DB'], // _sql.mySQL.database, //'bbdd_kaos155', //+ type.toLowerCase(),//(type == 'RELACIONES' ? 'visualcif' : type.toLowerCase()),
                    multipleStatements: true,
                    waitForConnection: true,
                })

                _this.getConnect(options, type, callback)

            } else {


                app.fs.readFile(app.path.normalize('../sqlfiles/ACCESO_mysql.json'), function (err, _JSON) {
                    if (err) {
                        console.log('faltan Credenciales mysql, sistema detenido')
                        process.exit(1)
                    } else {
                        try {
                            var _sql = JSON.parse(_JSON.toString())
                            sqlPss = _sql.mySQL.password
                        }
                        catch (e) {
                            console.log('error en el fichero de Credenciales mysql, json no valido, sistema detenido', e)
                            process.exit(1)
                        }

                        if (_this.poolSql[app.command] == null) {

                            _this.poolSql[app.command] = app.mysql.createPool({
                                host: _sql.mySQL.host, //, //'localhost', //'66.70.184.214',
                                user: _sql.mySQL.user,
                                password: _sql.mySQL.password,
                                database: 'bbdd_kaos155', //+ type.toLowerCase(),//(type == 'RELACIONES' ? 'visualcif' : type.toLowerCase()),
                                multipleStatements: true,
                                waitForConnection: true,
                            })

                            _this.getConnect(options, type, callback)

                        } else {
                            callback(options)
                        }
                    }
                })
            }
            //return options
        },
        ActualizeCounters: function (_options, callback) {
            var _this = this
            //this.getConnect({ SQL: { db: null } }, false, 'RELACIONES', function (options) {


            //_this.getConnect({ SQL: { db :null } }, 'BOE',function(_options){
                _cadsql = "SELECT * FROM lastread WHERE Type = 'BOE' AND Anyo = " + app.anyo
                _options.SQL.db.query(_cadsql, function (err, Record) {
                    if (err)
                        debugger
                    if (Record.length == 0) {
                        _cadsql = "INSERT INTO lastread (Type, Anyo, SUMARIO_NEXT) VALUES ('BOE'," + app.anyo + ",'BOE-S-" + app.anyo + "0101')"  //2001
                        _options.SQL.db.query(_cadsql, function (err, _data) {
                            app._xData.Sumario.BOE = { SUMARIO_LAST: '', SUMARIO_NEXT: 'BOE-S-' + app.initDate }
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
                            
                            //_this.getConnect({ SQL: { db :null } }, false, 'BORME',function(_options){
                            _cadsql = "SELECT * FROM lastread  WHERE Type = 'BORME' AND Anyo = " + app.anyo    
                                _options.SQL.db.query(_cadsql, function (err, Record) {
                                    if (Record.length == 0) {
                                        _cadsql = "INSERT INTO lastread (Type, Anyo, SUMARIO_NEXT) VALUES ('BORME'," + app.anyo + ",'BORME-S-" + app.anyo + "0101')"
                                        _options.SQL.db.query(_cadsql, function (err, Record) {
                                            app._xData.Sumario.BORME = { SUMARIO_LAST: '', SUMARIO_NEXT: 'BORME-S-' + app.anyo + '0101' }  //2009
                                        })

                                    } else {
                                        app._xData.Sumario.BORME = Record[0]
                                        if (app._xData.Sumario.BORME.SUMARIO_LAST = app._xData.Sumario.BORME.ID_LAST!=null)
                                            app._xData.Sumario.BORME.SUMARIO_LAST = app._xData.Sumario.BORME.ID_LAST.split("#")[0]
                                        //app._xData.Sumario.BORME.SUMARIO_NEXT= app._xData.Sumario.BORME.ID_LAST.split("#")[0] //'BORME-S-20090102'
                                    }

                                    _options.SQL.db.query("SELECT count(*) FROM sumarios WHERE Type='BORME'", function (err, Record) {
                                        app._xData.TSUMARIOS.BORME = Record[0]["count(*)"]
                                        //_options.SQL.db.query("SELECT count(*) FROM boletin", function (err, Record) {
                                        //    app._xData.TBORME = Record[0]["count(*)"]

                                            //_this.getConnect({ SQL: { db: null } }, false, 'BOCM', function (_options) {
                                            _options.SQL.db.query("SELECT * FROM lastread WHERE Type='BOCM' AND Anyo = " + app.anyo , function (err, Record) {
                                                if (Record.length == 0) {
                                                    _options.SQL.db.query("INSERT INTO lastread (type , Anyo , SUMARIO_NEXT) VALUES ('BOCM'," + app.anyo + ",'BOCM-" + app.anyo + "0301')", function (err, Record) {
                                                        app._xData.Sumario.BOCM = { SUMARIO_LAST: '', SUMARIO_NEXT: 'BOCM-20100301' }
                                                    })

                                                } else {
                                                    app._xData.Sumario.BOCM = Record[0]
                                                }
                                                _options.SQL.db.query("SELECT count(*) FROM sumarios WHERE Type='BORME'", function (err, Record) {
                                                    app._xData.TSUMARIOS.BOCM = Record[0]["count(*)"]
                                                    _options.SQL.db.query("SELECT count(*) FROM boletin WHERE Type='BORME'", function (err, Record) {
                                                        app._xData.TBOCM = Record[0]["count(*)"]
                                                        callback(_options)
                                                    })
                                                })
                                            })
                                            //})
                                        //})
                                    })
                                //})
                            })
                        })
                    })
                })
            //})
        },
        SQL: {
            commands:{
                create: function (cadsql, db, callback) {
                    db.query(cadsql, function (err, results) {
                        if (err) {
                            x=cadsql
                            console.log(err)

                        }
                        callback()
                    })
                }
            },
            tables: {
                CREATE: {
                    create: function (_this, db, callback) {
                        app.fs.readFile(app.path.normalize('../sqlfiles/CREATE.sql'), function (err, _sql) {
                            //if (err) {
                            //    console.log(err)
                            //    debugger
                            //} else {
                                
                                //_this.commands.create(_sql.toString(), db, function () {
                                    //console.log('tablas vacias creadas......')
                                    //app.fs.readFile(app.path.normalize('../sqlfiles/CREATE_Procs.sql'), function (err, _sql) {
                                        if (err) {
                                            console.log(err)
                                            debugger
                                        } else {
                                            _this.commands.create(_sql.toString(), db, function () {
                                                console.log('elementos de la DB bbdd_kaos155 creadas......')
                                                callback()
                                            })
                                        }
                                    //})

                                //})
                            //}
                        })
                    },
                }
            }
        }
    })
}