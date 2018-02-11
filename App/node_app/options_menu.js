module.exports = function (app, myArgs, callback) {

    const _exit = "EXIT"
    const exit = function (myArgs, callback, automatic) {

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
    const getanyos = function (app, command, type, callback) {
        app.command = command
        require("./sql_common.js")(app, function (commonSQL) {
            app.commonSQL = commonSQL
            app.commonSQL.init({ SQL: { db: null }, Command: 'SCRAP' }, 'SCRAP', app._fileCredenciales + 'SCRAP', function (scrapdb) {
                scrapdb.SQL.db.query("SELECT DISTINCT Anyo FROM anyosread WHERE Type='" + type + "' AND SCRAP = 1", function (err, record) { //+(command=='SCRAP' ? 1: 0) 
                    var anyos = []
                    if (command == 'SCRAP') {

                        var date = new Date()
                        for (n = app.Mins[type]; n <= date.getFullYear(); n++) {
                            var ok = true
                            for (p in record) {
                                if (record[p].Anyo == n) {
                                    ok = false
                                }
                            }
                            if (ok)
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

    const main = function (myArgs, exit, callback) {
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


    ////////////////////////////////////////////////////////////////////////
    if (app.fs.existsSync("./sqlfiles/neo4j")) {
        if (app.fs.existsSync("./sqlfiles/X_ACCESO_neo4j.json")) {


            app.credentials.getlogsparamsfromfile('ACCESO_neo4j', function (err) {
                debugger
            }, function (resp) {
                app.neo4j = require("./Common_Neo4j.js")(app)
                

                app.neo4j.driver = app.neo4j.obj.driver('bolt://' + resp.host, app.neo4j.obj.auth.basic(resp.user, resp.password), {
                    encrypted: 'ENCRYPTION_OFF'
                })
                app.neo4j.driver.onCompleted = function () {
                    main(myArgs, exit, callback)
                }
                app.neo4j.session = app.neo4j.driver.session();
            })

        } else {
            app.inquirer.prompt([

                { type: 'input', name: 'host', message: 'neo4db IP:port', default: 'localhost' },
                { type: 'input', name: 'user', message: 'neo4db user', default: 'neo4j' },
                { type: 'password', name: 'password', message: 'neo4db password' }

            ]).then(function (resp) {

                app.neo4j = require("./Common_Neo4j.js")(app)

                app.neo4j.driver = app.neo4j.obj.driver('bolt://' + resp.host, app.neo4j.obj.auth.basic(resp.user, resp.password), {
                    encrypted: 'ENCRYPTION_OFF'
                })

                app.neo4j.driver.onCompleted = function () {
                    console.log('Neo4js Driver created');
                    debugger
                    app.credentials.savelogsparamstofile('ACCESO_neo4j', resp, null, function (_credenciales) {
                        main(myArgs, exit, callback)
                    })
                };

                app.neo4j.driver.onError = function (error) {
                    console.log(error);
                };

                app.neo4j.session = app.neo4j.driver.session();

            })

        }
    } else {
        main(myArgs, exit, callback)
    }

    

}