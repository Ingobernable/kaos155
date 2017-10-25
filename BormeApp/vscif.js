var Version = '0.2.0'
console.log('loading App - version -' + Version)

var myArgs = process.argv.slice(2);

if (myArgs.length == 0)
    myArgs = ['127.0.0.1', 'Directivo']

var App = {
    webport:80,
    url: 'http://visualcif.es/',
    mysql: require('mysql'),
    request:require('request')
    fs: require("fs-extra"),
    path: require('path'),
    curl: require('./node_app/_curl.js'),
    http: require('http'),
    SQL: {
        visual: {
            db:null
        },
        Origen:{},
        Destino: {},
        Local: {},
        BOE: {},
        BOCM: {}
    },
    service: function (app) {
        
        app.responseHttp = require('./node_www/httpServer.js')(app, 'www')
        app.responseHttp.vs_Service = require('./node_www/Vscf.js')(app,'http://visualcif.es/')

        
        app.httpServer = app.http.createServer(function (request, response) {
            onsole.log('Vscf service open port ' + app.webport)
            app.responseHttp.listener(request, response)

        }).listen(app.webport);


    },
    init: function (app) {
        app.commonSQL = require('./node_app/sql_common.js')(app, function (SQL) {

            SQL.init({ SQL: { db: null } }, false, 'VISUALCIF', function (options) {
                app.SQL.visual.db = options.SQL.db
                app.get = function (type) {
                    var CadSql = "SELECT id" + type + " FROM relations_" + type + " order by id" + type + " desc LIMIT 1;"
                    app.SQL.visual.db.query(CadSql, function (err, recordset) {
                        if (recordset.length > 0) {
                            var id = recordset[0]['id'+type] 
                        } else {
                            var id = 0
                        }
                        var CadSql = "Select id from " + type + " where " + type + ".id > " + id + " LIMIT 1;"
                        app.SQL.visual.db.query(CadSql, function (err, recordset) {
                            if (recordset.length > 0) {
                                var id = recordset[0].id

                                curl = app.curl(app.url + type +'/Relaciones/' + id, '')
                                curl.nav(type, function (data) {
                                    //debugger
                                    var CadSql = "UPDATE "+ type +" SET ActiveRelations="+ data.Nodes.length +" WHERE Id="+id
                                    app.SQL.visual.db.query(CadSql, function (err, recordset) {
                                        var CadSql = "INSERT INTO relations_" + type + " (id"+type + ",Nodes) VALUES ("+id+" , ? )"
                                        //var params = { Nodes: data }
                                        //params['id'+type] = id
                                        app.SQL.visual.db.query(CadSql , JSON.stringify(data).replace(/\'/g,"") , function (err, data) {
                                            if (err)
                                                debugger
                                            app.get(type)
                                        })
                                    })
                                    
                                })

                            } else {
                                var idEmpresa = 0
                            }
                        })
                    })
                }
                app.get(myArgs[1])
            })
        })
    },
    load: function (app, callback ) {
        app.commonSQL = require('./node_app/sql_common.js')(app, function (SQL) {
            SQL.init({ SQL: { db: null } }, false, 'VISUALCIF', function (options) {
                app.SQL.Local.db = options.SQL.db
                var CadSql = "Select * from empresa order by Name"
                app.SQL.Local.db.query(CadSql, function (err, recordset) {
                    app.Data.Empresas = recordset[0]
                    var CadSql = "Select * from directivo order by Name"
                    app.SQL.Local.db.query(CadSql, function (err, recordset) {
                        app.Data.Directivos = recordset[0]
                        callback()
                    })
                })

            })
        })
    },
    Upgrade: function (app,id) {
        app.commonSQL = require('./node_app/sql_common.js')(app, function (SQL) {
            SQL.init({ SQL: { db: null } }, false, 'VISUALCIF', function (options) {
                app.SQL.Local.db = options.SQL.db
                SQL.init({ SQL: { db: null } }, false, 'BOE', function (options) {
                    app.SQL.BOE.db = options.SQL.db
                    SQL.init({ SQL: { db: null } }, false, 'BOCM', function (options) {
                        app.SQL.BOCM.db = options.SQL.db

                        var update = function (counter, id, _f) {
                            counter = counter + 1
                            var CadSql = "Select Id,Name,nBOE,nBOCM from empresa where empresa.Id > " + id + " AND (nBOE>0 OR nBOCM>0) LIMIT 1;"
                            app.SQL.Local.db.query(CadSql, function (err, recordset) {
                                if (recordset.length > 0) {
                                    var id = recordset[0].Id
                                    var name = recordset[0].Name
                                    var nBOE = recordset[0].nBOE
                                    var nBOCM = recordset[0].nBOCM
                                } else {
                                    debugger
                                }
                                CadSql = "CALL counter(?)"
                            
                                app.SQL.BOE.db.query(CadSql, '%' + name + '%', function (err, recordBOE) {
                                    app.SQL.BOCM.db.query(CadSql,  '%' + name + '%' , function (err, recordBOCM) {
                                        console.log("("+counter+") " + id + "->" + name + " BOE(" + recordBOE[0][0].counter + ")  BOCM(" + recordBOCM[0][0].counter + ")")
                                        if (nBOE != recordBOE[0][0].counter || nBOCM != recordBOCM[0][0].counter) {
                                            CadSql = "UPDATE empresa SET nBOE = ? , nBOCM=? WHERE ID=" + id
                                            app.SQL.Local.db.query(CadSql,[recordBOE[0][0].counter,recordBOCM[0][0].counter] ,function (err, recordset) {

                                                _f(counter, id, _f)
                                            })
                                        } else {
                                            _f(counter++, id, _f)
                                        }
                                    })
                                })
                            })
                        }

                        update(0,id, update)


                    })
                })
            })
        })
    },
    transport: function (app, IpOrigen, pssOrigen, IpDestino, pssDestino, type) {
        app.commonSQL = require('./node_app/sql_common.js')(app, function (SQL) {
            SQL.init({ SQL: { db: null } }, false, 'VISUALCIF', function (options) {
                app.SQL.Local.db = options.SQL.db
                SQL.init({ SQL: { db: null } }, false, 'VISUALCIF', function (options) {
                    app.SQL.Origen.db = options.SQL.db
                    SQL.init({ SQL: { db: null } }, false, 'VISUALCIF', function (options) {
                        app.SQL.Destino.db = options.SQL.db

                        app.get = function (type) {

                            var CadSql = "SELECT id" + type + " FROM relations_" + type.toLowerCase() + " order by id" + type + " desc LIMIT 1;"
                            app.SQL.Destino.db.query(CadSql, function (err, recordset) {
                                if (recordset.length > 0) {
                                    var id = recordset[0]['id'+type] 
                                } else {
                                    var id = 0
                                }
                                console.log(id)
                                var CadSql = "Select id from " + type + " where " + type + ".id > " + id + " LIMIT 1;"
                                app.SQL.Destino.db.query(CadSql, function (err, recordset) {
                                    if (recordset.length > 0) {
                                        var id = recordset[0].id
                                    }


                                    var CadSql = "SELECT * FROM relations_" + type.toLowerCase() + " where id" + type + " = " + id + ";"
                                    app.SQL.Origen.db.query(CadSql, function (err, recordset) {
                                        if (recordset.length > 0) {
                                            //var id = recordset[0]['id' + type]
                                            var txt = recordset[0].Nodes
                                            data=JSON.parse(recordset[0].Nodes)
                                        }

                                        var CadSql = "UPDATE " + type + " SET ActiveRelations=" + data.Nodes.length + " WHERE Id=" + id
                                        app.SQL.Destino.db.query(CadSql, function (err, recordset) {
                                            var CadSql = "INSERT INTO relations_" + type.toLowerCase() + " (id" + type + ",Nodes) VALUES (" + id + " , ? )"
                                            app.SQL.Destino.db.query(CadSql, txt, function (err, recordset) {
                                                if (err)
                                                    debugger
                                                app.SQL.Local.db.query(CadSql, txt, function (err, recordset) {
                                                    app.get(type)
                                                })
                                            })
                                        })

                                    })
                                })
                            })
                        }

                        app.get(type)

                    }, IpDestino, pssDestino)
                }, IpOrigen, pssOrigen)
            })
        })
    }
}
//console.log(process.memoryUsage());
App.service(App,0)

//App.load(App, function () {
//    console.log(process.memoryUsage());
//    app.Upgrade(0)
//})
//App.transport(App, 'terminator1.ingoberlab.net', 'ia155', 'vps440527.ovh.net', '$TakeThePower_2007', 'Directivo')
//App.init(App)