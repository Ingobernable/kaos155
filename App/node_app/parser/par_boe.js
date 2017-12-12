module.exports = function (app, callback) {

    var options = {
        Command: app.command,
        Rutines: require('../_utils/BOLETIN/__Rutines.js')(app),
        transforms: require('../_utils/BOLETIN/__Transforms.js')(app),
        _common: require('../_common.js')(app),
        SQL: {
            db: null,
            insert: function (options, _analisis, data, callback) {
                var i = isNaN(data.importe * 1) ? 0 : data.importe * 1


                var params = [

                        data.id.substr(12, 2),                                      //Dia
                        data.id.substr(10, 2),                                      //Mes
                        data.id.substr(6, 4),                                       //Anyo
                        data.id,                                                    //SUMARIO
                        _analisis._BOLETIN.split("=")[1],                               //BOE
                        app.Rutines(app).getCleanedString(_analisis._type),         //Tipo_BOE
                        app.Rutines(app).getCleanedString(_analisis._tramitacion.split(" ")[0]),  //Tipo_TRAMITE
                        app.Rutines(app).getCleanedString(_analisis._objeto),       //Objeto del contrato

                        _analisis.urlPdf,                                           //PDF                                                           
                        data.textExtend.join("<br>").replace(/\r/g, "").replace(/'/g, "\'"),             //Texto

                        data.contratista != null ? data.contratista.replace(/\r/g, "").replace(/'/g, "\'") : null,          //_keys
                        data.importe.indexOf(";") == -1 ? i.toFixed(2) : data.importe
                        //''.Trim(data.importe.replace(/\n/g, "").replace(/'/g, '') ) //Importes
                ]
                var _ing = ""
                for (i in data.extra) {
                    _ing = _ing + ",?"
                    params[params.length] = data.extra[i].replace(/'/g, "").replace(/\r/g, "").replace(/\n/g, "")
                }

                //if (data.contratista.split(';').length > 1)
                //    debugger
                //cadsql = "select id from empresa where Name ='" + data.contratista.split(';')[0] + "'"
                //options.SQL.db.query(cadsql, function (err, recordEmpresa) {
                //if (err != null) {
                //debugger
                //  params.idEmpresa = 0
                //} else {
                //        params.idEmpresa = recordEmpresa.length>0 ? recordEmpresa[0].id : 0
                //}
                data.extra.materias = data.extra.materias + (data.extra.materias_cpv.length > 0 && data.extra.materias.length > 0 ? ";" : '') + data.extra.materias_cpv
                options.SQL.db.query('Call Insert_Data_BOE(' + data.textExtend.length + ',' + data.contratista.split(';').length + ',' + data.extra.materias.split(';').length + ",'" + data.type + "',?,?,?,?,?,?,?,?,?,?,?,?" + _ing + ')', params, function (err, record) {
                    if (err != null) {
                        debugger
                        cadSql = "INSERT INTO errores (BOLETIN, SqlError) VALUES (?,?)"
                        options.SQL.db.query(cadSql, [_analisis._BOLETIN.split("=")[1], err.sqlMessage.replaceAll("'", "/'")], function (err2) {
                            var x = err
                            var y = params
                            callback(data)
                        })
                    } else {
                        //debugger
                        // for (n in record) {
                        //     if (record[n][0] != null)
                        //         if (record[n][0].ID != null)
                        //             options.SQL.db.query('Update boletin_contratos SET Id_Empresa = (SELECT id FROM empresa WHERE empresa.Name = boletin_contratos.Empresa) WHERE id=' + record[n][0].ID, function (err3) {
                        //                 if (err3 != null)
                        //                    debugger
                        //            })
                        // }
                        callback(data)
                    }
                    //debugger

                })
                //})



            },
        },
        parser: {
            Preceptos: function (type) {
                var consulta = function (type, callback) {
                    options.SQL.scrapDb.query('call GetNextTextParser(?)', [type], function (err, record) {
                        callback(record)
                    })
                }

                consulta(type, function (record) {
                    if (record.length > 0) {
                        data = { codigo: record[0][0].BOLETIN, textExtend: record[0][0].texto.split("<br>"), extra: {} }
                        _analisis = JSON.parse(record[0][0].analisis)



                        if (data.textExtend.length > 0) {
                            var patterns = options.transforms.getPatern(options.transforms)
                            data.contratista = options.Rutines.extract(data.textExtend, 'contratista',

                                options.transforms.ADD(
                                    [patterns.General,
                                    patterns.Contratista,
                                    patterns.especialChars,
                                    patterns.exoticChars,
                                    patterns.specialContratista,
                                    [["F", { f: options.transforms.removeFirstChar }, ' '], ['R', new RegExp(/\./, "g"), ""]],

                                    ]))
                            if (data.contratista.length > 0) {
                                data.extra.adjudicador = options.Rutines.extract(data.textExtend, 'Organismo',
                                    options.transforms.ADD(
                                        [patterns.General,
                                        patterns.Contratista,
                                        [["F", { f: options.transforms.removeFirstChar }, ' ']]
                                        ]), true)

                                data.presupuesto = options.Rutines.extract(data.textExtend, 'Presupuesto base de licitaci�n',
                                    options.transforms.ADD(
                                        [patterns.General,
                                        patterns.Importes,
                                        [["F", { f: options.transforms.removeFirstChar }, ' ']]
                                        ]), true)

                                //data.presupuesto = options.Rutines.get.adaptImportes(data.presupuesto ,data)

                                for (_i in data.textExtend) {
                                    //console.log(_arrayText[i])
                                    if (data.textExtend[_i].toLowerCase() != null) {
                                        if (data.textExtend[_i].indexOf('.-') > -1) {
                                            data.extra.cargo = data.textExtend[_i].split(".-")[1].split(',')[0].replace(/\"/g, "")
                                            data.extra.firma = data.textExtend[_i].split(".-")[1].split(',').length > 1 ? ''.Trim(data.textExtend[_i].split(".-")[1].split(',')[1]) : ''
                                        }
                                    }
                                }
                                if (data.contratista.indexOf("#") == -1) {
                                    var _imp = options.Rutines.get.importes(data, options, patterns)
                                    data.importe = _imp
                                    if (data.importe == 0) {
                                        data.importe = ""
                                        for (_l in data.contratista.split(";")) {
                                            data.importe = data.importe + (data.importe.length > 0 ? ";" : "") + isNaN(data.presupuesto) ? "0.00" : data.presupuesto
                                        }
                                    }
                                } else {
                                    data.importe = ""
                                    var _e = data.contratista.split(";")
                                    data.contratista = ""

                                    for (_l in _e) {
                                        data.importe = data.importe + (data.importe.length > 0 ? ";" : "") + _e[_l].split("#")[1]
                                        data.contratista = data.contratista + (data.contratista.length > 0 ? ";" : "") + _e[_l].split("#")[0]
                                    }
                                }
                                _analisis._tramitacion = ''.Trim(options.Rutines.extract(data.textExtend, 'Tramitaci�n', options.transforms.General, true)).split(" ")[0]
                                _analisis._objeto = ''.Trim(options.Rutines.extract(data.textExtend, 'Descripci�n del objeto:', options.transforms.General, true))

                                //if(data.contratista.indexOf(' S')==-1)
                                //    debugger


                                if (data.contratista != null) {
                                    if (data.contratista.length > 0) {
                                        options.SQL.insert(options, _analisis, data, function (data) {
                                            callback(data)
                                        })
                                    } else {
                                        callback(data)
                                    }
                                } else {
                                    callback(data)
                                }
                            } else {

                                callback(data)
                            }

                        } else {
                            //debugger
                            callback(data)
                        }
                    } else {
                        setTimeout(function () {
                            debugger
                        }, 5000)
                    }
                })
                //app.Rutines(app).askToServer(app, { encoding: 'UTF-8', method: "GET", uri: options.url + urlDoc, agent: false }, data, function (app, body, data) {
                //var xcadsql = null
                contratos = function () {
                    var contratos = []
                    if (body != null) {

                        var $ = app.Rutines(app).XmlToDom(body)                 // convertimos el texto xml en objetos DOM
                        if ($('error').length == 0) {
                            data.codigo = options.Rutines.get.principal($)      // rescatamos las variables directas
                            var _analisis = options.Rutines.get.data(options, data)      //creamos la estructura con los datos principales
                            if (_analisis._type == null)
                                debugger

                            if (["BOE-B-2001-3002"].indexOf(_analisis._BOLETIN.split("=")[1]) > -1)
                                debugger

                            if (_analisis._type.indexOf('Adjudicaci�n') > -1 || _analisis._modalidad == "Formalizaci�n contrato") {
                                options.Rutines.get.p_parrafo(options, $, '.', body, function (_data) {
                                    if (_data != null) {
                                        data.extra = _data._extra
                                        //console.log(_extra)
                                        var textExtend = data.textExtend = _data._arr   // recojemos todo el texto en una array (con caracter final)
                                        if (data.textExtend.length > 0) {
                                            var patterns = options.transforms.getPatern(options.transforms)
                                            data.contratista = options.Rutines.extract(data.textExtend, 'contratista',

                                                options.transforms.ADD(
                                                    [patterns.General,
                                                    patterns.Contratista,
                                                    patterns.especialChars,
                                                    patterns.exoticChars,
                                                    patterns.specialContratista,
                                                    [["F", { f: options.transforms.removeFirstChar }, ' '], ['R', new RegExp(/\./, "g"), ""]],

                                                    ]))
                                            if (data.contratista.length > 0) {
                                                data.extra.adjudicador = options.Rutines.extract(data.textExtend, 'Organismo',
                                                    options.transforms.ADD(
                                                        [patterns.General,
                                                        patterns.Contratista,
                                                        [["F", { f: options.transforms.removeFirstChar }, ' ']]
                                                        ]), true)

                                                data.presupuesto = options.Rutines.extract(data.textExtend, 'Presupuesto base de licitaci�n',
                                                    options.transforms.ADD(
                                                        [patterns.General,
                                                        patterns.Importes,
                                                        [["F", { f: options.transforms.removeFirstChar }, ' ']]
                                                        ]), true)

                                                //data.presupuesto = options.Rutines.get.adaptImportes(data.presupuesto ,data)

                                                for (_i in data.textExtend) {
                                                    //console.log(_arrayText[i])
                                                    if (data.textExtend[_i].toLowerCase() != null) {
                                                        if (data.textExtend[_i].indexOf('.-') > -1) {
                                                            data.extra.cargo = data.textExtend[_i].split(".-")[1].split(',')[0].replace(/\"/g, "")
                                                            data.extra.firma = data.textExtend[_i].split(".-")[1].split(',').length > 1 ? ''.Trim(data.textExtend[_i].split(".-")[1].split(',')[1]) : ''
                                                        }
                                                    }
                                                }
                                                if (data.contratista.indexOf("#") == -1) {
                                                    var _imp = options.Rutines.get.importes(data, options, patterns)
                                                    data.importe = _imp
                                                    if (data.importe == 0) {
                                                        data.importe = ""
                                                        for (_l in data.contratista.split(";")) {
                                                            data.importe = data.importe + (data.importe.length > 0 ? ";" : "") + isNaN(data.presupuesto) ? "0.00" : data.presupuesto
                                                        }
                                                    }
                                                } else {
                                                    data.importe = ""
                                                    var _e = data.contratista.split(";")
                                                    data.contratista = ""

                                                    for (_l in _e) {
                                                        data.importe = data.importe + (data.importe.length > 0 ? ";" : "") + _e[_l].split("#")[1]
                                                        data.contratista = data.contratista + (data.contratista.length > 0 ? ";" : "") + _e[_l].split("#")[0]
                                                    }
                                                }
                                                _analisis._tramitacion = ''.Trim(options.Rutines.extract(data.textExtend, 'Tramitaci�n', options.transforms.General, true)).split(" ")[0]
                                                _analisis._objeto = ''.Trim(options.Rutines.extract(data.textExtend, 'Descripci�n del objeto:', options.transforms.General, true))

                                                //if(data.contratista.indexOf(' S')==-1)
                                                //    debugger


                                                if (data.contratista != null) {
                                                    if (data.contratista.length > 0) {
                                                        if (Array.isArray(data.contratista)) {
                                                            var _list = data.contratista
                                                            var _ins = function (e, list, data, callback, _ins) {
                                                                if (e < list.length) {
                                                                    data.contratista = list[e]
                                                                    options.SQL.insert(options, _analisis, data, function (data) {
                                                                        e = e + 1
                                                                        _ins(e, list, data, callback, _ins)
                                                                    })

                                                                } else {
                                                                    data.contratista = list
                                                                    callback(data)
                                                                }

                                                            }
                                                            _ins(0, data.contratista, data, callback, _ins)
                                                        } else {
                                                            options.SQL.insert(options, _analisis, data, function (data) {
                                                                callback(data)
                                                            })
                                                        }
                                                    } else {
                                                        callback(data)
                                                    }
                                                } else {
                                                    callback(data)
                                                }
                                            } else {
                                                callback(data)
                                            }

                                        } else {
                                            debugger
                                            callback(data)
                                        }
                                    } else {
                                        callback(data, true)
                                    }
                                }, urlDoc, options.Rutines)
                            } else {

                                callback(data)
                            }



                        } else {
                            callback(data)
                        }

                    } else {
                        console.log('Body - NULL reload True')
                        callback(data, true)
                    }
                }
            }
        }
    }


    app.commonSQL.init(options, 'PARSER', app._fileCredenciales + options.Command, function (options) {
        app.commonSQL.init({ SQL: { db: null } }, 'SCRAP', app._fileCredenciales + "SCRAP", function (scrapdb) {
            options.SQL.scrapDb = scrapdb.SQL.db
            callback(options)
        })
    })

}