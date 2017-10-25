module.exports = function (app) {

    return {
        BORME: {
            commands: {
                getLst: function (app, _this, callback) {
                    var _r = { Directivo: null, Empresa: null }
                    app.VisualCif.SQL.commands.sendLst(app, app.VisualCif, 1, function (app, _this, data) {
                        _r.Empresa = data
                        app.VisualCif.SQL.commands.sendLst(app, app.VisualCif, 2, function (app, _this, data) {
                            _r.Directivo = data
                            app.VisualCif.db.Relations.find({}, function (err, tramas) {
                                _r.trama = tramas
                                callback(app, _this, _r)
                            })

                        })
                    })

                },
                sendLst: function (app, _this, type, _callback) {
                    if (type == 2) {
                        _cadsql = 'SELECT * FROM Directivo WHERE ActiveRelations>100 or Mark>0 order by ActiveRelations DESC'
                        _this.SQL.db.query(_cadsql, function (err, Directivos) {
                            if (err) {
                                debugger
                            }
                            _callback(app, _this, Directivos)
                            //app.io.emit('lst_cif', { Directivo: Directivos, Empresa: null })
                            console.log('SEND Lista Directivos')
                        })
                    } else {
                        _cadsql = 'SELECT * FROM Empresa order by nBOE DESC LIMIT 100'
                        _this.SQL.db.query(_cadsql, function (err, BOE) {
                            if (err)
                                debugger
                            _cadsql = 'SELECT * FROM Empresa order by nBOCM DESC LIMIT 100'
                            _this.SQL.db.query(_cadsql, function (err, BOCM) {
                                if (err)
                                    debugger

                                //debugger
                                _callback(app, _this, { BOE: BOE, BOCM: BOCM })
                                //app.io.emit('lst_cif', { Directivo: null, Empresa: Empresas })
                                console.log('SEND Lista Empresas')
                            })
                        })
                    }
                }
            }
        },
        BOE: {
            commands: {
                io: {
                    count: function (_key, _callback) {
                        var CadSqlTipo_BOE = ""
                        var CadSqltramite = ""
                        if (_key.filters != null) {
                            //CadSqlTipo_BOE = "("
                            for (k in _key.filters.Tipo_BOE) {
                                CadSqlTipo_BOE = CadSqlTipo_BOE + (CadSqlTipo_BOE.length > 1 ? " OR " : "") + " BOE.Tipo_BOE LIKE '%" + _key.filters.Tipo_BOE[k] + "%'"
                            }
                            //CadSqlTipo_BOE = CadSqlTipo_BOE + ")"

                            //CadSqltramite = "("
                            for (k in _key.filters.tramite) {
                                CadSqltramite = CadSqltramite + (CadSqltramite.length > 1 ? " OR " : "") + " BOE.Tipo_TRAMITE LIKE '%" + _key.filters.tramite[k] + "%'"
                            }
                            //CadSqltramite = CadSqltramite + ")"
                        }

                        var _cadsql = "SELECT count(*) FROM BOE INNER JOIN Strings ON BOE.BOE = Strings.BOE WHERE LOWER(_keys) Like '%" + _key.key + "%' " + (CadSqlTipo_BOE.length > 0 ? " AND (" + CadSqlTipo_BOE + ")" : "") + (CadSqltramite.length > 0 ? " AND (" + CadSqltramite + ")" : "")
                        //console.log(cadsql)
                        app.Boe.SQL.db.query(_cadsql, function (err, rows) {
                            //debugger
                            app.SQL.getLsts(app, _key, function (err, lst, data) {
                                //app.io.emit('total', { data: app._xData, rows: lst })
                                _callback(err, { lsts: lst, data: rows })
                            })
                        })
                        //this.ejec(cadsql, callback)
                    },
                    get: function (key, callback) {
                        var CadSqlTipo_BOE = ""
                        var CadSqltramite = ""
                        if (key.filters != null) {
                            //CadSqlTipo_BOE = "("
                            for (k in key.filters.Tipo_BOE) {
                                CadSqlTipo_BOE = CadSqlTipo_BOE + (CadSqlTipo_BOE.length > 1 ? " OR " : "") + " BOE.Tipo_BOE LIKE '%" + key.filters.Tipo_BOE[k] + "%'"
                            }
                            //CadSqlTipo_BOE = CadSqlTipo_BOE + ")"

                            //CadSqltramite = "("
                            for (k in key.filters.tramite) {
                                CadSqltramite = CadSqltramite + (CadSqltramite.length > 1 ? " OR " : "") + " BOE.Tipo_TRAMITE LIKE '%" + key.filters.tramite[k] + "%'"
                            }
                            //CadSqltramite = CadSqltramite + ")"
                        }

                        var cadsql = "SELECT BOE.BOE, BOE.Tipo_BOE, BOE.Tipo_TRAMITE, BOE.TEXTO, BOE.PDF, Strings._keys,  Strings.Importes , Contratos.precio, Contratos.adjudicador, Contratos.ambito_geografico, Contratos.materias FROM BOE INNER JOIN Strings ON BOE.BOE = Strings.BOE INNER JOIN Contratos ON Contratos.BOE = BOE.BOE  WHERE LOWER(_keys) Like '%" + key.key + "%' " + (CadSqlTipo_BOE.length > 0 ? " AND (" + CadSqlTipo_BOE + ")" : "") + (CadSqltramite.length > 0 ? " AND (" + CadSqltramite + ")" : "") + " order by BOE.BOE"
                        console.log(cadsql)
                        this.ejec(cadsql, callback)
                    },
                    getDoc: function (key, callback) {
                        var cadsql = "SELECT * FROM BOE INNER JOIN Contratos ON Contratos.BOE = BOE.BOE  WHERE BOE.BOE = '" + key.key + "' order by BOE.BOE"
                        this.ejec(cadsql, callback)
                    },
                    ejec: function (cadsql, callback) {
                        app.Boe.SQL.db.query(cadsql, function (err, rows) {
                            callback(err, rows)
                        })
                    }
                },
                insert: {
                    sumario: function (data, callback) {
                        var next = "BOE-S-" + data.next.substr(6, 4) + data.next.substr(3, 2) + data.next.substr(0, 2)
                        var boesumariosql = "SELECT * FROM SUMARIOS_BOE WHERE  BOE='" + data.id + "'"

                        app.Boe.SQL.db.query(boesumariosql, function (err, rows) {
                            if (err)
                                console.log(err, boesumariosql)
                            if (rows != null) {
                                if (rows.length == 0) {
                                    var cadsql = "INSERT INTO SUMARIOS_BOE (BOE,SUMARIO_NEXT) VALUES ( '" + data.id + "', '" + next + "')"
                                    app.Boe.SQL.db.query(cadsql, function (err, records) {
                                        if (err)
                                            debugger

                                        app._xData.TSUMARIOS.BOE++
                                        callback(data)
                                    })
                                } else {
                                    console.log(err, boesumariosql)
                                    callback({ error: true, SUMARIO_NEXT: rows[0].SUMARIO_NEXT })
                                }
                            } else {
                                console.log(err, boesumariosql)
                                callback({ error: true })
                            }
                        })
                    },
                    BOE: function (app, _analisis, data, callback) {
                        var boecadsql = "SELECT * FROM BOE WHERE  BOE='" + _analisis._BOE + "'"
                        var boecadsqlINSERT = "INSERT INTO BOE (SUMARIO,BOE,Tipo_BOE,Tipo_TRAMITE, Texto, pdf) VALUES ('" + data.id + "','" + _analisis._BOE + "','" + app.Rutines().getCleanedString(_analisis._type) + "','" + app.Rutines().getCleanedString(_analisis._tramitacion) + "','" + data.textExtend.join("<br>").replace(/'/g, '') + "','" + _analisis.urlPdf + "')"
                        app.Boe.SQL.db.query(boecadsql, function (err, rows) {
                            if (err)
                                console.log(err, boecadsql)
                            if (rows != null) {
                                if (rows.length == 0) {
                                    app.Boe.SQL.db.query(boecadsqlINSERT, function (err, irows) {
                                        if (err == null) {
                                            app._xData.TBOE++
                                            callback(_analisis, data)
                                        } else {
                                            debugger
                                            console.log(err, boecadsqlINSERT)
                                        }

                                    })
                                }
                            } else {
                                callback(_analisis, data)
                            }
                        })
                    }

                },
                getLsts: function (key, callback) {
                    var _this = {}

                    var cadsql_Tramite = 'SELECT DISTINCT Tipo_TRAMITE  FROM BOE INNER JOIN  Strings ON BOE.BOE = Strings.BOE WHERE length(Tipo_Tramite)-length(replace(Tipo_Tramite," " ,""))=0 AND length(replace(Tipo_Tramite," " ,""))>0 '
                    var cadsql_BOE = 'SELECT DISTINCT Tipo_BOE FROM BOE INNER JOIN  Strings ON BOE.BOE = Strings.BOE'

                    if (key.key != null) {
                        var cadsql_Tramite = 'SELECT DISTINCT Tipo_TRAMITE  FROM BOE INNER JOIN  Strings ON BOE.BOE = Strings.BOE WHERE length(Tipo_Tramite)-length(replace(Tipo_Tramite," " ,""))=0 AND length(replace(Tipo_Tramite," " ,""))>0 AND Strings._keys LIKE \'%' + key.key + '%\''
                        var cadsql_BOE = 'SELECT DISTINCT Tipo_BOE  FROM BOE INNER JOIN  Strings ON BOE.BOE = Strings.BOE WHERE Strings._keys LIKE \'%' + key.key + '%\''
                    }
                    //app.Boe.SQL.db.query
                    app.Boe.SQL.db.query(cadsql_Tramite, function (err, data) {
                        app._lData.LTramite = []
                        for (e in data) {
                            if (data[e].Tipo_TRAMITE.length > 0)
                                if (data[e].Tipo_TRAMITE != null)
                                    app._lData.LTramite[app._lData.LTramite.length] = app.Rutines().getCleanedString(data[e].Tipo_TRAMITE)
                        }
                        app.Boe.SQL.db.query(cadsql_BOE, function (err, data) {
                            app._lData.LTipoBOE = []
                            for (e in data) {
                                if (data[e].Tipo_BOE != null)
                                    app._lData.LTipoBOE[app._lData.LTipoBOE.length] = app.Rutines().getCleanedString(data[e].Tipo_BOE)
                            }
                            if (callback != null) {
                                callback(err, { tipo: app._lData.LTipoBOE, tramite: app._lData.LTramite }, key)
                                //callback(err, { tipo: app._lData.LTipoBOE, tramite:[] }, key)
                            } else {
                                //_this = { tipo: app._lData.LTipoBOE, tramite: app._lData.LTramite }
                                _this = { tipo: [], tramite: [] }
                            }
                        })
                    })
                }
            }
        }
    }
}