module.exports = function (app, callback) {

    var options = {
        opc: ['-table', '-raw', '-layout', '-enc UTF-8'],
        pdfOpc: ['-raw', '-enc UTF-8'],
        //pdftotext : require('../pdftotext'),
        Rutines: require('./BOLETIN/__Rutines')(app),
        transforms: require('./BOLETIN/__Transforms')(app),
        _common: require('../parser_common')(app),
        url: app.urlBOCM,
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
                    data.textExtend.join("<br>").replace(/'/g, "\'"),             //Texto

                    data.contratista != null ? data.contratista.substr(0, 254).replace(/'/g, "\'") : null,          //_keys
                    data.importe.indexOf(";") == -1 ? i.toFixed(2) : data.importe
                    //''.Trim(data.importe.replace(/\n/g, "").replace(/'/g, '') ) //Importes
                ]
                var _ing = ""
                for (i in data.extra) {
                    _ing = _ing + ",?"
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
                data.extra.materias = data.extra.materias + (data.extra.materias_cpv.length > 0 && data.extra.materias.length > 0 ? ";" : '') + data.extra.materias_cpv
                options.SQL.db.query('Call Insert_Data_BOLETIN(' + data.textExtend.length + ',' + data.contratista.split(';').length + ',' + data.extra.materias.split(';').length + ",'" + data.type + "',?,?,?,?,?,?,?,?,?,?,?,?" + _ing + ')', params, function (err, record) {
                    if (err != null) {
                        //debugger
                        cadSql = "INSERT INTO errores (BOLETIN, SqlError) VALUES (?,?)"
                        options.SQL.db.query(cadSql, [_analisis._BOE.split("=")[1], err.sqlMessage.replaceAll("'", "/'")], function (err2) {
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
            Secciones: function (options, url, data, callback) {
                var _this = this
                var _ret = []
                var getTitle = function (item, po) {
                    var _fr = ''.Trim(item.split(/\r/))
                    for (_i in _fr) {
                        if (_fr[_i].length > 0)
                            _ret[_ret.length] = _fr[_i]
                    }
                    return _ret[_ret.length - po]
                }
                //if (url.uri.indexOf("   ") > -1)
                //    debugger

                app.Rutines(app).askToServer(app, { encoding: null, method: "GET", uri: url.uri }, data, function (app, body, data) {
                    if (body != null) {
                        var xcadsql = null
                        var turl = url.uri.split("/")
                        var _file = app.PDFStore + turl[turl.length - 1] //.split("=")[1] + ".pdf"
                        var bocm = turl[turl.length - 1].split(".")[0]

                        var _exit = function (_reg, callback) {
                            //debugger
                            var _data = app._xData.Sumario.BOCM.SUMARIO_NEXT.substr(5, 8)
                            var yyyy = _data.substr(0, 4);
                            var mm = _data.substr(4, 2) // getMonth() is zero-based
                            var dd = _data.substr(6, 2)
                            var date = app.moment(app._xData.Sumario.BOCM.SUMARIO_NEXT.substr(5, 8), 'YYYYMMDD').add(1, 'day')
                            if (new Date(date).getDay() == 0)
                                date.add(1, 'day')

                            data.SUMARIO_LAST = app._xData.Sumario.BOCM.SUMARIO_NEXT
                            data.SUMARIO_NEXT = "BOCM-" + date.format('YYYYMMDD')
                            data.next = date.format('DD/MM/YYYY')

                            //options._common.SQL.commands.Sumario.update(options, data, function (options, data) {
                            data.id = data.SUMARIO_LAST
                            data._list = _reg
                            callback(data)
                            //})
                        }


                        if (body != null) {
                            app.mkdirp(app.PDFStore, function (err) {
                                app.fs.writeFile(_file, body, function (err) {
                                    if (err) {
                                        debugger
                                    } else {
                                        //console.log(body)
                                        if (body.toString().indexOf('<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">') == -1) {
                                            //console.log('file local:->' + _file)
                                            var pdf = new app.pdftotext(_file)

                                            pdf.add_options(options.opc);

                                            pdf.getText(function (err, text, cmd) {
                                                if (err) {
                                                    console.log(err)
                                                    _exit([], callback)
                                                } else {
                                                    var _fileText = _file.split(".PDF")[0] + ".txt"
                                                    console.log(_fileText)

                                                    app.fs.readFile(_fileText, 'utf8', function (err, text) {
                                                        if (err)
                                                            debugger

                                                        app.fs.unlink(_fileText, function (err) {
                                                            app.fs.unlink(_file, function (err) {
                                                                //app.fs.unlink(_file)
                                                                var _lines = []
                                                                t = text.replace(/"/g, "").split('\n')



                                                                //t = text.split(String.fromCharCode(8212))
                                                                if (t < 2)
                                                                    debugger

                                                                //console.log(t)
                                                                //debugger

                                                                var inContrato = false
                                                                var _text = ""
                                                                var _tittle = ""
                                                                var xsep = ""
                                                                var _reg = []
                                                                var i = 0
                                                                for (i in t) {
                                                                    t[i] = ''.Trim(t[i].replace(/  /g, " "))

                                                                    if (t[i].length > 1) {
                                                                        if (!inContrato) {
                                                                            var map = ['Adjudicación contrato', 'Formalización contrato'] //, 'Concesión subvenciones']
                                                                            for (_c in map) {
                                                                                if (t[i].indexOf(map[_c]) > -1) {
                                                                                    _tittle = map[_c]
                                                                                    inContrato = true
                                                                                    //debugger
                                                                                    //_text = map[_c].length == ''.Trim(t[i]) ? "" : ''.Trim(t[i])
                                                                                }

                                                                            }
                                                                        }
                                                                        //if (!inContrato)
                                                                        //    if (map.indexOf(t[i].replace("\n","")) > -1 || t[i].indexOf('Formalización contrato') > -1 || t[i].indexOf('Concesión subvenciones') > -1)
                                                                        //        //inContrato=true

                                                                        if (inContrato && (t[i].indexOf(_tittle) == -1 || t[i].indexOfRegex(/BOCM-\d\d\d\d\d\d\d\d[-]/) > -1)) {
                                                                            if (t[i].charCodeAt(0) == 8212 || t[i].charCodeAt(1) == 32) {
                                                                                var pi = 2
                                                                                t[i] = ''.Trim(t[i].substr(pi, t[i].length - pi))
                                                                                //debugger
                                                                            }

                                                                            if (t[i].lastIndexOf("-") == t[i].length - 1) {
                                                                                _text = ''.Trim(_text) + (_text.length > 0 ? " " : "") + ''.Trim(t[i].substr(0, t[i].length - 1))
                                                                                xsep = ""
                                                                            } else {


                                                                                //debugger
                                                                                _text = ''.Trim(_text) + xsep + ''.Trim(t[i].replace(/(\s\s\W)/g, ""))
                                                                                xsep = " "
                                                                                //debugger

                                                                                var p = _text.indexOfRegex(/BOCM-\d\d\d\d\d\d\d\d[-]/)
                                                                                if (p > -1) {

                                                                                    _key = ''.Trim(_text.substr(p, _text.length - p))
                                                                                    if (_key.length > 20)
                                                                                        _key = _key.substr(0, 19)

                                                                                    while (_key.charCodeAt(_key.length - 1) > 57) {
                                                                                        _key = _key.substr(0, _key.length - 1)
                                                                                    }
                                                                                    _text = ''.Trim(_text.substr(0, p))
                                                                                    //debugger
                                                                                    while (_text.substr(_text.length - 1, 1) == ".") {
                                                                                        _text = _text.substr(0, _text.length - 1)
                                                                                    }

                                                                                    if (app._xData.Sumario.BOCM.ID_LAST != null) {
                                                                                        if (app._xData.Sumario.BOCM.ID_LAST.split("#")[1] == _key)
                                                                                            app._xData.Sumario.BOCM.ID_LAST == null
                                                                                    } else {
                                                                                        var _ok = true
                                                                                    }
                                                                                    if (_ok)
                                                                                        var Sumario = app._xData.Sumario.BOCM.SUMARIO_NEXT
                                                                                        _reg[_reg.length] = {
                                                                                            BOCM: _key, title: _tittle, concepto: _text, pdf: options.url + '_Orden_BOCM/' + Sumario.substr(7, 4) + "/" + Sumario.substr(11, 2) + "/" + Sumario.substr(13, 2) + "/" + options.type + Sumario.substr(6, 9) + ".PDF" 
                                                                                            //_Orden_BOCM/2010/02/12/BOCM-20100212-28
                                                                                        }
                                                                                    inContrato = false
                                                                                    _text = ""

                                                                                }
                                                                            }
                                                                        }
                                                                    }

                                                                }
                                                                _exit(_reg, callback)
                                                            })
                                                        })
                                                    })
                                                }
                                                //debugger


                                            })
                                        } else {
                                            _exit([], callback)
                                        }
                                    }
                                })
                            })
                        } else {
                            callback(data, url, true)
                        }
                    } else {
                        debugger
                    }
                })
                return
            },
            Preceptos: function (options, urlDoc, body, data, callback) {
                var _exit = function (text, _list, callback) {

                    var patterns = options.transforms.getPatern(options.transforms).Contratista
                    /*
                    text = text.replace(/\-\r\n/g, "").replace(/\r\n/g, " ") //, patterns)
                    var _co = text.indexOf("Contratista")
                    if (_co == -1)
                        var _co = text.indexOf("Adjudicataria:")

                    var _ci = text.indexOf('“', _co)
                    var _cf = text.indexOf('”', _ci)
                    var _cim = text.indexOf(', por un importe de ', _cf) > -1 ? text.indexOf(', por un importe de ', _cf) + ', por un importe de '.length : text.indexOf(', por importe de ', _cf) > -1 ? text.indexOf(', por importe de ', _cf) + ', por importe de '.length : text.indexOf('Base imponible:') > -1 ? text.indexOf('Base imponible:') + 'Base imponible:'.length : text.indexOf('Importe total:') > -1 ? text.indexOf('Importe total:') + 'Importe total:'.length : text.indexOf('Importe total de la adjudicación:') > -1 ? text.indexOf('Importe total de la adjudicación:') + 'Importe total de la adjudicación:'.length : text.indexOf('Importe de adjudicación:') > -1 ? text.indexOf('Importe de adjudicación:') + 'Importe de adjudicación:'.length : 0;
                    //if (_cim == 0)
                    //debugger
                    if (_cf == -1)
                        _cf = text.indexOf(".", _co)

                    if (_ci > -1) {
                        if (text.indexOf('a) Tramitación:') > -1)
                            var _pti = (text.indexOf('a) Tramitación:') + 15)


                        if (_pti == -1) {
                            if (_pti == -1 && text.indexOf('a) Adjudicación directa') > -1) {
                                _list.Tramitacion('Adjudicación directa')
                            } else {
                                debugger
                            }
                        } else {
                            _list.Tramitacion = ''.Trim(text.substr(_pti, (text.indexOf(".", _pti) - _pti)))
                        }
                        _list.importe = (''.Trim(text.substr(_cim, ((text.indexOf('euros', _cim) - (_cim))))).replace(/\D/g, "")) // * 1) /100
                        _list.contratista = options.Rutines.transforms(text.substr(_ci + 1, _cf - (_ci + 1)).toUpperCase(), patterns)

                   

                        _analisis.contratista = options.Rutines.extract(data.textExtend, 'contratista',

                            options.transforms.ADD(
                                [patterns.General,
                                patterns.Contratista,
                                patterns.especialChars,
                                patterns.exoticChars,
                                patterns.specialContratista,
                                [["F", { f: options.transforms.removeFirstChar }, ' '], ['R', new RegExp(/\./, "g"), ""]],

                                ]))




                        //Rutines.transforms(_arrT[1], patterns)
                        var _p = [
                                data.desde.substr(6, 2),                                      //Dia
                                data.desde.substr(4, 2),                                      //Mes
                                data.desde.substr(0, 4),                                       //Anyo
                             data.SUMARIO_LAST,
                             ''.Trim(_list.BOCM.substr(0, 17)),
                             _list.Tramitacion,
                             urlDoc,
                             _list.concepto.replace(/\xE2\x88/g, ""),
                             _list.contratista.substr(0, 254),
                             isNaN(_list.importe)?0:_list.importe.substr(_list.importe.length -30,30) ,
                        ]
                        console.log(_p[_p.length-1])
                        //if (isNaN(_list.importe))
                        //    _list.importe = 0
                        //if (_list.contratista.length < 255) {
                        _cadsql = "CALL Insert_Data_BOCM(1,?,?,?,?,?,?,?,?,?,?)" // VALUES ('" + ''.Trim(_list.BOCM.substr(0, 17)) + "','" + _list.contratista.substr(0, 254) + "'," + _list.importe + ");"
                        console.log(_cadsql)
                        options.SQL.db.query(_cadsql,_p, function (err, records) {
                            if (err) {
                                debugger
                            }
                            callback(data)
                        })
                    } else {
                        callback(data)
                    }*/
                }
                var _xthis = options
                var _list = data._list[data.e]
                var urlDoc = options.url +"_Orden_BOCM/" +_list.BOCM.substr(5,4) +"/" + _list.BOCM.substr(9,2) +"/"+ _list.BOCM.substr(11,2) +"/" +_list.BOCM + ".PDF"
                var _arr=[]
                var _analisis = {
                    _BOLETIN: data._list[data.e],
                    urlPdf: urlDoc,
                    Contratista: [],
                    Importe: []
                }
                    
                options.Rutines.getTextFromPdf(options, urlDoc, _arr , '.', function (_data) {
                    var textExtend = data.textExtend = _data._arr   // recojemos todo el texto en una array (con caracter final)
                    if (data.textExtend.length > 0) {
                        var patterns = options.transforms.getPatern(options.transforms)
                        _analisis.contratista = options.Rutines.extract(data.textExtend, 'contratista',

                            options.transforms.ADD(
                                [patterns.General,
                                patterns.Contratista,
                                patterns.especialChars,
                                patterns.exoticChars,
                                patterns.specialContratista,
                                [["F", { f: options.transforms.removeFirstChar }, ' '], ['R', new RegExp(/\./, "g"), ""]],

                                ]))
                        if (_analisis.contratista.length > 0) {
                            if (_analisis.contratista.indexOf("#") == -1) {
                                var _imp = options.Rutines.get.importes(data, options, patterns)
                                _analisis.importe = _imp
                                if (_analisis.importe == 0) {
                                    _analisis.importe = ""
                                    for (_l in _analisis.contratista.split(";")) {
                                        _analisis.importe = _analisis.importe + (_analisis.importe.length > 0 ? ";" : "") + isNaN(_analisis.presupuesto) ? "0.00" : data.presupuesto
                                    }
                                }
                            } else {
                                _analisis.importe = ""
                                var _e = _analisis.contratista.split(";")
                                _analisis.contratista = ""

                                for (_l in _e) {
                                    _analisis.importe = _analisis.importe + (_analisis.importe.length > 0 ? ";" : "") + _e[_l].split("#")[1]
                                    _analisis.contratista = _analisis.contratista + (_analisis.contratista.length > 0 ? ";" : "") + _e[_l].split("#")[0]
                                }
                            }
                            _analisis._tramitacion = ''.Trim(options.Rutines.extract(data.textExtend, 'Tramitación', options.transforms.General, true)).split(" ")[0]
                            _analisis._objeto = ''.Trim(options.Rutines.extract(data.textExtend, 'Descripción del objeto:', options.transforms.General, true))
                            if (_analisis.contratista != null) {
                                if (_analisis.contratista.length > 0) {
                                    if (Array.isArray(_analisis.contratista)) {
                                        var _list = _analisis.contratista

                                        var _ins = function (e, list, data, callback, _ins) {
                                            if (e < list.length) {
                                                _analisis.contratista = list[e]
                                                options.SQL.insert(options, {}, data, function (data) {
                                                    e = e + 1
                                                    _ins(e, list, data, callback, _ins)
                                                })

                                            } else {
                                                data.contratista = list
                                                callback(data)
                                            }

                                        }
                                        _ins(0, _analisis.contratista, data, callback, _ins)
                                    } else {
                                        options.SQL.insert(options, _analisis , data, function (data) {
                                            callback(data)
                                        })
                                    }
                                } else {
                                    callback(data)
                                }
                            } else {
                                callback(data)
                            }
                        } 
                    }

                }, null, null)                
                return
                    //urlDoc = _this.
                    //if (urlDoc.indexOf("   ") > -1)
                    //    debugger

                    app.Rutines(app).askToServer(app, { encoding: null, method: "GET", uri: urlDoc }, data, function (app, body, data) {
                        var xcadsql = null
                        //var turl = url.split("/")


                        var _file = app.PDFStore + _list.BOCM +".pdf" //turl[turl.length - 1]
                        var bocm = _list.BOCM //turl[turl.length - 1].split(".")[0]
                        //__this.getTextFromPdf(options, pdf, _arr, charEnd, _callback, _json, _this)
                        //punto de guardado del PDF precepto
                        if (body != null) {
                            app.mkdirp(app.PDFStore , function (err) {
                                app.fs.writeFile(_file, body, function (err) {
                                    if (err) {
                                        console.log(err)
                                        debugger
                                        callback(data)
                                    } else {

                                        console.log('file local:->' + _file)
                                        var pdf = new app.pdftotext(_file)
                                        pdf.add_options(_xthis.opcS);

                                        pdf.getText(function (err, text, cmd) {
                                            //
                                            if (err) {
                                                console.error(err);
                                                callback(data, _list)
                                        
                                            } else {
                                                //console.log(text);
                                                var _fileText = _file.split(".pdf")[0] + ".txt"
                                                console.log(_fileText)

                                                app.fs.readFile(_fileText, 'utf8', function (err, text) {
                                                    //app.fs.unlink(_fileText)
                                                    //app.fs.unlink(_file)
                                                    //debugger
                                                    var _lines = []
                                                    t = text.replace(/"/g, "").split('\n')
                                                    const stats = app.fs.statSync(_file)
                                                    const fileSizeInBytes = stats.size

                                                    app.fs.unlink(_fileText, function (err) {
                                                        if (fileSizeInBytes > 2048) {
                                                            app.fs.unlink(_file, function (err) {
                                                                _exit(text, _list, callback)
                                                            })
                                                        } else {
                                                            _exit(text, _list, callback)
                                                        }
                                                    })
                                                    
                                                })
                                            }

                                        })
                                    }
                                })
                            })

                        }
                    })
                }
            }
        }
    

   // app.commonSQL.getConnect({ SQL: { db: null } }, false, 'RELACIONES', function (_options) {
    options.vConnect = app.VisualCif
    app.commonSQL.init(options, 'BOCM', app._fileCredenciales, callback)
    //})

}