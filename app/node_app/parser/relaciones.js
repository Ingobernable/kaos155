module.exports = function (app, drop, callback) {

    var options = {
        keepAliveAgent : new app.http.Agent({ keepAlive: true }),
        request: require('request'),
        //http: require('http'),
        uri: app.urlVisualCif,
        SQL: {
            actions: {
                drop: function (db, callback) {
                    db.query("DROP TABLE if EXISTS LastRead", function (err, results) {
                        db.query("DROP TABLE if EXISTS Empresa", function (err, results) {
                            db.query("DROP TABLE if EXISTS Directivo", function (err, results) {
                                if (err)
                                    debugger
                                callback()
                            })
                        })
                    })
                },
                create: function (db, callback) {
                    db.query("CREATE TABLE if NOT EXISTS LastRead (Empresa BIGINT not NULL , Directivo BIGINT not NULL);", function (err, results) {
                        db.query("CREATE TABLE if NOT EXISTS Empresa   (Id BIGINT not NULL PRIMARY KEY, Name TINYTEXT not NULL, ActiveRelations int NOT NULL, Nodes json null, JuridicId BIGINT DEFAULT 0, Mark TINYINT DEFAULT 0, nBOE INT  DEFAULT 0, nBOCM INT  DEFAULT 0, coorp INT  DEFAULT 0);", function (err, results) {
                            db.query("CREATE TABLE if NOT EXISTS Directivo (Id BIGINT not NULL PRIMARY KEY, Name TINYTEXT not NULL, ActiveRelations INT not NULL, Nodes json null, JuridicId BIGINT DEFAULT 0, Mark TINYINT DEFAULT 0 );", function (err, results) {
                                if (err)
                                    debugger
                                callback()
                            })
                        })
                    })
                }
            },
            commands: {
                    insert: function( options, type, _cadsql ) {
                        options.SQL.db.query(_cadsql, function (err, rows) {
                           // if (err) 
                           //     debugger

                            options.Actualize( options, type)

                        })
                    }
            }
        },
        Actualize: function (options, type) {
           // var _this = this
            app._xData.VisualCif[type]++

            //app.io.emit('total_cif', { total: { Directivo: app._xData.VisualCif.Directivo, Empresa: app._xData.VisualCif.Empresa } })


            if (type == null) {
                console.log('ERROR ->Falta el tipo de Relacion')
                process.exit(1)
            }
            var Turl =  options.uri + '/' + type + '/' + app._xData.VisualCif[type]
            
            var cadsql = 'UPDATE LastRead SET Empresa=' + app._xData.VisualCif.Empresa + ',Directivo=' + app._xData.VisualCif.Directivo + ';'
            options.SQL.db.query(cadsql, function (err) {
                if (err) {
                    console.log('SQL ERROR UPDATE LastRead ')
                    options.Actualize(type, options)
                }
                _cadsql = "SELECT Id FROM " + type + " WHERE Id=" + app._xData.VisualCif[type]
                options.SQL.db.query(_cadsql, function (err, rows) {
                    if (err) {
                        console.log('SQL ERROR SELECT ID= ' + app._xData.VisualCif[type])
                        options.Actualize( options, type )
                    }
                    if (rows.length == 0) {

                        var key = 'var root = createBaseGraph('
                        requestOptions = {
                            host: options.uri.split("://")[1],
                            path: Turl
                        }
                            //encoding: null,
                            //timeout: 120000,
                       //     method: "GET",
                        //    uri: Turl
                        //};
                        //requestOptions.agent = options.keepAliveAgent
                        var curl = require('../_curl.js')(Turl)
                        //var execSync = require('child_process').execSync;
                        //execSync('pdftotext ' + self.options.additional.join(' '));
                        curl.nav('Empresas', function (body) {
                            //debugger
                            //var body = "";
                            //response.on('data', function (chunk) {
                            //    body += chunk;
                            //});

                            //response.on('end', function () {
                                if (body.length==0) {
                                    console.log(url + ' -> err: body NULL')
                                    options.Actualize(options,type)
                                }
                                try {
                                    body = body.toString().replace(/'/g, "´") //.replace(/"/g, "/\"")
                            
                                    var p = body.indexOf(key)
                                    var f = p > 0 ? body.indexOf('}', p) : 0

                                    if (p == -1 && body.indexOf('<head><title>403 Forbidden</title></head>') > -1) {
                                        var d=new Date()
                                        console.log(Turl + ' -> 403 Forbidden ' + d.toString() )
                                        process.exit(1)
                                    }
                                    var _r = JSON.parse(body.substr(p + key.length, (f - p - key.length) + 1).replace('+ 100000000', ''))
                                    _r.JuridicId = 0

                                    //console.log(" Primer Paso OK ")
                                    var T_json = (f > 0) ? _r : null

                                    if (T_json != null && _r != null) {

                                        var url = options.uri + '/' + type + '/Relaciones/' + _r.Id
                                        var curl = require('../_curl.js')(url)

                                        curl.nav('Empresas\\Relaciones', function ( body) {
                                            if (body == null) {
                                                console.log(url + ' -> err: body NULL')
                                                options.Actualize(options, type)
                                            } else {
                                                if (body.toString().indexOf('<') == -1) {
                                                    var _relA = JSON.parse(body.replace(/'/g, "´"))
                                                    var _Nodes = JSON.stringify(_relA.Nodes)
                                                } else {
                                                    _r.JuridicId = _r.Id
                                                    _r.Name = _r.Name.replace(/\n/g, "").replace(/'/g, "´")
                                                    //debugger
                                                }

                                                if ((_relA != null ? _relA.Nodes.length > 0 : false) && _r.PersonId != null) {
                                                    //console.print(" Segundo Paso OK : get Relaciones ")
                                                    _r.JuridicId = 0
                                                    url = options.uri + '/Empresa/Relaciones/' + _relA.Nodes[0].CompanyId
                                                    requestOptions = { encoding: 'UTF-8', timeout: 120000, method: "GET", uri: url };
                                                    options.request.get(requestOptions, function (req, res, body) {
                                                        try {
                                                            var _relB = JSON.parse(body)
                                                            for (i in _relB.Nodes) {
                                                                if (_relB.Nodes[i].PersonId == _r.Id) {
                                                                    //console.log('CONSULTORA :' + _r.Name + '  ' + _relB.Nodes[i].JuridicId)
                                                                    _r.JuridicId = _relB.Nodes[i].JuridicId
                                                                }
                                                            }
                                                            //console.print(" Tercer Paso OK : get Juridic ID ")
                                                        } catch (err) {
                                                            x = 1
                                                            console.log(Turl + "-> err Juridic ID")
                                                        }

                                                        _r.Name = _r.Name.replace(/'/g, "´")

                                                        var _cadsql = 'INSERT INTO ' + type + ' (Id,Name,ActiveRelations,JuridicId,Nodes) VALUES (' + _r.Id + ',"' + _r.Name + '",' + _r.ActiveRelations + ',' + _r.JuridicId + ',\'' + _Nodes + '\')'
                                                        options.SQL.commands.insert(options, type, _cadsql)
                                                        console.log(Turl + " ->" + _r.Name + " -> OK")

                                                        //_r.JuridicId = 0
                                                    })
                                                } else {
                                                    if (_relA != null) {

                                                        for (i in _relA.Nodes) {
                                                            //debugger
                                                            if (_relA.Nodes[i].PersonId > 0) {
                                                                var _pi = _relA.Nodes[i].PersonId + ""
                                                                _pi = _pi.length>6?_pi.substr(_pi.length-7,7)*1:_pi*1

                                                                var _cadsql = "SELECT count(*),"+i+" as i,"+_pi+" as Id, Nodes,name,ActiveRelations FROM Directivo WHERE ? "
                                                                options.SQL.db.query(_cadsql, { Id: _pi }, function (err, _record) {
                                                                    if (_record[0]['count(*)'] > 0) {
                                                                        var _nodes = JSON.parse(_record[0].Nodes)
                                                                        _r.Name = _r.Name.replace(/\n/g, "").replace(/'/g, "´")
                                                                        _nodes.push(_r)
                                                                        var _cadsql = 'UPDATE Directivo SET ActiveRelations= ActiveRelations + 1, Nodes=\'' + JSON.stringify(_nodes )+ '\' WHERE ?'
                                                                        options.SQL.db.query(_cadsql, { Id: _record[0].Id }, function (err, record) {
                                                                            X = _record[0].Id
                                                                            p=_r
                                                                            if(err)
                                                                                debugger
                                                                        })
                                                                    } else {

                                                                        //[{"Id": 5, "Name": "INDUSTRIAS VITORIA ZIP SA", "Type": 1, "Roles": "Socio Único (Activo) - Adm. Unico (Inactivo)", "Active": 1, "PersonId": 0, "CompanyId": 5, "JuridicId": 0, "ActiveRelations": 0}]
                                                                        var _Nodes = [_r]
                                                                        _Nodes[0].Roles = _relA.Nodes[_record[0].i].roles
                                                                        var _params = {
                                                                            Id: _record[0].Id,
                                                                            Name: _relA.Nodes[_record[0].i].Name.replace(/\n/g, "").replace(/'/g, "´"),
                                                                            ActiveRelations: 1,
                                                                            JuridicId: _relA.Nodes[_record[0].i].JuridicId,
                                                                            Nodes: '[' + JSON.stringify(_Nodes[0]) + ']'
                                                                        }
                                                                        //debugger
                                                                        console.log(_params.Id + ' -> ' + _params.Name)
                                                                        var _cadsql = "INSERT INTO Directivo SET ?"
                                                                        options.SQL.db.query(_cadsql, _params)
                                                                    }
                                                                })
                                                            }
                                                        }

                                                        var _cadsql = 'INSERT INTO ' + type + ' (Id,Name,ActiveRelations,JuridicId,Nodes) VALUES (' + _r.Id + ',"' + _r.Name + '",' + _r.ActiveRelations + ',' + _r.JuridicId + ',\'' + _Nodes + '\')'
                                                        options.SQL.commands.insert(options, type, _cadsql)
                                                        console.log(Turl + ' '+ _r.Name + " -> OK")
                                                    } else {
                                                        var _cadsql = 'INSERT INTO ' + type + ' (Id,Name,ActiveRelations,JuridicId,Nodes) VALUES (' + _r.Id + ',"' + _r.Name + '",' + _r.ActiveRelations + ',' + _r.JuridicId + ',"[]")'
                                                        options.SQL.commands.insert(options, type, _cadsql)

                                                        console.log(Turl + " -> err Get Relaciones")
                                                        //_this.Actualize(type)
                                                    }
                                                }
                                            }
     
                                        })  
                                    } else {
                                        console.log('error in parse ' + url)
                                        //debugger
                                        //app._xData.VisualCif[type]++
                                        options.Actualize( options, type)
                                    }
                                } catch (err) {
                                    // debugger
                                    console.log(Turl + ' -> err: get fail')
                                    //app._xData.VisualCif[type]++
                                    options.Actualize(options, type)
                                }
                            //})
                        })//.end()
                    } else {
                        //app._xData.VisualCif[type]++
                        options.Actualize(options, type)
                    }

                })
            })
            //}
        }
    }

    app.commonSQL.init(options, drop, 'RELACIONES', callback)
}