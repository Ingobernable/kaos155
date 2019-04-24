'use strict';

console.log('www server 0.0.1')
var _ = require("lodash")
//app.process.port = ((app.TypeBoletines.indexOf(app.Type) + 2) + app.anyo) * 1
var App = {
    _: _ ,
    express: require('express'),
    http: require('http'),
    fs: require("fs"),
    path: require('path'),
    mysql: require('mysql'),
    inquirer: require('inquirer'),
   
}

String.prototype.replaceAll = function (target, replacement) {
    return this.split(target).join(replacement);
};

    require('./node_app/sql_common.js')(App, function (SQL, app) {
        app.SQL = SQL.SQL
        //app.Tree = require('./node_app/midelware/tree.js')(App, function () {
        //   debugger
        //})

        SQL.init({ SQL: { db: null }, Command: 'PARSER' }, 'BORME', function (options) {
            app.SQL.db = options.SQL.db;
            var www = App.express();
            var server = App.http.createServer(www).listen(80);

            www.get('/css/*', function (req, res) {
                res.sendFile(__dirname + '/node_www/wwwClient/public/' + req.url);
            })
            www.get('/js/*', function (req, res) {
                res.sendFile(__dirname + '/node_www/wwwClient/public/' + req.url);
            })

            www.get('/search/*', function (req, res) {
                var _p = req._parsedUrl.href.replaceAll("--", "-").replaceAll("-"," ").replaceAll("  "," ").split("/")
                app.SQL.www.search(SQL, options,_p[2], _p[3], function (err,record) {
                    if (err == null) {
                        var _out = []
                        _.forEach(record, function (value) {
                            _out[_out.length] = JSON.parse(value.root)
                        })
                        res.send(_out)
                    }
                });

            })
            www.get('/relations/*', function (req, res) {
                var _p = req._parsedUrl.href.replaceAll("  ", " ").split("/")
                var _key = _p.slice(2) 
                //var _key = _p[3]
                app.SQL.www.relations(SQL,options, _key, function (err, data) {
                    res.send(data)
                })
            })

            www.get('/tree/*', function (req, res) {
                var _p = req._parsedUrl.href.replaceAll("  ", " ").split("/")
                var _key = _p[2]
                app.SQL.www.tree.id(options, _key, function (err, data) {
                    res.send(data)


                    //if(record[0]._Empresa==1)
                    //    res.send({ id: record[0].key, Name: record[0].Nombre,  })
                    //if (record[0]._Directivo == 1)
                    //    res.send({ id: record[0].key, Name: record[0].Nombre, })
                })
            })
            www.get('/get/*', function (req, res) {
                var _p = req._parsedUrl.href.replaceAll("  ", " ").split("/")
                app.SQL.www.get(options, _p[2], _p[3], function (err, record) {
                    if (err == null) {
                        var _out = { id: record[0][0]._key, Nombre: record[0][0].Nombre } //record[0]
                        _out._def = {
                            _Empresa: record[0][0]._Empresa,
                            _Directivo: record[0][0]._Directivo,
                            _Auditor: record[0][0]._Auditor,
                            Provincia: record[0][0].Provincia,
                            BOLETIN: { id: record[0][0].BOLETIN, Linea: record[0][0]._ID }                    
                        }
                        if (_p[2] == 'Directivo') {
                            _out._data = {
                                BORME: { TREE: record[2] },
                                //CONTRATOS: { BOE: [], BORME: [] }
                            }

                        } else {
                            _out._data = {
                                BORME: { ACTOS_JURIDIC: record[1], TREE: record[2] },
                                CONTRATOS: { BOE: [], BORME: [] }
                            }
                        }//{ id: record[0]._key, Nombre:, Borme: { actos: record[1] } } //JSON.parse() //[]
                       // _.forEach(record, function (value) {
                       //     _out[_out.length] = JSON.parse({ id: _p[3], Borme: { actos: record } })
                       // })
                        res.send(_out)
                    }
                });

            })
            www.get('/', function (req, res) {
                res.sendFile(__dirname + '/node_www/wwwClient/index.html');

            })
            www.get('/pelotitas', function (req, res) {
                res.sendFile(__dirname + '/node_www/wwwClient/pelotitas.html');
            })
        })
    })

