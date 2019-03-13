'use strict';
module.exports = function (app, myArgs, callback) {

    const _exit = "EXIT"
    
    const exit = function (myArgs, callback, automatic, test) {

        //debugger
        if (myArgs[0] != _exit && myArgs[0] != 'IA') {
            if (myArgs[0] != 'GRAFOS') {
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
            }
        }

        callback(app, myArgs, date, automatic,test ) // options
    }
    const getanyos = function (app, command, type, callback) {
        app.command = command
        require("./sql_common.js")(app, function (commonSQL) {
            app.commonSQL = commonSQL
            app.commonSQL.init({ SQL: { db: null }, Command: 'SCRAP' }, 'SCRAP', function (scrapdb, test) {
                scrapdb.SQL.db.query("SELECT DISTINCT Anyo FROM anyosread WHERE Type='" + type + "' AND " + command +" = " + (command=='SCRAP'? 1:0) , function (err, record) { //+(command=='SCRAP' ? 1: 0) 
                //debugger    
                const anyos = []
                    let i = 0
                    let n= 0
                    if (command == 'SCRAP') {

                        var date = new Date()
                        for (n = app.Mins[type]; n <= date.getFullYear(); n++) {
                            var ok = true
                            for (i in record) {
                                if (record[i].Anyo == n) {
                                    ok = false
                                }
                            }
                            if (ok)
                                anyos[anyos.length] = n + ""
                        }
                    } else {

                        for (i in record) {
                            anyos[anyos.length] = record[i].Anyo + ""
                        }
                    }

                    callback(app, anyos, test)
                })
            })
        })
    }

    const main = function (_commands, myArgs, exit, callback) {
        if (myArgs.length == 0) {
            // myArgs = require("/node_app/options_menu")() //['SCRAP','BOE', '2010'] //, 'BOE-B-2003-31017' ]

            app.inquirer.prompt([{ type: 'list', name: 'value', message: 'command', choices: app.Commands }])
                .then(function (command) {
                    
                    if (command.value != _exit) {
                        myArgs[0] = command.value
                        if (_commands.indexOf(command.value) < _commands.length - 2) {
                            app.inquirer.prompt([{ type: 'list', name: 'value', message: 'tipo', choices: ['BORME', 'BOE', 'BOCM'] }])
                                .then(function (type) {
                                    //debugger
                                    getanyos(app, command.value, type.value, function (app, anyos, test) {

                                        app.inquirer.prompt([{ type: 'list', name: 'anyo', message: 'anyo ', choices: anyos }])
                                            .then(function (resp) {
                                                //debugger
                                                myArgs = [command.value, type.value, resp.anyo]
                                                exit(myArgs, callback, false, test)
                                            })
                                    })
                                })
                        } else {
                            app.grafos = { obj: require("../node_grafos/common_grafos.js")(app) }
                            app.grafos_sys = require('neo4j-driver').v1
                            myArgs = [command.value, null, null]
                            if (app.fs.existsSync(__basedir + "/sqlfiles/cred_grafos.json")) {
                                app.credentials.getparamsfromfile('cred_neo4j', function (err) {
                                    debugger
                                }, function (resp) {

                                    app.grafos.obj.driver = app.grafos_sys.driver('bolt://' + resp.host, app.grafos_sys.auth.basic(resp.user, resp.password), {
                                        encrypted: 'ENCRYPTION_OFF'
                                    })
                                    app.grafos.obj.driver.onCompleted = function () {
                                        //debugger
                                        exit(myArgs, callback, false)
                                    }
                                    app.grafos.obj.driver.onError = function (error) {
                                        console.log("neo4j error:error.message");
                                        console.log("elimine el fichero kaos155\\App\\sqlfiles\\cred_grafos.json");
                                        app.exit(function () { process.exit(1) })
                                        //process.exit(1)
                                    };
                                    app.grafos.obj.session = app.grafos.obj.driver.session();
                                })

                            } else {
                                app.inquirer.prompt([

                                    { type: 'input', name: 'host', message: 'neo4db IP:port', default: 'localhost' },
                                    { type: 'input', name: 'user', message: 'neo4db user', default: 'grafos' },
                                    { type: 'password', name: 'password', message: 'neo4db password' }

                                ]).then(function (resp) {

                                    //app.grafos = require("./common_grafos.js")(app)
                                    app.grafos.obj.driver = app.grafos_sys.driver('bolt://' + resp.host, app.grafos_sys.auth.basic(resp.user, resp.password), { encrypted: 'ENCRYPTION_OFF' })
                                    app.grafos.obj.driver.onCompleted = function () {
                                        console.log('grafoss Driver created');
                                        //debugger
                                        app.credentials.saveparamstofile('cred_neo4j', resp, null, function (_credenciales) {
                                            exit(myArgs, callback, false)
                                        })
                                    };
                                    app.grafos.obj.driver.onError = function (error) {
                                        console.log(error);
                                        app.exit(function () { process.exit(1) })
                                        //process.exit(1)
                                    };
                                    app.grafos.obj.session = app.grafos.obj.driver.session();

                                })
                            }
                        }
                    } else {
                        myArgs = [command.value,null,null]
                        exit(myArgs, callback, false)
                    }
                })

        } 
        else {
            //debugger
            require('./sql_common.js')(app, function (SQL) {
                //debugger
                getanyos(app, myArgs[0], myArgs[1], function (app, anyos, test) {
                    console.log( 'MENU->', myArgs[0] )
                    if (myArgs[0] == "IA") {
                        exit(myArgs, callback, true, test)
                    } else {
                        if (myArgs[2] == "FOR-EVER") {
                            app.forever = true
                            myArgs[2] = anyos[0]
                            exit(myArgs, callback, true, test)
                        } else {

                            var found = false
                            app._.each(anyos, function (anyo) {
                                if (anyo == myArgs[2]) {
                                    found = true
                                }


                            })
                            if (found) {
                                exit(myArgs, callback, true, test)
                            } else {
                                console.log(myArgs[2] + ' año no valido')
                            }
                        
                        }
                    }
                })
            })
        }
    }

    main(app.Commands ,myArgs, exit, callback)
    ////////////////////////////////////////////////////////////////////////




}