module.exports = function (app, callback) {
    var _ = app._
    callback({
        
        poolSql: [],
        // createfistConnect: function (options, type, callback, test) {
        //     debugger
        // },
        getConnect: function (options, type, callback, test) {
            _this = this
            var _exit = function (options, type, callback, test) {
                callback(options, test)
            }
            if (this.poolSql[type] != null) {
                if (options.SQL.db == null) {
                    this.poolSql[type].getConnection(function (err, connection) {
                        // connected! (unless `err` is set)
                        if (err == null) {
                            console.log('new connection ' + options.Command + ' mysql OK')
                            options.SQL.db = connection // _this.connection[type] = connection
                            _exit(options, type, callback)
                        } else {

                            console.log("\x1b[31m ERROR: al acceder a la DB ")
                            console.log("elimine el fichero '" + app.path.normalize('sqlfiles/x_ACCESO_mysql_' + options.Command + '.json') + "'  \x1b[0m")
                            console.log("y vuelva a ejecutar app.js")
                            process.exit(1)
                        }
                    })
                } else {
                    _exit(options, type, callback)
                }
            } else {
                this.init(options, type, callback)
            }

        },
        mysqlCommand: function (_command, db, callback,close) {
            const cp = require('child_process');
            cp.exec(_command, (error, stdout, stderr) => {
                if (error) {
                    console.log("\x1b[31m ERROR: la creación de la DB " + db + " ha fallado parcialmente")
                    console.log("para poder continuar, por favor lance desde su consola el comando \x1b[0m")
                    console.log(_command)
                    process.exit(1)
                } else {
                    console.log('tablas y procedimientos de ' + db + ' creados, continuamos .....')
                    //if (close)
                    //    con.end()
                    //app.fs.writeFile(app.path.normalize('sqlfiles/x_' + _file + '.json'), JSON.stringify(_credenciales), function (err, _JSON) {
                    callback()
                    //})
                }
            });
        },
        testDB: function (options, con, resp, db, callback, close) {
            var _this = this
            console.log("\x1b[32m testeando consistencia DB " + db + " \x1b[0m");
            con.query("SHOW Databases LIKE '" + db + "'", function (err, record) {
                var _command = 'mysql -u' + resp.user + ' -p' + resp.password + ' -h' + resp.host + ' -D' + db + '< ' + app.path.normalize(__dirname + '/../sqlfiles/' + options.Command.toLowerCase() + '/CREATE_FULL_' + options.Command + '.sql')

                if (record.length == 0) {
                    con.query("CREATE DATABASE IF NOT EXISTS " + db, function (err, result) {
                        console.log("\x1b[32m BASE DE DATOS \x1b[0m" + db + "\x1b[32m CREADA VACIA OK \x1b[0m");
                        _this.mysqlCommand(_command, db, callback,close)
                    })
                } else {
                    var queryTables = "SELECT COUNT(*) as total FROM information_schema.tables WHERE table_schema = '" + db + "';"
                    con.query(queryTables, function (err, record) {
                        if (record[0].total < 3) {
                            _this.mysqlCommand(_command, db, callback,close)
                        } else {
                            callback()
                        }
                    })

                }
            })
        },
        init: function (options, type, _file, callback) {
            var _this = this
            _this.encryptor = require('simple-encryptor')("bbdd_kaos155_text")

            if (process.env['KAOS_MYSQL_' + options.Command + '_PASS']) {

                _this.poolSql[type] = app.mysql.createPool({
                    host: process.env['KAOS_MYSQL_' + options.Command + '_HOST'],
                    user: process.env['KAOS_MYSQL_' + options.Command + '_USER'],
                    password: process.env['KAOS_MYSQL_' + options.Command + '_PASS'],
                    database: process.env['KAOS_MYSQL_' + options.Command + '_DB'],
                    multipleStatements: true,
                    waitForConnection: true,
                })

                _this.getConnect(options, type, callback)

            } else {

                app.fs.readFile(app.path.normalize('sqlfiles/x_' + _file + '.json'), function (err, _JSON) {
                    _cb = null
                    if (err) {
                        testIp = function (testIp, callback) {

                            _cb = callback 
                            app.inquirer.prompt([
                                        { type: 'input', name: 'host', message: 'mysql ' + options.Command + ' IP', default: 'localhost' },
                                        { type: 'input', name: 'user', message: 'mysql ' + options.Command + ' user', default: 'root' },
                                        { type: 'password', name: 'password', message: 'mysql ' + options.Command + ' password' }

                            ]).then(function (resp) {

                                var db = "bbdd_kaos155" + (options.Command == 'SCRAP' ? '_text' : '')

                                var con = app.mysql.createConnection({
                                    host: resp.host,
                                    user: resp.user,
                                    password: resp.password,
                                    multipleStatements: true
                                })

                                // var encryptor = require('simple-encryptor')(db);
                                var _credenciales = {
                                    host: resp.host,
                                    user: resp.user,
                                    password: _this.encryptor.encrypt(resp.password),
                                    database: db,
                                    multipleStatements: true,
                                    waitForConnection: true,
                                }

                                con.connect(function (err) {
                                    if (err) {
                                        console.log('\x1b[31m las credenciales no parecen validas, vuelve a intentarlo \x1b[0m')
                                        testIp(testIp)
                                    } else {
                                        console.log("\x1b[32m Conectado a mysql OK \x1b[0m");

                                        _this.testDB(options, con, resp, db, function () {
                                            app.fs.writeFile(app.path.normalize('sqlfiles/x_' + _file + '.json'), JSON.stringify(_credenciales), function (err, _JSON) {
                                                console.log("\x1b[32m Nuevas credenciales de acceso mysql guardadas OK \x1b[0m");
                                                _cb(_credenciales)
                                            })
                                        }, true)
                                    }
                                });
                            })
                        }
                        testIp(testIp, function (credenciales) {

                            _this.poolSql[type] = app.mysql.createPool({
                                host: credenciales.host, //_sql.mySQL.host, //, //'localhost', //'66.70.184.214',
                                user: credenciales.user, // _sql.mySQL.user,
                                password: _this.encryptor.decrypt(credenciales.password),
                                database: credenciales.database,
                                multipleStatements: true,
                                waitForConnection: true,
                            })
                            _this.getConnect(options, type, callback)

                        })
                    } else {
                        try {
                            var _sql = JSON.parse(_JSON.toString())
                            sqlPss = _sql.password
                        }
                        catch (e) {
                            console.log('error en el fichero de Credenciales mysql, json no valido, sistema detenido', e)
                            process.exit(1)
                        }

                        if (_this.poolSql[type] == null) {

                            _this.poolSql[type] = app.mysql.createPool({
                                host: _sql.host,
                                user: _sql.user,
                                password: _this.encryptor.decrypt(_sql.password),
                                database: _sql.database,
                                multipleStatements: true,
                                waitForConnection: true,
                            })

                            _this.getConnect(options, type, callback, null)

                        } else {
                            callback(options)
                        }
                    }

                })
            }
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
                    AnyoRead: function (options, db, type, callback) {
                        db.query('call InsertAnyo(?,?)', [options.Type, app.anyo], function (err, record) {
                            if(err!=null)
                                console.log(err)
                            if (record[0][0][type.toLowerCase()] > 0)
                                app.logStop(3, 'el ' + type + ' del año ' + app.anyo + ' ya se ha completado')

                            callback(options)
                        })
                    },
                    Borme: {
                        text: function (options, data, callback) {
                            _linea = data.textExtend
                            var _cadSql = ""
                            var _s = ""

                            app.process.stdout.write(app, options, '', _linea.PROVINCIA, '')

                            for (n in _linea.data) {
                                //_text = _text + (_text.length > 0 ? "#" : "") + _linea.data[n].original
                                //_id = _id + (_id.length > 0 ? "#" : "") + _linea.data[n].id
                                _s = _s + "."

                                var _f = "'" + data.desde.substr(6, 2) + "','" + data.desde.substr(4, 2) + "','" + data.desde.substr(0, 4) + "'"
                                var _b = "'" + _linea.BORME + "'"
                                var _t = "'" + _linea.data[n].original.replaceAll("'", "\\'") + "'"
                                var _p = "'" + _linea.PROVINCIA + "'"
                                var _i = "'" + _linea.data[n].id + "'"
                                var __cadsql = "Call Insert_Text_BORME(" + _f + "," + _b + "," + _t + "," + _p + "," + _i + ");"

                                _cadSql = _cadSql + __cadsql
                                //app.process.stdout.write(app, options, '.' )
                            }


                            options.SQL.db.query(_cadSql, function (err, record) {
                                app.process.stdout.write(app, options, '', _s, '')

                                //app.process.stdout.write(app, options, '', String.fromCharCode(25), '')
                                if (err != null) {
                                    debugger
                                    cadSql = "INSERT INTO errores (BOLETIN, SqlError) VALUES (?,?)"
                                    options.SQL.db.query(cadSql, [_linea.BORME, err.sqlMessage.replaceAll("'", "/'")], function (err2) {
                                        var x = err
                                        //var y = params
                                        callback(data)
                                    })
                                } else {
                                    callback(data)
                                }
                            })
                        },
                        keys: function (options, params, callback, _cberror) {
                            var _cadsql = "CALL Insert_Data_BORME_" + params.table + "(?,?,?,?,?)"
                            var _params = [params.e, params.k, params.data.provincia, params.data.BOLETIN, params.data.ID_BORME]

                            options.SQL.db.query(_cadsql, _params , function (err, _rec) {
                                if (err != null || _rec[0][0] == null) {

                                    cadSql = "CALL Insert_Error_Boletin(?,?,?)"
                                    options.SQL.scrapDb.SQL.db.query(cadSql, [params.data.BOLETIN + '#' + params.data.ID_BORME, err.sql, err.sqlMessage], function (err2) {
                                        app.process.stdout.write(app, options, '\x1b[31m', "x", '\x1b[0m')
                                        _cberror(params)
                                    })


                                    //app.commonSQL.SQL.commands.insert.errores(options, params.data.BOLETIN + '#' + params.data.ID_BORME , err.sql , err.sqlMessage , function (err2) {
                                    //    app.process.stdout.write(app, options, '\x1b[31m', "x", '\x1b[0m')
                                    //    _cberror(params)
                                    //})
                                    //_cberror(err)
                                } else {
                                    callback(params, _rec)
                                }
                            })
                        },
                        diario: function (options, params, callback) {


                            options.SQL.db.query("CALL INSERT_Data_BORME_Diario(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", params, function (err, _rec) {
                                if (err)
                                    debugger
                                callback(err, _rec)
                            })
                        }
                    },
                    Boletin: {
                        text: function (options, _analisis, data, callback) {
                            //var i = isNaN(data.importe * 1) ? 0 : data.importe * 1
                            if (data.err != null) {
                                app.process.stdout.write(app, options, '\x1b[31m','CNS','\x1b[0m')
                                cadSql = "CALL Insert_Error_Boletin(?,?,?)"
                                options.SQL.db.query(cadSql, [_analisis._BOLETIN.split("=")[1],data._list[data.e], data.err], function (err2) {
                                    callback(data)
                                })
                            } else {
                                var boletin = _analisis._BOLETIN.split("=").length > 1 ? _analisis._BOLETIN.split("=")[1] : _analisis._BOLETIN
                                var fecha = boletin.split("-").length == 2 ? boletin.split("-")[1] : data.desde

                                options.Rutines.normalizeTextContrato(data.textExtend, options.keysContrato, function (_text, _jsonData) {

                                    _analisis.extra.data = _jsonData
                                    if (!(_jsonData.Contratista != null && (_jsonData.Importe != null || _analisis._importe.length > 0))) {
                                        data.err = "FALTA CONTRATISTA o IMPORTES"
                                    }
                                        var params = [
                                            _text.length,
                                            boletin.split("-")[0],                                                      //type
                                            fecha.substr(6, 2),                                                      //Dia
                                            fecha.substr(4, 2),                                                      //Mes
                                            fecha.substr(0, 4),                                                       //Anyo
                                            boletin,                                                                    //BOLETIN                                                                                                                   
                                            _text.join("<br>").replace(/\r/g, "").replace(/'/g, "\'"),                  //Texto

                                            //JSON.stringify(_jsonData),
                                            JSON.stringify(_analisis.extra),
                                            _analisis._importe,                                                          //importe accesible?
                                            data.err == null ? '' : data.err
                                        ]

                                        options.SQL.db.query('Call Insert_Text_BOLETIN(?,?,?,?,?,?,?,?,?,?)', params, function (err, record) {
                                            if (err != null) {
                                                app.process.stdout.write(app, options, '\x1b[31m','INS','\x1b[0m')
                                                cadSql = "INSERT INTO errores (BOLETIN, SqlError) VALUES (?,?)"
                                                options.SQL.db.query(cadSql, [_analisis._BOLETIN.split("=")[1], err.sqlMessage.replaceAll("'", "/'")], function (err2) {
                                                    var x = err
                                                    var y = params
                                                    callback(data)
                                                })
                                            } else {
                                                if (data.err!=null) {
                                                    app.process.stdout.write(app, options, '\x1b[31m','ERR','\x1b[0m')
                                                    callback(data)
                                                } else {
                                                    app.process.stdout.write(app, options, '\x1b[32m','+','\x1b[0m')
                                                    callback(data)
                                                }
                                            }
                                        })
                                    //} else {

                                })
                            }
                        }
                    },
                    Sumario: function (options, _sumario, _boletin, callback) {
                        var cadsql = "INSERT INTO sumarios (_counter, Anyo, SUMARIO, BOLETIN, Type) VALUES ('" + (app._xData.TSUMARIOS[options.type] + 1) + "','" + app.anyo + "','" + _sumario + "', '" + _boletin + "','" + options.type + "')"
                        options.SQL.db.query(cadsql, function (err, records) {
                            if (err) {
                                x = cadsql
                                debugger
                            }
                            app._xData.TSUMARIOS[options.type] = app._xData.TSUMARIOS[options.type] + 1
                            app.process.stdout.write(app,options,'', '.', '')
                            callback()
                        })
                    },
                    errores: function (options, Boletin, SqlError, SqlMensaje, callback) {
                        cadSql = "CALL Insert_Error_Boletin(?,?,?)"
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
                            callback(data)
                        })
                    },
                    ScrapLabel: function (options, data, callback) {
                        var _boletin = data._analisis[data.e][options.Type]
                        options.SQL.db.query("UPDATE sumarios SET scrap=1 where BOLETIN='" + _boletin + "'", function (err, Record) {
                            callback(data)
                        })
                    }
                },
                select: {
                    Sumario: function (options, _boletin, callback) {
                        var sumariosql = "SELECT * FROM sumarios WHERE type='" + options.type + "' AND BOLETIN='" + _boletin + "'"
                        options.SQL.db.query(sumariosql, function (err, rows) {
                            callback(err, rows)
                        })
                    },
                    NextTextParser: function (options, params, callback) {
                        options.SQL.scrapDb.SQL.db.query('call GetNextTextParser(?,?)', params, function (err, recordset) {
                            callback(err, recordset)
                        })
                    }
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