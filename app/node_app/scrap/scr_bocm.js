module.exports = function (app, callback) { 

    var options = {
        Type: 'BOCM',
        Command: app.command,
        opc: ['-table', '-raw', '-layout', '-enc UTF-8'],
        pdfOpc: ['-raw', '-enc UTF-8'],
        //pdftotext : require('../pdftotext'),
        Rutines: require('../parser/BOLETIN/__Rutines')(app),
        _common: require('../parser_common')(app),
        url: app.urlBOCM,
        SQL: {
            db: null 
        },
        scrap: {
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
                                                                var _t = text.replace(/"/g, "").split('\n')
                                                                var inContrato = false
                                                                var t = []
                                                                var _recolect = ""
                                                                var map = ['Adjudicación contrato', 'Formalización contrato','Contratación. Contrato:']

                                                                for (n in _t) {
                                                                    if (!inContrato)
                                                                        for (_c in map) {
                                                                            if (_t[n].indexOf(map[_c]) > -1) {
                                                                                _tittle = map[_c]
                                                                                inContrato = true
                                                                            }
                                                                        }
                                                                    if (_t[n].length > 1) {
                                                                        if (inContrato) {
                                                                            if (_t[n].indexOfRegex(/BOCM-\d{8}[-]\d{1,4}/) > 0) {
                                                                                BOCM = _t[n].match(/BOCM-\d{8}[-]\d{1,4}/g)[0]
                                                                                t[t.length] = { BOCM:BOCM, pdf: options.url + "_Orden_BOCM/" + BOCM.substr(5, 4) + "/" + BOCM.substr(9, 2) + "/" + BOCM.substr(11, 2) + "/" + BOCM + ".PDF" }
                                                                                inContrato = false
                                                                            }
                                                                        } else {
                                                                            if (_t[n].indexOfRegex(/BOCM-\d{8}[-]\d{1,4}/) > 0) {
                                                                                process.stdout.write('-')
                                                                            }
                                                                        }
                                                                    }
                                                                }

                                                                //t = text.split(String.fromCharCode(8212))
                                                                //if (t < 2)
                                                                //    debugger
                                                                _exit(t , callback)

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
                            process.stdout.write("fff")
                            callback(data)
                        }
                        //options.SQL.insert(options, _analisis, data, function (data) {
                        //    callback(data)
                        //})

                    }, null, null, true )
                } else {
                    callback(data,true)
                }

            }
        }
    }

   // app.commonSQL.getConnect({ SQL: { db: null } }, false, 'RELACIONES', function (_options) {
    //options.vConnect = app.VisualCif
    //app.commonSQL.init(options, 'BOCM', app._fileCredenciales + options.Command , callback)
    //})
    app.commonSQL.init(options, options.Type, app._fileCredenciales + options.Command, function (options) {
        app.commonSQL.SQL.commands.insert.AnyoRead(options, options.SQL.db, app.command, function (options) {
            callback(options)
        })
    })
}