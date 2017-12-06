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

    _ = app._

    return {
        pdfOpc: ['-raw', '-nopgbrk', '-enc UTF-8'],
        get: {
            principal: function($) {

                return {
                    modalidad: $('analisis modalidad').html(),
                    id: $('analisis tipo').attr('codigo'),
                    text: $('analisis tipo').html(),
                    urlPdf: $('metadatos url_pdf').html(),
                    importe: $('analisis importe').html(),
                    ambito_geografico: $('analisis ambito_geografico').html(),
                    materias_cpv: $('analisis materias_cpv').html(),
                }
            },
            data: function(options, data) {

                    return {
                        _BOLETIN: data._list[data.e],
                        _cod: data.codigo.id,
                        _modalidad: data.codigo.modalidad,
                        _type: data.codigo.text,
                        _tramitacion: '',
                        _importe: data.codigo.importe,
                        _ambito_geografico: data.codigo.ambito_geografico,
                        _materias_cpv: data.codigo.materias_cpv,
                        urlPdf: data.codigo.urlPdf,
                        urlXml: options.url  + data._list[data.e],
                        //Contratista: [],
                        //Importe: []
                    }
            },
            extra: function (_json,scrap) {
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
                            if (!scrap) {
                                for (n in table) { 
                                    var _data_aux = [p, keys == null ? '' : keys[n], table[n].substr(keys == null ? 0 : keys[n].length + 1, table[n].length)]
                                    //console.log(_data_aux)
                                    app.BOLETIN.SQL.db.query("call insertInTable_Aux(?,?,?)", _data_aux, function (err_aux) {
                                        if (err_aux != null)
                                            debugger
                                    })
                                }
                                _r = keys == null ? table[0] : keys.join(';')
                            } else {
                                _r = table.join(';')
                            }
                        }
                        _ret[i] = _r
                    }
                }
                return _ret
            },
            p_parrafo: function (options, $, charEnd, body, _callback, urlDoc, __this, onlyScrap) {
                var _this = this
                var _lastParragraf = true
                var _arr = []

                var DOMParser = require('xmldom').DOMParser
                var xml = new DOMParser().parseFromString(body.toString())
                var _json = app.Rutines().xmlToJson(xml)
                var _areas = []
                var _content = []
                var err = null

                if (_json.documento.texto.dl != null) {
                    var pdf =  options.url  + _json.documento.metadatos.url_pdf["#text"]
                    __this.getTextFromPdf(options, pdf, _arr, charEnd, _callback, _json, _this, onlyScrap)
                } else {

                    $('p.parrafo').each(function (p, _parraf) {
                        var _t = Trim($($('p.parrafo')[p]).html())
                        if (_t.length > 0) {
                            if ((_t.indexOf(')') == 1 || _t.indexOf('.') == 1) && _t.substr(2,1)==" " ){ // || _lastParragraf) {
                                _arr[_arr.length] = _t
                            } else {
                                if (_arr.length > 0) {
                                    if (err!=null) {
                                        _arr[_arr.length - 1] = _arr[_arr.length - 1] + ' ' + _t
                                    } else {
                                        _arr[_arr.length ] = _t
                                    }
                                } else {
                                    err = "CONTENIDO NO STANDART"
                                    _arr[0] = _t
                                }
                            }
                            //_lastParragraf = (_t.lastIndexOf(charEnd) == _t.length - 2)
                        }
                    })
                    var _extra = {
                        _a: this.extra(_json.documento.analisis, onlyScrap),
                        _m: this.extra(_json.documento.metadatos, onlyScrap)
                    }
                    _callback({ _arr: _arr, _extra: _extra ,_err:err })
                }
            },
            importes: function (_text, data, options, patterns) {
                var importe = "*"

                if (data.Lotes != null)
                    importe = "*" + options.Rutines.extract(options, _text, 'Importe de la adjudicación:', options.transforms.ADD([ patterns.General, patterns.Importes ]), true)




                if (importe == "*")
                    importe = "*" + options.Rutines.extract(options, _text, 'Importe', options.transforms.ADD(
                        [patterns.General,
                        patterns.Importes]
                    ))

                

                var _imp = importe.replace("*","")
                //if (data.Empresa.split(";").length != importe.split(";").length && data.Lotes == null) {
                //    var _imp = this.adaptImportes(options, importe.replace("*", ""), data)
                //} else {
                //    var _imp = importe
                //}

                return _imp != null ? _imp : 0 
            },
            adaptImportes: function (options, _dataimporte, data) {

                function isNumeric(n) {
                    return !isNaN(parseFloat(n)) && isFinite(n);
                }

                if (_dataimporte.indexOf(';') == -1) {
                    if (!isNaN(_dataimporte)) {
                        _imp = _dataimporte
                    } else {
                        if (_dataimporte.indexOf(',') > -1) {
                            var _imp = _dataimporte.Between('(', ')', 'euros', ".")
                        } else {
                            var _imp = _dataimporte.Between('(', ')', 'euros', ",")
                        }

                        if (_imp != null) {
                            if (_imp.indexOf(";") > 0) {
                                _imp = _imp.replaceAll(",", ".").split(";")
                            } else {
                                _imp.replace(",", ".")
                            }
                        } else {
                            _imp = _dataimporte.Between('*', 's', 'pe', ".")
                            if (_imp != null) {
                                _imp = (_imp / 166.386).toFixed(2)
                            } else {
                                _imp = _dataimporte.Between('Importe total:', 's', 'euro', " ")
                                if (_imp == null) {
                                    _imp = _dataimporte.Between('Importe total:', 's', 'euro', ".")

                                    if (_imp == null) {
                                        if (_dataimporte.indexOf(";") > 0) {
                                            debugger
                                        } else {
                                            _imp = data.presupuesto
                                        }
                                    }
                                }
                            }
                        }
                    }
                } else {
                    var _impT = _dataimporte.replace(', y "',";").split(";")
                    var _imp = []
                    var _empImp=[]
                    _.forEach(_impT, function (value) {
                        var _vx = (value.toLowerCase().match(/\(([^()]*euros[^()]*)\)/) || [])
                        var _m = 1
                        if (_vx.length > 1) {
                            _imp[_imp.length] = _vx[1]
                        } else {
                            var _vx = (value.toLowerCase().match(/\(([^()]*pesetas[^()]*)\)/) || [])
                            
                            if (_vx.length > 0) {
                                var _m = 166.386
                                _imp[_imp.length] = _vx[0]
                            } else {
                                var _vx = (value.toLowerCase().match(/(\d+(\.\d{3})+?) (?:de )?(pesetas|euros)/) || [])
                                if (_vx.length > 0) {
                                    if(_vx[0].indexOf('pesetas')>-1){
                                        var _m = 166.386
                                        _imp[_imp.length] = _vx[0].replaceAll(" de ", "").replaceAll(".", ",")
                                    }else{
                                        _imp[_imp.length] = _vx[0]
                                    }

                                    
                                } else {
                                    if (isNumeric(value)) {
                                        _imp[_imp.length] = value
                                    } else {
                                        debugger
                                    }

                                }
                            }
                        }
                       
                            if (value.indexOf('".') > -1) {
                                _vs = value.split('".')[0].toLowerCase()
                            } else {
                                if (value.indexOf('",') > -1) {
                                    _vs = value.split('",')[0].toLowerCase() //
                                } else {
                                    if (isNumeric(value)) {
                                        _vs = value
                                    } else {
                                        debugger
                                    }
                                }
                            }
                            _empImp[_empImp.length] = _.deburr(options.Rutines.transforms(_vs, options.transforms.ADD(
                                       [
                                       options.patterns.General,
                                       options.patterns.Contratista,
                                       options.patterns.especialChars,
                                       options.patterns.exoticChars,
                                       options.patterns.specialContratista,
                                       options.patterns.sinBlancos,
                                       options.patterns.sinPuntos
                                       ]))
                              ).toLowerCase()
                            

                    })
                    if (data.Empresa.indexOf("UTE ") == -1) {

                        var _emp = data.Empresa.split(";")
                        var _test = []
                        var _moneda = ""
                        for (n in _emp) {
                            _empresa = _.deburr(_.camelCase(_emp[n])).toLowerCase()
                            var _n = _empImp.indexOf(_empresa)
                            importe = _imp[_n] != null ? _imp[_n] : (data.presupuesto != null ? data.presupuesto:0)
                            if (!isNumeric(importe)) {
                                if (importe.indexOf("euros") > 0 || importe.indexOf(_moneda) == -1) {
                                    _moneda = "euros"
                                    if (importe.indexOf(_moneda) > -1) {
                                        _i = importe.split(_moneda)[0]
                                    } else {
                                        _i = importe
                                    }
                                    if (_i.indexOf(",") == -1)
                                        _i = _.trim(_i).replaceAll(".", "") + ".00"
                                    else {
                                        _i = _.trim(_i).replace(",", "#").replaceAll(".", "").replace("#", ".")
                                    }
                                    if (isNumeric(_i)) {

                                        _test[_test.length] = parseFloat(_i).toFixed(2)
                                    } else {
                                        _test[_test.length] = data.presupuesto
                                    }
                                } else {
                                    if (importe.indexOf("pesetas") > 0 || importe.indexOf(_moneda) == -1) {
                                        _moneda = "pesetas"
                                        if (importe.indexOf(_moneda) > -1) {
                                            _i = importe.split(_moneda)[0]
                                        } else {
                                            _i = importe
                                        }
                                        if (isNumeric(_i)) {
                                            _test[_test.length] = parseFloat(_i) / 166.386
                                            _test[_test.length - 1] = _test[_test.length - 1].toFixed(2)
                                        } else {
                                            _test[_test.length] = data.presupuesto
                                        }
                                    } else {
                                        if (isNumeric(importe)) {
                                            _test[_test.length] = parseFloat(importe)
                                        } else {
                                            debugger
                                        }
                                    }

                                }
                            } else {
                                _test[_test.length] = importe
                            }
                        }
                    } else {
                        _test = [_imp[0]]
                    }
                    _imp = _test.join(';')
                }
                return _imp
            }
        },
        transforms: function (_array, _regexp) {
            ////if (_array == null)
            if (_array != null) 
                if (_regexp != null)
                    //for (i in _array) {
                    for (p in _regexp) {

                        if (_regexp[p][0] == 'F') {
                            if (_array != null) {
                                _array = _regexp[p][1].f(this, _array, _regexp[p][2], _regexp[p][3])
                            } else {
                                _array = ""
                            }
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
        getNextPointItem: function (string, _arrayT, _p) {
            var p=1
            var _ret = ""
            var regexp = new RegExp(p + "\.")
            var ok = (_arrayT[_p].match(regexp) || []).length == 1
            while (ok && _p < _arrayT.length) {

                _ret = _ret + (_ret.length > 0 ? ";" : "") + _arrayT[_p].replace(regexp, "")
                _p++
                p++
                if (_p < _arrayT.length) {
                    regexp = new RegExp(p + ".")
                    ok = (_arrayT[_p].match(regexp) || []).length == 1
                } else {
                    ok = false
                }
            }
            return _ret

        },
        extract: function(options, _arrayText, search, transforms, simple) {
            
            var _Linea = ""
            for (i in _arrayText) {
                //console.log(_arrayText[i])
                if (_arrayText[i].toLowerCase() != null) {
                    if (_arrayText[i].toLowerCase().indexOf(search.toLowerCase()) > -1) {
                        //PUNTO DE PARADA : _arrayText[i] = la linea del texto ya esta encontrada
                        _Linea = this.transforms(_arrayText[i].replaceAll(/\n/, ""), transforms)
                    }
                }
            }
            if (_Linea.indexOf(":") > -1) {
                return _Linea.split(":")[1]  //.join(';')
            } else {
                return _Linea
            }

        },
        removeLastChar: function(string, char) {
            if (string.lastIndexOf(char) == string.length - 1)
                string = string.substr(0, string.length - 2)
            return string
        },
        getTextFromPdf: function (options, pdf, _arr, charEnd, _callback, _json, _this, onlyScrap) {
            app.Rutines(app).askToServer(app, { encoding: null, method: "GET", uri: pdf }, _arr, function (app, body, data) {
                var xcadsql = null
                var turl = pdf.split("/")


                var _file = app.PDFStore + turl[turl.length - 1].toLowerCase()
                //var bocm = turl[turl.length - 1].split(".")[0]

                //punto de guardado del PDF precepto
                if (body != null) {
                    app.mkdirp(app.PDFStore, function (err) {
                        app.fs.writeFile(_file, body, function (err) {
                            if (err) {
                                console.log(err)
                                
                                callback(sdata, list)
                            } else {

                                //console.log('file local:->' + _file)
                                var pdf = new app.pdftotext(_file)
                                pdf.add_options(options.pdfOpc);

                                pdf.getText(function (err, text, cmd) {
                                    if (err) {
                                        //debugger
                                        app.commonSQL.SQL.commands.insert.errores(options, turl[turl.length - 1], err.cmd,err.message,function(err,record){
                                            //console.error(err);
                                            _callback(null)
                                        })
                                    
                                    } else {


                                        var _fileText = _file.split(".pdf")[0] + ".txt"
                                        //console.log(_fileText)
                                        app.fs.readFile(_fileText, 'utf8', function (err, text) {
                                            app.fs.unlink(_fileText, function (err) {
                                                app.fs.unlink(_file, function (err) {
                                                    var _lines = []
                                                    lines = text.replace(/"/g, "").replace(/\r/g, "").split('\n')
                                                    var cadena = ""
                                                    var puntoUno = false
                                                    var _lastParragraf = false

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

                                                    var _extra = _json!=null ? {
                                                        _a: _this.extra(_json.documento.analisis, onlyScrap),
                                                        _m: _this.extra(_json.documento.metadatos, onlyScrap)
                                                    } : null

                                                    if (_arr.length < 0)
                                                        debugger

                                                    _callback({ _arr: _arr, _extra: _json != null ? _extra : null })
                                                })
                                            })
                                        })
                                    }
                                })
                            }
                        })
                    })
                } else {
                    _callback(null)
                }
            })
        },
        normalizeTextContrato: function (arrayT, _keys, callback) {
        var _iniline = [":"]
        var _finline = ["."]
        var _lines = []
        var preline = ""

        valInKeys = function (text, _keys) {
            var _found = 0
            var _n = 0
            _.forEach(_keys, function(value){
                _n++
                if(text.indexOf(value)>-1)
                    _found = _n
            })
            return _found 
        }

        //debugger
        var _lastValp = -1
        _.forEach(arrayT, function (value) {

            var _text = arrayT
            var _lchar = value.substr(value.length - 1, 1)
            if ((value.match(/^\d{1,2}\./) || []).length ==0) {
                
                if ((value.match(/^\w{1}\)/) || []).length > 0) {
                    if (preline.length > 0) {
                        _lines[_lines.length] = preline
                        preline=''
                    }
                    if (_finline.indexOf(_lchar) > -1) {
                        if (valInKeys(value, _keys))
                            _lines[_lines.length] = value.substr(3, value.length)
                    } else {
                        preline = value.substr(3, value.length - 2)
                    }
                } else {
                    if (_finline.indexOf(_lchar) > -1) {
                        var _valp = valInKeys(preline, _keys)
                        if (_valp > 0) {
                            if (_valp < _keys.length-1) {
                                //if (_valp-1 == 10)
                                    //debugger
                                if (_lastValp != _valp) {
                                    _lastValp = _valp
                                    if( (value.match(/\d{0,2}\.+$/)||[]).length==0 ){
                                        _lines[_lines.length] = preline + ' ' + value
                                        preline = ''
                                    } else {
                                        if (_finline.indexOf(_lchar) == -1) {
                                            preline = preline + ' ' + value
                                        }else{
                                            _lines[_lines.length] = preline + ' ' + value
                                            preline = ''
                                        }
                                    }
                                    
                                } else {
                                    preline = preline + ' ' + value
                                }
                            } else {
                                if (preline.length > 0) {
                                    preline = preline + ' ' + value
                                    //preline = ''


                                    var _v = preline.split('.-')
                                    var _cargo = _v[1].split(",")[0]
                                    var _firma = _v[1].split(",")[1]

                                    _lines[_lines.length] = 'cargo:' + _cargo
                                    _lines[_lines.length] = 'firma:' + _firma
                                }
                            }
                        } else {
                            preline = ''
                        }
                        //preline=''
                    } else {
                        preline = preline + ' ' + value
                    }
                    //debugger
                }
            }

        })
            var _ret = []
        _.forEach(_lines, function (value) {
            if (value.indexOf(":") > -1)
                if (value.split(":")[1].length>0)
                    _ret[_ret.length] = _.upperFirst(_.words(value.split(":")[0])[0].toLowerCase()) + ":" + value.split(":")[1]
        })

        callback(_ret)
            //debugger
    }
    }
}