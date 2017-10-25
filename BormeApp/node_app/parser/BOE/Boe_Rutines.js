module.exports = function(app) {
    function Trim(x) {
        if (x == null)
            debugger
        return x.replace(/^\s+|\s+$/gm, '');
    }

    function pointer(point, cadena) {
        var _numero = " .0123456789"
        while (_numero.indexOf(cadena.substr(point, 1)) > -1 && point > -1) {
            point--
        }
        return (point)
    }

    return {
        pdfOpc: ['-raw', '-nopgbrk', '-enc UTF-8'],
        get: {
            principal: function($) {
                //console.log($('analisis modalidad').html())
                //if ($('analisis modalidad').html() == "Formalización contrato")
                //    debugger
                return {
                    modalidad: $('analisis modalidad').html(),
                    id: $('analisis tipo').attr('codigo'),
                    text: $('analisis tipo').html(),
                    urlPdf: $('metadatos url_pdf').html()
                }
            },
            data: function(options, data) {
                try {
                    return {
                        _BOE: data._list[data.e],
                        _cod: data.codigo.id,
                        _modalidad: data.codigo.modalidad,
                        _type: data.codigo.text,
                        _tramitacion: '',
                        urlPdf: data.codigo.urlPdf,
                        urlXml: options.url + data._list[data.e].split("-")[0].toLowerCase() + "/xml.php?id=" + data._list[data.e],
                        Contratista: [],
                        Importe: []
                    }
                } catch (err) {
                    debugger
                }
            },
            extra: function (_json) {
                var splitfunc = ['materias', 'materias_cpv' ]
                var _regex = [/\d{3}/g, new RegExp('/([0-9])\w+/g')]
                var _ret = {}
                for (i in _json) {
                    var _r = ""
                    if (i.indexOf('#') == -1 && i.indexOf('fecha_') == -1) {


                        if (_json[i]['#text'] != null)
                            _r = _json[i]['#text']

                        var p = splitfunc.indexOf(i)
                        if (p > -1 && _r.length > 0) {
                            var table = _r.split(/\n/g)
                            var keys = p<2?_r.match(/\d{3,9}/g):null
                            //if (p == 2) {
                            //    debugger
                            //}
                            for (n in table) {
                                cadsql = "call insertInTable_Aux(?,?,?)"
                                var _data_aux = [p, keys == null ? '' : keys[n], table[n].substr(keys == null ? 0 : keys[n].length + 1, table[n].length)]
                                console.log(_data_aux)
                                app.BOE.SQL.db.query(cadsql, _data_aux, function (err_aux) {
                                    if (err_aux != null)
                                        debugger
                                })
                            }
                            _r = keys ==null? table[0]:keys.join(';')
                        }
                        _ret[i] = _r
                    }
                }
                return _ret
            },
            p_parrafo: function (options, $, charEnd, body, _callback, urlDoc) {
                var _this = this
                var _lastParragraf = true
                var _arr = []

                var DOMParser = require('xmldom').DOMParser
                var xml = new DOMParser().parseFromString(body.toString())
                var _json = app.Rutines().xmlToJson(xml)
                var _areas = []
                var _content = []

                if (_json.documento.texto.dl != null) {
                    var pdf =  options.url  + _json.documento.metadatos.url_pdf["#text"]
                    app.Rutines(app).askToServer(app, { encoding: null, method: "GET", uri: pdf }, {}, function (app, body, data) {
                        var xcadsql = null
                        var turl = pdf.split("/")


                        var _file = app.PDFStore + turl[turl.length - 1]
                        var bocm = turl[turl.length - 1].split(".")[0]

                        //punto de guardado del PDF precepto
                        if (body != null) {
                            app.mkdirp( app.PDFStore , function (err) {
                                app.fs.writeFile(_file, body, function (err) {
                                    if (err) {
                                        console.log(err)
                                        debugger
                                        callback(sdata, list)
                                    } else {

                                        console.log('file local:->' + _file)
                                        var pdf = new app.pdftotext(_file)
                                        pdf.add_options(options.pdfOpc);

                                        pdf.getText(function (err, text, cmd) {
                                            if (err) {
                                                debugger
                                                console.error(err);
                                            } else {


                                                var _fileText = _file.split(".pdf")[0] + ".txt"
                                                console.log(_fileText)
                                                app.fs.readFile(_fileText, 'utf8', function (err, text) {
                                                    app.fs.unlink(_fileText, function (err) { 
                                                        app.fs.unlink(_file, function (err) {
                                                            var _lines = []
                                                            lines = text.replace(/"/g, "").split('\n')
                                                            var cadena = ""
                                                            var puntoUno = false

                                                            for (_n in lines) {
                                                                var _t = lines[_n]
                                                                if (!puntoUno && _t.indexOf('Entidad adjudicadora') > -1)
                                                                    puntoUno = true

                                                                if (puntoUno) {
                                                                    if (_t.length > 0) {
                                                                        if (_t.indexOf(')') == 1 || _t.indexOf('.') == 1 || _lastParragraf) {
                                                                            _arr[_arr.length] = _t
                                                                        } else {
                                                                            _arr[_arr.length - 1] = _arr[_arr.length - 1] + ' ' + _t
                                                                        }
                                                                        _lastParragraf = (_t.lastIndexOf(charEnd) == _t.length - 2)
                                                                    }
                                                                }
                                                            }  
                                                            _callback({ _arr: _arr, _extra: _this.extra(_json.documento.analisis) })
                                                        })
                                                    })
                                                })
                                            }
                                        })
                                    }
                                })
                            })
                        }
                    })

                } else {

                    $('p.parrafo').each(function (p, _parraf) {
                        var _t = Trim($($('p.parrafo')[p]).html())
                        if (_t.length > 0) {
                            if (_t.indexOf(')') == 1 || _t.indexOf('.') == 1){ // || _lastParragraf) {
                                _arr[_arr.length] = _t
                            } else {
                                _arr[_arr.length - 1] = _arr[_arr.length - 1] + ' ' + _t
                            }
                            //_lastParragraf = (_t.lastIndexOf(charEnd) == _t.length - 2)
                        }
                    })

                    _callback({ _arr: _arr, _extra: this.extra(_json.documento.analisis) })
                }
            },
            importes: function (data, options, patterns) {
                data.importe = "*" + options.Rutines.extract(data.textExtend, 'd) Importe ', options.transforms.ADD(
                    [patterns.General]
                ))

                var _imp = data.importe.Between('(', ')', 'euros', ".")
                if (_imp != null) {
                    if (_imp.indexOf(";") > 0) {
                        _imp= _imp.replaceAll(",", ".").split(";")
                    } else {
                        _imp.replace(",", ".")
                    }
                } else {
                    _imp = data.importe.Between('*', 's', 'pe', ".")
                    if (_imp != null) {
                        _imp = (_imp / 166.386).toFixed(2)
                    } else {
                        _imp = data.importe.Between('Importe total:', 's', 'euro', ".")
                        //if (_imp != null) {
                        //    if (_imp.indexOf(";") > 0)
                        //        debugger
                        //}
                    }
                }
                return _imp != null ? _imp : 0 
            }
        },
        transforms: function (_array, _regexp) {
            if (_array == null)
                debugger
            if (_regexp != null)
            //for (i in _array) {
                for (p in _regexp) {

                    if (_regexp[p][0] == 'F') {

                        _array = _regexp[p][1].f(this, _array, _regexp[p][2], _regexp[p][3])

                    } else {
                        //console.log(_array, p)
                        //if (p == 9)
                        //debugger
                        _array = _array.replace(_regexp[p][1], _regexp[p][2])
                            //console.log(_array, p)
                    }


                }
                //}
            return _array
        },
        extract: function(_arrayText, search, transforms) {
            //var _arr = []

            for (i in _arrayText) {
                //console.log(_arrayText[i])
                if (_arrayText[i].toLowerCase() != null)
                    if (_arrayText[i].toLowerCase().indexOf(search.toLowerCase()) > -1) {
                        _arrT = _arrayText[i].split(":")
                        if (_arrT.length > 1) {
                            if (_arrT[1].length > 1)
                                return this.transforms(_arrT[1], transforms)
                        }
                    }
            }
            return ""

        },
        removeLastChar: function(string, char) {
            if (string.lastIndexOf(char) == string.length - 1)
                string = string.substr(0, string.length - 2)
            return string
        },

    }
}