﻿'use strict';
var App = {
    init: function (app, _cb) {

        require('../../node_app/sql_common.js')(app, function (SQL) {
            app.commonSQL = SQL
            app.commonSQL.init(options, 'BORME', function (options) {
                app.commonSQL.init({ SQL: { db: null }, Command: 'SCRAP' }, 'SCRAP', function (scrapdb) {
                    options.SQL.scrapDb = scrapdb
                    console.log('add ', process.argv.slice(2)[1])
                })
            })
            
        })
    }
}
global.__basedir = __dirname;
//const pjson = require('../../package.json');
//console.log('kaos155 App - version -' + pjson.version + '.')
App.init(App)