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
        scrap: {
            principal: function ($) {
                var _materia = ""
                var e = 0
                if ($('analisis materias_cpv').html().length > 0) {
                    var materias = $('analisis materias').html().match(/\d{3} /g)
                    var desc = $('analisis materias').html().split(/\d{3} /g).splice(1)
                    _.forEach(materias, function (value) {
                        _materia = _materia + (_materia.length > 0 ? ";" : "") + value + desc[e]
                        e++
                    })
                } else {
                    if ($('analisis materias').html().length > 0) {
                        var materias = $('analisis materias').html().match(/\d{3} /g)
                        var desc = $('analisis materias').html().split(/\d{3} /g).splice(1)
                        _.forEach(materias, function (value) {
                            _materia = _materia + (_materia.length > 0 ? ";" : "") + value + " "+ desc[e]
                            e++
                        })
                    }
                }
                //debugger
                return {
                    modalidad: $('analisis modalidad').html(),
                    id: $('analisis tipo').attr('codigo'),
                    text: $('analisis tipo').html(),
                    urlPdf: $('metadatos url_pdf').html(),
                    importe: $('analisis importe').html(),
                    ambito_geografico: $('analisis ambito_geografico').html(),
                    materias: _materia
                }
            },
            data: function (options, data) {
                //debugger
                return {
                    _BOLETIN: data._list[data.e],
                    _cod: data.codigo.id,
                    _modalidad: data.codigo.modalidad,
                    _type: data.codigo.text,
                    _tramitacion: '',
                    _importe: data.codigo.importe,
                    _ambito_geografico: data.codigo.ambito_geografico,
                    _materias_cpv: data.codigo.materias,
                    urlPdf: data.codigo.urlPdf,
                    urlXml: options.url + data._list[data.e],
                    //Contratista: [],
                    //Importe: []
                }
            },
            extra: function (_json, scrap) {
                var splitfunc = ['materias', 'materias_cpv']
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
                            var keys = p < 2 ? _r.match(/\d{3,9}/g) : null
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
                var _json = app.Rutines().xmlToJson(xml, app.Rutines().xmlToJson)
                var _areas = []
                var _content = []
                var err = null

                if (_json.documento.texto.dl != null) {
                    var pdf = options.url + _json.documento.metadatos.url_pdf["#text"]
                    __this.getTextFromPdf(options, pdf, _arr, charEnd, _callback, _json, _this, onlyScrap)
                } else {

                    $('p.parrafo').each(function (p, _parraf) {
                        var _t = Trim($($('p.parrafo')[p]).html())
                        if (_t.length > 0) {
                            if ((_t.indexOf(')') == 1 || _t.indexOf('.') == 1) && _t.substr(2, 1) == " ") { // || _lastParragraf) {
                                _arr[_arr.length] = _t
                            } else {
                                if (_arr.length > 0) {
                                    if (err != null) {
                                        _arr[_arr.length - 1] = _arr[_arr.length - 1] + ' ' + _t
                                    } else {
                                        _arr[_arr.length] = _t
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
                    _callback({ _arr: _arr, _extra: _extra, _err: err })
                }
            },
            set: function (options, $, body, _analisis, data, urlDoc, callback) {
                options.Rutines.scrap.p_parrafo(options, $, '.', body, function (_data) {
                    if (_data != null) {
                        //if (_data._arr.length < 8)
                        //    debugger
                        _analisis.extra = _data._extra
                        data.textExtend = _data._arr
                        data.err = _data._err
                        app.commonSQL.SQL.commands.insert.Boletin.text(options, _analisis, data, function (data) {
                            callback(data)
                        })

                    } else {
                        callback(data, true)
                    }
                }, urlDoc, options.Rutines, true)
            }
        },
        get: {
            importeLotes: function (_text, data, options, patterns) {

            },
            importes: function (_text, data, options, patterns, lotes) {

                var importe = "*" + options.Rutines.extract(_text, 'Importe de la adjudicación:', options.transforms.ADD(
                        [patterns.General,
                        patterns.Importes]
                ))
                if (importe == "*")
                    importe = "*" + options.Rutines.extract(_text, 'Importe de adjudicación:', options.transforms.ADD(
                        [patterns.General,
                        patterns.Importes]
                    ))
                if (importe == "*")
                    importe = "*" + options.Rutines.extract(_text, 'Importe o canon de adjudicación:', options.transforms.ADD(
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

                

                var _imp = this.adaptImportes(options, importe.replace("*",""), data , lotes)

                return _imp != null ? _imp : 0 
            },
            adaptImportes: function (options, _dataimporte, data, lotes) {

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
                            if (_imp != null && _imp.indexOf(":") > -1)
                                _imp = _imp.substr(_imp.indexOf(":") + 1, _imp.length)

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
                                            _imp = "0.00"
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

                        if (lotes) {
                            //var _e = _dataimporte
                            if ((value.match(/\"(.*?)\"/g) || []).length > 0)
                                var _e = value.match(/\"(.*?)\"/g)


                            //debugger
                        }

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
                                    if (_vx[0].indexOf('pesetas') > -1) {
                                        var _m = 166.386
                                        _imp[_imp.length] = _vx[0].replaceAll(" de ", "").replaceAll(".", "")
                                    } else {
                                        _imp[_imp.length] = _vx[0].replace("euros", "")
                                    }


                                } else {
                                    _imp[_imp.length] = value
                                }
                            }
                        }
                        if (!lotes) {
                            var _vs = null
                            if (value.indexOf('".') > -1) {
                                _vs = value.split('".')[0].toLowerCase()
                            } else {
                                if (value.indexOf('",') > -1) {
                                    _vs = value.split('",')[0].toLowerCase() //
                                } else {
                                    if (value.indexOf(', ') > -1) {
                                        _vs = value.split(', ')[1].toLowerCase()
                                    }
                                    //debugger
                                }
                            }
                            if (_vs != null) {
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
                            }
                        //}else {
                            //debugger
                        }
                    
                            

                    })
                    if (data.Empresa.indexOf("UTE ") == -1 && data.Empresa.indexOf(" UTE") == -1) {

                        var _emp = _.isArray(data.Empresa) ? data.Empresa : data.Empresa.split(";") //lotes ? (_e != null ? _e : data.Empresa.split(";")) : data.Empresa.split(";")
                        var _test = []
                        var _moneda = ""
                        for (n in _emp) {

                            

                            //_empresa = _.deburr(_.camelCase(_emp[n])).toLowerCase()
                            //var _n = _empImp.indexOf(_empresa)
                            //if (_n == -1)
                            //    _n = n
                            importe = _imp[n] != null ? _imp[n] : (data.presupuesto != null ? data.presupuesto:0)
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
                                            _test[_test.length] = (parseFloat(_i) / 166.386).toFixed(2)
                                            
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
        localizeText: function (_arrayText, search) {
            var _Text=""
            for (i in _arrayText) {
                if (_arrayText[i].toLowerCase() != null) {
                    if (_arrayText[i].toLowerCase().indexOf(search.toLowerCase()) > -1) {
                        _Text= _arrayText[i]
                    }
                }
            }
            return _Text
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
                                var _text = _arrayText[i]
                                var _x = _.compact(_text.replaceAll(").", ");").split(";"))
                                var _pesetas = _text.match(/\d{1,3}(?:\.\d{3})* de pesetas|\d{1,3}(?:\.\d{3})* pesetas/g) || []
                                var _euros = _text.match(/\d{1,3}(?:\.\d{3})* de euro|\d{1,3}(?:\.\d{3})* en euro\d{1,3}(?:\.\d{3})* euro|(?:\d+)((\d{1,3})*([\.\ ]\d{3})*)(\,\d+)? euros/g) || []
                                if (_x.length == _euros.length) {
                                    var _c =[]
                                    _.forEach(_x, function (value) {
                                        var _p = value.match(/"([^"]*)"|'([^']*)'|“[^]*”/g) || []
                                        if (_p.length == 1) {
                                            _c[_c.length] = _p[0]
                                        } else {
                                            var _p = value.replace("Contratistas:","").indexOfRegex(/\d{1,3}(?:\.\d{3})* de pesetas|\d{1,3}(?:\.\d{3})* pesetas|\d{1,3}(?:\.\d{3})* de euro|\d{1,3}(?:\.\d{3})* en euro\d{1,3}(?:\.\d{3})* euro|(?:\d+)((\d{1,3})*([\.\ ]\d{3})*)(\,\d+)? euros/)
                                            if (_p>0){
                                                _c[_c.length] = value.replace("Contratistas:", "").substr(0,_p).replace(/\:|\;/g,"")
                                            }
                                        }
                                    })
                                } else {

                                    var _c = _text.match(/"([^"]*)"|'([^']*)'|“[^]*”|.[^]*,/g) || []
                                    if (_c.length == 1)
                                        var _c = _text.match(/"([^"]*)"|'([^']*)'|“[^]*”/g) || []
                                }
                                if ((_pesetas.length > 0 || _euros.length > 0) && _c.length>0) {
                                    
                                    if (_pesetas.length != _c.length && _euros.length != _c.length) {
                                        //if (_x.length == _euros.length) {
                                        //    _c=
                                        //} else {
                                            _c = []
                                            _pesetas = []
                                            _euros = []
                                            if (_arrayText[i].indexOf("Precio por") == -1) {
                                                var _e = _arrayText[i].replaceAll(".,", ",")
                                                    .replaceAll("Ind.", "Sum")
                                                    .replaceAll("Sum.", "Sum")
                                                    .replaceAll("Lab.", "Lab")
                                                    .replace("S. C.", "SC")
                                                    .replace(/\"\w\.\ /g, '"')
                                                    .replaceAll('". ', '", ')
                                                    .replaceAll(" por un importe de", '",')
                                                    .replaceAll('""', '"')

                                                if (_e.match(/\:/g).length > 1) {
                                                    var _l = _e.split(/:(.+)/)[1].replaceAll(/ \w\./g, " ").replaceAll("Coop.", "Coop").replaceAll("Empresas y euros:", "").replaceAll("por importe de ", '", ').replace("Electricidad N.", "Electricidad N").replaceAll('", ",', '",').replaceAll(". Importe de Adjudicación", ";").replaceAll(". Importe de adjudicación", ";").replace(/:/g, ';').replace("Contratista;", "Contratista:").split('. ')
                                                } else {
                                                    var _l = _e.replaceAll("Empresas y euros:", "").replaceAll("Coop.", "Coop").replaceAll("por importe de ", '", ').replaceAll(/ \w\./g, " ").replaceAll('", ",', '",').replaceAll(". Importe de Adjudicación", ";").replaceAll(". Importe de adjudicación", ";").replace("Contratista;", "Contratista:").split(":")[1].split('. ')
                                                }

                                                if (_l.length > _c.length) {
                                                    _.forEach(_l, function (value) {
                                                        if ((value.match(/"/g) || []).length % 2 == 1) {
                                                            if (value.indexOf(" (") > 0) {
                                                                value = ('"' + _.trim(value)).replaceAll(" (", '" (').replaceAll('""', '"')
                                                            } else {
                                                                //debugger
                                                                value = ('"' + _.trim(value)).replaceAll('""', '"')
                                                            }
                                                        } else {
                                                            value = ('"' + _.trim(value)).replaceAll(" (", '" (').replaceAll('""', '"')
                                                        }

                                                        if (value.indexOf(" peseta") > 0) {

                                                            var _fp = value.match(/\d{1,3}(?:\.\d{3})* de pesetas|en pesetas \d{1,3}(?:\.\d{3})*|\d{1,3}(?:\.\d{3})* pesetas/g)
                                                            if (_fp.length > 0) {
                                                                _pesetas[_pesetas.length] = _fp[0]
                                                                _moneda = _fp[0]
                                                            } else {
                                                                _moneda = value.match(/\d{1,3}(?:\.\d{3})* de euro|\d{1,3}(?:\.\d{3})* en euro\d{1,3}(?:\.\d{3})* euro/g)[0]
                                                                _euros[_euros.length] = _moneda

                                                            }
                                                            if ((value.match(/"([^"]*)"|'([^']*)'|“[^]*”|.[^]*,/g) || []).length > 0) {
                                                                _c[_c.length] = value.match(/"([^"]*)"|'([^']*)'|“[^]*”|.[^]*,/g)[0]
                                                            } else {
                                                                _c[_c.length] = value.substr(0, value.indexOf(_moneda)).replace('"', '').replaceAll(";", "")
                                                            }

                                                        } else {
                                                            if (value.indexOf(" euro") > 0) {
                                                                _euros[_euros.length] = (value.match(/\d{1,3}(?:\.\d{3})* de euro|\d{1,3}(?:\.\d{3})* en euro\d{1,3}(?:\.\d{3})* euro|(?:\d+)((\d{1,3})*([\.\ ]\d{3})*)(\,\d+)? euros/g) || []).length > 0 ? value.match(/\d{1,3}(?:\.\d{3})* de euro|\d{1,3}(?:\.\d{3})* en euro\d{1,3}(?:\.\d{3})* euro|(?:\d+)((\d{1,3})*([\.\ ]\d{3})*)(\,\d+)? euros/g)[0] : " 0 euros"
                                                                if ((value.match(/"([^"]*)"|'([^']*)'|“[^]*”|.[^]*,/g) || []).length > 0) {
                                                                    _c[_c.length] = value.match(/"([^"]*)"|'([^']*)'|“[^]*”|.[^]*,/g)[0]
                                                                } else {
                                                                    _c[_c.length] = value.substr(0, value.indexOf(_euros[_euros.length - 1])).replace('"', '').replaceAll(";", "")
                                                                }


                                                            }
                                                        }
                                                    })
                                                    var x = 1

                                                //}

                                            }
                                        }
                                    }
                                    for (_n in _c) {
                                        if (_pesetas.length == _c.length || _euros.length == _c.length) {
                                            if (_pesetas.length > 0 && _pesetas.length > _n) {
                                                if (_pesetas[_n].indexOf("de pesetas") > 0) {
                                                    var _m = (_pesetas[_n].replace("de pesetas", "").replaceAll(".", "") * 1) / 166.386
                                                } else {
                                                    var _m = (_pesetas[_n].replace("pesetas", "").replaceAll(".", "") * 1) / 166.386
                                                }
                                            }
                                            if (_euros.length > 0 && _euros.length > _n)
                                                if (_euros[_n].indexOf("de euros") > 0) {
                                                    var _m = _euros[_n].replace("de euros", "").replaceAll(",", "#").replaceAll(".", "").replaceAll("#", ".") * 1
                                                } else {
                                                    var _m = _euros[_n].replace("euros", "").replaceAll(",", "#").replaceAll(".", "").replaceAll("#", ".") * 1
                                                }
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
                                                    if ((_arrayText[i].match(/"([^"]*)"|'([^']*)'|“[^]*”/g) ||[]).length > 0) {
                                                        x = _arrayText[i].match(/"([^"]*)"|'([^']*)'|“[^]*”/g)
                                                        var _j = ";"
                                                        if (_arrayText[i].toLowerCase().indexOf("UTE ") > -1)
                                                            _j=" "
                                                        return this.transforms(_arrayText[i].match(/"([^"]*)"|'([^']*)'|“[^]*”/g).join(_j), transforms )
                                                    } else {
                                                        return this.transforms(_arrT[1].indexOf(' Desierto') > -1 ? 'Desierto' : _arrT[1], transforms)
                                                    }
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
                                    _arrT = _arrayText[i].substr(_arrayText[i].indexOf(": ") + 1, _arrayText[i].length).replace(", y ","; ").split(";")
                                    for (n in _arrT) {
                                        //if (_arrT[n].length>0 && )
                                        if (_arrT[n].indexOf(": ") > -1) {
                                            _arrT[n] = this.transforms(_arrT[n].split(": ")[1], transforms)
                                        } else {
                                            var _i = this.transforms(_arrT[n], transforms)
                                            if ((_i.match(/\d{1,3}(?:\.\d{1,103})*,\d{2}/g) || 0).length>0) {
                                                _arrT[n] =_i.match(/\d{1,3}(?:\.\d{3})*,\d{2}/g)[0]
                                            } else {
                                                debugger
                                                //_arrT[n] = _arrT[n] //this.transforms(_arrT[n].replace("PESETAS", "pesetas").replace("PESETAS", "euros").replace('", ', ";"), transforms)
                                            }
                                        }
                                    }
                                    return _arrT.join(";")
                                } else {
                                    var _ret = []
                                    if ((_arrayText[i].match(/\"(.*?)\"/g) || []).length>0 && search.toLowerCase() == 'contratista') {
                                        _arrT = _arrayText[i].match(/\"(.*?)\"/g)
                                        for (n in _arrT) {
                                            _ret[_ret.length] = this.transforms(_arrT[n], transforms)
                                        }
                                        return _ret.join(";")
                                    } else {

                                        if ((_arrayText[i].toLowerCase().indexOf('lotes') > -1 || _arrayText[i].toLowerCase().indexOf('lote número') > -1) && _arrayText[i].toLowerCase().indexOf('.') > -1 && _arrayText[i].indexOf(": ") > -1) {
                                            if ((_arrayText[i].toLowerCase().match(/pesetas,/g) || []).length || (_arrayText[i].toLowerCase().match(/euros,/g) || []).length > 0) {
                                                _arrT = _arrayText[i].substr(_arrayText[i].indexOf(": ") + 1, _arrayText[i].length).split(", ")
                                            } else {
                                                _arrT = _arrayText[i].substr(_arrayText[i].indexOf(": ") + 1, _arrayText[i].length).split(". ")
                                            }
                                            for (n in _arrT) {
                                                if (_arrT[n].length > 0)
                                                    if (_arrT[n].toLowerCase().indexOf('lote número') > -1) {
                                                        if ((_arrT[n].toLowerCase().match(/lote número \d{1,2},/g) || []).length > 0) {
                                                            _ret[_ret.length] = this.transforms(_arrT[n].toLowerCase().replace(/lote número \d{1,2},/g, ""), transforms)
                                                        } else {
                                                            if ((_arrT[n].toLowerCase().match(/lote número \d{1,2}:/g) || []).length > 0) {
                                                                _ret[_ret.length] = this.transforms(_arrT[n].toLowerCase().replace(/lote número \d{1,2}:/g, ""), transforms)
                                                            } else {
                                                                if ((_arrT[n].toLowerCase().match(/lote número \d{1,2}/g) || []).length > 0) {
                                                                    _ret[_ret.length] = this.transforms(_arrT[n].toLowerCase().replace(/lote número \d{1,2}/g, ""), transforms)
                                                                } else {
                                                                    if ((_arrT[n].toLowerCase().match(/lote números \d{1,2} y \d{1,2}/g) || []).length > 0) {
                                                                        _ret[_ret.length] = this.transforms(_arrT[n].toLowerCase().replace(/lote números \d{1,2} y \d{1,2}/g, ""), transforms)
                                                                    } else {
                                                                        if ((_arrT[n].match(/Lote número (IX|IV|V?I{0,3})/g) || []).length > 0) {
                                                                            _arrT[n] = _arrT[n].substr(_arrT[n].indexOfRegex(/Lote número (IX|IV|V?I{0,3})/g), _arrT[n].length)
                                                                            _ret[_ret.length] = this.transforms(_arrT[n].replace(/Lote número (IX|IV|V?I{0,3})/g, ""), transforms)
                                                                        } else {
                                                                            debugger
                                                                        }
                                                                    }

                                                                }
                                                            }
                                                        }
                                                    } else {
                                                        if (_arrT[n].match(/\w/g).length == 0 || (_arrT[n].indexOf("pesetas") > 0 || _arrT[n].indexOf("euros") > 0)) {
                                                            _ret[_ret.length] = this.transforms(_arrT[n], transforms)
                                                        }
                                                    }
                                            }
                                            return _ret.join(";")
                                        } else {
                                            if (_arrayText[i].indexOf("euros") > 0) {
                                                if ((_arrayText[i].match(/\d\,\d{3} euros/) || []).length > 0) {
                                                    _arrT = (_arrayText[i].match(/\d{1,3}(?:\.\d{3})*,\d{3} euros/g) || [])
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
                                                                _arrT = (_arrayText[i].match(/\d{1,3}(?:\.\d{3})*,\d{2}/g) || [])
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
                                                    if ((_arrayText[i].match(/\d{1,3}(?:\.\d{3})*,\d{2}/) || []).length > 0) {
                                                        _arrT = [_arrayText[i].match(/\d{1,3}(?:\.\d{3})*,\d{2}/)[0]]
                                                    } else {
                                                        if ((_arrayText[i].match(/\d{1,3}(?:\.\d{3})* pesetas/g) || []).length > 0) {
                                                            _arrT = (_arrayText[i].match(/\d{1,3}(?:\.\d{3})* pesetas/g) || [])
                                                            for (_n in _arrT) {
                                                                _arrT[_n] = (_arrT[_n].replaceAll("pesetas", "").replaceAll(".", "") / 166.386).toFixed(2) * 1
                                                            }
                                                        } else {
                                                            if ((_arrayText[i].match(/\d{1,3}(?:\.\d{3})* de pesetas/g) || []).length > 0) {
                                                                _arrT = (_arrayText[i].match(/\d{1,3}(?:\.\d{3})* de pesetas/g) || [])
                                                                for (_n in _arrT) {
                                                                    _arrT[_n] = (_arrT[_n].replaceAll("de pesetas", "").replaceAll(".", "") / 166.386).toFixed(2) *1
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
                                                    if (!_.isNumber(_arrT[_n])) {
                                                        if (_arrT[_n].indexOf("pesetas") > -1 || _arrT[_n].indexOf("euros") > -1) {
                                                            _arrT[_n] = _arrT[_n].replace("euros", "")

                                                            if (_arrT[_n].indexOf(":") > -1)
                                                                _arrT[_n] = _arrT[_n].split(":")[1]
                                                            if (_arrT[_n].indexOf(') (') > -1)
                                                                _arrT[_n] = _arrT[_n].split(") (")[1]

                                                            if (_arrT[_n].indexOf('(') > -1)
                                                                _arrT[_n] = _arrT[_n].split("(")[1]

                                                            _arrT[_n] = _arrT[_n].replace(/\./g, "").replace(/\,/g, ".")
                                                            //_arrT[_n] = _arrT[_n]
                                                            if (_arrT.indexOf("pesetas") > 0)
                                                                _arrT[_n] = _arrT[_n].split("pesetas")[0]
                                                        }

                                                        if (!_.isNumber(_arrT[_n].replaceAll(/\./g, "").replace(",", ".") * 1)) {
                                                            _arrT[_n] = "0.00"
                                                        } else {
                                                            if (_arrT[_n].indexOf(",") > -1) {
                                                                _arrT[_n] = _arrT[_n].replace(/\./g, "").replace(",", ".") * 1
                                                            } else {
                                                                _arrT[_n] = _arrT[_n] * 1
                                                            }
                                                            _arrT[_n] = _arrT[_n].toFixed(2)
                                                            _ret[_ret.length] = _arrT[_n]
                                                        }

                                                    } else {
                                                        _ret[_ret.length] = _arrT[_n].toFixed(2)
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
        var _json = {}
        var _arrayT = []
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
        //var _key = null
        _.forEach(arrayT, function (value) {
            var _p = arrayT
            if ((value.match(/^\d{1,2}\./) || []).length == 0 || (value.indexOf('pesetas') > -1 || value.indexOf('euros') > -1)) {
                //if (_key != null) {
                    if ((value.match(/^\w{1}\)/) || []).length > 0) {
                        if (value.split(/\. \w{1}\)/).length > 1) {
                            var _e = 0
                            var _t = value.match(/\. \w{1}\)/g)
                            _.forEach(value.split(/\. \w{1}\)/), function (value) {
                                if ((value.match(/^\w{1}\)/) || []).length == 0) {
                                    _arrayT[_arrayT.length] = _t[_e].match(/\w{1}\)/)[0] + ' ' + value + "."
                                    _e++
                                } else {
                                    _arrayT[_arrayT.length] = value + "."
                                }
                            })
                        } else {
                            if ((value.match(/\d{1,2} (?:de )?(diciembre|enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre)/i) || []).length > 0 && value.indexOf(".-")>-1) {
                                if (valInKeys(value, _keys)>0) {
                                    if ((value.match(/(\d+(\.\d{3})+?) (?:de )?(pesetas|euros)/g) || []).length > 0) {
                                        _arrayT[_arrayT.length] = "i) " + _.words(value.split(/^\w{1}\)/)[1])[0] + ":" + value.match(/(\d+(\.\d{3})+?) (?:de )?(pesetas|euros)/gi).join(";") + "."
                                    } else {
                                        _arrayT[_arrayT.length] = "i) " + _.words(value.split(/^\w{1}\)/)[1])[0] + ":" + value.split(/\d{1,2} (?:de )?(diciembre|enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre)/i)[0] + "."
                                    }
                                }
                                if(value.indexOf(".-")>-1)
                                    _arrayT[_arrayT.length] = ".- " + value.split(".-")[1] + "."
                            } else {
                                _arrayT[_arrayT.length] = value
                            }

                        }
                    } else {
                        if ((value.match(/\d{1,2} (?:de )?(diciembre|enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre)/i) || []).length > 0 && value.indexOf(".-") > -1) {
                            _arrayT[_arrayT.length] = "x) Firma: " + value
                        } else {

                            _arrayT[_arrayT.length - 1] = _arrayT[_arrayT.length - 1] + ' ' + value
                        }
                    }
                //} else {
                //    debugger
                //}
            } else {
                //_key = _.words(value.split(/^\d{1,2}/)[1])[0]
                if (value.indexOf("Presupuesto") > -1 && (value.match(/(\d+(\.\d{3})+?) (?:de )?(pesetas|euros)/) || []).length > 0) {
                    _arrayT[_arrayT.length] = "p) " + _.words(value.split(/^\d{1,2}/)[1])[0] + ": " + value.match(/(\d+(\.\d{3})+?) (?:de )?(pesetas|euros)/g)[value.match(/(\d+(\.\d{3})+?) (?:de )?(pesetas|euros)/g).length-1] + "."
                }
            }
        })
           // debugger
        _.forEach(_arrayT, function(value){
            var _lchar = value.substr(value.length - 1, 1)
            //if ((value.match(/^\d{1,2}\./) || []).length ==0) {

                if ((value.match(/^\w{1}\)/) || []).length > 0) {
                    if (_finline.indexOf(_lchar) > -1) {
                        if (valInKeys(value, _keys))
                            _lines[_lines.length] = value.substr(3, value.length)
                    } else {
                        preline = value 
                    }
                } else {
                    if (_finline.indexOf(_lchar) > -1) {
                        var _valp = valInKeys(value, _keys)
                        if (_valp>0)
                            if (_valp < _keys.length) {
                                _lines[_lines.length] = preline.substr(3, preline.length - 2) + ' ' + value
                            } else {
                                var _v = preline.substr(3, preline.length - 2) + ' ' + value
                                var _d = _v.split(_keys[_keys.length - 1])[1].split(",")
                                var _cargo = _d[0].split(".")[0]
                                var _firma = _d[1]
                                if (_d.length > 0) {
                                    _lines[_lines.length] = 'Cargo:' + _cargo
                                    if (_d.length > 1)
                                        _lines[_lines.length] = 'Firma:' + _firma
                                }
                            }

                        preline=''
                    } else {
                        preline = preline + value
                    }
                    //debugger
                }
            //}

        })

        _.forEach(_lines, function (value) {
            if (value.indexOf(":") > -1) {
                var t = 0;
                value = value.replace(/:/g, function (match) {
                    t++;
                    return (t > 1) ? "#" : match;
                });
                var _p = value.split(":")
                var _v = _.trim(_p[_p.length - 1]).replaceAll("#", ":").split(". ")
                var _c = _.deburr(_.words(_p[0])[0])

                if (_c == "Contratistas")
                    _c = "Contratista"

                _json[_c]= _v[0] + (( _v.indexOf(".") == _v.length-1)?"":".")
            }
        })
        //this.refineLineaText(options, _lines)
        callback( this.refineLineaText(app.BOLETIN, _lines) , _json)
            //debugger
        },
        putData: function (data, _analisis) {

            data.extra.adj = data.adjudicador
            data.extra.cargo = data.cargo
            data.extra.tram = data.tipoTramite
            data.extra.firma = _analisis.data.Firma == null ? "" : _analisis.data.Firma.replace("..", ".")
            data.extra.ambGeo = data.ambitoGeo
            data.extra.desc = data.descripcion
            data.extra.tPre = data.precio
            data.extra.pdf = data.pdf
            data.extra.num = _analisis._m.numero_anuncio
            //data.extra.pres = options.Rutines.extract(_text, 'Presupuesto',
            //    options.transforms.ADD(
            //        [options.patterns.General,
            //        options.patterns.Importes,
            //        options.patterns.sinBlancoInicial
            //        ]), true)



            data.extra.dep = _analisis.data.Dependencia == null ? "" : _analisis.data.Dependencia.replace("..", ".") //options.Rutines.extract(_text, 'Dependencia', options.transforms.ADD([options.patterns.General, options.patterns.sinPuntos, options.patterns.sinBlancoInicial]), true)
            data.extra.forma = _analisis.data.Forma == null ? "" : _analisis.data.Forma.replace("..", ".")  //options.Rutines.extract(_text, 'Forma', options.transforms.ADD([options.patterns.General, options.patterns.sinPuntos, options.patterns.sinBlancoInicial]), true)
            data.extra.proc = _analisis.data.Procedimiento == null ? "" : _analisis.data.Procedimiento.replace("..", ".")  //options.Rutines.extract(_text, 'Procedimiento', options.transforms.ADD([options.patterns.General, options.patterns.sinPuntos, options.patterns.sinBlancoInicial]), true)
            data.extra.nac = _analisis.data.Nacionalidad == null ? "" : _analisis.data.Nacionalidad.replace("..", ".")  //options.Rutines.extract(_text, 'Nacionalidad', options.transforms.ADD([options.patterns.General, options.patterns.sinPuntos, options.patterns.sinBlancoInicial]), true)

            return data
        },
        findImpSplitList: function (data,options,_text,_analisis, _lotes) {
            if (data.Empresa.indexOf("#") > -1) {
                var _s = data.Empresa.split("#")
                data.Empresa = _s[0]
                if (_.isNumber(_s[1] * 1)) {
                    data._Imp = _s[1] * 1
                } else {
                    if (!_lotes) {
                        var _imp = _analisis._a.importe.length > 0 ? _analisis._a.importe : options.Rutines.get.importes(_text, data, options, options.patterns)                        
                    } else {
                        var _imp = _analisis._a.importe.length > 0 ? _analisis._a.importe : options.Rutines.get.importeLotes(_text, data, options, options.patterns)    
                    }
                    data._Imp = _imp * 1
                }
            } else {
               var _i = options.Rutines.get.importes(_text, data, options, options.patterns, _lotes)
               var _imp = _analisis._a.importe.length > 0 ? _analisis._a.importe.replace(".", "").replace(",", ".") : _i
               //if (!_lotes) {
               //     var _imp = _analisis._a.importe.length > 0 ? _analisis._a.importe.replace(".", "").replace(",", ".") : options.Rutines.get.importes(_text, data, options, options.patterns, _lotes)
               // } else {

                //}

               if (_i != 0) {
                   if (_imp.indexOf(";") > -1) {
                       data._Imp = _imp
                   } else {
                       data._Imp = _imp * 1
                   }
               } else {
                   data._Imp = 0
               }
            }
            return data
        },
        groupAnexos: function (options, text, key, importe, exclude, _sa) {
            var _ret = []
            var ikey = ""
            _.forEach(text, function (line) {
                if (line.toLowerCase().indexOf(key.toLowerCase()) > -1) {
                    if (line.toLowerCase().indexOf(exclude.toLowerCase()) == -1) {
                        _ret[_ret.length] = options.Rutines.transforms(_.trim(line.split(key)[1]), _sa).replace("SA;", "SA ")
                    }
                }
                if (line.toLowerCase().indexOf(importe.toLowerCase()) == 0) {
                    if (_ret.length > 0 && _ikey.length>0) {
                        if (line.toLowerCase().indexOf(exclude.toLowerCase()) == -1) {
                            var _i = line.split(_ikey)[1] 
                            if (_i.indexOf("pesetas") > -1)
                                _i = _.trim( _i.substr(0, _i.indexOf("pesetas")+7) )
                            if (_i.indexOf("euros") > -1)
                                _i = _.trim( _i.substr(0, _i.indexOf("euros") + 7) )

                            _ret[_ret.length - 1] = _ret[_ret.length - 1] + "#" + options.Rutines.get.adaptImportes(options, _i, null, null) 
                        }
                    } else {
                        if (line.toLowerCase().indexOf(exclude.toLowerCase()) > -1) {
                            _ikey = line.split(":")[0].split(" ")[0] //  + ":"
                        }
                    }
                }
            })
            return _ret.join(";").replaceAll(".;", ";").replace(".#","#")
        },
        getData: function (app, record, _analisis, _Empresa, _e) {
            var Diccionario = function (type, text) {
                var book = [
                    {
                        _k: 'Tramitacion', _v: [
                            { _k: 'Ordinaria', _v: ['Ordinaria', 'Ordinario', 'ordinaria', 'Ordinaria/anticipada', 'Ordinaria-anticipada', 'Ordinaria-Anticipada'] },
                            { _k: 'Plan Nacional', _v: ['Plan', 'Nacional', 'PNSP'] },
                            { _k: 'General', _v: ['General'] },
                            { _k: 'Urgente', _v: ['Urgente', 'Urgencia'] },
                            { _k: 'Emergencia', _v: ['Emergencia'] },
                            { _k: 'Anticipada', _v: ['Anticipada',"Anticipado","anticipada"] },
                            { _k: 'Normal', _v: ['Normal'] },
                            { _k: 'Urgente', _v: ['Urgente', 'urgente','Anticipada-urgente'] },
                            { _k: 'Contrato', _v: ['Contrato'] },
                            { _k: 'Concurso', _v: ['Concurso'] },
                            { _k: 'Negociado', _v: ['Procedimiento','negociado'] },
                            { _k: 'Sin_publicidad', _v: ['Sin', 'publicidad'] },
                            { _k: 'Real Decreto 2/2000', _v: ['Real', 'Decreto','2/2000','Legislativo'] }

                        ]
                    },
                    {
                        _k: 'Forma', _v: [
                            { _k: 'Abierto', _v: ['Abierto','abierto'] },
                            { _k: 'Concurso', _v: ['Concurso', 'ofertas'] },
                            { _k: 'Convenio', _v: ['convenio'] },
                            { _k: 'Contrato', _v: ['Contrato'] },
                            { _k: 'Ordinario', _v: ['Ordinario'] },
                            { _k: 'Homologado', _v: ['Homologado'] },
                            { _k: 'Prórroga', _v: ['Prórroga'] },
                            { _k: 'Público', _v: ['Público'] },
                            { _k: 'Restringido', _v: ['Restringido','Retringido'] },
                            { _k: 'Negociado', _v: ['Negociado', 'negociado'] },
                            { _k: 'Sin publicidad', _v: ['Sin', 'sin', 'publicidad'] },
                            { _k: 'Plan Nacional', _v: ['Plan', 'Nacional', 'PNSP'] },
                            { _k: 'Urgente', _v: ['Urgente'] }
                        ]
                    }
                ]
                var _text = text.replaceAll(".", "").replaceAll(",", "").split(" ")
                var ret = ''
                _.forEach(book, function (vtype) {
                    if (vtype._k == type) {
                        _.forEach(vtype._v, function (value) {
                            var _i = _.intersection(_text, value._v)
                            if (_i.length > 0)
                                ret = value._k
                        })
                    }
                })
                if (ret == '') {
                    ret = "Sin Definir"
                    //debugger
                }
                return ret
            }
            var _xForma = "Sin Definir"
            var _xTramite = "Sin Definir"
            if (_analisis.data.Procedimiento != null || _analisis.data.Forma != null || _analisis.data.Tramitacion != null) {
                if (_analisis.data.Procedimiento == null && _analisis.data.Forma == null && Diccionario('Forma', _analisis.data.Tramitacion).length > 0) {
                    _xForma = Diccionario('Forma', _analisis.data.Tramitacion)
                } else {
                    _xTramite = _analisis.data.Tramitacion == null ? "Sin Definir" : Diccionario('Tramitacion', _analisis.data.Tramitacion)
                    _xForma = _analisis.data.Procedimiento == null ? (Diccionario('Forma', _analisis.data.Forma) == null ? "Sin Definir" : Diccionario('Forma', _analisis.data.Forma)) : Diccionario('Forma', _analisis.data.Procedimiento)
                }
            }
            return {
                    _counterContratos: 0,
                    type: app.Type,
                    cod: record[0][0].BOLETIN,
                    titulo: _analisis._m.titulo,
                    dia: record[0][0].dia,
                    mes: record[0][0].mes,
                    anyo: app.anyo,
                    Empresa: (_Empresa.indexOf(' SA') > -1 || _Empresa.indexOf(' SL') > -1) ? _Empresa : _e,
                    adjudicador: _analisis.data.Organismo == null ? "" : _analisis.data.Organismo.replace("..", "."),
                    materias: _analisis._a.materias.length > 0 ? _analisis._a.materias : _analisis._a.materias_cpv,

                    tipoBoletin: _analisis._a.tipo,

                    tipoTramite: _xTramite , //options.Rutines.extract(_text, 'Tramitaci\u00F3n', options.transforms.ADD([options.patterns.General, options.patterns.sinPuntos, options.patterns.sinBlancoInicial]), true),
                    tipoForma: _xForma,

                    precio: _analisis._a.precio,
                    ambitoGeo: _analisis._a.ambito_geografico,
                    //adjudicador: options.Rutines.extract(_text, 'Organismo',
                    //        options.transforms.ADD(
                    //            [options.patterns.General,
                    //            options.patterns.Contratista,
                    //            options.patterns.sinBlancoInicial
                    //            ]), true),
                    // cargo: options.Rutines.extract(_text, 'cargo',
                    //         options.transforms.ADD(
                    //             [options.patterns.General, options.patterns.sinBlancoInicial, [
                    //             ["F", { f: options.transforms.replace }, 'se\u00F1or', ''],
                    //             ["F", { f: options.transforms.replace }, 'General ', '']
                    //        ]]), true),

                    //firma: options.Rutines.extract("f) firma :" + _analisis.data.Firma, 'firma', options.transforms.ADD([options.patterns.General, options.patterns.sinPuntos, options.patterns.sinBlancoInicial]), true),
                    descripcion: _analisis.data.Descripcion == null ? "" : _analisis.data.Descripcion.replace("..", "."), //options.Rutines.extract(_text, 'Descripci\u00F3n', options.transforms.ADD([options.patterns.General, options.patterns.sinPuntos, options.patterns.sinBlancoInicial]), true),
                    pdf: _analisis._m.url_pdf,
                    extra: {}
                    }
        },
        saveDataBoletin: function (app, options, data, _callback ) {
            if (data.Empresa != null) {
                if (data.Empresa.length > 0 && (data._Imp >0 || data.Empresa.indexOf("#") > 0) ) {
                    //debugger
                    //options.Rutines.saveDataBoletin(app, options, data, callback)

                    options.SQL.insert.boletin(options, data, function (data, state, error) {
                        
                        if (state == 1) {
                            if (data.Empresa.indexOf('#') > -1) {
                                //var t = 1
                                var _ext = data.Empresa.split(";")
                                data._counterContratos = 0
                                _.forEach(_ext, function (value) {
                                    var _ixt = _.trim(value).split("#")

                                    data._counterContratos++

                                    options.SQL.insert.contrato(options, data, data.cod, _ixt[0], _ixt[1], data._counterContratos, function (data, state,_e, err) {
                                        if (err)
                                            app.process.stdout.write(app, options,'\x1b[36m')

                                        if (_e >= data.Empresa.split(";").length) {
                                            console.log(data.cod, value, _e, data._counterContratos,"SI CALL")
                                            app.process.stdout.write(app, options, '\x1b[36m', data._counterContratos, '\x1b[0mE')
                                            //debugger
                                            _callback(data, state)
                                        } else {
                                            console.log(data.cod, value, _e, data._counterContratos, "NO CALL", '\x1b[0mE')
                                        }
                                    })               
                                    
                                    
                                })
                            } else {
                                var _importe = _.isNumber(data._Imp) ? data._Imp.toFixed(2) : ""
                                options.SQL.insert.contrato(options, data, data.cod, data.Empresa, _importe , 1, function (data, state) {
                                    app.process.stdout.write(app, options, '\x1b[36m', data._counterContratos, '\x1b[0mE')
                                    _callback(data, state)
                                })
                            }
                            
                        } else {
                            _callback(data, state, error)
                        }
                    })
                } else {
                    if (data._Imp > 0)
                        _callback(data, 5,"CONTRATO EMPRESA LENGTH CERO")
                    if (data._Imp == 0)
                        _callback(data, 6, "CONTRATO IMPORTE CERO" )
                    if (isNaN(data._Imp))
                        _callback(data, 7, "CONTRATO IMPORTE NaN")
                }
            } else {
                _callback(data, 8, "CONTRATO EMPRESA NULL")
            }
        },
        analisis: function (_type, _string) {
            var _resp = null
            var analisis = function (arrIn, exclude, data) {
                return _.intersection(_.difference(arrIn, exclude), data)
            }
            //debugger
            if (_string != null) {
                var words = _.deburr(_string.toLowerCase().replace('"', '').replace(".", "").replace(",", "")).split(" ")
                var exclude = ["de", "la", "del"]
                var _Educacion = ["mec", "universidad", "universitat", "educacion", "cultura", "deporte", "arte", "artes", "deportes", "biblioteca", "historico", "cultural"]
                var _Sanidad = ["social", "salud", "saude", "salut", "hospital", "tgss", "sanidad", "insalud", "primaria", "hospitalario", "sanitaria", "inss", "061", "sanitarias", "hospital", "S.N.S.-O.", "insalud-hospital", "sociales", "servicios", "atencion", "primaria", "primaria-leon", "transfusio", "sn.s.-o."]
                var _Defensa = ["malre", "marina", "armada", "artilleria", "aerea", "oficialia", "mayor", "ejercito", "coronel", "academia", "logistica", "eva", "militar", "defensa", "armamento", "maestranza", "mando", "guardia", "intendencia", "dic", "apoyo", "logistico", "cuartel", "ism", "defensa-famet", "Jefatura", "maritima", "suboficiales", "brunete", "division", "mecanizada", "(distec)", "secretaria", "general", "tecnica", "arsenal", "sdg", "cg", "ualog", "brigada", "paracaidista", "acuartelamiento", "aereo", "subdireccion", "adquisiciones", "construcciones", "navales"]
                var _Local = ["ayuntamiento", "municipal", "mintra", "urbanistico", "consell", "comarcal", "cuidad", "autonoma", "ajuntament", "metropolitano"]
                var _Deportes = ["deportiva"]
                var _Diputacion = ["diputacion", "comunidad", "generalidad", "instituto", "catalan", "suelo", "generalitat", "comunidades", "ferroviaris", "cabildo", "consorcio", "regional", "transportes", "cortes"]
                var _Estado = ["apuestas", "tribunal", "cuentas", "estado", "boletin", "senado", "policia", "consejeria", "hacienda", "presidencia", "agencia", "tributaria", "gobierno", "delegacion", "ine", "empleo", "estado", "contratacion", "estadistica", "trafico", "exteriores", "interior", "vicepresidencia", "economia", "metrologia", "mercado", "valores", "subsecretaria"]
                var _Fomento = ["fomento-subsecretaria", "ambiente", "reforma", "consejeria", "fomento", "vivienda", "adif", "velocidad", "portuaria", "ferroviarias", "carreteras", "bomberos", "hidrografica", "agricultura", "parques", "naturaleza", "geografico", "agraria", "aprovisionamiento", "publicas", "consejo", "patentes", "consorci", "mantenimiento", "canales", "turismo", "radiotelevision", "consumo", "trabajo", "meteorologia", "energia", "tabacos", "zona", "franca", "cria", "caballar", "remonta", "agrarios", "museo", "geografica", "parque", "maquinaria", "garantia", "salarial", "residuos", "solidos"]
                var _Autonomico = ["eusko", "jaurlaritza/gobierno", "junta", "andalucia", "asamblea", "madrid", "illes", "balears"]
                var _ID = ["supercomputacion", "investigaciones", "cientificas", "diseno", "Comunicació", "ciencia", "tecnologia"]
                var _Justicia = ["justicia"]
                var _Aguas = ["canal", "isabel", "aguas"]
                var _SA = ["sociedad", "anonima", "limitada"]
                //debugger
                var _resp = {
                    Local: analisis(words, exclude, _Local),
                    Educacion: analisis(words, exclude, _Educacion),
                    Sanidad: analisis(words, exclude, _Sanidad),
                    Defensa: analisis(words, exclude, _Defensa),

                    Diputacion: analisis(words, exclude, _Diputacion),
                    Deportes: analisis(words, exclude, _Deportes),
                    Estado: analisis(words, exclude, _Estado),
                    Fomento: analisis(words, exclude, _Fomento),
                    ID: analisis(words, exclude, _ID),
                    Autonomia: analisis(words, exclude, _Autonomico),
                    Justicia: analisis(words, exclude, _Justicia),
                    Aguas: analisis(words, exclude, _Aguas),
                }
                var _r = []
                _.forEach(_resp, function (value, key) {
                    if (value.length > 0)
                        _r[_r.length] = { key: key, points: value.length, options: value }

                })
                var _resp = null
                var points = 0
                _.forEach(_r, function (value) {
                    if (value.points > points) {
                        _resp = value.key
                        points = value.points
                    }

                })
                if (_resp == null) {
                    resp = "Sin Especificar"
                    //if(words.length>1)
                    //    debugger
                }
            }
            return {
                _t: _resp, _SA: analisis(words, exclude, _SA)
            }
        },
        refineLineaText: function (options, _arr) {
            var into = ["Organismo", "Dependencia", "Descripci\u00F3n", "Tipo", "Lote", "Tramitaci\u00F3n", "Presupuesto", "Procedimiento", "Forma", "Importe", "Contratista", "Contratistas", "Nacionalidad", "explotaci\u00F3n", ".-"]
            var _ret = []
            _.forEach(_arr, function (frase) {
                var _stringArray = frase.split("")
                var _dospuntos = false
                var _punto = false
                var recorta = false

                _.forEach(_stringArray, function (value, key) {
                    
                    if (value == "." && _dospuntos > 0 && _punto > 0 && (frase.indexOf(";") == -1 && frase.indexOf(",") == -1) )
                        recorta = true

                    if (value == "." && _dospuntos > 0 && _punto==0 )
                        _punto = key

                    if (value == ":" && _dospuntos == 0)
                        _dospuntos = key
                })
                if (_dospuntos > 0 && _punto > 0 && !recorta)
                    _ret[_ret.length] = frase

                if (_dospuntos > 0 && _punto > 0 && recorta) {
                    var _sobrante = _.trim(frase.substr(_punto + 1, frase.length))
                    if ((_sobrante.match(/^\d./) || []).length > 0) {
                        _sobrante = _sobrante.substr(3, _sobrante.length)
                        if (_sobrante.indexOf('Importe total:') > -1) {
                            var _s = _sobrante.substr(_sobrante.indexOf('Importe total:')+15,_sobrante.length)
                            _sobrante = _sobrante.split(" ")[0] + ":" + options.Rutines.textToNumber(_s)
                        }

                    }
                    var _first = _sobrante.split(" ")[0]

                    if (into.indexOf(_first) == -1) {
                        _ret[_ret.length] = frase
                    } else {
                        _ret[_ret.length] = frase.substr(0, _punto + 1)
                        _ret[_ret.length] = _sobrante
      
                    }
                        
                }
            })
            return _ret
        },
        textToNumber: function (text) {
            var _words = text.toLowerCase().replace(".","").split(" ")
            var _unidades = ['un','dos','tres','cuatro','cinco','seis','siete','ocho', 'nueve' ]
            var _decenas = ['diez', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa']
            var _centenas = ['cien', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos']
            var _multiplicador = ['mil', , , 'millon']

            var _excepciones = [,,,,,,,,,,'once','doce','trece', 'catorce','quince','diciseis','diecisiete','dieciocho','diecinueve',,'veintiun','veintidos','veintitres','veinticuatro','veinticinco','veintiseis','veintisiete','veintiocho','veintinueve']

            var _values = _.difference(_words, ["y"])
            var _c = 0
            var _d = 0
            var _u = 0
            var _m = 0
            var _v = 0
            _.forEach(_values, function (data, key) {
                if (data != "euros") {
                    if (_excepciones.indexOf(_.intersection([data], _excepciones)[0]) > -1) {
                        _d = ((_excepciones.indexOf(_.intersection([data], _excepciones)[0]) + 1) / 10).toFixed(0) * 10
                        _u = (_excepciones.indexOf(_.intersection([data], _excepciones)[0]) + 1) - _d
                    } else {
                        if (data == 'ciento') {
                            _c = 100
                        } else {
                            if (_centenas.indexOf(_.intersection([data], _centenas)[0]) > -1)
                                _c = (_centenas.indexOf(_.intersection([data], _centenas)[0]) + 1) * 100
                            if (_decenas.indexOf(_.intersection([data], _decenas)[0]) > -1)
                                _d = (_decenas.indexOf(_.intersection([data], _decenas)[0]) + 1) * 10
                            if (_unidades.indexOf(_.intersection([data], _unidades)[0]) > -1)
                                _u = _unidades.indexOf(_.intersection([data], _unidades)[0]) + 1

                            if (data == 'millones' || _multiplicador.indexOf(_.intersection([data], _multiplicador)[0]) > -1) {
                                if (data == 'millones') {
                                    _m = _m * 1000000
                                } else {
                                    _m = Math.pow(1000, _multiplicador.indexOf(_.intersection([data], _multiplicador)[0]) + 1)
                                }
                                if (_values[key + 1] != 'millones') {
                                    if ((_c + _d + _u) * _m > 0) {
                                        _v = _v + ((_c + _d + _u) * _m)

                                        _c = 0
                                        _d = 0
                                        _u = 0
                                        _m = 0
                                    }
                                }
                            }

                        }

                    }

                }
            })
            return _v = _v + ((_c + _d + _u) * 1)
        }
    }
}