'use strict';
//////////////////////////////////////////////////////////////////////
//
// para activar la db de grafos grafosS, crear una carpeta vacia App/sqlfiles/grafos
//
global.__basedir = __dirname;
const pjson = require('./package.json');
console.log('kaos155 App - version -' + pjson.version + '.')
//debugger

var App = {
    BORME: {
        Empresas: { _counter: 0 }, Relaciones: { _counter: 0}
    },
    counter: 1,
    _: require('lodash'),
    express:require('express'),
    mysql: require('mysql'),
    fs: require("fs"),
    path: require('path'),
    http: require('http'),
    version: pjson.version,
    sockets: { array:[] },
    bucle: {
        getData: function (app,counter, db, _cb) {
            if (counter > app.counter) {
                db.query("SELECT Empresa_key,_Empresa.Nombre as NEmpresa,Relation_key,_Directivo.Nombre as NRelacion,_Empresa.T_Relations as ETR ,_Directivo.T_Relations as RTR ,_Empresa.ia_suspicius as Tia,_Directivo.ia_suspicius as Dia FROM ia_data_unique LEFT JOIN borme_keys as _Empresa ON Empresa_key = _Empresa._key LEFT JOIN borme_keys as _Directivo ON Relation_key = _Directivo._key ORDER BY Relation_key LIMIT ?,1", [app.counter], function (err, record) {
                    if (!app.BORME.Empresas[record[0].Empresa_key]) {
                        app.BORME.Empresas[record[0].Empresa_key] = {
                            _ia: record[0].Tia? record[0].Tia[0] == 0 ? 0 : 1:null,
                            _n: record[0].NEmpresa,
                            _t: record[0].ETR,
                            _d: {}
                        }
                        app.BORME.Empresas._counter = app.BORME.Empresas._counter +1
                    }
                    if (!app.BORME.Relaciones[record[0].Relation_key]) {
                        app.BORME.Relaciones[record[0].Relation_key] = {
                            _ia: record[0].Dia? record[0].Dia[0] == 0 ? 0 : 1:null,
                            _n: record[0].NRelacion,
                            _t: record[0].RTR,
                            _d: {}
                        }
                        app.BORME.Relaciones._counter = app.BORME.Relaciones._counter + 1

                    }
                    app.BORME.Empresas[record[0].Empresa_key]._d[record[0].Relation_key] = {
                        _ia: record[0].Dia?record[0].Dia[0] == 0 ? 0 : 1:null,
                        _n: record[0].NRelacion,
                        _t: record[0].RTR,
                        //_d: {}
                    }
                        app.BORME.Relaciones[record[0].Relation_key]._d[record[0].Empresa_key] = {
                            _ia: record[0].Ti?record[0].Tia[0] == 0 ? 0 : 1:null,
                            _n: record[0].NEmpresa,
                            _t: record[0].ETR,
                            //_d: {}
                    }
                    app.fs.writeFileSync('ia.json', JSON.stringify(app.BORME.Relaciones))
                    app.counter = app.counter+1
                    const used = process.memoryUsage().heapUsed / 1024 / 1024;
                    console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB ${app.counter} keys ${record[0].Empresa_key} '-' ${record[0].Relation_key} `)
                    app.bucle.getData(app,counter,db, _cb)
                })
            } else {
                _cb()
            }
        }
    },
    init: function (app) {
        require('./node_app/sql_common.js')(app, function (SQL) {
            //app.commonSQL = SQL
            SQL.init({ SQL: { db: null }, Command: 'PARSER' }, 'BORME', function (db) {
                db.SQL.db.query("SELECT count(*) as counter FROM ia_data_unique", function (err, counter) {
                    app.bucle.getData(app,counter[0].counter, db.SQL.db, function () {
                        debugger
                    })

                })
            })
        })
    },
    initwww: function (app) {
        const compute = function (path,_ref, _rs, level, type, _cb,_counters) {
            var _c = []
            const _to = _counters._f(app)
            
            //_to.inc(_to.level(path) - 1)

            if (_rs.tr > 1) {
                const cadsql = _rs._d ? "SELECT *, concat(?,_key) as _path FROM relacionado_con where _Dkey=? AND _key<>? AND NOT _Auditor AND NOT _Financiera" : "SELECT *,? as _path FROM relaciones_de where _Dkey=? AND _key<>? AND NOT _Auditor AND NOT _Financiera"
                 if (!_rs._k || !_ref) {
                    var _cadsql = cadsql.replace('?', "'" + path + "'").replace('?', "'" + _rs._k + "'").replace('?', "'" + _ref + "'")
                    console.log(_cadsql)
                    //debugger
                }
                //_counters._e['_' + (level)] = _counters._e['_' + (level)] + 1
                //console.log(cadsql.replace('?', "'" + path + "'").replace('?', "'" + _rs._key + "'").replace('?', "'" + _ref + "'"))

                app.commonSQL.db.query(cadsql, [path, _rs._k, _ref], function (err, records) {
                    //_counters._t['_' + (level+1)] = records.length-1
                    if (err)
                        debugger

                    if (records.length == 0) {
                        var _cadsql = cadsql.replace('?', "'" + path + "'").replace('?', "'" + _rs._k + "'").replace('?', "'" + _ref + "'")
                        console.log(type, _cadsql)
                        debugger
                    }

                    _to.add(_to.level(path), records.length)
                    _to.inc(_to.level(path)-1)
                    //_counters.set(level + 1, 0)

                    app._.each(records, function (record) {
                        
                        _c.push(_to.prototype(record))
                        //_counters._l[level] = _counters._e['_' + level] == _counters._t['_' + level]
                    })

                    _rs._c = _c
                    //_counters._l[level] = _counters._e['_' + (level)] == _counters._t['_' + (level)]

                    console.log(_counters.data)
                    _cb(path, level, _rs, _c)
                })
            } else {
                _to.inc(level)
                _rs._c = _c
            }
        }
        const go = function (path, ref, _r, _rs, level, maxlevel, type, cb, go,_counters) {
            path = path  + _rs._k + '/'

            compute(path,ref,_rs, level, type , function (path,_l, _rs, _c,_cadsql) {
                if (_counters._f(app).complete() < maxlevel && _counters.data._l.length < maxlevel)
                    _l++

                if (_counters._f(app).complete()==maxlevel-1) {
                    const _date = new Date
                    cb({
                        time: _date.getTime() - _counters.data._time.getTime(),
                        nodes: _counters.data._t,
                        data: _r
                    })

                } else {
                    if (_counters._f(app).level(_rs._p) < maxlevel) {


                        app._.each(_c, function (_d) {
                            //if (_d.tr > 1)
                            go(path, _rs._k, _r, _d, _l, maxlevel, _d._e, cb, go, _counters)
                        })
                    } 
                }

            }, _counters)
        }
        app.www = app.express()

        
        app.server = app.http.createServer(app.www);
        app.io = require('socket.io')(app.server);

        app.www.get('/relaciones/*', function (req, res) {
            const _path = app._.drop(req._parsedUrl.path.split("/"), 2)
            
            app.commonSQL.db.query("SELECT *, '/' as _path From borme_keys WHERE _key=?", _path, function (err, record) {
                if (record.length > 0) {
                    var _data = {
                        data: {
                            _time: new Date(),
                            _e: { _0: 0 },
                            _t: { _0: 1 },
                            _l: [],
                        },
                        _: function (l) {
                            return '_' + l
                        },
                        _f: function (app) {
                            const _this = this
                            return {
                                inc: function (l) {
                                    if (!_this.data._e[_this._(l)])
                                        _this.data._e[_this._(l)] = 0

                                    _this.data._e[_this._(l)] = _this.data._e[_this._(l)] + 1
                                    _this.data._l[l] = _this.data._e[_this._(l)] == _this.data._t[_this._(l)]

                                },
                                add: function (l, value) {
                                    if (!_this.data._t[_this._(l)]) {
                                        _this.data._t[_this._(l)] = 0
                                        _this.data._e[_this._(l)] = 0
                                    }
                                    _this.data._t[_this._(l)] = _this.data._t[_this._(l)] + value
                                    _this.data._l[l] = false
                                },
                                complete: function () {
                                    return app._.compact(_this.data._l).length //== _this.data._l.length
                                },
                                level: function (_path) {
                                    return app._.compact(_path.split('/')).length
                                },
                                prototype: function (record) {
                                    return { _p: record._path, _k: record._key, _n: record.Nombre, tr: record.T_Relations, ia: record.ia_suspicius[0], _e: record._Empresa[0] == 1, _d: record._Empresa[0] == 0, _c: [] }
                                }
                            }
                        }
                    }
                    var _r = _data._f(app).prototype(record[0]) // { _path:'/', _key:record[0]._key ,nombre:record[0].Nombre , tr:record[0].T_Relations, ia:record[0].ia_suspicius[0] ,_c:[]  }

                    go('/','',_r,_r, 0,_path[1]*1, record[0]._Directivo[0] == 1, function ( _r) {
                        console.log(_r)
                        res.send(JSON.stringify(_r))                        
                    }, go, _data)

                } else {

                }
            })
        })

        require('./node_app/sql_common.js')(app, function (SQL) {
            app.commonSQL = SQL
            SQL.init({ SQL: { db: null }, Command: 'PARSER' }, 'BORME', function (db) {
                app.commonSQL.db = db.SQL.db

                app.server.listen(80, function (err) {


                    app.io.on('connection', function (socket) {
                        console.log('IO Connect ' + socket.id)
                        app.sockets.array[socket.id] = socket
                        app.sockets.array[socket.id].on('add', function (_data) {

                            app._io.functions.BORME.add(_data)
                            _data = null
                        })
                        app.sockets.array[socket.id].on('update', function (_data) {
                            app._io.functions.BORME.update(_data)
                            _data = null
                        })
                        //callback()
                    })

                });
            })
        })

    }
    
}
App.initwww(App)