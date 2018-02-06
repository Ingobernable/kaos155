module.exports = function (_this) {

    return {
        contratista: function (_arrayText, search, transforms, simple) {
            var _arrT = []
            var _text = _arrayText
            if (_text.indexOf('(IVA incluido);') > 0 && (_text.indexOf('(IVA incluido):') > 0 || _text.indexOf('(IVA incluido), y') > 0))
                _text = _text.replaceAll('(IVA incluido):', ";").replaceAll('(IVA incluido), y', ";").replaceAll('(IVA incluido);', ";")
            if (_text.indexOf(" y ") > 0)
                _text = _text.replace(" y ", ";")

            var _x = _.compact(_text.replaceAll(").", ");").split(";"))
            var _pesetas = _text.match(/\d{1,3}(?:\.\d{3})* de pesetas|\d{1,3}(?:\.\d{3})* pesetas/g) || []
            var _euros = _text.match(/\d{1,3}(?:\.\d{3})* de euro|\d{1,3}(?:\.\d{3})* en euro\d{1,3}(?:\.\d{3})* euro|(?:\d+)((\d{1,3})*([\.\ ]\d{3})*)(\,\d+)? euros/g) || []
            if (_x.length == _euros.length) {
                var _c = []
                _.forEach(_x, function (value) {
                    var _p = value.match(/"([^"]*)"|'([^']*)'|“[^]*”/g) || []
                    if (_p.length == 1) {
                        _c[_c.length] = _p[0]
                    } else {
                        var _p = value.replaceAll("Contratista:", "").replaceAll("Contratistas:", "").indexOfRegex(/\d{1,3}(?:\.\d{3})* de pesetas|\d{1,3}(?:\.\d{3})* pesetas|\d{1,3}(?:\.\d{3})* de euro|\d{1,3}(?:\.\d{3})* en euro\d{1,3}(?:\.\d{3})* euro|(?:\d+)((\d{1,3})*([\.\ ]\d{3})*)(\,\d+)? euros/)
                        if (_p > 0) {
                            _c[_c.length] = _.trim(value.replaceAll("Contratista:", "").replace("Contratistas:", "").substr(0, _p).replace(/\:|\;/g, ""))
                        }
                    }
                })
            } else {

                var _c = _text.match(/"([^"]*)"|'([^']*)'|“[^]*”|.[^]*,/g) || []
                if (_c.length == 1)
                    var _c = _text.match(/"([^"]*)"|'([^']*)'|“[^]*”/g) || []
            }
            if ((_pesetas.length > 0 || _euros.length > 0) && _c.length > 0) {

                if (_pesetas.length != _c.length && _euros.length != _c.length) {
                    //if (_x.length == _euros.length) {
                    //    _c=
                    //} else {
                    _c = []
                    _pesetas = []
                    _euros = []
                    if (_arrayText.indexOf("Precio por") == -1) {
                        var _e = _arrayText.replaceAll(".,", ",")
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
                            _arrT[_arrT.length] = _.trim(_this.transforms(_c[_n], transforms)) + "#" + _m.toFixed(2)
                        } else {
                            _arrT[_arrT.length] = _.trim(_this.transforms(_c[_n], transforms)) + "#0.00"
                        }

                    } else {

                        var pi = _arrayText.toLowerCase().indexOf('por un importe de') + 'por un Importe de'.length
                        var pf = _arrayText.toLowerCase().indexOf('euros')
                        if (pi > 0 && pf > 0 && pi < pf) {
                            _arrT[_arrT.length] = _.trim(_this.transforms(_c[_n], transforms)) + "#" + (_arrayText.substr(pi, pf - pi).replace(".", "") * 1).toFixed(2)
                        }
                    }
                }
                return _arrT.join(";")
            } else {
                if ((_arrayText.match(/:/g) || []).length > 0 && (_arrayText.indexOf("pesetas") == -1 && _arrayText.indexOf("euros") == -1)) {
                    var _arrT = _arrayText.split(":")
                    if (_arrT.length > 1) {
                        if (_arrT[1].length > 1)
                            var _retT = []
                            if ((_arrayText.toLowerCase().match(/lote número \d{1,2}\,/g) || []).length == 0) {
                                if ((_arrayText.match(/"([^"]*)"|'([^']*)'|“[^]*”/g) || []).length > 0) {
                                    x = _arrayText.match(/"([^"]*)"|'([^']*)'|“[^]*”/g)
                                    var _j = ";"
                                    if (_arrayText.toLowerCase().indexOf("UTE ") > -1)
                                        _j = " "
                                    return [_this.transforms(_arrayText.match(/"([^"]*)"|'([^']*)'|“[^]*”/g).join(_j), transforms)]
                                } else {
                                    if ((_arrayText.match(/lote/gi) || 0).length > 0) {
                                        _.forEach(_arrayText.split(/lote/gi), function (_v) {
                                            var _s = _v

                                            if (_v.indexOf(":") > -1)
                                                _s = _.trim(_v.split(":")[1])
                                            _s = _v.length > 3 ? _this.transforms(_s, transforms) : ''

                                            if (_s.lastIndexOf(' Y ') > -1 && (_s.lastIndexOf(" SA") > 0 || _s.lastIndexOf(" SL") > 0))
                                                _s = _.trim(_s.substr(_s.lastIndexOf(' Y ') + 3, _s.length))

                                            _retT[_retT.length] = _s
                                        })
                                        return _.compact(_retT)
                                    } else {
                                        return [_this.transforms(_arrT[1].indexOf(' Desierto') > -1 ? 'Desierto' : _arrT[1], transforms)]
                                    }
                                }
                            } else {
                               
                                var _t = _arrT[1].toLowerCase().replace(/lote número \d{1,3}\,/g, "").replace(/\"/g, "").split(".")
                                for (_n in _t) {
                                    if (_t[_n].length > 0)
                                        _retT[_retT.length] = _this.transforms(_t[_n], transforms)
                                }
                                return _retT.join(";")
                            }
                    }
                } else {
                    if (_arrayText.indexOf('. "') > -1) {
                        var _arrT = _arrayText.replaceAll(":", "#").split('. "')
                    } else {
                        if (_arrayText.indexOf('. ') > -1) {
                            var _arrT = _arrayText.replaceAll(":", "#").split('. ')
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

                            var _arrTse = _this.transforms(_arrTs[0], transforms)
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
                     return _arrT //.join(';')
                }
            }

        },
        global: function (_arrayText, search, transforms, simple) {
                var _arrT=[]
                if (_arrayText.toLowerCase().indexOf('presupuesto') > 0 && _arrayText.toLowerCase().indexOf('importe total') > -1) {
                    var _arrT = _arrayText.toLowerCase().split('importe total')
                    if (_arrT[1].indexOf("euros") > -1) {
                        if (_arrT[1].match(/\.\d{2}\ /g) != null) {
                            return _this.transforms((_arrT[1].replaceAll("(euros)", "euros").replaceAll(",", "#").replaceAll(".", "").replaceAll("#", ".").match(/\d{1,8}\.\d{2} euros/g) || ["0.00"])[0], transforms)
                        } else {
                            if ((_arrT[1].match(/su valor en euros es de \d{1,8}\.{0,1}\d{0,3}/g) || []).length > 0) {
                                return _this.transforms(_arrT[1].match(/su valor en euros es de \d{1,8}\.{0,1}\d{0,3}/g)[0].match(/\d{1,8}\.{0,1}\d{0,3}/g)[0], transforms)
                            } else {
                                if ((_arrT[1].match(/su valor en euros es \d{1,8}\.{0,1}\d{0,3}/g) || []).length > 0) {
                                    return _this.transforms(_arrT[1].match(/su valor en euros es \d{1,8}\.{0,1}\d{0,3}/g)[0].match(/\d{1,8}\.{0,1}\d{0,3}/g)[0], transforms)
                                } else {
                                    return _this.transforms((_arrT[1].replaceAll(") euros", " euros").replaceAll("(euros)", "euros").replaceAll(",", "#").replaceAll(".", "").replaceAll("#", ".").match(/\d{1,8}\.{0,1}\d{0,3} euros/g) || ["0.00"])[0], transforms)
                                }
                            }
                        }
                    } else {
                        if (_arrT[1].indexOf("de pesetas") > -1) {
                            return _this.transforms(_arrT[1].replaceAll(")", "").replaceAll(".", "").match(/\d{1,10}\ de pesetas/g)[0].replaceAll("de ", ""), transforms)
                        } else {
                            if (_arrT[1].indexOf("pesetas") > -1) {
                                return _this.transforms((_arrT[1].replaceAll(".", "").match(/\d{1,10}\ pesetas/g) || ["0.00"])[0], transforms)
                            } else {
                                if (_arrT[1].match(/\.\d{2}\ /g) == null) {
                                    if (_arrT[1].replaceAll(".", "").match(/\d{1,10}/g) != null) {
                                        var i = _arrT[1].replaceAll(".", "").match(/\d{1,10}/g)[0]
                                        return _this.transforms(i + ' pesetas', transforms)
                                    } else {
                                        return "0.00 euros"
                                    }
                                } else {
                                    return "0.00 euros"
                                }
                            }
                        }
                    }
                } else {
                    if (_arrayText.toLowerCase().indexOf('descripción') > 0 || _arrayText.toLowerCase().indexOf('contratista') > 0 || (_arrayText.match(/\d{1,3}(?:\.\d{3})*/) || []).length == 0 || (_arrayText.toLowerCase().indexOf('lote') == -1 && search.toLowerCase().indexOf('importe') == -1)) {
                        var _text = _arrayText
                        if (_text.indexOf('(IVA incluido);') > 0 && (_text.indexOf('(IVA incluido):') > 0 || _text.indexOf('(IVA incluido), y') > 0))
                            _text = _text.replaceAll('(IVA incluido):', ";").replaceAll('(IVA incluido), y', ";").replaceAll('(IVA incluido);', ";")

                        var _x = _.compact(_text.replaceAll(").", ");").split(";"))
                        var _pesetas = _text.match(/\d{1,3}(?:\.\d{3})* de pesetas|\d{1,3}(?:\.\d{3})* pesetas/g) || []
                        var _euros = _text.match(/\d{1,3}(?:\.\d{3})* de euro|\d{1,3}(?:\.\d{3})* en euro\d{1,3}(?:\.\d{3})* euro|(?:\d+)((\d{1,3})*([\.\ ]\d{3})*)(\,\d+)? euros/g) || []
                        if (_x.length == _euros.length) {
                            var _c = []
                            _.forEach(_x, function (value) {
                                var _p = value.match(/"([^"]*)"|'([^']*)'|“[^]*”/g) || []
                                if (_p.length == 1) {
                                    _c[_c.length] = _p[0]
                                } else {
                                    var _p = value.replace("Contratistas:", "").indexOfRegex(/\d{1,3}(?:\.\d{3})* de pesetas|\d{1,3}(?:\.\d{3})* pesetas|\d{1,3}(?:\.\d{3})* de euro|\d{1,3}(?:\.\d{3})* en euro\d{1,3}(?:\.\d{3})* euro|(?:\d+)((\d{1,3})*([\.\ ]\d{3})*)(\,\d+)? euros/)
                                    if (_p > 0) {
                                        _c[_c.length] = value.replace("Contratistas:", "").substr(0, _p).replace(/\:|\;/g, "")
                                    }
                                }
                            })
                        } else {

                            var _c = _text.match(/"([^"]*)"|'([^']*)'|“[^]*”|.[^]*,/g) || []
                            if (_c.length == 1)
                                var _c = _text.match(/"([^"]*)"|'([^']*)'|“[^]*”/g) || []
                        }
                        if ((_pesetas.length > 0 || _euros.length > 0) && _c.length > 0) {

                            if (_pesetas.length != _c.length && _euros.length != _c.length) {
                                //if (_x.length == _euros.length) {
                                //    _c=
                                //} else {
                                _c = []
                                _pesetas = []
                                _euros = []
                                if (_arrayText.indexOf("Precio por") == -1) {
                                    var _e = _arrayText.replaceAll(".,", ",")
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
                                        _arrT[_arrT.length] = _.trim(_this.transforms(_c[_n], transforms)) + "#" + _m.toFixed(2)
                                    } else {
                                        _arrT[_arrT.length] = _.trim(_this.transforms(_c[_n], transforms)) + "#0.00"
                                    }

                                } else {

                                    var pi = _arrayText.toLowerCase().indexOf('por un importe de') + 'por un Importe de'.length
                                    var pf = _arrayText.toLowerCase().indexOf('euros')
                                    if (pi > 0 && pf > 0 && pi < pf) {
                                        _arrT[_arrT.length] = _.trim(_this.transforms(_c[_n], transforms)) + "#" + (_arrayText.substr(pi, pf - pi).replace(".", "") * 1).toFixed(2)
                                    }
                                }
                            }
                            return _arrT.join(";")
                        } else {
                            if ((_arrayText.match(/:/g) || []).length > 0 && (_arrayText.indexOf("pesetas") == -1 && _arrayText.indexOf("euros") == -1)) {
                                var _arrT = _arrayText.split(":")
                                if (_arrT.length > 1) {
                                    if (_arrT[1].length > 1)
                                        if ((_arrayText.toLowerCase().match(/lote número \d{1,2}\,/g) || []).length == 0) {
                                            if ((_arrayText.match(/"([^"]*)"|'([^']*)'|“[^]*”/g) || []).length > 0) {
                                                x = _arrayText.match(/"([^"]*)"|'([^']*)'|“[^]*”/g)
                                                var _j = ";"
                                                if (_arrayText.toLowerCase().indexOf("UTE ") > -1)
                                                    _j = " "
                                                return _this.transforms(_arrayText.match(/"([^"]*)"|'([^']*)'|“[^]*”/g).join(_j), transforms)
                                            } else {
                                                return _this.transforms(_arrT[1].indexOf(' Desierto') > -1 ? 'Desierto' : _arrT[1], transforms)
                                            }
                                        } else {
                                            var _retT = []
                                            var _t = _arrT[1].toLowerCase().replace(/lote número \d{1,3}\,/g, "").replace(/\"/g, "").split(".")
                                            for (_n in _t) {
                                                if (_t[_n].length > 0)
                                                    _retT[_retT.length] = _this.transforms(_t[_n], transforms)
                                            }
                                            return _retT.join(";")
                                        }
                                }
                            } else {
                                if (_arrayText.indexOf('. "') > -1) {
                                    var _arrT = _arrayText.replaceAll(":", "#").split('. "')
                                } else {
                                    if (_arrayText.indexOf('. ') > -1) {
                                        var _arrT = _arrayText.replaceAll(":", "#").split('. ')
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

                                        var _arrTse = _this.transforms(_arrTs[0], transforms)
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
                        if (_arrayText.indexOf(";") > -1 && _arrayText.indexOf(":") > -1 && _arrayText.indexOf(".-") == -1) {
                            _arrT = _arrayText.substr(_arrayText.indexOf(": ") + 1, _arrayText.length).replace(", y ", "; ").split(";")
                            for (n in _arrT) {
                                //if (_arrT[n].length>0 && )
                                if (_arrT[n].indexOf(": ") > -1) {
                                    _arrT[n] = _this.transforms(_arrT[n].split(": ")[1], transforms)
                                } else {
                                    var _i = _this.transforms(_arrT[n], transforms)
                                    if ((_i.match(/\d{1,3}(?:\.\d{1,103})*,\d{2}/g) || 0).length > 0) {
                                        _arrT[n] = _i.match(/\d{1,3}(?:\.\d{3})*,\d{2}/g)[0]
                                    } else {
                                        if ((_i.match(/\d{1,12}.\d{2}/g) || 0).length > 0) {
                                            _arrT[n] = _i.match(/\d{1,12}.\d{2}/g)[0]
                                        } else {
                                            //debugger
                                        }
                                        //_arrT[n] = _arrT[n] //_this.transforms(_arrT[n].replace("PESETAS", "pesetas").replace("PESETAS", "euros").replace('", ', ";"), transforms)
                                    }
                                }
                            }
                            return _arrT.join(";")
                        } else {
                            var _ret = []
                            if ((_arrayText.match(/\"(.*?)\"/g) || []).length > 0 && search.toLowerCase() == 'contratista') {
                                _arrT = _arrayText.match(/\"(.*?)\"/g)
                                for (n in _arrT) {
                                    _ret[_ret.length] = _this.transforms(_arrT[n], transforms)
                                }
                                return _ret.join(";")
                            } else {

                                if (_arrayText.toLowerCase().indexOf('lote') > -1 && _arrayText.toLowerCase().indexOf('.') > -1 && _arrayText.indexOf(": ") > -1) {
                                    if ((_arrayText.toLowerCase().match(/pesetas,/g) || []).length || (_arrayText.toLowerCase().match(/euros,/g) || []).length > 0) {
                                        _arrT = _arrayText.substr(_arrayText.indexOf(": ") + 1, _arrayText.length).split(", ")
                                    } else {
                                        if (_arrayText.indexOf("; ") > -1) {
                                            _arrT = _arrayText.substr(_arrayText.indexOf(": ") + 1, _arrayText.length).split("; ")
                                        } else {
                                            _arrT = _arrayText.substr(_arrayText.indexOf(": ") + 1, _arrayText.length).split(". ")
                                        }
                                    }
                                    var _ret = []
                                    for (n in _arrT) {
                                        if (_arrT[n].length > 0)
                                            if (search.toLowerCase() == 'contratista' && (_arrT[n].toLowerCase().indexOf('lote') > -1 || _arrT[n].toLowerCase().indexOf('(') > -1)) {
                                                if (_arrT[n].indexOf(':') > _arrT[n].toLowerCase().indexOf('lote')) {
                                                    var _empr = _this.transforms(_.trim(_arrT[n].substr(_arrT[n].indexOf(':') + 1, _arrT[n].length)), transforms) // > -1 ? _arrT[n].indexOf('(') : _arrT[n].indexOf('lote'))), transforms)
                                                } else {
                                                    var _empr = _this.transforms(_.trim(_arrT[n].substr(0, _arrT[n].indexOf('(') > -1 ? _arrT[n].indexOf('(') : _arrT[n].indexOf('lote'))), transforms)
                                                }
                                                var _imp = _this.getImporteFromString(_arrT[n])
                                                _ret[_ret.length] = _empr + (_imp.length > 0 ? ("#" + _imp) : '')
                                                //debugger
                                            } else {
                                                if (_arrT[n].toLowerCase().indexOf('lote') > -1) {

                                                    if ((_arrT[n].match(/lote número \d{1,2},/gi) || []).length > 0) {
                                                        _ret[_ret.length] = _this.transforms(_arrT[n].replace(/lote número \d{1,2},/gi, ""), transforms)
                                                    } else {
                                                        if ((_arrT[n].match(/lote número \d{1,2}:/gi) || []).length > 0) {
                                                            _ret[_ret.length] = _this.transforms(_arrT[n].replace(/lote número \d{1,2}:/gi, ""), transforms)
                                                        } else {
                                                            if ((_arrT[n].match(/lote número \d{1,2}/gi) || []).length > 0) {
                                                                _ret[_ret.length] = _this.transforms(_arrT[n].replace(/lote número \d{1,2}/gi, ""), transforms)
                                                            } else {
                                                                if ((_arrT[n].match(/lote números \d{1,2} y \d{1,2}/gi) || []).length > 0) {
                                                                    _ret[_ret.length] = _this.transforms(_arrT[n].replace(/lote números \d{1,2} y \d{1,2}/gi, ""), transforms)
                                                                } else {
                                                                    if ((_arrT[n].match(/lote número (IX|IV|V?I{0,3})/gi) || []).length > 0) {
                                                                        _arrT[n] = _arrT[n].substr(_arrT[n].indexOfRegex(/lote número (IX|IV|V?I{0,3})/gi), _arrT[n].length)
                                                                        _ret[_ret.length] = _this.transforms(_arrT[n].replace(/lote número (IX|IV|V?I{0,3})/gi, ""), transforms)
                                                                    } else {
                                                                        if ((_arrT[n].match(/lote \d{1,2}( y \d{1,2})||lotes \d{1,2}( y \d{1,2})/gi) || []).length > 0 && _.compact(_arrT[n].match(/lote \d{1,2}( y \d{1,2})||lotes \d{1,2}( y \d{1,2})/gi)).length>0) {
                                                                            _ret[_ret.length] = _this.transforms(_arrT[n].replace(/lote \d{1,2} y \d{1,2}||lotes \d{1,2} y \d{1,2}/gi, ""), transforms)
                                                                        } else {
                                                                            if ((_arrT[n].match(/lote \d{1,2}||lotes \d{1,2}/gi) || []).length > 0) {
                                                                                _ret[_ret.length] =  _.trim(_this.transforms(_arrT[n].replace(/lote \d{1,2}||lotes \d{1,2}/gi, "").replace(" :",""), transforms))
                                                                            } else {
                                                                                if (_arrT[n].indexOf(":") > -1) {
                                                                                    _ret[_ret.length] = _.trim(_arrT[n].split(":")[1])
                                                                                } else {
                                                                                    debugger
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }

                                                            }
                                                        }

                                                    }
                                                }
                                            } else {
                                            if ((_arrT[n].match(/\w/g) || []).length == 0 || (_arrT[n].indexOf("pesetas") > 0 || _arrT[n].indexOf("euros") > 0)) {
                                                if (_this.transforms(_arrT[n], transforms).length > 1)
                                                    _ret[_ret.length] = _this.transforms(_arrT[n], transforms)
                                            }
                                        }
                                    }
                                    return _ret.join(";")
                                } else {

                                    _ret = _this.getImporteFromString(_arrayText)
                                    if (_ret.length > 0) {
                                        return _ret
                                    } else {
                                        return null
                                    }


                                }
                            }
                        }
                    }
                }
            //}
        }
    }
}

