'use strict';
module.exports = function (app, callback) {

    callback({
        
        poolSql: [],
        getConnect: function (options, type, callback, test) {
            const _this = this
            const _exit = function (options, type, callback, test) {
                callback(options, test)
            }
            if (this.poolSql[type] != null) {
                if (options.SQL.db == null) {

                    this.poolSql[type].getConnection(function (err, connection) {
                        // connected! (unless `err` is set)
                        if (err == null) {
                            const handle = function (connection,_hc) {
                                connection.on('error', function (err) {
                                    console.log('db error', err);
                                    _this.poolSql[type].getConnection(function (err, connection) {
                                        handle(connection, _hc)
                                        options.SQL.db = connection
                                    })
                                })
                            }

                            handle(connection, handle)

                            console.log('new connection ' + type + ' mysql OK')
                            options.SQL.db = connection // _this.connection[type] = connection
                            _exit(options, type, callback,connection.config)
                        } else {

                            console.log("\x1b[31m ERROR: al acceder a la DB ")
                            console.log("elimine el fichero '" + this.fileCredenciales(type, Command) + "'  \x1b[0m")
                            console.log("y vuelva a ejecutar app.js")
                            app.exit(function () { process.exit(1) })
                            //process.exit(1)
                        }
                    })
                } else {
                    _exit(options, type, callback)
                }
            } else {
                this.init(options, type, callback)
            }

        },
        mysqlCommand: function (_command, db, callback, close) {
            debugger
            app.child_process.exec(_command, (error, stdout, stderr) => {
                if (error) {
                    console.log("\x1b[31m ERROR: la creación de la DB " + db + " ha fallado parcialmente")
                    console.log("para poder continuar, por favor lance desde su consola el comando \x1b[0m")
                    console.log(_command)
                    //process.exit(1)
                    app.exit(function () { process.exit(1) })
                } else {
                   console.log('tablas y procedimientos de ' + db + ' creados, continuamos .....')
                   callback()
                }
            });
        },
        testDB: function (options, con, resp, type, db, callback, close) {
            const _xthis = this
            console.log("\x1b[32m testeando consistencia DB " + db + " \x1b[0m");
            debugger
            con.query("SHOW Databases LIKE '" + db + "'", function (err, record) {
                const _command = 'mysql -u' + resp.user + ' -p' + resp.password + ' -h' + resp.host  + '<' + app.path.normalize(__dirname + '/../sqlfiles/' + options.Command.toLowerCase() + "/" + type + '/CREATE_FULL_' + type + '.sql')

                if (record.length == 0) {
                    con.query("CREATE DATABASE IF NOT EXISTS " + db, function (err, result) {
                        console.log("\x1b[32m BASE DE DATOS \x1b[0m" + db + "\x1b[32m CREADA VACIA OK \x1b[0m");
                        app.commonSQL.mysqlCommand(_command, db, callback, close)
                       
                    })
                } else {
                    var queryTables = "SELECT COUNT(*) as total FROM information_schema.tables WHERE table_schema = '" + db + "';"
                    con.query(queryTables, function (err, record) {
                        if (record[0].total == 0 ) {
                            _xthis.mysqlCommand(_command, db, callback, close)
                            
                        } else {
                           
                            callback()
                        }
                    })

                }
            })
        },
        fileCredenciales: function (type, Command) {
            //if(Command="parser")
                return app.path.normalize('sqlfiles/' + Command.toLowerCase() + '/cred_' + type.toLowerCase() + '.json')
            //if (Command = "scrap")
            //    return app.path.normalize('sqlfiles/' + Command.toLowerCase() + '\cred_' + type.toLowerCase() + '.json')
        },
        filedb: function (Command,type) {
            return "bbdd_kaos155" + (Command == 'SCRAP' ? '_text' : (type == "BORME" ? "_" + type.toLowerCase() :  (type == "GRAFOS" ? "_" + type.toLowerCase()  : "_contratos")))
        },
        init: function (options, type, callback) {
            //debugger
            const _ithis = this
            const Command = options.Command
            if(Command == null)
                debugger

            this.encryptor = require('simple-encryptor')("bbdd_kaos155_text")

            if (process.env['KAOS_MYSQL_' + type + '_PASS']) {

                this.poolSql[type] = app.mysql.createPool({
                    host: process.env['KAOS_MYSQL_' + type + '_HOST'],
                    user: process.env['KAOS_MYSQL_' + type + '_USER'],
                    password: process.env['KAOS_MYSQL_' + type + '_PASS'],
                    database: process.env['KAOS_MYSQL_' + type + '_DB'],
                    multipleStatements: true,
                    waitForConnection: true,
                })

                this.getConnect(options, type, callback)

            } else {
                //debugger
                app.fs.readFile(this.fileCredenciales(type,Command) , function (err, _JSON) {
                    var _cb = null
                    if (err) {
                        const testIp = function (testIp, callback) {

                            //_cb = callback 
                            app.inquirer.prompt([
                                { type: 'input', name: 'host', message: 'mysql ' + type + ' IP', default: 'localhost' },
                                { type: 'input', name: 'user', message: 'mysql ' + type + ' user', default: 'root' },
                                { type: 'password', name: 'password', message: 'mysql ' + type + ' password' }

                            ]).then(function (resp) {

                                const con = app.mysql.createConnection({
                                    host: resp.host,
                                    user: resp.user,
                                    password: resp.password,
                                    multipleStatements: true
                                })

                                // var encryptor = require('simple-encryptor')(db);
                                const _credenciales = {
                                    host: resp.host,
                                    user: resp.user,
                                    password: _ithis.encryptor.encrypt(resp.password),
                                    database: _ithis.filedb(Command,type) ,
                                    multipleStatements: true,
                                    waitForConnection: true,
                                }

                                con.connect(function (err) {
                                    if (err) {
                                        console.log('\x1b[31m las credenciales no parecen validas, vuelve a intentarlo \x1b[0m')
                                        testIp(testIp,_cb)
                                    } else {
                                        console.log("\x1b[32m Conectado a " + type + " OK \x1b[0m");

                                        _ithis.testDB(options, con, resp, type, _ithis.filedb(Command,type) , function () {
                                            app.fs.writeFile(_ithis.fileCredenciales(type,Command) , JSON.stringify(_credenciales), function (err, _JSON) {
                                                console.log("\x1b[32m Nuevas credenciales de acceso mysql guardadas OK \x1b[0m");
                                                callback(_credenciales)
                                            })
                                        }, true)

                                    }
                                });
                            })
                        }
                        testIp(testIp, function (credenciales) {

                            _ithis.poolSql[type] = app.mysql.createPool({
                                host: credenciales.host, //_sql.mySQL.host, //, //'localhost', //'66.70.184.214',
                                user: credenciales.user, // _sql.mySQL.user,
                                password: _ithis.encryptor.decrypt(credenciales.password),
                                database: _ithis.filedb(Command, type), //credenciales.database,
                                multipleStatements: true,
                                waitForConnection: true,
                            })
                            _ithis.getConnect(options, type, callback)
                        })
                    } else {
                        try {
                            JSON.parse(_JSON.toString())
                            //sqlPss = JSON.parse(_JSON.toString()).password
                        }
                        catch (e) {
                            console.log('error en el fichero de Credenciales mysql, json no valido, sistema detenido', e)
                            app.exit(function () { process.exit(1) })
                            //process.exit(1)
                        }

                        if (_ithis.poolSql[type] == null) {

                            _ithis.poolSql[type] = app.mysql.createPool({
                                host: JSON.parse(_JSON.toString()).host,
                                user: JSON.parse(_JSON.toString()).user,
                                password: _ithis.encryptor.decrypt(JSON.parse(_JSON.toString()).password),
                                database: _ithis.filedb(Command, type),
                                multipleStatements: true,
                                waitForConnection: true,
                            })
                            _ithis.getConnect(options, type, callback, JSON.parse(_JSON.toString()) )
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
                            console.log(cadsql,err)

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
                            const _linea = data.textExtend
                            var _cadSql = ""
                            var _s = ""

                            app.process.stdout.write(app, options, '', _linea.PROVINCIA, '')
                            
                            for (n in _linea.data) {

                                _s = _s + "."


                                this.g = {
                                    _f: "'" + data.desde.substr(6, 2) + "','" + data.desde.substr(4, 2) + "','" + data.desde.substr(0, 4) + "'",
                                    _b: "'" + _linea.BORME + "'",
                                    _t : "'" + _linea.data[n].original.replaceAll("'", "\\'") + "'",
                                    _p : "'" + _linea.PROVINCIA + "'",
                                    _i : "'" + _linea.data[n].id + "'"
                                }

                                _cadSql = _cadSql + "Call Insert_Text_BORME(" + this.g._f + "," + this.g._b + "," + this.g._t + "," + this.g._p + "," + this.g._i + ");"
                               this.g = null
                            }


                            options.SQL.db.query(_cadSql, function (err, record) {
                                app.process.stdout.write(app, options, '', _s, '')

                                //app.process.stdout.write(app, options, '', String.fromCharCode(25), '')
                                if (err != null) {
                                    debugger
                                    const cadSql = "INSERT INTO errores (BOLETIN, SqlError) VALUES (?,?)"
                                    options.SQL.db.query(cadSql, [_linea.BORME, err.sqlMessage.replaceAll("'", "/'")], function (err2) {
                                        callback(data)
                                    })
                                } else {
                                    callback(data)
                                }
                            })
                        },
                        keys: function (options, params, callback, _cberror) {
                            //const _cadsql = "CALL Insert_Data_BORME_" + params.table + "(?,?,?,?,?)"
                            //const _params = [params.e, params.k, params.data.provincia, params.data.BOLETIN, params.data.ID_BORME]
                            const _p = [params.e, params.k, params.data.provincia, params.data.BOLETIN, params.data.ID_BORME]
                            var _cadsql = _cadsql = "CALL Insert_Data_BORME_" + params.table + "(?,?,?,?,?)"
                            if (params.table == "Auditor") {
                                _p.push(params.empresa ? 1 : 0)
                                _cadsql = "CALL Insert_Data_BORME_" + params.table + "(?,?,?,?,?,?)"
                            }
                            options.SQL.db.query(_cadsql, _p , function (err, _rec) {
                                if (err != null || _rec[0][0] == null) {
                                    debugger
                                    options.SQL.scrapDb.SQL.db.query("CALL Insert_Error_Boletin(?,?,?)", [params.data.BOLETIN + '#' + params.data.ID_BORME, err.sql, err.sqlMessage], function (err2) {
                                        app.process.stdout.write(app, options, '\x1b[31m', "x", '\x1b[0m')
                                        _cberror(params)
                                    })


                                    //app.commonSQL.SQL.commands.insert.errores(options, params.data.BOLETIN + '#' + params.data.ID_BORME , err.sql , err.sqlMessage , function (err2) {
                                    //    app.process.stdout.write(app, options, '\x1b[31m', "x", '\x1b[0m')
                                    //    _cberror(params)
                                    //})
                                    //_cberror(err)
                                } else {
                                    //punto para ejecutar procesos ._busqueda de contratos key: _rec[0][0]
                                    if (_rec[1].insertId > 0 && options._common.io_client.connected)
                                        options._common.io_client.emit('add', params)

                                    callback(params, _rec)
                                }
                            })
                        },
                        diario: function (options, params, callback) {
                            options.SQL.db.query("CALL INSERT_Data_BORME_Diario(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", params, function (err, _rec) {
                                if (err)
                                    debugger
                                callback(err, _rec)
                            })
                        }
                    },
                    Boletin: {
                        text: function (options, _analisis, data, callback) {
                            var _this = this
                            if (data.err != null) {
                                app.process.stdout.write(app, options, '\x1b[31m','CNS','\x1b[0m')
          
                                options.SQL.db.query("CALL Insert_Error_Boletin(?,?,?)", [_analisis._BOLETIN.split("=")[1],data._list[data.e], data.err], function (err2) {
                                    callback(data)
                                })
                            } else {
                                const boletin = _analisis._BOLETIN.split("=").length > 1 ? _analisis._BOLETIN.split("=")[1] : _analisis._BOLETIN
                                const fecha = boletin.split("-").length == 2 ? boletin.split("-")[1] : data.desde

                                options.Rutines.normalizeTextContrato(data.textExtend, options.keysContrato, function (_text, _jsonData) {

                                    _analisis.extra.data = _jsonData
                                    if (!(_jsonData.Contratista != null && (_jsonData.Importe != null || _analisis._importe.length > 0))) {
                                        data.err = "FALTA CONTRATISTA o IMPORTES"
                                    }

                                    _this.params = [
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

                                    options.SQL.db.query('Call Insert_Text_BOLETIN(?,?,?,?,?,?,?,?,?,?)', _this.params, function (err, record) {
                                        if (err != null) {
                                            debugger
                                            app.process.stdout.write(app, options, '\x1b[31m','INS','\x1b[0m')
                                            options.SQL.db.query("INSERT INTO errores (BOLETIN, SqlError) VALUES (?,?)", [_analisis._BOLETIN.split("=")[1], err.sqlMessage.replaceAll("'", "/'")], function (err2) {
                                                debugger
                                                //var x = err
                                                //var y = params
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

                                    _this.params = null

                                })
                            }
                        }
                    },
                    Sumario: function (options, _sumario, _boletin, callback) { 
                            options.SQL.db.query("INSERT INTO sumarios (_counter, Anyo, SUMARIO, BOLETIN, Type) VALUES ('" + (app._xData.TSUMARIOS[options.type] + 1) + "','" + app.anyo + "','" + _sumario + "', '" + _boletin + "','" + options.type + "')", function (err, records) {
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
                            options.SQL.db.query("CALL Insert_Error_Boletin(?,?,?)", [Boletin, SqlError, SqlMensaje], function (err2) {
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
                        options.SQL.db.query("UPDATE sumarios SET scrap=1 where BOLETIN='" + data._analisis[data.e][options.Type] + "'", function (err, Record) {
                            callback(data)
                        })
                    }
                },
                select: {
                    Sumario: function (options, _boletin, callback) {

                         options.SQL.db.query("SELECT * FROM sumarios WHERE type='" + options.type + "' AND BOLETIN='" + _boletin + "'", function (err, rows) {
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
 
               _options.SQL.db.query("SELECT * FROM lastread WHERE Type = '" + type + "' AND Anyo = " + app.anyo, function (err, Record) {
                    if (err)
                        debugger
                    if (Record.length == 0) {
                        _options.SQL.db.query("INSERT INTO lastread (Type, Anyo, SUMARIO_NEXT) VALUES ('" + type + "'," + app.anyo + ",'" + type + '-' + (type != "BOCM" ? "S-" : "") + app.initDate + "')", function (err, _data) {
                            app._xData.Sumario[type] = { SUMARIO_LAST: '', SUMARIO_NEXT: type + '-' + (type != "BOCM" ? "S-" : "") + app.initDate }
                        })
                    } else {
                        app._xData.Sumario[type] = Record[0]
                    }

                    _options.SQL.db.query("SELECT count(*) FROM sumarios WHERE Type='" + type + "' AND Anyo=" + app.anyo, function (err, Record) {
                        app._xData.TSUMARIOS[type] = Record[0]["count(*)"]
                        callback(_options)
                    })
                })
            }
        }

    })
}