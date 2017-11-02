module.exports = function (app) {

    return {
        SQL: {
            db:null
        },
        io: function () {
            var _this = this
            return {
                setmark: function (iodata, socket) {
                    var _cadsql = 'UPDATE borme_' + iodata.Type + ' SET Mark=' + iodata.value + ' WHERE Id=' + iodata.Id
                    _this.SQL.db.query(_cadsql, function (err, records) {
                        //debugger
                        var _cadsql = 'SELECT * FROM borme_directivo WHERE ActiveRelations>100 or Mark>0 order by ActiveRelations DESC'
                        _this.SQL.db.query(_cadsql, function (err, rows) {
                            app._xData.VisualCif.Ranking.Directivos = rows
                            app.io.emit('lst_cif', { data: app._xData })
                        })
                    })
                },
                getTrama: function (iodata, socket) {
                    _this.db.Relations.find({ idTrama: iodata.value }, function (err, trama) {
                        socket.emit('visual_cif', { command: iodata.command, Trama: trama[0] })
                    })
                },
                saveTrama: function (iodata, socket) {
                    //debugger
                    _db = _this.db
                    _db.Relations.find({ idTrama: iodata.idTrama }, function (err, trama) {
                        if (trama.length == 0) {
                            _db.Relations.insert({ idTrama: iodata.idTrama, Nodes: iodata.data.Nodes[0] }, function (err, newDoc) {
                                for (n in iodata._lst.Directivo) {
                                    _db.CajaNegra.Directivo.insert(iodata._lst.Directivo[n])
                                }
                                for (n in iodata._lst.Empresa) {
                                    _db.CajaNegra.Empresa.insert(iodata._lst.Empresa[n])
                                }
                                socket.emit('visual_cif', { command: iodata.command, error: err, newDoc: newDoc })
                            })
                        } else {
                            socket.emit('visual_cif', {
                                command: iodata.command,
                                error: 'el titulo ya existe'
                            })
                        }

                    })

                },
                getEntramado: function (iodata, xbody, url, socket) {
                    OficialDocs = function (iodata, data, i, callback) {
                        data.Nodes[i].BOE = 0
                        data.Nodes[i].BOCM = 0

                        if (data.Nodes[i].Type == 1) {
                            var _cadsql = "SELECT nBOE,nBOCM FROM borme_empresa WHERE Id =" + data.Nodes[i].Id // + "%'"
                            console.log(_cadsql)
                            _this.SQL.db.query(_cadsql, function (err, record) {
                                if (err)
                                    debugger
                                if (record.length > 0) {
                                    data.Nodes[i].BOE = record[0].nBOE
                                    data.Nodes[i].BOCM = record[0].nBOCM
                                }
                                i++
                                if (i < data.Nodes.length) {
                                    OficialDocs(iodata, data, i, callback)
                                } else {
                                    callback(iodata, data)
                                }

                            })
                        }

                    }

                    try {
                        var data = JSON.parse(xbody)
                        OficialDocs(iodata, data, 0, function (iodata, data) {
                            socket.emit('visual_cif', { command: iodata.command, Id: iodata.Id, level: iodata.level, Type: iodata.Type, Nodes: data, tree: iodata.tree, req: url, exclude: false })
                        })
                    } catch (err) {
                        socket.emit('visual_cif', { error: true, req: url, iodata: iodata })
                    }
                },
                getRelationsAuto: function (iodata, body, url, socket) {
                    this.getRelations(iodata, body, url, socket, function (url, iodata, Nodes) {
                        iodata.i++
                        socket.emit('visual_cif', { lst: iodata.lst, command: iodata.command, Id: iodata.Id, level: iodata.level, Type: iodata.Type, Nodes: Nodes, tree: iodata.tree, req: url, i: iodata.i++, exclude: false })
                    })
                },
                getRelations: function (iodata, body, url, socket, callback) {
                    var get = function (iodata, url, data, n, _callback, exit) {
                        if (n < data.Nodes.length) {
                            var item = data.Nodes[n]
                            if (item.Type == 1) {
                                var _cadsql = "SELECT nBOE,nBOCM FROM borme_empresa WHERE Id =" + item.CompanyId
                                console.log(_cadsql)
                                app.VisualCif.SQL.db.query(_cadsql, function (err, record) {
                                    if (err)
                                        debugger
                                    if (record.length > 0) {
                                        data.Nodes[n].BOE = record[0].nBOE
                                        data.Nodes[n].BOCM = record[0].nBOCM
                                    }

                                    app.VisualCif.db.CajaNegra.Empresa.find({ Id: item.CompanyId + "" }, function (err, docs) {
                                        if (docs.length > 0) {
                                            data.Nodes[n].Sospechoso = docs
                                        }
                                        n++
                                        _callback(iodata, url, data, n, _callback, exit)
                                    })
                                })
                            } else {
                                cadsql = 'Select * From borme_directivo WHERE Id=' + item.PersonId
                                app.VisualCif.SQL.db.query(cadsql, function (err, record) {
                                    //debugger
                                    if (record.length > 0) {
                                        item.ActiveRelations = record[0].ActiveRelations
                                        item.RankingTop = record[0].Mark


                                        n++
                                        _callback(iodata, url, data, n, _callback, exit)


                                    } else {
                                        app.VisualCif.db.CajaNegra.Directivo.find({ Id: item.PersonId + "" }, function (err, docs) {
                                            if (docs.length > 0) {
                                                data.Nodes[n].Sospechoso = docs
                                            }
                                            n++
                                            _callback(iodata, url, data, n, _callback, exit)
                                        })
                                    }

                                })
                            }
                        } else {
                            exit(url, iodata, data.Nodes)
                        }
                    }
                    if (callback == null)
                        var callback = function (url, iodata, Nodes) {
                            //debugger
                            socket.emit('visual_cif', { command: iodata.command, Id: iodata.Id, level: iodata.level, Type: iodata.Type, Nodes: Nodes, tree: iodata.tree, req: url, exclude: false })
                        }
                    try {
                        var data = JSON.parse(body)
                        get(iodata, url, data, 0, get, callback)
                    } catch (err) {
                        socket.emit('visual_cif', { error: true, req: url, iodata: iodata })
                    }
                },
                search: function (iodata, body, url, socket) {
                    const $ = app.cheerio.load(body)
                    var content = $('#searchresults li a')
                    var _links = []


                    var get = function (iodata, content, n, _links, _callback, _exit) {

                        if (n < content.length) {
                            var url = $(content[n]).attr('href')
                            if (url != null) {
                                var Name = $(content[n]).html()
                                var link = {
                                    val: Name,
                                    link: url,
                                    type: url.split('/')[1],
                                    ID: url.split('/')[2]
                                }
                                if (link.type == 'Empresa') {
                                    if (iodata.tab == 'cuarto/c') {
                                        n++
                                        _callback(iodata, content, n, _links, _callback, _exit)
                                    } else {
                                        var _Empresa = link.val.toLowerCase() //.replace(/ sa /g," s.a.").replace(/ sl /g, " s.l.")
                                        var _cadsql = "SELECT nBOE,nBOCM FROM borme_empresa WHERE Id = " + link.ID
                                        console.log(_cadsql)
                                        app.VisualCif.SQL.db.query(_cadsql, function (err, record) {
                                            console.log(err, _cadsql)
                                            if (err)
                                                debugger
                                            if (record.length > 0) {
                                                link.BOE = record[0].nBOE
                                                link.BOCM = record[0].nBOCM
                                            }
                                            app.VisualCif.db.CajaNegra.Empresa.find({ Id: link.ID + "" }, function (err, docs) {
                                                if (docs.length > 0) {
                                                    link.Sospechoso = docs
                                                }
                                                _links[_links.length] = link
                                                n++
                                                _callback(iodata, content, n, _links, _callback, _exit)
                                            })
                                        })
                                    }
                                } else {
                                    cadsql = 'Select * From borme_directivo WHERE Id=' + link.ID
                                    app.VisualCif.SQL.db.query(cadsql, function (err, record) {
                                        //debugger
                                        if (record.length > 0) {
                                            link.ActiveRelations = record[0].ActiveRelations
                                            if (link.ActiveRelations > 100) {
                                                link.RankingTop = record[0].mark
                                                link.Sospechoso = true
                                                if (iodata.tab != 'cuarto/c') {
                                                    _links[_links.length] = link
                                                }
                                                n++
                                                _callback(iodata, content, n, _links, _callback, _exit)
                                            } else {
                                                app.VisualCif.db.CajaNegra.Directivo.find({ Id: link.ID + "" }, function (err, docs) {
                                                    if (docs.length > 0) {
                                                        link.Sospechoso = docs
                                                    }

                                                    _links[_links.length] = link
                                                    n++
                                                    _callback(iodata, content, n, _links, _callback, _exit)

                                                })
                                            }
                                        } else {
                                            app.VisualCif.db.CajaNegra.Directivo.find({ Id: link.ID + "" }, function (err, docs) {
                                                if (docs.length > 0) {
                                                    link.Sospechoso = docs
                                                }

                                                _links[_links.length] = link
                                                n++
                                                _callback(iodata, content, n, _links, _callback, _exit)

                                            })
                                        }
                                    })
                                }
                            }
                        } else {
                            //debugger
                            _exit(iodata, _links)
                        }
                    }
                    get(iodata, content, 0, _links, get, function (iodata, _links) {
                        socket.emit('visual_cif', { command: iodata.command, lst: _links, tab: iodata.tab })
                    })
                }
            }
        },
        callOut: function (iodata,socket) {
            if (iodata.command == 'search') {
                if (!app.semaforo.Relaciones && iodata.value.length>3 ) {
                    app.semaforo.Relaciones=true
                    app.SQL.db.query('CALL GetSearchLst(?)', [iodata.value], function (err, recordset) {
                       
                        var _links = []
                        //for (p in recordset) {
                        //    if (p < 2)
                        if(err==null)
                                for (n in recordset[0]) {
                                    //console.log(recordset[p][n])
                                    _links[_links.length] = {
                                        ID: recordset[0][n].Id,
                                        EmpresaId:  recordset[0][n].Id ,
                                        PersonId: 0,
                                        Name: recordset[0][n].name,
                                        Type: 1,
                                        BOE: recordset[0][n].nBOE,
                                        BOCM: recordset[0][n].nBOCM,
                                        ActiveRelations: recordset[0][n].ActiveRelations,
                                        type:  'Empresa', //: 'Directivo',
                                        val: recordset[0][n].name,
                                    }
                                }
                        //}
                        app.semaforo.Relaciones = false
                        socket.emit('relaciones', { command: iodata.command, lst: _links, tab: iodata.tab })
                    })
                }
            }
            if (iodata.command == 'getRelations' ) {
                this.getRelations(iodata.command, iodata.Type, iodata.id, iodata.level, iodata.tree, socket)
            }
            if (iodata.command == 'getRelationsAuto') {
                //debugger
                //for (_n in iodata.lst) {
               //     var lst = iodata.lst[n].split("_")
                this.getRelations(iodata.command, iodata.Type, iodata.Id, iodata.level, iodata.tree, socket, iodata.step , iodata.steps)
                //}
            }
        },
        getRelations: function (command, Type, id, level, tree, socket, gr, tgr) {
            var last = gr==tgr
            var _this = this
            this.SQL.db.query('CALL GetRelations(?,?)', [Type, id], function (err, recordset) {
                var x = id
                var s = Type
                if (err)
                    debugger
                if (recordset.length == 0)
                    debugger
                if (recordset[0].length == 0) {
                    app.request('http://terminator1.ingoberlab.net/vsf/' + Type + '/Relaciones/' + id, '', function (err, res, body) {
                        if (err == null) {
                            var data = JSON.parse( body.replace(/\'/g, "") )
                            var CadSql = "UPDATE borme_" + Type.toLowerCase() + " SET ActiveRelations=" + data.Nodes.length + " WHERE Id=" + id
                            _this.SQL.db.query(CadSql, function (err, recordset) {
                                var CadSql = "INSERT INTO borme_relations_" + Type.toLowerCase() + " (id" + Type.toLowerCase() + ",Nodes) VALUES (" + id + " , ? )"
                                //var params = { Nodes: data }
                                //params['id'+type] = id
                                _this.SQL.db.query(CadSql, body.replace(/\'/g, ""), function (err, data) {
                                    if (err)
                                        debugger
                                    _this.getRelations(command, Type, id, level, tree, socket, gr, tgr)
                                })
                            })
                        }
                    })
                } else {
                    var data = JSON.parse(recordset[0][0].Nodes)
                    data.Id = x
                    if (data.Nodes.length == 0) {
                        debugger
                        socket.emit('relaciones', { command: command, Id: id, Nodes: data.Nodes, Type: Type, level: level, tree: tree, last: last })
                    } else {
                        if (Type == 'Empresa') {
                            var search = function (e, list, _ret, db, search, command, Type, level, callback) {
                                _this = this

                                if (list[e] == null)
                                    debugger

                                var roles = list[e].Roles
                                var id = list[e].Id - 100000000
                                var ActiveRelations = list[e].ActiveRelations
                                var JuridicId = list[e].JuridicId
                                var e = e + 1
                                cadsql = "SELECT " + data.Id + " as _id, " + e + " as e,'" + roles + "' as Roles,directivo.Name," + ActiveRelations + " as ActiveRelations," + JuridicId + " as JuridicId, directivo.Mark, directivo.Id FROM borme_directivo WHERE id=" + id
                                db.query(cadsql, function (err, recordset) {
                                    if (err) {
                                        x = cadsql
                                        debugger
                                    }
                                    if (recordset.length == 0) {
                                        debugger
                                        _reg = { Id: 0, Nodes: [], Links: ['sin relaciones'] }
                                    } else {
                                        _reg = { Id: recordset[0].Id, Type: (Type == 'Directivo' ? 1 : 2), Name: recordset[0].Name, PersonId: recordset[0].Id, CompanyId: 0, ActiveRelations: recordset[0].ActiveRelations, Roles: recordset[0].Roles, Mark: recordset[0].Mark, JuridicId: recordset[0].JuridicId }
                                    }

                                    socket.emit('relaciones', { command: 'setDataTree', e: gr, te: tgr, from: recordset[0].e, total: list.length , Id: recordset[0]._id, Nodes:[_reg] , Type: Type, level: level, tree: tree, last: last == null ? true : last })

                                    _ret[_ret.length] = _reg

                                    if (list.length == _ret.length) {
                                        data.Nodes = _ret
                                        if(callback!=null)
                                            callback(command, data, Type, level)
                                    } else {
                                        if (recordset[0] == null) {
                                            debugger
                                            if(callback!=null)
                                                callback(command, data, Type, level)
                                        } else {
                                            search(recordset[0].e, list, _ret, db, search, command, Type, level, callback)
                                        }
                                    }
                                })
                            }
                            //debugger
                            search(0, data.Nodes, [], _this.SQL.db, search, command, Type, level) //, function (command, data, Type, level) {
                                //socket.emit('relaciones', { command: command, Id: id, Nodes: data.Nodes, Type: Type, level: level, tree: tree, last: last == null ? true : last })
                            //})
                        } else {
                            var search = function (r, e, list, _ret, db, search, command, Type, level, callback) {
                                console.log(e)
                                //var list = data.Nodes
                                //var roles = list[e].Roles
                                var id = list[e].Id

                                var JuridicId = list[e].JuridicId
                                //var e = e + 1
                                cadsql = "select *,"+ e +" as e from empresa where id =" + id
                                db.query(cadsql, function (err, recordsetEmpresa) {
                                    if (err) {
                                        x = cadsql
                                        debugger
                                    }
                                    if (recordsetEmpresa.length == 0) {
                                        debugger
                                    }else{
                                        //cadsql = "SELECT " + r + " as _id, " + e + " as e,'' as Roles, Name, ActiveRelations, Mark, Id FROM empresa WHERE Id=" + id
                                        //console.log("*" + r)
                                        var _reg = { Id: r, Type: (Type == 'Directivo' ? 1 : 2), Name: recordsetEmpresa[0].Name, PersonId: 0, CompanyId: recordsetEmpresa[0].Id, JuridicId: 0, ActiveRelations: recordsetEmpresa[0].ActiveRelations, Mark: recordsetEmpresa[0].Mark, nBOE: recordsetEmpresa[0].nBOE, nBOCM: recordsetEmpresa[0].nBOCM }
                                        socket.emit('relaciones', { command: 'setDataTree', e: gr, te: tgr, from: recordsetEmpresa[0].e+1, total: list.length, Id: r, Nodes: [_reg], Type: Type, level: level, tree: tree, last: last == null ? true : last })

                                        //db.query(cadsql, function (err, recordset) {
                                            if (err) {
                                                x = cadsql
                                                debugger
                                            }
                                            if (recordset.length == 0) {
                                                debugger
                                                var _reg = { Id: 0, Nodes: [], Links: ['sin directivo'] }
                                            } else {
                                            }

                                            _ret[_ret.length] = _reg


                                            if (list.length == _ret.length) {
                                                data.Nodes = _ret
                                                if (callback != null)
                                                    callback(command, data, Type, level)
                                            } else {
                                                if (recordset[0] == null) {
                                                    if (callback != null)
                                                        callback(command, data, Type, level)
                                                } else {
                                                    e = e+1
                                                    search(r, e, list, _ret, db, search, command, Type, level, callback)
                                                }
                                            }
                                        //})
                                    }
                                })
                                var _exit = 1
                            }
                            search( data.Id,0, data.Nodes, [], _this.SQL.db, search, command, Type, level) //, function (command, data, Type, level) {
                            //    socket.emit('relaciones', { command: command, Id: id, Nodes: data.Nodes, Type: Type, level: level, tree: tree, last: last })
                            //})
                        }
                    }
                }
                
            })
        }
    }
}