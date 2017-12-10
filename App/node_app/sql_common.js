module.exports = function (app, callback) {
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
                            console.log('new connection ' + type + ' mysql OK')
                            options.SQL.db = connection // _this.connection[type] = connection
                            _exit(options, type, callback)
                        } else {
                            if (test == null) {
                                console.log(err)
                                process.exit(1);
                            } else {
                                _exit(options, type, callback, test)
                            }
                        }
                    })
                } else {
                    _exit(options, type, callback)
                }
            } else {
                this.init(options, type, callback)
            }

        },
        init: function (options, type, _file, callback) {
            var _this = this
            _this.encryptor = require('simple-encryptor')("bbdd_kaos155_text") // + (options.Command == 'SCRAP' ? '_text' : ''))

            if (process.env['KAOS_MYSQL_' + options.Command + '_PASS']) {

                _this.poolSql[type] = app.mysql.createPool({
                    host: process.env['KAOS_MYSQL_' + options.Command + '_HOST'], //_sql.mySQL.host, //, //'localhost', //'66.70.184.214',
                    user: process.env['KAOS_MYSQL_' + options.Command + '_USER'], // _sql.mySQL.user,
                    password: process.env['KAOS_MYSQL_' + options.Command + '_PASS'], // _sql.mySQL.password,
                    database: process.env['KAOS_MYSQL_' + options.Command + '_DB'], // _sql.mySQL.database, //'bbdd_kaos155', //+ type.toLowerCase(),//(type == 'RELACIONES' ? 'visualcif' : type.toLowerCase()),
                    multipleStatements: true,
                    waitForConnection: true,
                })
                _this.getConnect(options, type, callback)

            } else {
                app.fs.readFile(app.path.normalize('sqlfiles/x_' + _file + '.json'), function (err, _JSON) {
                    if (err) {
                        testIp = function (testIp, callback) {
                            app.inquirer.prompt([
                                        { type: 'input', name: 'host', message: 'mysql ' + options.Command + ' IP', default: 'localhost' },
                                        { type: 'input', name: 'user', message: 'mysql ' + options.Command + ' user', default: 'root' },
                                        { type: 'password', name: 'password', message: 'mysql ' + options.Command + ' password' }

                            ]).then(function (resp) {
                                //_this.createfistConnect(resp, function (fail) {
                                var db = "bbdd_kaos155" + (options.Command == "SCRAP" ? "_text" : "")

                                var con = app.mysql.createConnection({
                                    host: resp.host, //_sql.mySQL.host, //, //'localhost', //'66.70.184.214',
                                    user: resp.user, // _sql.mySQL.user,
                                    password: resp.password, // _sql.mySQL.password,
                                    multipleStatements: true
                                })

                                var encryptor = require('simple-encryptor')("bbdd_kaos155_text");
                                var _credenciales = {
                                    host: resp.host, //_sql.mySQL.host, //, //'localhost', //'66.70.184.214',
                                    user: resp.user, // _sql.mySQL.user,
                                    password: _this.encryptor.encrypt(resp.password), // _sql.mySQL.password,
                                    database: db, // _sql.mySQL.database, //'bbdd_kaos155', //+ type.toLowerCase(),//(type == 'RELACIONES' ? 'visualcif' : type.toLowerCase()),
                                    multipleStatements: true,
                                    waitForConnection: true,
                                }

                                con.connect(function (err) {
                                    if (err) {
                                        //console.log(err)
                                        console.log('\x1b[31m las credenciales no parecen validas, vuelve a intentarlo \x1b[0m')
                                        testIp(testIp)
                                    } else {
                                        console.log("\x1b[32m Conectado a mysql OK \x1b[0m");

                                        con.query("SHOW Databases LIKE '" + db + "'", function (err, record) {
                                            if (record.length == 0) {
                                                app.fs.readFile(app.path.normalize('sqlfiles/'+options.Command+'/CREATE_DB_' + options.Command + '.sql'), function (err, sqlTXT) {
                                                    con.query(sqlTXT.toString(), function (err, record) {
                                                        if (err) {
                                                            console.log(err)
                                                            process.exit(1)
                                                            callback(null)
                                                        } else {
                                                            const cp = require('child_process');
                                                            cp.exec('mysql -u ' + resp.user + ' -p' + resp.password + ' < ' + app.resolvePath('sqlfiles/' + options.Command + '/CREATE_PROC_' + options.Command + '.sql'), (error, stdout, stderr) => {
                                                                if (error) throw error;
                                                                console.log(`stdout: ${stdout}`);
                                                                console.log(`stderr: ${stderr}`);
                                                                console.log('tablas y procedimientos de ' + db + ' creados, continuamos .....')
                                                                con.end()
                                                                app.fs.writeFile(app.path.normalize('sqlfiles/x_' + _file + '.json'), JSON.stringify({ mySQL: _credenciales }), function (err, _JSON) {
                                                                    callback(_credenciales)
                                                                })
                                                            });
                                                        }
                                                    });
                                                });


                                            } else {
                                                console.log('\x1b[32m la DB ' + db + ' ya existe, continuamos ..... \x1b[0m')
                                                con.end()
                                                app.fs.writeFile(app.path.normalize('sqlfiles/x_' + _file + '.json'), JSON.stringify(_credenciales), function (err, _JSON) {
                                                    callback(_credenciales)
                                                })
                                            }

                                        })
                                    }
                                });
                            })
                        }
                        testIp(testIp, function (credenciales) {

                            _this.poolSql[type] = app.mysql.createPool({
                                host: credenciales.host, //_sql.mySQL.host, //, //'localhost', //'66.70.184.214',
                                user: credenciales.user, // _sql.mySQL.user,
                                password: _this.encryptor.decrypt(credenciales.password),  // _sql.mySQL.password,
                                database: credenciales.database, // _sql.mySQL.database, //'bbdd_kaos155', //+ type.toLowerCase(),//(type == 'RELACIONES' ? 'visualcif' : type.toLowerCase()),
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
                                host: _sql.host, //, //'localhost', //'66.70.184.214',
                                user: _sql.user,
                                password: _this.encryptor.decrypt(_sql.password),
                                database: _sql.database, //'bbdd_kaos155', //+ type.toLowerCase(),//(type == 'RELACIONES' ? 'visualcif' : type.toLowerCase()),
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
                            if (record[0][0][type.toLowerCase()] > 0)
                                app.logStop(3, 'el ' + type + ' del año ' + app.anyo + ' ya se ha completado')

                            callback(options)
                        })
                    },
                    Borme: {
                        text: function (options, _linea, callback) {
                            var _text = ""
                            var _id = ""
                            for (n in _analisis.data) {
                                _text = _text + (_text.length > 0 ? "#" : "") + _analisis.data[n].original
                                _id = _id + (_id.length > 0 ? "#" : "") + _analisis.data[n].id
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
                                _id,
                                ''
                            ]
                            process.stdout.write(_analisis.PROVINCIA)
                            options.SQL.db.query('Call Insert_Text_BOLETIN(?,?,?,?,?,?,?,?,?,?)', params, function (err, record) {

                                process.stdout.write(String.fromCharCode(25))
                                if (err != null) {
                                    x = _text.length
                                    cadSql = "INSERT INTO errores (BOLETIN, SqlError) VALUES (?,?)"
                                    options.SQL.db.query(cadSql, [_analisis.BORME, err.sqlMessage.replaceAll("'", "/'")], function (err2) {
                                        var x = err
                                        var y = params
                                        callback(data)
                                    })
                                } else {
                                    callback(data)
                                }
                            })
                        },
                        keys: function (options, params, callback, _cberror) {
                            options.SQL.db.query("CALL Insert_Data_BORME_" + params.table + "(?,?)", [params.e, params.k], function (err, _rec) {
                                if (err != null || _rec[0][0] == null) {
                                    _cberror(err)
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

                            var boletin = _analisis._BOLETIN.split("=").length > 1 ? _analisis._BOLETIN.split("=")[1] : _analisis._BOLETIN
                            var fecha = boletin.split("-").length == 2 ? boletin.split("-")[1] : data.desde

                            var params = [
                                data.textExtend.length,
                                boletin.split("-")[0],                                                      //type
                                fecha.substr(6, 2),                                                      //Dia
                                fecha.substr(4, 2),                                                      //Mes
                                fecha.substr(0, 4),                                                       //Anyo
                                boletin,                                                                    //BOLETIN                                                                                                                   
                                data.textExtend.join("<br>").replace(/\r/g, "").replace(/'/g, "\'"),        //Texto
                                JSON.stringify(_analisis.extra),                                                  //resultado del primer analisis
                                _analisis._importe,                                                          //importe accesible?
                                data.err == null ? '' : data.err
                            ]

                            options.SQL.db.query('Call Insert_Text_BOLETIN(?,?,?,?,?,?,?,?,?,?)', params, function (err, record) {

                                if (err != null) {
                                    process.stdout.write('X')
                                    cadSql = "INSERT INTO errores (BOLETIN, SqlError) VALUES (?,?)"
                                    options.SQL.db.query(cadSql, [_analisis._BOLETIN.split("=")[1], err.sqlMessage.replaceAll("'", "/'")], function (err2) {
                                        var x = err
                                        var y = params
                                        callback(data)
                                    })
                                } else {
                                    process.stdout.write('+')
                                    callback(data)
                                }
                            })

                        }
                    },
                    Sumario: function (options, _sumario, _boletin, callback) {
                        var cadsql = "INSERT INTO sumarios (_counter, Anyo, SUMARIO, BOLETIN, Type) VALUES ('" + (app._xData.TSUMARIOS[options.type] + 1) + "','" + app.anyo + "','" + _sumario + "', '" + _boletin + "','" + options.type + "')"
                        options.SQL.db.query(cadsql, function (err, records) {
                            if (err) {
                                x = cadsql
                                debugger
                            }
                            app._xData.TSUMARIOS[options.type] = app._xData.TSUMARIOS[options.type] +
                            process.stdout.write('.')
                            callback()
                        })
                    },
                    errores: function (options, Boletin, SqlError, SqlMensaje, callback) {
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