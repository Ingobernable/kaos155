'use strict';
var App = {
    mysql: require('mysql'),
    path: require('path'),
    fs: require("fs"),
    init: function (app, _cb) {
        require('../../node_app/sql_common.js')(app, function (SQL) {
            app.command = 'PARSER'
            app.commonSQL = SQL
            require('../../node_app/parser/par_borme.js')(app, function (options) {
                console.log('update ', process.argv.slice(2)[1])
            })
        })
    }
}
global.__basedir = __dirname;
//const pjson = require('../../package.json');
//console.log('kaos155 App - version -' + pjson.version + '.')
App.init(App)