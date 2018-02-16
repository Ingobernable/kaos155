'use strict';
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

        callback(app, myArgs, date, automatic) // options
    }
    const getanyos = function (app, command, type, callback) {
        app.command = command
        require("./sql_common.js")(app, function (commonSQL) {
            app.commonSQL = commonSQL
            app.commonSQL.init({ SQL: { db: null }, Command: 'SCRAP' }, 'SCRAP', function (scrapdb) {
                scrapdb.SQL.db.query("SELECT DISTINCT Anyo FROM anyosread WHERE Type='" + type + "' AND SCRAP = 1", function (err, record) { //+(command=='SCRAP' ? 1: 0) 
                    const anyos = []
                    let i = 0
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

    main(myArgs, exit, callback)
    ////////////////////////////////////////////////////////////////////////




}