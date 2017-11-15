module.exports = function (app , callback) {
    callback({
        poolSql: [],
        //connection:[],
        getConnect: function (options, type, callback, SqlIP, sqlPss) {
            _this = this
            var _exit = function (options, type, callback) {
                callback(options)
            }
            if (this.poolSql[ type ] != null) {
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
        init: function (options, type, _file , callback) {
            var _this = this
            app.fs.readFile(app.path.normalize('../sqlfiles/'+ _file + '.json'), function (err, _JSON) {
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

                            _this.poolSql[ type ] = app.mysql.createPool({
                                host: _sql.mySQL.host, //, //'localhost', //'66.70.184.214',
                                user: _sql.mySQL.user,
                                password: _sql.mySQL.password,
                                database: _sql.mySQL.database, //'bbdd_kaos155', //+ type.toLowerCase(),//(type == 'RELACIONES' ? 'visualcif' : type.toLowerCase()),
                                multipleStatements: true,
                                waitForConnection: true,
                            })

                            _this.getConnect(options, type, callback)
                        
                    } else {
                        callback(options)
                    }
                }
            })
            //return options
        },
        SQL: {
            commands: {
                create: function (cadsql, db, callback) {
                    db.query(cadsql, function (err, results) {
                        if (err) {
                            x = cadsql
                            console.log(err)

                        }
                        callback()
                    })
                },
                insert: {
                    Borme: {
                        text: function (options, _analisis, data, callback) {
                            var _text = ""
                            for (n in _analisis.data) {
                                _text = _text + (_text.length>0?"#":"") + _analisis.data[n].original
                            }

                            var params = [
                                _analisis.data.length,                                                      //type
                                "BORME",
                                data.desde.substr(6, 2),                                                      //Dia
                                data.desde.substr(4, 2),                                                      //Mes
                                data.desde.substr(0, 4),                                                       //Anyo
                                _analisis.BORME,                                                                    //BOLETIN                                                                                                                   
                                _text,                                                                      //Texto
                                _analisis.PROVINCIA,                                                    //PROVINCIA
                               0                                                                        
                            ]
                            options.SQL.db.query('Call Insert_Text_BOLETIN(?,?,?,?,?,?,?,?,?)', params, function (err, record) {
                                process.stdout.write('+')
                                if (err != null) {
                                    x=_text.length
                                    cadSql = "INSERT INTO errores (BOLETIN, SqlError) VALUES (?,?)"
                                    options.SQL.db.query(cadSql, [_analisis._BOLETIN.split("=")[1], err.sqlMessage.replaceAll("'", "/'")], function (err2) {
                                        var x = err
                                        var y = params
                                        callback(data)
                                    })
                                } else {
                                    callback(data)
                                }
                            })
                        }
                    },
                    Boletin: {
                        text: function (options, _analisis, data, callback) {
                            //var i = isNaN(data.importe * 1) ? 0 : data.importe * 1

                            var boletin = _analisis._BOLETIN.split("=").length > 1 ? _analisis._BOLETIN.split("=")[1] : _analisis._BOLETIN
                            var fecha = boletin.split("-").length == 2 ? boletin.split("-")[1] : data.desde

                            var params = [
                                boletin.split("-")[0],                                                      //type
                                fecha.substr(6, 2),                                                      //Dia
                                fecha.substr(4, 2),                                                      //Mes
                                fecha.substr(0, 4),                                                       //Anyo
                                boletin,                                                                    //BOLETIN                                                                                                                   
                                data.textExtend.join("<br>").replace(/\r/g, "").replace(/'/g, "\'"),        //Texto
                                JSON.stringify(_analisis),                                                  //resultado del primer analisis
                                _analisis._importe                                                          //importe accesible?
                            ]

                            options.SQL.db.query('Call Insert_Text_BOLETIN_Contrato(?,?,?,?,?,?,?,?)', params, function (err, record) {
                                process.stdout.write('+')
                                if (err != null) {
                                    //debugger
                                    cadSql = "INSERT INTO errores (BOLETIN, SqlError) VALUES (?,?)"
                                    options.SQL.db.query(cadSql, [_analisis._BOLETIN.split("=")[1], err.sqlMessage.replaceAll("'", "/'")], function (err2) {
                                        var x = err
                                        var y = params
                                        callback(data)
                                    })
                                } else {
                                    callback(data)
                                }
                            })

                        }
                    },
                    Sumario: function (options, _sumario, _boletin, callback) {
                        var cadsql = "INSERT INTO sumarios (_counter, Anyo, SUMARIO, BOLETIN, Type) VALUES ('" + (app._xData.TSUMARIOS[options.type] + 1) + "','" + app.anyo + "','" + _sumario + "', '" + _boletin + "','" + options.type + "')"
                        options.SQL.db.query(cadsql, function (err, records) {
                            if (err) {
                                x=cadsql
                                debugger
                            }
                            app._xData.TSUMARIOS[options.type]= app._xData.TSUMARIOS[options.type]+
                            process.stdout.write('.')
                            callback()
                        })
                    },
                    errores: function (options,Boletin, SqlError, SqlMensaje, callback ) {
                        cadSql = "INSERT INTO errores (BOLETIN, SqlError,SQLMensaje) VALUES (?,?,?)"
                        options.SQL.db.query(cadSql, [Boletin, SqlError, SqlMensaje], function (err2) {
                            callback()
                        })
                    }
                },
                update: {
                    lastRead: function (options, data, callback) {
                        if (data == null)
                            debugger

                        options.SQL.db.query("UPDATE lastread SET SUMARIO_LAST='" + data.SUMARIO_LAST + "',SUMARIO_NEXT='" + data.SUMARIO_NEXT + "',ID_LAST=null WHERE type='" + data.type.toUpperCase() + "' AND Anyo= " + app.anyo, function (err, records) {
                            if (err) {
                                debugger
                            }
                            callback()
                        })
                    }
                },
                select: {
                    Sumario: function (options, _boletin, callback) {
                        var sumariosql = "SELECT * FROM sumarios WHERE type='" + options.type + "' AND BOLETIN='" + _boletin + "'"
                        options.SQL.db.query(sumariosql, function (err, rows) {
                            callback(err, rows)
                        })
                    }
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
            },
            getCounter: function (app, _options, type, callback) {
                _cadsql = "SELECT * FROM lastread WHERE Type = '" + type + "' AND Anyo = " + app.anyo
                _options.SQL.db.query(_cadsql, function (err, Record) {
                    if (err)
                        debugger
                    if (Record.length == 0) {
                        _cadsql = "INSERT INTO lastread (Type, Anyo, SUMARIO_NEXT) VALUES ('" + type + "'," + app.anyo + ",'" + type + '-' + (type != "BOCM" ? "S-" : "") + app.initDate + "')"  //2001
                        _options.SQL.db.query(_cadsql, function (err, _data) {
                            app._xData.Sumario[type] = { SUMARIO_LAST: '', SUMARIO_NEXT: type + '-' + (type != "BOCM" ? "S-" : "") + app.initDate }
                        })
                    } else {
                        app._xData.Sumario[type] = Record[0]
                    }
                    var _cadsql = "SELECT count(*) FROM sumarios WHERE Type='" + type + "' AND Anyo=" + app.anyo
                    _options.SQL.db.query(_cadsql, function (err, Record) {
                            app._xData.TSUMARIOS[type] = Record[0]["count(*)"]
                        callback(_options)
                    })
                })
            }
        }
        
    })
}