module.exports = function (app, drop, callback) {

    var options = {
        url: app.urlBOE,
        opc: ['-table', '-raw', '-layout', '-enc UTF-8'],
        pdfOpc: ['-raw', '-nopgbrk', '-enc UTF-8'],
        Rutines: require('./BOE/Boe_Rutines')(app),
        transforms: require('./BOE/Boe_Transforms')(app),
        _common: require('../parser_common')(app),
        SQL: {
            db: null,
            insert: function (options, _analisis, data, callback) {
                var i = isNaN(data.importe * 1) ? 0 : data.importe * 1
                var params = [

                        data.id.substr(12, 2),                                      //Dia
                        data.id.substr(10, 2),                                      //Mes
                        data.id.substr(6, 4),                                       //Anyo
                        data.id,                                                    //SUMARIO
                        _analisis._BOE.split("=")[1],                               //BOE
                        app.Rutines(app).getCleanedString(_analisis._type),         //Tipo_BOE
                        app.Rutines(app).getCleanedString(_analisis._tramitacion.split(" ")[0]),  //Tipo_TRAMITE
                        app.Rutines(app).getCleanedString(_analisis._objeto),       //Objeto del contrato

                        _analisis.urlPdf,                                           //PDF                                                           
                        data.textExtend.join("<br>").replace(/'/g, "\'"),             //Texto

                        data.contratista != null ? data.contratista.substr(0, 254).replace(/'/g, "\'"):null,          //_keys
                        i.toFixed(2)
                        //''.Trim(data.importe.replace(/\n/g, "").replace(/'/g, '') ) //Importes
                ]
                var _ing = ""
                for (i in data.extra) {
                    _ing=_ing+",?"
                    params[params.length] = data.extra[i].replace(/'/g, "").replace(/\n/g, "")
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
                data.extra.materias = data.extra.materias + (data.extra.materias_cpv.length > 0 && data.extra.materias.length > 0  ? ";" : '') + data.extra.materias_cpv
                options.SQL.db.query('Call Insert_Data(' + data.contratista.split(';').length + ',' + data.extra.materias.split(';').length + ",'" + data.type + "',?,?,?,?,?,?,?,?,?,?,?,?" + _ing + ')', params, function (err, record) {
                        if (err != null) {
                            cadSql = "INSERT INTO errores (BOE, SqlMensaje, SqlError) SET (?,?,?)"
                            options.SQL.db.query(cadsql, [data.id, err.SqlMensaje, err.SqlError], function (err2) {
                                var x = err
                                var y = params
                                //debugger
                            })
                        } else {
                           // for (n in record) {
                           //     if (record[n][0] != null)
                           //         if (record[n][0].ID != null)
                           //             options.SQL.db.query('Update boletin_contratos SET Id_Empresa = (SELECT id FROM empresa WHERE empresa.Name = boletin_contratos.Empresa) WHERE id=' + record[n][0].ID, function (err3) {
                           //                 if (err3 != null)
                            //                    debugger
                            //            })
                           // }
                        }
                        //debugger
                        callback(data)
                    })
                //})



            },
            
        },
        parser: {
            Secciones: function (options, url, data, callback) {
                app.Rutines(app).askToServer(app, { encoding: 'UTF-8', method: "GET", uri: url.uri, agent: false }, data, function (app, body, data) {
                    //try {
                    if (body != null) {
                        var $ = app.Rutines(app).XmlToDom(body)
                        if ($('error').length > 0) {
                            //var _r = { error: true, descripcion: $('error descripcion').html() }
                            callback(data)
                        } else {
                            data.next = $('sumario meta fechaSig').html()
                            data.Fdate = $('sumario meta pubDate').html() // = $('sumario meta fechaSig').html()
                            data.SUMARIO_LAST = app._xData.Sumario.BOE.SUMARIO_NEXT
                            data.SUMARIO_NEXT = "BOE-S-" + data.next.substr(6, 4) + data.next.substr(3, 2) + data.next.substr(0, 2)
                            //debugger
                            //options._common.SQL.commands.Sumario.update(options, data, function (options, data) {
                                if (data.Idate == null) {
                                    data.Idate = $('sumario meta pubDate').html()
                                }
                                var _reg = []
                                var _Sections = data.Secciones.split(",")
                                $('diario seccion').each(function (i, item) {
                                    if (_Sections.indexOf(item.attribs.num) > -1)

                                        $(item.children).find('departamento item').each(function (b, boe) {
                                            var _ok=false
                                            if (app._xData.Sumario.BOE.ID_LAST != null) {
                                                if(app._xData.Sumario.BOE.ID_LAST==boe.attribs.id)
                                                    app._xData.Sumario.BOE.ID_LAST = null
                                            }else{
                                                _ok=true
                                            }
                                            if(_ok)
                                                _reg[_reg.length] = '/diario_boe/xml.php?id=' + boe.attribs.id
                                        })

                                })
                                data.id = url.uri.split('=')[1]
                                data._list = _reg
                                callback(data)
                            //})
                        }
                    } else {
                        debugger
                        callback(data)
                    }

                })
            },
            Preceptos: function (options, urlDoc, body, data, callback) {
                //app.Rutines(app).askToServer(app, { encoding: 'UTF-8', method: "GET", uri: options.url + urlDoc, agent: false }, data, function (app, body, data) {
                    //var xcadsql = null
                    var contratos = []
                    if (body != null) {

                        var $ = app.Rutines(app).XmlToDom(body)                 // convertimos el texto xml en objetos DOM
                        if ($('error').length == 0) {
                            data.codigo = options.Rutines.get.principal($)      // rescatamos las variables directas
                            var _analisis = options.Rutines.get.data(options, data)      //creamos la estructura con los datos principales
                            if (_analisis._type == null)
                                debugger
                            //console.log(_analisis._modalidad)

                            if (_analisis._type.indexOf('Adjudicación') > -1 || _analisis._modalidad == "Formalización contrato") {
                                options.Rutines.get.p_parrafo(options, $, '.', body, function (_data) {
                                    data.extra = _data._extra
                                    //console.log(_extra)
                                    var textExtend = data.textExtend = _data._arr   // recojemos todo el texto en una array (con caracter final)
                                    if (data.textExtend.length > 0) {
                                        var patterns = options.transforms.getPatern(options.transforms)
                                        data.contratista = options.Rutines.extract(data.textExtend, 'contratista')
                                        if (data.contratista.indexOf('Lote') > -1) {
                                           
                                            contratos = data.contratista.split(".")
                                            var transforms = options.transforms.ADD(
                                                [patterns.General,
                                                 patterns.Contratista,
                                                 patterns.exoticChars,
                                                [["F", { f: options.transforms.removeFirstChar }, ' ']]
                                                ])
                                            var transformsChars = options.transforms.ADD([
                                                patterns.especialChars
                                            ])
                                            data.contratista = []
                                            for (_c in contratos) {
                                                if(contratos[_c].length>0)
                                                    data.contratista[_c] = options.Rutines.transforms(options.Rutines.transforms(contratos[_c], transforms).split(",")[0], transformsChars).toUpperCase()
                                            }

                                        }else{

                                            data.contratista = options.Rutines.extract(data.textExtend, 'contratista',
                                                options.transforms.ADD(
                                                    [patterns.General,
                                                        patterns.Contratista,
                                                        patterns.exoticChars,
                                                        patterns.especialChars,
                                                    [["F", { f: options.transforms.removeFirstChar }, ' ']]
                                                    ]))

                                        }
                                        data.extra.adjudicador = options.Rutines.extract(data.textExtend, 'Organismo',
                                            options.transforms.ADD(
                                                [patterns.General,
                                                patterns.Contratista,
                                                [["F", { f: options.transforms.removeFirstChar }, ' ']]
                                                ]))


                                        data.importe = options.Rutines.get.importes(data, options, patterns) 


                                        _analisis._tramitacion = ''.Trim(options.Rutines.extract(data.textExtend, 'Tramitación', options.transforms.General))
                                        _analisis._objeto = ''.Trim(options.Rutines.extract(data.textExtend, 'Descripción del objeto:', options.transforms.General))

                                        if (data.contratista != null) {
                                            if (data.contratista.length > 0) {
                                                if (Array.isArray(data.contratista)) {
                                                    var _list = data.contratista
                                                    var _ins = function(e, list, data, callback, _ins) {
                                                        if (e < list.length) {
                                                            data.contratista = list[e]
                                                            options.SQL.insert(options, _analisis, data, function (data) {
                                                                e=e+1
                                                                _ins(e,list,data,callback,_ins)
                                                            })
                                                            
                                                        } else {
                                                            data.contratista = list
                                                            callback(data)
                                                        }
                                                           
                                                    }
                                                    _ins(0, data.contratista,data, callback, _ins )
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
                                }, urlDoc)
                            } else {
                                //debugger
                                callback(data)
                            }
                        } else {
                            callback(data)
                        }

                    }
                //})
            }
        }
    }


   app.commonSQL.init(options, drop, 'BOE', callback)

}