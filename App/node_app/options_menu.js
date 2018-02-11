module.exports = function (app, myArgs, callback) {
    
    if (app.fs.existsSync("./sqlfiles/neo4js")) {
        if (app.fs.existsSync("./sqlfiles/X_ACCESO_neo4js.json")) {
           // app.credentials.(app.path.normalize('sqlfiles/x_ACCESO_neo4js.json'), function (err, _JSON) {
                    
                app.credentials.getlogsparamsfromfile('ACCESO_neo4js', function (err) {
                    debugger
                }, function (resp) {
                    app.neo4j = {
                        obj: require('neo4j-driver').v1, driver: null, session: null, cyper: [], run: function (options, params) {
                            this.session.run(app.neo4j.cadNeoSql).subscribe({
                                onError: function (error) {
                                    //x = CyperString
                                    console.log(error);
                                }
                            })

                        }, push: {
                            Object: function (options, table, params) {

                                const _banca = options.isBanca(params) //.e.toUpperCase().indexOf('BANCO ') > -1 || params.e.toUpperCase().indexOf('CAJA ') > -1 || params.e.toUpperCase().indexOf('CAIXA ') > -1 || params.e.toUpperCase().indexOf('CAIXA ') > -1 || params.e.toUpperCase().indexOf('SEGUROS ') > -1
                                const _table = _banca ? "Financiera" : options.isSicav(params) ? "Sicav" : options.isUTE(params) ? "Ute" : table

                                app.neo4j.cadNeoSql = "MERGE (:" + _table + " { " + "id: '" + params.k + "'" + ",nombre:'" + params.e.replaceAll("'", "\\'") + "' })"
                                app.neo4j.run(options,  params)
                            },
                            relation: function (options, table, origen, destino, OptionsDestino, active) {
                                //debugger
                                //console.log(OptionsDestino)
                                const _banca_origen = options.isBanca(origen) //origen.e.toUpperCase().indexOf('BANCO ') > -1 || origen.e.toUpperCase().indexOf('CAJA ') > -1 || origen.e.toUpperCase().indexOf('CAIXA ') > -1 || origen.e.toUpperCase().indexOf('CAIXA ') > -1 || origen.e.toUpperCase().indexOf('SEGUROS ') > -1
                                const _banca_destino = options.isBanca(destino) //destino.e.toUpperCase().indexOf('BANCO ') > -1 || destino.e.toUpperCase().indexOf('CAJA ') > -1 || destino.e.toUpperCase().indexOf('CAIXA ') > -1 || destino.e.toUpperCase().indexOf('CAIXA ') > -1 || destino.e.toUpperCase().indexOf('SEGUROS ') > -1

                                const _tableOrigen = _banca_origen ? "Financiera" : options.isSicav(origen) ? "Sicav" : options.isUTE(origen) ? "Ute" : "Empresa"
                                const _tableDestino = _banca_destino ? "Financiera" : options.isSicav(destino) ? "Sicav" : options.isUTE(destino) ? "Ute" : table
                                const _relation = _tableDestino == 'Auditor' ? "AUDITADO_POR" : _banca_destino ? "FINANCIADO_POR" : (_tableOrigen == _tableDestino && _tableDestino != 'Directivo') ? "PARTICIPADO_POR" : "DIRECTIVO"

                                const _ko =  origen.k
                                const _kd =  destino.k

                                app.neo4j.cadNeoSql = "MATCH (emp:" + _tableOrigen + " {id:'" + _ko + "'}),(x:" + _tableDestino + " {id:'" + _kd +"'})"                                //cadNeoSql = cadNeoSql + " MERGE (emp)-[:" + OptionsDestino.values.key + " { tipo:'" + OptionsDestino.type + "', cargo:'" + OptionsDestino.values.key + "' ,activo:" + (active ? 1 : 0) + ",anyo:" + origen.data.BOLETIN.match(/[\d]{4}/)[0] + "}]-(x)"
                                if (_relation == "FINANCIADO_POR" || _relation == "DIRECTIVO") {
                                    app.neo4j.cadNeoSql = app.neo4j.cadNeoSql + " MERGE (x)-[r:" + _relation + "]-(emp)"
                                } else {
                                    app.neo4j.cadNeoSql = app.neo4j.cadNeoSql + " MERGE (emp)-[r:" + _relation + "]-(x)"
                                }

                                app.neo4j.run(options)
                            }
                        }
                    }

                    app.neo4j.driver = app.neo4j.obj.driver('bolt://' + resp.host, app.neo4j.obj.auth.basic(resp.user, resp.password), {
                        encrypted: 'ENCRYPTION_OFF'
                    })
                    app.neo4j.driver.onCompleted = function () {
                        main(myArgs, exit, callback)
                    }
                    app.neo4j.session = app.neo4j.driver.session();
                })


            //})
        } else {
            app.inquirer.prompt([

                { type: 'input', name: 'host', message: 'neo4db IP:port', default: 'localhost' },
                { type: 'input', name: 'user', message: 'neo4db user', default: 'neo4j' },
                { type: 'password', name: 'password', message: 'neo4db password' }

            ]).then(function (resp) {
                app.neo4j = require('neo4j-driver').v1
                app.driver = app.neo4j.driver('bolt://' + resp.host, app.neo4j.auth.basic(resp.user, resp.password) , {
                    encrypted: 'ENCRYPTION_OFF'
                })

                app.driver.onCompleted = function() {
                    console.log('Neo4js Driver created');
                    debugger
                    app.credentials.savelogsparamstofile('ACCESO_neo4js', resp, null, function (_credenciales) {
                        //app.driver = app.neo4j.driver('bolt://' + resp.host, app.neo4j.auth.basic(resp.user, resp.password))
                        main(myArgs, exit, callback)
                    })
                };

                app.driver.onError= function(error) {
                    console.log(error);
                };

                const session = app.driver.session();

            })
            
        }
    }

    const _exit = "EXIT"
    const exit = function (myArgs,callback,automatic) {

        //if (automatic) {
            if (myArgs[1] != 'BORME') {

                var date = new Date(myArgs[2].substr(0, 4), 0, 1) //myArgs[2])

                if (date.getDay() == 0) {
                    date.setDate(date.getDate() + 1)
                }
            } else {

                var date = new Date(myArgs[2].substr(0, 4), 0, 2) //myArgs[2])
                if (date.getDay() == 6) {
                    date.setDate(date.getDate() + 1)

                }
                if (date.getDay() == 0) {
                    date.setDate(date.getDate() + 1)

                }
            }
        //} else {
        //    var date = new Date()
        //}
        callback(app, myArgs, date, automatic) // options
    }
    const getanyos = function (app,command, type, callback) {
        app.command = command
        require("./sql_common.js")(app, function (commonSQL) {
            app.commonSQL = commonSQL
            app.commonSQL.init({ SQL: { db: null }, Command: 'SCRAP' }, 'SCRAP', app._fileCredenciales + 'SCRAP' , function (scrapdb) {
                scrapdb.SQL.db.query("SELECT DISTINCT Anyo FROM anyosread WHERE Type='" + type + "' AND SCRAP = 1" , function (err, record) { //+(command=='SCRAP' ? 1: 0) 
                    var anyos = []
                    if (command == 'SCRAP') {
                        
                        var date = new Date()
                        for (n = app.Mins[type]; n <= date.getFullYear() ; n++) {
                            var ok=true
                            for(p in record){
                                if (record[p].Anyo == n) {
                                    ok = false
                                }
                            }
                            if(ok)
                              anyos[anyos.length] = n + ""
                        }
                    } else {
                        for (p in record) {
                            anyos[anyos.length] = record[p].Anyo + ""
                        }
                    }

                    callback(app, anyos)
                })
            })
        })
    }

    const main = function (myArgs,exit,callback) {
        if (myArgs.length == 0) {
            // myArgs = require("/node_app/options_menu")() //['SCRAP','BOE', '2010'] //, 'BOE-B-2003-31017' ]

            app.inquirer.prompt([{ type: 'list', name: 'value', message: 'command', choices: app.Commands }])
                .then(function (command) {
                    if (command.value != _exit) {
                        myArgs[0] = command.value
                        app.inquirer.prompt([{ type: 'list', name: 'value', message: 'tipo', choices: ['BORME', 'BOE', 'BOCM'] }])
                            .then(function (type) {
                                getanyos(app, command.value, type.value, function (app, anyos) {

                                    app.inquirer.prompt([{ type: 'list', name: 'anyo', message: 'anyo ', choices: anyos }])
                                        .then(function (resp) {
                                            //debugger
                                            myArgs = [command.value, type.value, resp.anyo]
                                            exit(myArgs, callback, false)
                                        })
                                })
                            })
                    } else {
                        process.exit(1)
                    }
                })

        } else {
            require('./sql_common.js')(app, function (SQL) {
                exit(myArgs, callback, true)
            })
        }
    }

    

}