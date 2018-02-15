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

    //Plugins
    //_: require('lodash'),
    mysql: require('mysql'),
    path: require('path'),
    fs: require("fs"),
    http: require('http'),
    inquirer: require('inquirer'),
    resolvePath: require('resolve-path'),
    child_process: require('child_process'),
    init: function (app) {
        if (app.fs.existsSync("./sqlfiles/neo4j")) {
            App.credentials = require('./node_utils/credentials.js')(App)
            require("./node_neo4j/menu_console.js")(App, function (app) {
                debugger
            })
        } else {
            console.log('para poder empezar crar una carpeta App/sqlfiles/neo4j')
            process.exit(1)
        }
    }
}

App.init(App)