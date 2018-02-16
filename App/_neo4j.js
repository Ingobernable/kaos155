'use strict';
//////////////////////////////////////////////////////////////////////
//
// para activar la db de grafos grafosS, crear una carpeta vacia App/sqlfiles/grafos
//
global.__basedir = __dirname;
const pjson = require('./package.json');
console.log('kaos155 App - version -' + pjson.version + '.')

var App = {
    version: pjson.version,
    Command:'PARSE',
    //Plugins
    //_: require('lodash'),
    mysql: require('mysql'),
    path: require('path'),
    fs: require("fs"),
    http: require('http'),
    inquirer: require('inquirer'),
    grafos_sys:require('neo4j-driver').v1,
    init: function (app) {
        if (app.fs.existsSync("./sqlfiles/grafos")) {
            App.credentials = require('./node_utils/credentials.js')(App)
            require("./node_grafos/menu_console.js")(App, function (app) {
                require('./node_app/sql_common.js')(app, function (SQL) {
                    SQL.Command = app.Command
                    SQL.init(SQL, 'GRAFOS', function (options) {

                        const query = function (options, exec, _back) {
                            options.SQL.db.query("SELECT _cypher,_keyA,_keyB FROM cypher_data_grafos where _parse = 0 order by _date limit 1", function (err, record) {
                                if (err)
                                    console.log(err)

                                if (record.length > 0) {
                                    app.grafos.obj.insert(record[0]._cypher, function () {
                                        console.log(record[0]._cypher)
                                        options.SQL.db.query("Update cypher_data_grafos SET _parse = 1 where _keyA=? AND _keyB=?", [record[0]._keyA, record[0]._keyB], function (err, record) {
                                            if (err)
                                                console.log(err)

                                            exec(options, exec, _back)
                                        })
                                    })
                                } else {
                                    _back()
                                }

                            })
                        }
                        query(options, query, function () {
                            debugger
                        })

                    })
                    
                })
            })
        } else {
            console.log('systema NO configurado para user cypher grafos')
            console.log('para poder empezar, crear una carpeta App/sqlfiles/grafos')
            process.exit(1)
        }
    }
}

App.init(App)