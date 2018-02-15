'use strict';
//////////////////////////////////////////////////////////////////////
//
// para activar la db de grafos neo4JS, crear una carpeta vacia App/sqlfiles/neo4j
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
    neo4j_sys:require('neo4j-driver').v1,
    init: function (app) {
        if (app.fs.existsSync("./sqlfiles/neo4j")) {
            App.credentials = require('./node_utils/credentials.js')(App)
            require("./node_neo4j/menu_console.js")(App, function (app) {
                require('./node_app/sql_common.js')(app, function (SQL) {
                    SQL.init(SQL, 'BORME', function (options) {

                        const query = function (options, exec, _back) {
                            options.SQL.db.query("SELECT _cypher,_keyA,_keyB FROM borme_grafos where _inNeo = 0 limit 1", function (err, record) {
                                if (record.length > 0) {
                                    app.neo4j.obj.insert(record[0]._cypher, function () {
                                        console.log(record[0]._cypher)
                                        options.SQL.db.query("Update borme_grafos SET _inNeo = 1 where _keyA=? AND _keyB=?", [record[0]._keyA, record[0]._keyB ], function (err, record) {
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
            console.log('para poder empezar crar una carpeta App/sqlfiles/neo4j')
            process.exit(1)
        }
    }
}

App.init(App)