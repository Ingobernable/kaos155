module.exports = function (app, callback) {

    var options = {
        Command: app.command,
        Rutines: require('../_utils/CONTRATOS/__Rutines.js')(app),
        transforms: require('../_utils/CONTRATOS/__Transforms.js')(app),
        _common: require('../_common.js')(app),
        
        SQL: {
            db: null,
            saveCodeMaterias: function (options,data,callback) {
                var _counter=0
                var _exit = ""

                _.forEach(data.materias.split(";"), function (value) {
                    _code_materia = value.match(/\d{3,7}/)[0]
                    _text_materia = value.substr(_code_materia.length+1, value.length)
                    options.SQL.db.query('Call insertMateria_Aux(?,?,?)', [data.type,_code_materia,_text_materia], function (err, record) { }) 
                    _exit = _exit + (_exit.length>0?";":"") + _code_materia
                    _counter++
                })
                data.materias = _exit
                data._counterMaterias = _counter
                callback(data)
            },
            insert: function (options, data, callback) {


                //debugger
                options.SQL.saveCodeMaterias(options, data, function (data) {

                    params = [
                        app.Type,
                        data._counterMaterias,
                        data._counterContratos,
                        data.cod,
                        data.titulo,

                        data.Empresa,
                        data._key,
                        data._Imp,

                        data.dia,
                        data.mes,
                        data.anyo,
                        data.tipoBoletin,
                        data.tipoTramite,
                        data.materias,

                        data.precio,
                        data.ambitoGeo,

                        data.adjudicador,
                        app.shorter.unique(data.adjudicador),
                        data.cargo,
                        data.firma,

                        data.pdf,
                        data.descripcion,

                        JSON.stringify(data.extra)
                    ]

                    options.SQL.db.query('Call Insert_Data_BOLETIN(?,?,?,?,?, ?,?,?, ?,?,?,?,?,?, ?,?, ?,?,?,?, ?,?, ?)', params, function (err, record) {
                        if (err != null) {
                            debugger
                            cadSql = "INSERT INTO errores (BOLETIN, SqlError) VALUES (?,?)"
                            options.SQL.db.query(cadSql, [_analisis._BOLETIN.split("=")[1], err.sqlMessage.replaceAll("'", "/'")], function (err2) {
                                var x = err
                                var y = params
                                callback(data, 2)
                            })
                        } else {
                            callback(data, 1)
                        }
                    })
                })

            }
        },
        parser: {
            Preceptos: function (options, type, callback) {

                var consulta = function (type, _cb) {
                    options.SQL.scrapDb.query('call GetNextTextParser(?,?)', [type, app.anyo], function (err, record) {
                        process.stdout.write('\x1b[33m+B\x1b[0m')
                        _cb(err, record)
                    })
                }

                consulta(type, function (err,record) {
                    if (record.length > 0) {
                        process.stdout.write('\x1b[33m+.\x1b[0m')
                        options.Rutines.normalizeTextContrato(record[0][0].texto.split("<br>"), ["organismo", "dependencia", "descripci\u00F3n del objeto:", "Tipo de contrato", "Descripci\u00F3n", "Lotes", "Tramitaci\u00F3n", "Presupuesto", "Procedimiento", "Forma", "Importe", "Contratista", "Nacionalidad", ".-"], function (_text) {
                            _analisis = JSON.parse(record[0][0].analisis)

                            data = {
                                _counterContratos: 0,
                                type: app.Type,
                                cod: record[0][0].BOLETIN,
                                titulo: _analisis._m.titulo,
                                dia: record[0][0].dia,
                                mes: record[0][0].mes,
                                anyo: app.anyo,
                                Lotes: options.Rutines.extract(options, _text, 'Lotes',options.transforms.ADD([options.patterns.General, options.patterns.sinPuntos, options.patterns.sinBlancoInicial]), true),
                                Empresa: options.Rutines.extract(options, _text, 'Contratista',

                                    options.transforms.ADD(
                                        [
                                        options.patterns.General,
                                        options.patterns.Contratista,
                                        options.patterns.especialChars,
                                        options.patterns.exoticChars,
                                        options.patterns.specialContratista,
                                        options.patterns.sinBlancoInicial,
                                        options.patterns.sinPuntos
                                        ])
                                ).toUpperCase(),
                                materias: _analisis._a.materias_cpv.length > 0 ? _analisis._a.materias_cpv : _analisis._a.materias,

                                tipoBoletin: _analisis._a.tipo,
                                tipoTramite: options.Rutines.extract(options, _text, 'Tramitaci\u00F3n', options.transforms.ADD([options.patterns.General, options.patterns.sinPuntos, options.patterns.sinBlancoInicial]), true),
                                precio: _analisis._a.precio,
                                ambitoGeo: _analisis._a.ambito_geografico,
                                adjudicador: options.Rutines.extract(options, _text, 'Organismo',
                                        options.transforms.ADD(
                                            [options.patterns.General,
                                            options.patterns.Contratista,
                                            options.patterns.sinBlancoInicial
                                            ]), true),
                                cargo: options.Rutines.extract(options, _text, 'cargo',
                                        options.transforms.ADD(
                                            [options.patterns.General, options.patterns.sinBlancoInicial, [
                                            ["F", { f: options.transforms.replace }, 'se\u00F1or', ''],
                                            ["F", { f: options.transforms.replace }, 'General ', '']
                                            ]]), true),
                                firma: options.Rutines.extract(options, _text, 'firma', options.transforms.ADD([options.patterns.General, options.patterns.sinPuntos, options.patterns.sinBlancoInicial]), true),
                                descripcion: options.Rutines.extract(options, _text, 'Descripci\u00F3n', options.transforms.ADD([options.patterns.General, options.patterns.sinPuntos, options.patterns.sinBlancoInicial]), true),
                                pdf: _analisis._m.url_pdf,
                                extra: {}
                            }

                            if (_text.length > 0) {

                                if (data.Empresa.length > 0) {

                                    data.extra.adj = data.adjudicador
                                    data.extra.cargo = data.cargo
                                    data.extra.tram = data.tipoTramite
                                    data.extra.firma = data.firma
                                    data.extra.ambGeo = data.ambitoGeo
                                    data.extra.desc = data.descripcion
                                    data.extra.tPre = data.precio
                                    data.extra.pdf = data.pdf

                                    data.extra.pres = options.Rutines.extract(options, _text, 'Presupuesto',
                                        options.transforms.ADD(
                                            [options.patterns.General,
                                            options.patterns.Importes,
                                            options.patterns.sinBlancoInicial
                                            ]), true)



                                    data.extra.dep = options.Rutines.extract(options, _text, 'Dependencia', options.transforms.ADD([options.patterns.General, options.patterns.sinPuntos, options.patterns.sinBlancoInicial]), true)
                                    data.extra.forma = options.Rutines.extract(options, _text, 'Forma', options.transforms.ADD([options.patterns.General, options.patterns.sinPuntos, options.patterns.sinBlancoInicial]), true)
                                    data.extra.proc = options.Rutines.extract(options, _text, 'Procedimiento', options.transforms.ADD([options.patterns.General, options.patterns.sinPuntos, options.patterns.sinBlancoInicial]), true)
                                    data.extra.nac = options.Rutines.extract(options, _text, 'Nacionalidad', options.transforms.ADD([options.patterns.General, options.patterns.sinPuntos, options.patterns.sinBlancoInicial]), true)

                                    data.Importe =  _imp = _analisis._a.importe.length > 0 ? _analisis._a.importe : options.Rutines.get.importes(_text, data, options, options.patterns)


                                    //if (data.Empresa.indexOf("#") == -1) {
                                    //    data._counterContratos++

                                    //    data._Imp = _imp
                                    //    if (data._Imp == 0) {
                                    //        data._Imp = ""
                                    //        for (_l in data.Empresa.split(";")) {
                                    //            data._counterContratos++
                                    //            data._Imp = data._Imp + (data._Imp.length > 0 ? ";" : "") + isNaN(data.extra.presupuesto) ? "0.00" : data.extra.presupuesto
                                    //            data._key = data._key + (data._key ? ";" : "") + app.shorter.unique(_l)
                                    //        }
                                    //    } else {
                                    //        data._key = app.shorter.unique(data.Empresa)
                                    //    }
                                    //} else {
                                    //    data._Imp = ""
                                    //    var _e = data.Empresa.split(";")
                                    //    data.Empresa = ""
                                   //     data._key=""
                                   //     for (_l in _e) {
                                   //         data._counterContratos++
                                   //         data._Imp = data._Imp + (data._Imp.length > 0 ? ";" : "") + _e[_l].split("#")[1]
                                    //        data.Empresa = data.Empresa + (data.Empresa.length > 0 ? ";" : "") + _e[_l].split("#")[0]
                                    //        data._key = data._key + (data._key.length > 0 ? ";" : "") + app.shorter.unique(_e[_l].split("#")[0])
                                    //    }
                                    //}
                                    debugger
                                    if (data.Empresa.indexOf(";") == -1) {
                                        data._counterContratos++
                                    }
                                    data.extra.num = _analisis._m.numero_anuncio
                                    data.UTE = data._counterContratos == 1 && data.Empresa.indexOf(' UTE') > -1 ? 1 : 0
                                    if (data.Empresa != null) {
                                        if (data.Empresa.length > 0 && data._Imp.length > 0) {
                                            options.SQL.insert(options, data, function (data, state) {
                                                process.stdout.write('\x1b[36m' + data._counterContratos + '\x1b[0mE')
                                                callback(data, state)
                                            })
                                        } else {
                                            callback(data, 3)
                                        }
                                    } else {
                                        callback(data, 5)
                                    }
                                } else {

                                    callback(data, 6)
                                }


                            } else {
                                //debugger
                                callback(data)
                            }
                        })
                    } else {
                        callback(null,0)
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

                            if (_analisis._type.indexOf('Adjudicación') > -1 || _analisis._modalidad == "Formalización contrato") {
                                options.Rutines.get.p_parrafo(options, $, '.', body, function (_data) {
                                    if (_data != null) {
                                        data.extra = _data._extra
                                        //console.log(_extra)
                                        var textExtend = _text = _data._arr   // recojemos todo el texto en una array (con caracter final)
                                        if (_text.length > 0) {
                                            var patterns = options.transforms.getPatern(options.transforms)
                                            data.contratista = options.Rutines.extract(options, _text, 'contratista',

                                                options.transforms.ADD(
                                                    [options.patterns.General,
                                                    options.patterns.Contratista,
                                                    options.patterns.especialChars,
                                                    options.patterns.exoticChars,
                                                    options.patterns.specialContratista,
                                                    [["F", { f: options.transforms.removeFirstChar }, ' '], ['R', new RegExp(/\./, "g"), ""]],

                                                    ]))
                                            if (data.contratista.length > 0) {
                                                data.extra.adjudicador = options.Rutines.extract(options, _text, 'Organismo',
                                                    options.transforms.ADD(
                                                        [options.patterns.General,
                                                        options.patterns.Contratista,
                                                        [["F", { f: options.transforms.removeFirstChar }, ' ']]
                                                        ]), true)

                                                data.presupuesto = options.Rutines.extract(options, _text, 'Presupuesto base de licitación',
                                                    options.transforms.ADD(
                                                        [options.patterns.General,
                                                        options.patterns.Importes,
                                                        [["F", { f: options.transforms.removeFirstChar }, ' ']]
                                                        ]), true)

                                                //data.presupuesto = options.Rutines.get.adaptImportes(data.presupuesto ,data)

                                                for (_i in _text) {
                                                    //console.log(_arrayText[i])
                                                    if (_text[_i].toLowerCase() != null) {
                                                        if (_text[_i].indexOf('.-') > -1) {
                                                            data.extra.cargo = _text[_i].split(".-")[1].split(',')[0].replace(/\"/g, "")
                                                            data.extra.firma = _text[_i].split(".-")[1].split(',').length > 1 ? ''.Trim(_text[_i].split(".-")[1].split(',')[1]) : ''
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
                                                _analisis._tramitacion = ''.Trim(options.Rutines.extract(options, _text, 'Tramitación', options.transforms.General, true)).split(" ")[0]
                                                _analisis._objeto = ''.Trim(options.Rutines.extract(options, _text, 'Descripción del objeto:', options.transforms.General, true))

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
    options.patterns = options.transforms.getPatern(options.transforms)

    app.commonSQL.init(options, 'PARSER', app._fileCredenciales + options.Command, function (options) {
        app.commonSQL.init({ SQL: { db: null } }, 'SCRAP', app._fileCredenciales + "SCRAP", function (scrapdb) {
            options.SQL.scrapDb = scrapdb.SQL.db
            callback(options)
        })
    })

}