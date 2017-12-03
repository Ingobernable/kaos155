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

                var importe = "*" + options.Rutines.extract(_text, 'Importe de la adjudicación:', options.transforms.ADD(
                        [patterns.General,
                        patterns.Importes]
                ))
                if (importe == "*")
                    importe = "*" + options.Rutines.extract(_text, 'Importes de las adjudicaciones:', options.transforms.ADD(
                        [patterns.General,
                        patterns.Importes]
                    ))
                if (importe == "*")
                    importe = "*" + options.Rutines.extract(_text, 'd) Importe ', options.transforms.ADD(
                        [patterns.General,
                        patterns.Importes]
                    ))



                if (importe == "*")
                    importe = "*" + options.Rutines.extract(_text, 'Importe total:', options.transforms.ADD(
                        [patterns.General,
                        patterns.Importes]
                    ))

                

                var _imp = this.adaptImportes(importe.replace("*",""), data )

                return _imp != null ? _imp : 0 
            },
            adaptImportes: function (_dataimporte, data) {

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
                    var _imp = _dataimporte.replace("*", " ").split(";")
                    if (data.contratista.indexOf("UTE ") == -1) {

                        var _emp = data.contratista.split(";")
                        var _test = []
                        var _moneda = ""
                        for (n in _emp) {
                            importe = _imp[n] != null ? _imp[n] : (data.presupuesto != null ? data.presupuesto:0)
                            if (!isNumeric(importe)) {
                                if (importe.indexOf("euros") > 0 || importe.indexOf(_moneda) == -1) {
                                    _moneda = "euros"
                                    if (importe.indexOf(_moneda) > -1) {
                                        _i = importe.split(_moneda)[0]
                                    } else {
                                        _i = importe
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
        extract: function(_arrayText, search, transforms, simple) {
            var _arrT = []

            for (i in _arrayText) {
                //console.log(_arrayText[i])
                if (_arrayText[i].toLowerCase() != null) {
                    if (_arrayText[i].toLowerCase().indexOf(search.toLowerCase()) > -1) {
                        //PUNTO DE PARADA : _arrayText[i] = la linea del texto ya esta encontrada
                        _arrayText[i] = _arrayText[i].replaceAll(/\n/, "")
                        var test = _arrayText[i].toLowerCase().indexOf(":") == _arrayText[i].length - 1
                        if( ((_arrayText[i].toLowerCase().match(/1\. /) || []).length > 0 || test) && !simple)
                            _arrayText[i] = this.getNextPointItem(_arrayText[i], _arrayText, test?(i*1)+1:i) //, function (string) { return (string.match(/\d{1}\. /) || []).length > 0 })

                        if (_arrayText[i].toLowerCase().indexOf('presupuesto')>0 && _arrayText[i].toLowerCase().indexOf('importe total')>-1) {
                            var _arrT = _arrayText[i].toLowerCase().split('importe total')
                            if (_arrT[1].indexOf("euros") > -1) {
                                if (_arrT[1].match(/\.\d{2}\ /g) != null) {
                                    return this.transforms((_arrT[1].replaceAll("(euros)", "euros").replaceAll(",", "#").replaceAll(".", "").replaceAll("#", ".").match(/\d{1,8}\.\d{2} euros/g) ||["0.00"])[0], transforms)
                                } else {
                                    if ((_arrT[1].match(/su valor en euros es de \d{1,8}\.{0,1}\d{0,3}/g) || []).length > 0) {
                                        return this.transforms(_arrT[1].match(/su valor en euros es de \d{1,8}\.{0,1}\d{0,3}/g)[0].match(/\d{1,8}\.{0,1}\d{0,3}/g)[0], transforms)
                                    } else {
                                        if ((_arrT[1].match(/su valor en euros es \d{1,8}\.{0,1}\d{0,3}/g) || []).length > 0) {
                                            return this.transforms(_arrT[1].match(/su valor en euros es \d{1,8}\.{0,1}\d{0,3}/g)[0].match(/\d{1,8}\.{0,1}\d{0,3}/g)[0], transforms)
                                        } else {
                                            return this.transforms((_arrT[1].replaceAll(") euros", " euros").replaceAll("(euros)", "euros").replaceAll(",", "#").replaceAll(".", "").replaceAll("#", ".").match(/\d{1,8}\.{0,1}\d{0,3} euros/g)||["0.00"])[0], transforms)
                                        }
                                    }
                                }
                            } else {
                                if (_arrT[1].indexOf("de pesetas") > -1) {
                                    return this.transforms(_arrT[1].replaceAll(")", "").replaceAll(".", "").match(/\d{1,10}\ de pesetas/g)[0].replaceAll("de ", ""), transforms)
                                } else {
                                    if (_arrT[1].indexOf("pesetas") > -1) {
                                        return this.transforms((_arrT[1].replaceAll(".", "").match(/\d{1,10}\ pesetas/g)||["0.00"])[0], transforms)
                                    } else {
                                        if (_arrT[1].match(/\.\d{2}\ /g) == null) {
                                            if (_arrT[1].replaceAll(".", "").match(/\d{1,10}/g)!=null){
                                                var i = _arrT[1].replaceAll(".", "").match(/\d{1,10}/g)[0]
                                                return this.transforms(i + ' pesetas', transforms)
                                            }else{
                                                return "0.00 euros"
                                            }
                                        } else {
                                            return "0.00 euros"
                                        }
                                    }
                                }
                            }
                        } else {
                            if (_arrayText[i].toLowerCase().indexOf('descripción') > 0 || _arrayText[i].toLowerCase().indexOf('contratista') > 0 || (_arrayText[i].match(/\d{1,3}(?:\.\d{3})*/)||[]).length==0 ||  (_arrayText[i].toLowerCase().indexOf('lote') == -1 && search.toLowerCase().indexOf('importe') == -1)) {
                                var _c = _arrayText[i].match(/"([^"]*)"|'([^']*)'|“[^]*”/g) || []
                                var _pesetas = _arrayText[i].match(/\d{1,3}(?:\.\d{3})* pesetas/g) || []
                                var _euros = _arrayText[i].match(/\d{1,3}(?:\.\d{3})* euros/g) || []
                                if (_pesetas.length > 0 || _euros.length > 0) {
                                    for (_n in _c) {
                                        if (_pesetas.length == _c.length || _euros.length == _c.length) {
                                            if (_pesetas.length > 0 && _pesetas.length>_n)
                                                var _m = (_pesetas[_n].replace("pesetas", "").replaceAll(".", "") * 1) / 166.386
                                            if (_euros.length > 0 && _euros.length > _n)
                                                var _m = _euros[_n].replace("euros", "").replaceAll(",", "#").replaceAll(".", "").replaceAll("#", ".") * 1
                                            if (_euros.length > _n || _pesetas.length > _n) {
                                                _arrT[_arrT.length] = this.transforms(_c[_n], transforms) + "#" + _m.toFixed(2)
                                            } else {
                                                _arrT[_arrT.length] = this.transforms(_c[_n], transforms) + "#0.00"
                                            }
                                        } else {
                                            
                                            var pi = _arrayText[i].toLowerCase().indexOf('por un importe de') + 'por un Importe de'.length
                                            var pf = _arrayText[i].toLowerCase().indexOf('euros') 
                                            if (pi > 0 && pf > 0 && pi < pf) {
                                                _arrT[_arrT.length] = this.transforms(_c[_n]  , transforms)+ "#" + (_arrayText[i].substr(pi,pf-pi).replace(".","")*1).toFixed(2)
                                            }
                                        }
                                    }
                                    return _arrT.join(";")
                                } else {
                                    if ((_arrayText[i].match(/:/g) || []).length > 0 && (_arrayText[i].indexOf("pesetas") == -1 && _arrayText[i].indexOf("euros") == -1)) {
                                        var _arrT = _arrayText[i].split(":")
                                        if (_arrT.length > 1) {
                                            if (_arrT[1].length > 1)
                                                if ((_arrayText[i].toLowerCase().match(/lote número \d{1,2}\,/g) || []).length == 0) {
                                                    return [this.transforms(_arrT[1].indexOf(' Desierto') > -1 ? null : _arrT[1], transforms)].join(";")
                                                } else {
                                                    var _retT = []
                                                    var _t = _arrT[1].toLowerCase().replace(/lote número \d{1,3}\,/g, "").replace(/\"/g, "").split(".")
                                                    for (_n in _t) {
                                                        if (_t[_n].length > 0)
                                                            _retT[_retT.length] = this.transforms(_t[_n], transforms)
                                                    }
                                                    return _retT.join(";")
                                                }
                                        }
                                    } else {
                                        if (_arrayText[i].indexOf('. "') > -1) {
                                            var _arrT = _arrayText[i].replaceAll(":", "#").split('. "')
                                        } else {
                                            if (_arrayText[i].indexOf('. ') > -1) {
                                                var _arrT = _arrayText[i].replaceAll(":", "#").split('. ')
                                            }
                                        }
                                        for (_n in _arrT) {
                                            if (_arrT[_n] != null) {
                                                if (_arrT[_n].toLowerCase().indexOf(search.toLowerCase() + "s#") > -1) {
                                                    _arrT[_n] = _arrT[_n].substr(_arrT[_n].toLowerCase().indexOf("s# ") + 3, _arrT[_n].length)
                                                }
                                                var _arrTs = _arrT[_n].split('#')
                                                if (_arrTs[0].toLowerCase().indexOf(search.toLowerCase()) > -1) {
                                                    _arrTs.splice(0, 1)
                                                }

                                                var _arrTse = this.transforms(_arrTs[0], transforms)
                                                if (_arrTs.length > 1) {
                                                    if (_arrTs[1].indexOf("euros") > 0) {
                                                        if (_arrTs[1].indexOf("(") > 0) {
                                                            _arrTsm = _arrTs[1].split("(")[1].split('euros')[0].replace(",", "#").replace(".", "").replace("#", ".") * 1
                                                        } else {
                                                            if (_arrTs[1].indexOf("/") > 0) {
                                                                _arrTsm = _arrTs[1].split("/")[1].split('euros')[0].replace(",", "#").replace(".", "").replace("#", ".") * 1
                                                            } else {
                                                                _arrTsm = _arrTs[1].split('euros')[0].replace(",", "#").replace(".", "").replace("#", ".") * 1
                                                            }
                                                        }
                                                    } else {
                                                        if (_arrTs[1].indexOf("pesetas") > 0) {
                                                            _arrTsm = _arrTs[1].split("pesetas")[0]
                                                            _arrTsm = (_arrTsm.replaceAll(".", "") * 1) / 166.386
                                                        } else {
                                                            _arrTsm = 0
                                                        }
                                                    }
                                                } else {
                                                    _arrTsm = 0
                                                }
                                                if (_arrTsm > 0) {
                                                    _arrT[_n] = _arrTse + "#" + _arrTsm.toFixed(2)
                                                } else {
                                                    _arrT[_n] = _arrTse
                                                }
                                            }
                                        }
                                        //return _arrT.join(';')
                                    }
                                }
                            } else {
                                if (_arrayText[i].indexOf(";") > -1 && _arrayText[i].indexOf(":") > -1 && _arrayText[i].indexOf(".-") == -1) {
                                    _arrT = _arrayText[i].substr(_arrayText[i].indexOf(": ") + 1, _arrayText[i].length).split(";")
                                    for (n in _arrT) {
                                        //if (_arrT[n].length>0 && )
                                        if (_arrT[n].indexOf(": ") > -1) {
                                            _arrT[n] = this.transforms(_arrT[n].split(": ")[1], transforms)
                                        } else {
                                            _arrT[n] = this.transforms(_arrT[n])
                                        }
                                    }
                                    return _arrT.join(";")
                                } else {
                                    if (_arrayText[i].toLowerCase().indexOf('lote número') > -1 && _arrayText[i].toLowerCase().indexOf('.') > -1 && _arrayText[i].indexOf(": ") > -1) {
                                        _arrT = _arrayText[i].substr(_arrayText[i].indexOf(": ") + 1, _arrayText[i].length).split(". ")
                                        var _ret = []
                                        for (n in _arrT) {
                                            //if (_arrT[n].length>0 && )
                                            if (_arrT[n].toLowerCase().indexOf('lote número') > -1) {
                                                _ret[_ret.length] = this.transforms(_arrT[n].toLowerCase().replace(/lote número \d{1,2},/g, ""), transforms)
                                            } else {
                                                if (_arrT[n].match(/\w/g).length == 0 || (_arrT[n].indexOf("pesetas") > 0 || _arrT[n].indexOf("euros") > 0))
                                                    _ret[_ret.length] = this.transforms(_arrT[n], transforms)
                                            }
                                        }
                                        return _ret.join(";")
                                    } else {
                                        if (_arrayText[i].indexOf("euros") > 0) {
                                            if ((_arrayText[i].match(/\d\,\d{3} euros/) || []).length > 0) {
                                                _arrT = (_arrayText[i].match(/\d{1,3}(?:\.\d{3})*,\d{3} euros/g) ||[])
                                            } else {
                                                if ((_arrayText[i].match(/\d\,\d{2} euros/) || []).length > 0) {
                                                    _arrT = (_arrayText[i].match(/\d{1,3}(?:\.\d{3})*,\d{2} euros/g) || []) //.split("euros)")
                                                } else {
                                                    if (_arrayText[i].indexOf(") euros") > -1) {
                                                        if ((_arrayText[i].match(/\d\,\d{2} euros/) || []).length > 0) {
                                                            _arrT = (_arrayText[i].replaceAll(") euros", " euros").match(/\d{1,3}(?:\.\d{3})*,\d{2} euros/g) || [])
                                                        } else {
                                                            _arrT = (_arrayText[i].replaceAll(") euros", " euros").match(/\d{1,3}(?:\.\d{3})*\ euros/g) || [])
                                                        }
                                                    } else {
                                                        if ((_arrayText[i].match(/\d\,\d{2}/) || []).length > 0) {
                                                            _arrT = (_arrayText[i].match(/\d{1,3}(?:\.\d{3})*,\d{2}/g)||[])
                                                        } else {
                                                            if ((_arrayText[i].match(/\d\,\d{3}/) || []).length > 0) {
                                                                _arrT = (_arrayText[i].match(/\d{1,3}(?:\.\d{3})*,\d{3}/g) || [])
                                                            } else {
                                                                if ((_arrayText[i].match(/\d{1,3}(?:\.\d{3})*\ euros/g) || []).length > 0) {
                                                                    _arrT = (_arrayText[i].match(/\d{1,3}(?:\.\d{3})*\ euros/g) || [])
                                                                } else {
                                                                    _arrT = []
                                                                }
                                                                //debugger
                                                            }
                                                        }
                                                        
                                                    }
                                                }
                                            }
                                           // for (n = 0;n < _arrT.length;n++) {
                                           ////     _arrT[n] = _arrT[n].replace("euros", "")
                                            //}
                                        } else {

                                            if (_arrayText[i].indexOf("Ninguno") > 0) {
                                                _arrT = []
                                            } else {
                                                _arrT = []
                                                if ((_arrayText[i].match(/\d{1,3}(?:\.\d{3})*,\d{2}/) || []).length>0 ) {
                                                    _arrT = [_arrayText[i].match(/\d{1,3}(?:\.\d{3})*,\d{2}/)[0]]
                                                } else {
                                                    if ((_arrayText[i].match(/\d{1,3}(?:\.\d{3})* pesetas/g) || []).length > 0) {
                                                        _arrT = (_arrayText[i].match(/\d{1,3}(?:\.\d{3})* pesetas/g)||[])
                                                        for (_n in _arrT) {
                                                            _arrT[_n] = (_arrT[_n].replaceAll("pesetas","").replaceAll(".", "") / 166.386).toFixed(2)
                                                        }
                                                    } else {
                                                        if ((_arrayText[i].match(/\d{1,3}(?:\.\d{3})* de pesetas/g) || []).length > 0) {
                                                            _arrT = (_arrayText[i].match(/\d{1,3}(?:\.\d{3})* de pesetas/g) || [])
                                                            for (_n in _arrT) {
                                                                _arrT[_n] = (_arrT[_n].replaceAll("de pesetas", "").replaceAll(".", "") / 166.386).toFixed(2)
                                                            }
                                                        } else {
                                                            _arrT = []
                                                        }
                                                        
                                                        //debugger
                                                    }
                                                }     
                                            }
                                        }
                                        _ret = []
                                        if (_arrT.length > 0) {
                                            var _ret = []
                                            for (_n = 0; _n < _arrT.length; _n++) {
                                                _arrT[_n] = _arrT[_n].replace("euros", "")

                                                if (_arrT[_n].indexOf(":") > -1)
                                                    _arrT[_n] = _arrT[_n].split(":")[1]
                                                if (_arrT[_n].indexOf(') (') > -1)
                                                    _arrT[_n] = _arrT[_n].split(") (")[1]

                                                if (_arrT[_n].indexOf('(') > -1)
                                                    _arrT[_n] = _arrT[_n].split("(")[1]

                                                _arrT[_n] = _arrT[_n].replace(/\./g, "")
                                                _arrT[_n] = _arrT[_n].replace(/\,/g, ".")
                                                if (_arrT.indexOf("pesetas") > 0)
                                                    _arrT[_n] = _arrT[_n].split("pesetas")[0]

                                                if (isNaN(_arrT[_n])) {
                                                    _arrT[_n] = "0.00"
                                                } else {
                                                    _arrT[_n] = _arrT[_n] * 1
                                                    _arrT[_n] = _arrT[_n].toFixed(2)
                                                    _ret[_ret.length] = _arrT[_n]
                                                }
                                            }
                                            if (_ret.length > 0) {
                                                return _ret.join(';')
                                            } else {
                                                return null
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return _arrT.join(';')

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

        _.forEach(arrayT, function(value){
            var _lchar = value.substr(value.length - 1, 1)
            if ((value.match(/^\d{1,2}\./) || []).length ==0) {

                if ((value.match(/^\w{1}\)/) || []).length > 0) {
                    if (_finline.indexOf(_lchar) > -1) {
                        if (valInKeys(value, _keys))
                            _lines[_lines.length] = value.substr(3, value.length)
                    } else {
                        preline = value 
                    }
                } else {
                    if (_finline.indexOf(_lchar) > -1) {
                        var _valp = valInKeys(preline, _keys)
                        if (_valp>0)
                            if (_valp < _keys.length) {
                                _lines[_lines.length] = preline.substr(3, preline.length - 2) + ' ' + value
                            } else {
                                var _v = preline.substr(3, preline.length - 2) + ' ' + value
                                var _cargo = _v.split(_keys[_keys.length - 1])[1].split(",")[0]
                                var _firma = _v.split(_keys[_keys.length - 1])[1].split(",")[1]
                                _lines[_lines.length] = 'cargo:' + _cargo
                                _lines[_lines.length] = 'firma:'+_firma
                            }

                        preline=''
                    } else {
                        preline = preline + value
                    }
                    //debugger
                }
            }

        })
        callback(_lines)
            //debugger
    }
    }
}