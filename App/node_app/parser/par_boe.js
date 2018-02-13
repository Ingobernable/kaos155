module.exports = function (app, callback) {

    var options = {
        Type: app.Type,
        Command: app.command,
        Rutines: require('../_utils/CONTRATOS/__Rutines.js')(app),
        transforms: require('../_utils/CONTRATOS/__Transforms.js')(app),
        _common: require('../_common.js')(app),
        
        SQL: {
            db: null,
            saveCodeMaterias: function (options,data,callback) {
                var _counter=0
                var _exit = ""
                //debugger
                var _materias = data.materias.split(";")
                if (_materias.length > 0) {
                    var cadsql = ""
                    _.forEach(_materias, function (value) {
                        if ((value.match(/^\d{3,8}/) || []).length > 0) {
                            _code_materia = value.match(/\d{3,8}/)[0]
                            _text_materia = value.substr(_code_materia.length + 1, value.length)
                            _exit = _exit + (_exit.length > 0 ? ";" : "") + _code_materia

                            cadsql = cadsql + "Call Insert_Data_BOLETIN_Materia_Aux('" + _code_materia + "','" + _text_materia +"');" 
                            _counter++
                        }
                    })
                    options.SQL.db.query(cadsql, function (err, record) {
                        if (err != null)
                            debugger
                        
                        data.materias = _exit
                        data._counterMaterias = _counter
                        callback(data)

                    })
                } else {
                    data.materias = ""
                    data._counterMaterias = _counter
                    callback(data)
                }

            },
            insert: {
                boletin: function (options, data, __callback) {
                    options.SQL.saveCodeMaterias(options, data, function (data) {
                        data.area = data.area != null ? data.area._t : data.extra.area!=null ? data.extra.area._t : 'Sin definir'    // (data.area._SA.length==2) = entidad emisora SA
                        if (data.area == null)
                            data.area = "Sin definir"
                        var lotes = data.Empresa.split(";").length > 1 ? data.Empresa.split(";").length:0
                        params = [
                            app.Type,
                            data._counterMaterias,

                            data.cod,
                            data.titulo,

                            //data.Empresa,
                            //data._Imp,

                            data.dia,
                            data.mes,
                            data.anyo,

                            data.tipoBoletin,
                            data.tipoTramite,
                            data.tipoForma,
                            data.area,

                            //data.precio,
                            data.adjudicador,
                            
                            //app.shorter.unique(data.adjudicador),
                            //(data.cargo==null)?"":data.cargo,
                            //(data.firma == null) ? "" : data.firma,

                            data.pdf,
                            data.descripcion,
                            data.materias,

                            data.UTE==null ? 0 : data.UTE,
                            lotes,
                            JSON.stringify(data.extra)
                        ]
                        console.log(data.cod, data.area, data.tipoTramite, data.tipoForma)
                        //
                        if (app.neo4j) {
                            app.neo4j.push.Object({ table: "_" + data.anyo, k: data.anyo })
                            app.neo4j.push.Object({ table: "_" + data.area.toUpperCase(), k: data.area.toUpperCase() })
                            app.neo4j.push.Object({ table: "_" + data.tipoBoletin, k: data.tipoBoletin })
                            app.neo4j.push.Object({ table: "_" + data.tipoTramite, k: data.tipoTramite })
                            app.neo4j.push.Object({ table: "_" + data.tipoForma, k: data.tipoForma })
                            app.neo4j.push.Object({ table: "_boletin", k: data.cod })

                            app.neo4j.push.run("MATCH (t:_" + data.anyo + "),(a:_" + data.area.toUpperCase() + ") MERGE (t)-[r:_area]-(a)")
                            app.neo4j.push.run("MATCH (t:_" + data.area.toUpperCase() + "),(a:_boletin {id:'" + data.cod +"'}) MERGE (t)-[r:_contrato]-(a)")

                            app.neo4j.push.run("MATCH (t:_boletin {id:'" + data.cod +"'}),(a:_" + data.tipoBoletin + ") MERGE (t)-[r:_tipo]-(a)")                            app.neo4j.push.run("MATCH (t:_" + data.tipoBoletin + "),(a:_" + data.tipoTramite + ") MERGE (t)-[r:_tramite]-(a)")
                            app.neo4j.push.run("MATCH (t:_boletin {id:'" + data.cod + "'}),(a:_" + data.tipoTramite + ") MERGE (t)-[r:_tramite]-(a)")
                            app.neo4j.push.run("MATCH (t:_boletin {id:'" + data.cod +"'}),(a:_" + data.tipoForma + ") MERGE (t)-[r:_fotma]-(a)")
                        }
                        //
                        options.SQL.db.query('Call Insert_Data_BOLETIN(?,?, ?,?, ?,?,?, ?, ?,?,?, ?, ?,?,?, ?,?,?)', params, function (err, record) {
                            if (err != null) {
                                debugger
                                cadSql = "INSERT INTO errores (BOLETIN, SqlError) VALUES (?,?)"
                                options.SQL.scrapDb.SQL.db.query(cadSql, [data.cod, err.sqlMessage.replaceAll("'", "/'")], function (err2) {
                                    var x = err2
                                    var y = params
                                    __callback(data, 2, "ERROR.- DUPLICADO INSERT BOLETIN")
                                })
                            } else {
                                __callback(data, 1)
                            }
                        })
                    })
                },
                contrato: function (options, data, cod, empresa, importe, counter, _xcallback) {
                    var _acron = ""
                    var _nif = ""
                    var _key = ""
                    muy_aprox = function (a, b) {
                        var _v = _.difference(a, b).join("").length
                        return _v<3
                    },
                    writeContrato = function (area, anyo, type, cod, keyEmpresa, empresa, importe, _key, _acron, _nif, counter, _ycallback) {
                        if (_acron.length > 10) {
                            _acron = "?????"
                        }

                        //if (importe * 1 == 0)
                        //    debugger
                        var _params = [area, anyo, type, cod, keyEmpresa, empresa, importe, _key, _acron, _nif, counter]
                        if (empresa.length > 2 && importe != null && importe.length > 0 && importe != "NaN") {
                            //console.log(_params)
                            options.SQL.db.query('Call Insert_Data_BOLETIN_Contrato(?,?,?,?,?,?,?,?,?,?,?)', _params, function (err, record) {
                                if (err != null) {
                                    x = _params
                                    //debugger
                                }
                                _ycallback(data, 1, counter, err)
                            })
                        } else {
                            _ycallback(data, 1, counter, "ERROR IMPORTES" )
                        }
                    }


                    if ( ( (empresa.match(/^\w\d{7,8}/) || []).length > 0) ) {
                        _nif = empresa.match(/^\w\d{7,8}/)[0]
                        empresa = _.trim(empresa.split(/^\w\d{7,8}/)[1])
                    }
                    if (((empresa.match(/\w\-\d{7,8}/) || []).length > 0)) {
                        _nif = empresa.match(/\w\-\d{7,8}/)[0].replace("-","")
                        empresa = _.trim(empresa.split(/\w\-\d{7,8}/)[1])
                    }
                    if ((empresa.match(/\((.*?)\)/) || []).length > 0) {
                        var _x = []
                        const _r = empresa.split(/\((.*?)\)/)
                        _.forEach(_r, function (value) {
                            if(value.length>0)
                                _x[_x.length] = value
                        })

                        if (_x.length ==2) {
                            _acron = empresa.match(/\((.*?)\)/)[0].indexOf('SA') > -1 ? _x[1] : ''
                            empresa = _.trim(_x[0])
                        } else {
                            if ((empresa.match(/\((.*?)\)/) || [])[0].indexOf("lote") > 0) {
                                empresa = empresa.substr(0,empresa.indexOf("(")-1)
                            } else {
                                empresa = empresa.replace("(", "").replace(")", "")
                            } 
                        }
                    }
                    if (((empresa.match(/^\w\ \w \ /) || []).length > 0)) {
                        debugger
                        _x = empresa.split(/^\w\ \w/)
                        empresa = _.trim(_x[1]) + empresa.substr(4, empresa.length)
                        _nif = _x[0]
                    }
                    var _fin = empresa.indexOf(" SA") > -1 ? empresa.indexOf(" SA") : empresa.indexOf(" SL")> -1 ? empresa.indexOf(" SL") : empresa.length
                   
                    if (_fin == -1) {
                        //debugger
                        empresa = data.Empresa
                    } else {
                        empresa = empresa.substr(0, _fin + 3)
                    }
                    empresa = _.trim(empresa)
                    if (empresa.length > 4) {
                        var _k = app.aguid(empresa)
                        options.SQL.db.query('SELECT * FROM bbdd_kaos155.borme_keys WHERE _key = ?', [_k], function (err, record) {
                            if (record.length > 0) {
                                writeContrato(data.area, data.anyo, options.Type, cod, '', empresa, importe, record[0]._key, _acron, _nif, counter, _xcallback)
                            } else {
                                options.SQL.db.query('SELECT * FROM bbdd_kaos155.borme_keys WHERE MATCH (Nombre) AGAINST(? IN BOOLEAN MODE) LIMIT 1', ['+'+_.compact(empresa.split(" ")).join(" +")], function (err, record) {
                                    if (!err) {
                                        //debugger

                                        var _key = ""
                                        var suggestEmpresa = ""

                                        if (record.length > 0) {
                                            var _words = empresa.toLowerCase().split(" ")
                                            var _prop_words = record[0].Nombre.toLowerCase().split(" ")

                                            if (_k == record[0]._key || empresa == record[0].Nombre || muy_aprox(_words, _prop_words)) {
                                                _key = record[0]._key

                                                //var suggestEmpresa = record[0].Nombre
                                            } else {
                                                var suggestEmpresa = record[0].Nombre + " (" + record[0]._key + ")"
                                            }
                                            writeContrato(data.area, data.anyo, options.Type, cod, suggestEmpresa, empresa, importe, _key, _acron, _nif, counter, _xcallback)
                                        } else {
                                            writeContrato(data.area, data.anyo, options.Type, cod, '', empresa, importe, _key, _acron, _nif, counter, _xcallback)
                                        }
                                    } else {
                                        writeContrato(data.area, data.anyo, options.Type, cod, '', empresa, importe, '' , _acron, _nif, counter, _xcallback)

                                    }
                                })
                            }
                        })
                    } else {
                        _xcallback(data, 2,counter)   //Formato Empresa NO Valido < 3 caracteres
                    }
                }

            }
        },
        parser: {
            Preceptos: function (options, type, callback) {

                const consulta = function (type, _cbx, _cb) {
                    //debugger
                    options.SQL.scrapDb.SQL.db.query('call GetNextTextParser(?,?)', [type, app.anyo], function (err, record) {
                        if (err)
                            debugger
                        app.process.stdout.write(app, options, '\x1b[33m', '+B', '\x1b[0m')
                        _cb(err, record,_cbx )
                    })
                }

                clearEmpresa = function (e) {
                    //debugger
                    if (e.indexOf('NUMEROS DE ORDEN') > -1) {
                        x = e.replaceAll("NUMEROS DE ORDEN", ";")
                        e = x.replace(/(\d{1,} Y \d{1,})/g, "").replace(/( \d{1,} )/g,"").replace(/\;\d{1,}/g, ";").replace(" ;",";")
                    }
                    return e
                }
                consulta(type, callback,  function (err, record,_cbx) {
                    var anexo = false
                    const group = function (text, key, exclude) {
                        var _ret=[]
                        _.forEach(text, function (line) {
                            if (line.toLowerCase().indexOf(key.toLowerCase())>-1) {
                                if (line.toLowerCase().indexOf(exclude.toLowerCase()) == -1) {
                                    _ret[_ret.length] = _.trim(line.split(key)[1])
                                }
                            }
                        })
                        return _ret.join(";").replaceAll(".;",";")
                    }
                    if (record[0].length > 0) {
                        app.process.stdout.write(app, options, '\x1b[36m', '.', '\x1b[0m')
                        const _sa = options.transforms.ADD( [
                            options.patterns.General,
                            options.patterns.Contratista,
                            options.patterns.especialChars,
                            options.patterns.exoticChars,
                            options.patterns.specialContratista,
                            options.patterns.sinBlancoInicial,
                            options.patterns.sinPuntos
                        ])
                        //options.Rutines.normalizeTextContrato(record[0][0].texto.split("<br>"), ["Organismo", "Dependencia", "Descripci\u00F3n del objeto:", "Tipo de contrato", "Descripci\u00F3n", "Lotes", "Tramitaci\u00F3n", "Presupuesto", "Procedimiento", "Forma", "Importe", "Contratista", "Nacionalidad", ".-"], function (_text) {
                        var _text = options.Rutines.refineLineaText(options, record[0][0].texto.split("<br>"))
                        var _analisis = JSON.parse(record[0][0].analisis)
                        //var _Ex = options.Rutines.localizeText(_text, 'contratista')
                        //if (_Ex.indexOf('"')> 0) {
                        var _Empresa = options.Rutines.extract(_text, 'contratista', _sa)

                        //} else {
                        //    var _Empresa = (_Ex.match(/"([^"]*)"|'([^']*)'|“[^]*”|.[^]*,/g) || []).join(";") 
                        //}
                        //_Empresa = clearEmpresa(_Empresa.replaceAll(/^\d\) /, ""))
                        if (_analisis._a.observaciones.indexOf("Desierto") == -1 && _Empresa.indexOf("Desierto") == -1) {
                            if (_Empresa.toLowerCase() == "ver anexo") {
                                _Empresa = options.Rutines.groupAnexos(options, _text, "Contratista:", "Importe", _Empresa, _sa)
                                anexo = true
                            }
                            

                            var _l = [false, false]
                            if (_analisis.data.Lotes != null)
                                _l[0] = ((_.deburr(_analisis.data.Lotes.replace("..", "")) == "Si") || (_analisis.data.Lotes.match(/\d/g) || []).length > 0)
                            if (_analisis.data.Lote != null)
                                _l[1] = ((_.deburr(_analisis.data.Lote.replace("..", "")) == "Si") || (_analisis.data.Lote.match(/\d/g) || []).length > 0)

                            if (_l[0] || _l[1] || _Empresa.split(";").length > 1 && ((_Empresa.indexOf("(UTE)") == -1 && _Empresa.indexOf(" UTE") == -1 && _Empresa.indexOf("UTE ") == -1) && !anexo)) {
                                //NO UTE SI LOTES y ver anexo
                                //debugger
                                var _e = _Empresa.split(";")
                                var data = options.Rutines.findImpSplitList(options.Rutines.putData(options.Rutines.getData(app, record, _analisis, _Empresa, _e), _analisis), options, _text, _analisis, true)
                                data.extra.text = _text
                                    
                                if (data.extra.adjudicador || data.extra.adj) {
                                    data.extra.area = options.Rutines.analisis('area', data.extra.adjudicador ? data.extra.adjudicador : data.extra.adj)
                                    if (data.extra.area == null)
                                        debugger
                                }

                                if (_Empresa.indexOf("#") == -1) {
                                    if (!_.isNumber(data._Imp)) {
                                        var _i = data._Imp.split(";")
                                    } else {
                                        var _i = _.compact(((data._Imp / _Empresa.split(";").length).toFixed(2) + ";").repeat(_Empresa.split(";").length).split(";")) //.splice(_Empresa.split(";").length)
                                    }
                                    var _p = 0
                                    _Empresa = ""
                                    if (_i.length == _e.length) {
                                        _.forEach(_e, function (value) {
                                            _Empresa = _Empresa + (_Empresa.length > 0 ? ';' : '') + value + "#" + _i[_p]
                                            _p++
                                        })
                                        data.Empresa = _Empresa
                                        options.Rutines.saveDataBoletin(app, options, data, _cbx)

                                    } else {
                                        _cbx({ anyo: app.anyo, cod: record[0][0].BOLETIN }, 13,"NUMERO DE CONTRATISTAS e IMPORTES INCORRECTO")
                                    }
                                } else {
                                    data.Empresa = _Empresa
                                    options.Rutines.saveDataBoletin(app, options, data, _cbx)
                                }
                                
                            } else {
                                _e = []
                                if (_analisis.data.Contratista) {
                                    _e = _analisis.data.Contratista.replace("..", ".")
                                    if ((_e.match(/\"(.*?)\"/g) || []).length > 0)
                                        _e = _e.match(/\"(.*?)\"/g).join(";")
                                }

                                data = options.Rutines.getData(app, record, _analisis, _Empresa, _e)
                                data.extra.text = _text

                                if (data.adjudicador) {
                                    data.area = options.Rutines.analisis('area', data.adjudicador)
                                    if (data.area._t==null || data.area._t == "Sin definir")
                                        if (_analisis._m.departamento != null) {
                                            data.area = options.Rutines.analisis('area', _analisis._m.departamento)
                                        } else {
                                            data.area = options.Rutines.analisis('area', _analisis._m.titulo)
                                        }
                                    if (data.area == "Sin definir")
                                        debugger
                                }

                                if (data.Empresa.length > 0 && (data.Empresa.indexOf("(UTE)") == -1 && data.Empresa.indexOf(" UTE") == -1 && data.Empresa.indexOf("UTE ") == -1)) {

                                    //data = options.Rutines.putData(data, _analisis)
                                    data = options.Rutines.findImpSplitList(options.Rutines.putData(data, _analisis), options, _text, _analisis, false)
                                    data._counterContratos++

                                    data.UTE = 0 //data._counterContratos == 1 && data.Empresa.indexOf('UTE') > -1 ? 1 : 0
                                    options.Rutines.saveDataBoletin(app, options, data, _cbx)

                                } else {
                                    if (data.Empresa.length > 0) {
                                        data.UTE = 1
                                        //debugger
                                        data.Empresa = _Empresa
                                        data = options.Rutines.putData(data, _analisis)
                                        var _imp = _analisis._a.importe.length > 0 ? _analisis._a.importe : options.Rutines.get.importes(_text, data, options, options.patterns, false)
                                        if (_.isString(_imp)) {
                                            data._Imp = _imp.replaceAll(".","").replace(",",".") * 1
                                        } else {
                                            data._Imp = _imp
                                        }
                                        data._counterContratos++
                                        options.Rutines.saveDataBoletin(app, options, data, _cbx)
                                    } else {
                                        _cbx(data, 9,"CONTRATISTA EN BLANCO" )       //Contratista en Blanco
                                    }
                                    //callback(data, data.Empresa.length>0 ? 4 : 9)
                                }
                            }
                        } else {
                            _cbx({ anyo: app.anyo, cod: _analisis._m.identificador }, 10, "DESIERTO" )    // Desierto
                        }
                        
                        //}
                    } else {
                        console.log('no hay mas boletines, proceso concluido OK')
                        process.exit(0)
                    }
                })
                //app.Rutines(app).askToServer(app, { encoding: 'UTF-8', method: "GET", uri: options.url + urlDoc, agent: false }, data, function (app, body, data) {
                //var xcadsql = null
                const contratos = function () {
                    //var contratos = []
                    if (body != null) {

                        var $ = app.Rutines(app).XmlToDom(body)                 // convertimos el texto xml en objetos DOM
                        if ($('error').length == 0) {
                            data.codigo = options.Rutines.scrap.principal($)      // rescatamos las variables directas
                            var _analisis = options.Rutines.scrap.data(options, data)      //creamos la estructura con los datos principales
                            //if (_analisis._type == null)
                            //    debugger

                            //if (["BOE-B-2001-3002"].indexOf(_analisis._BOLETIN.split("=")[1]) > -1)
                            //    debugger

                            if (_analisis._type.indexOf('Adjudicación') > -1 || _analisis._modalidad == "Formalización contrato") {
                                options.Rutines.scrap.p_parrafo(options, $, '.', body, function (_data) {
                                    if (_data != null) {
                                        data.extra = _data._extra
                                        //console.log(_extra)
                                        var textExtend = _text = _data._arr   // recojemos todo el texto en una array (con caracter final)
                                        if (_text.length > 0) {
                                            var patterns = options.transforms.getPatern(options.transforms)
                                            data.contratista = options.Rutines.extract(_text, 'contratista',

                                                options.transforms.ADD(
                                                    [options.patterns.General,
                                                    options.patterns.Contratista,
                                                    options.patterns.especialChars,
                                                    options.patterns.exoticChars,
                                                    options.patterns.specialContratista,
                                                    [["F", { f: options.transforms.removeFirstChar }, ' '], ['R', new RegExp(/\./, "g"), ""]],

                                                    ]))
                                            if (data.contratista.length > 0) {
                                                data.extra.adjudicador = options.Rutines.extract(_text, 'Organismo',
                                                    options.transforms.ADD(
                                                        [options.patterns.General,
                                                        options.patterns.Contratista,
                                                        [["F", { f: options.transforms.removeFirstChar }, ' ']]
                                                        ]), true)




                                                data.presupuesto = options.Rutines.extract(_text, 'Presupuesto base de licitación',
                                                    options.transforms.ADD(
                                                        [options.patterns.General,
                                                        options.patterns.Importes,
                                                        [["F", { f: options.transforms.removeFirstChar }, ' ']]
                                                        ]), true)

                                                //data.presupuesto = options.Rutines.scrap.adaptImportes(data.presupuesto ,data)

                                                for (_i in _text) {
                                                    //console.log(_arrayText[i])
                                                    if (_text[_i].toLowerCase() != null) {
                                                        if (_text[_i].indexOf('.-') > -1) {
                                                            data.extra.cargo = _text[_i].split(".-")[1].split(',')[0].replace(/\"/g, "")
                                                            data.extra.firma = _text[_i].split(".-")[1].split(',').length > 1 ? _.trim(_text[_i].split(".-")[1].split(',')[1]) : ''
                                                        }
                                                    }
                                                }
                                                if (data.contratista.indexOf("#") == -1) {
                                                    var _imp = options.Rutines.get.importes(data, options, patterns, false)
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
                                                _analisis._tramitacion = _.trim(options.Rutines.extract(_text, 'Tramitación', options.transforms.General, true)).split(" ")[0]
                                                _analisis._objeto = _.trim(options.Rutines.extract(_text, 'Descripción del objeto:', options.transforms.General, true))

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
            options.SQL.scrapDb = scrapdb
            callback(options)
        })
    })

}