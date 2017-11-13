module.exports = function (app, callback) {

    var options = {
        opc: ['-table', '-raw', '-layout', '-enc UTF-8'],
        pdfOpc: ['-raw', '-enc UTF-8'],
        //pdftotext : require('../pdftotext'),
        Rutines: require('../parser/BOLETIN/__Rutines')(app),
        _common: require('../parser_common')(app),
        url: app.urlBOCM,
        SQL: {
            db: null
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
                            data._list = []
                            data._analisis = _reg
                            for (n in _reg) {
                                data._list[data._list.length] = _reg[n].pdf
                            }
                            callback(data)
                            //})
                        }


                        //if (body != null) {
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
                                                    //console.log(_fileText)

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
                                                                                    if (_ok){
                                                                                        var Sumario = app._xData.Sumario.BOCM.SUMARIO_NEXT
                                                                                        process.stdout.write("+")
                                                                                    } else {
                                                                                        process.stdout.write("-")
                                                                                    }
                                                                                    _reg[_reg.length] = { BOCM: _key, title: _tittle, concepto: _text, pdf: options.url + '_Orden_BOCM/' + Sumario.substr(7, 4) + "/" + Sumario.substr(11, 2) + "/" + Sumario.substr(13, 2) + "/" + _key + ".PDF" }
                                                                                    inContrato = false
                                                                                    _text = ""

                                                                                }
                                                                            }
                                                                        } else {
                                                                            //process.stdout.write("-")
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
                        //} else {
                        //    
                        //}
                    } else {
                        //debugger
                        callback(data, url, true)
                    }
                })
                return
            },
            Preceptos: function (options, urlDoc, body, data, callback) {
                if (body != null) {
                    var _xthis = options
                    var _list = data._list[data.e]
                    var BOCM = data._analisis[data.e].BOCM.trim()
                    var urlDoc = options.url + "_Orden_BOCM/" + BOCM.substr(5, 4) + "/" + BOCM.substr(9, 2) + "/" + BOCM.substr(11, 2) + "/" + BOCM + ".PDF"
                    var _arr = []

                    var _analisis = {
                        _BOLETIN: data._analisis[data.e].BOCM,
                        _importe: "?",
                        urlPdf: urlDoc

                    }

                    options.Rutines.getTextFromPdf(options, urlDoc, _arr, '.', function (_data) {
                        if (_data != null) {
                            if (_data._arr.length == 0) {
                                app.commonSQL.SQL.commands.insert.errores(options,_analisis._BOLETIN, 'CONTENIDO NO STANDART', urlDoc, function () {
                                    process.stdout.write("xxx")
                                    callback(data)
                                })
                                //cadsql = "INSERT INTO errores (BOLETIN, SqlMensaje, SqlError) VALUES ('" + _analisis._BOLETIN + "','CONTENIDO NO STANDART','" + urlDoc + "')"
                                //app.BOLETIN.SQL.db.query(cadsql, function (err, rec) {
                                //    process.stdout.write("xxx")
                                //    callback( data)
                                //})
                            } else {
                                data.textExtend = _data._arr
                                app.commonSQL.SQL.commands.insert.Boletin.text(options, _analisis, data, function (data) {
                                    callback(data)
                                })
                            }
                        } else {
                            callback(data)
                        }
                        //options.SQL.insert(options, _analisis, data, function (data) {
                        //    callback(data)
                        //})

                    }, null, null)
                } else {
                    callback(data,true)
                }

            }
        }
    }

   // app.commonSQL.getConnect({ SQL: { db: null } }, false, 'RELACIONES', function (_options) {
    //options.vConnect = app.VisualCif
    app.commonSQL.init(options, 'BOCM', app._fileCredenciales, callback)
    //})

}