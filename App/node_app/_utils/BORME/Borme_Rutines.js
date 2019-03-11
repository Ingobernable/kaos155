'use strict';
module.exports = function (app, options, transforms) {

        return {
            ////////////////////////////////////////////////////////////////////////////////////
            //
            // rutina para sacar de una cadena los datos desde un mapkey
            //
            maps: {
                //Tempresas: ['UTE.', 'SC.', 'SRL', 'SLL.', 'SAL.', 'S.Coop.C', 'S.Coop', 'AEIE', 'SCP', 'CITYCE', 'SA.', 'SL.', 'S.C.C', 'S.C.V'],
                Empresas: ['UTE', 'SC', 'SRL','SLL','SAL','S.Coop.C','S.Coop','AEIE','SCP','CITYCE','SA','SL','S.C.C','S.C.V'],
                Replace: [["S.c", "SC"], [" Adaptación Ley 2/95", ""], ["apo.man.soli", ""], ["apo.sol", ""], ["cons.del.man", ""], ["A.u.dsl", ""], ["Sociedad Limit", ""], ["miem.com.ej", ""], ["C.j.csl", "C.j.c SL"], ["presidente", ""], ["cons.del.man", ""], ["apo.sol", ""], ["apo.manc", ""], ["secrenoconsj", ""], ["delegado", ""], ["cons.del.sol", ""], ["SL.P", "SL"], ["SL.U", "SL"], ["S.I.C.A.V","SICAV"]],
                keys: {
                    arr: [
                        'Constitución.',
                        //actos registrales que afectan a nombramientos
                        'Nombramientos.',
                        'Ceses/Dimisiones.',
                        'Revocaciones.',
                        //
                        'Cancelaciones de oficio de nombramientos.',
                        'Disolución.',
                        'Reelecciones.',
                        'Extinción.',
                        //

                        'Declaración de unipersonalidad.',
                        'Sociedad unipersonal.',
                        'Socio único.',
                        'Empresario Individual.',
                        'Pérdida del caracter de unipersonalidad. ',

                        //otros actos registrales
                        'Ampliación de capital.',
                        //

                        'Ampliacion del objeto social.',

                        'Cambio de denominación social.',
                        'Cambio de domicilio social.',
                        'Cambio de objeto social',
                        'Cambio objeto social.',
                        'Objeto social.',
                        'Crédito incobrable.',
                        'Fusión por absorción.',
                        'Fusión por unión.',
                        'Modificaciones estatutarias.',
                        'Modificación de poderes.',
                        'Modificación de duración',
                        'Reducción de capital.',
                        'Escisión total.',
                        'Escisión parcial.',
                        'Emisión de obligaciones.',
                        'Transformación de sociedad.',
                        'Reapertura hoja registral',
                        'Situación concursal.',
                        'Suspensión de pagos.',
                        'suspensión de pagos.',
                        'Primera sucursal de sociedad extranjera.',
                        'Articulo 378.5 del Reglamento del Registro Mercantil.',
                        'Página web de la sociedad',
                        'Apertura de sucursal.',
                        'Segregación.',
                        'Adaptación de sociedad',
                        'Cierre de Sucursal',
                        'Primera inscripcion',

                        'Reactivación de la sociedad',
                        'reactivación De La Sociedad (art242 Del Reglamento Del Registro Mercantil)',

                        'Cierre provisional',
                        //'Cierre provisional hoja registral por revocación del NIFde Entidades Jurídicas',
                        //'Cierre provisional hoja registral art. 137.2 Ley 43/1995 Impuesto de Sociedades.',
                       // 'Cierre provisional de la hoja registral por revocación del NIF',

                        'Acuerdo de ampliación de capital social sin ejecutar.',
                        'Objeto social:',

                        'Cesión global de activo y pasivo',
                        'Desembolso de dividendos pasivos.',
                        'Modificaciones estatutarias.',
                        'Anotación preventiva.',

                        'Juez:',

                        'Qiebra:',
                        'Quiebra.',
                        'EN LIQUIDACION.',

                        'Administrador Concursal.',

                        'Fe de erratas:',

                        'Adaptada segun D.T. 2 apartado 2 Ley 2/95.',
                        'Resoluciones:',
                        'Otros conceptos:',

                        
                        'Datos registrales.',
                        'Datos registralesT',
                        'datos Registralest',
                        'Datos registrales',
                        'registrales.'
                    ]
                }, nameKeys: [
                    'Constitucion',
                    //
                    'Nombramiento',
                    'Cese',
                    'Revocacion',
                    //
                    'Cancela',
                    'Disolucion',
                    'Reeleccion',
                    'Extincion',
                    /////////////////////////////////////////////
                    null,
                    null,
                    null,
                    null,
                    null,
                    //
                    'AmpliaCapital',
                    //
                    'Varios',
                    'Varios',
                    'Varios',
                    'Varios',
                    'Varios',
                    'Varios',
                    'Varios',
                    'Varios',
                    'Varios',
                    'Varios',
                    'Varios',
                    'Varios',
                    'Varios',
                    'Varios',
                    'Varios',
                    'Varios',
                    'Varios',
                    'Varios',
                    'Varios',
                    'Varios',
                    'Varios',
                    'Varios',
                    'Varios',
                    'Varios',
                    'Varios',
                    'Varios',
                    'Varios',
                    'Varios',
                    'Varios',
                    'Varios',
                    'Varios',

                    'Extincion',
                    //'Extincion',
                    //'Extincion',
                    //'Extincion',

                    'Varios',
                    'Varios',
                    'Varios',
                    'Varios',
                    'Varios',
                    'Varios',
                    'Varios',


                    'Extincion',
                    'Extincion',
                    'Extincion',
                    'Concurso',
                    'Erratas',
                    null,
                    null,
                    null,

                    null,
                    null,
                    null,
                    null,
                    null
                ]
            },
            _transforms: transforms,
            get: {
                principal: function ($) {
                    //console.log($('analisis modalidad').html())
                    //if ($('analisis modalidad').html() == "Formalización contrato")
                    //    debugger
                    return {
                        id: $('metadatos identificador').html(),
                        text: $('metadatos titulo').html(),
                        urlPdf: $('metadatos url_pdf').html()
                    }
                },
                data: function (data) {
                    try {
                        return {
                            _BORME: data._list[data.e].BORME,
                            _cod: data.codigo.id,                       
                            contratista: data.codigo.text,
                            texto: data.textExtend,
                            urlPdf: data.codigo.urlPdf,
                            urlXml: app.Boe.url + data._list[data.e].BORME.split("-")[0].toLowerCase() + "/xml.php?id=" + data._list[data.e].BORME,
                        }
                    }
                    catch (err) {
                        debugger
                    }
                },
                p_parrafo: function ($, charEnd, body) {
                    const _lastParragraf = true
                    const _arr = []

                    const DOMParser = require('xmldom').DOMParser
                    const xml = new DOMParser().parseFromString(body)
                    const _json = app.Rutines().xmlToJson(xml)
                    const _areas = []
                    const _content = []

                    if (_json.documento.texto.dl != null) {
                        //debugger
                        for (i in _json.documento.texto.dl.dt) {
                            _areas[i] = _json.documento.texto.dl.dt[i]['#text']
                            _content[i] = []
                        }
                        for (i in _areas) {
                            if (_json.documento.texto.dl.dd[i].dl != null) {
                                //debugger
                                for (e in _json.documento.texto.dl.dd[i].dl.dd) {
                                    if (_json.documento.texto.dl.dd[i].dl.dt[e] == null) {
                                        _content[i][e] = _json.documento.texto.dl.dd[i].dl.dd[e]['#text']
                                    } else {
                                        _content[i][e] = _json.documento.texto.dl.dd[i].dl.dt[e]['#text']
                                        _content[i][e] = _content[i][e] + _json.documento.texto.dl.dd[i].dl.dd[e]['#text']
                                    }
                                }
                            } else {
                                _areas[i] = _areas[i] + _json.documento.texto.dl.dd[i]['#text']
                            }
                        }
                        for (i in _areas) {
                            _arr[_arr.length] = _areas[i]

                            if (_content[i].length > 0)
                                for (e in _content[i]) {
                                    _arr[_arr.length] = _content[i][e]
                                }
                                
                        }
                        
                        
                    }


                    $('p.parrafo').each(function (p, _parraf) {
                        var _t = app._.trim($($('p.parrafo')[p]).html())
                        if (_t.length > 0) {
                            if (_t.indexOf(')') == 1 || _t.indexOf('.') == 1 || _lastParragraf) {
                                _arr[_arr.length] = _t
                            } else {
                                _arr[_arr.length - 1] = _arr[_arr.length - 1] + ' ' + _t
                            }
                            _lastParragraf = (_t.lastIndexOf(charEnd) == _t.length - 2)
                        }
                    })

                    return _arr
                }
            },
            transforms: function (_array, _regexp) {
                if (_regexp != null) {
                    let p=0
                    for (p in _regexp) {

                        if (_regexp[p][0] == 'F') {
                            
                            _array = _regexp[p][1].f(_array, _regexp[p][2], _regexp[p][3])
                            
                        } else {
                            //console.log(_array, p)
                            //if (p == 9)
                            //debugger
                            _array = _array.replace(_regexp[p][1], _regexp[p][2] )
                            //console.log(_array, p)
                        }
                        
                        
                    }
                }
                return _array
            },
            extract: function (_arrayText, search, transforms) {
                //var _arr = []

                for (i in _arrayText) {
                    //console.log(_arrayText[i])
                    if (_arrayText[i].toLowerCase() != null)
                        if (_arrayText[i].toLowerCase().indexOf(search.toLowerCase()) > -1) {
                            _arrT = _arrayText[i].split(":")
                            if (_arrT.length > 1) {
                                if (_arrT[1].length>1)
                                    return app.Boe.Rutines.transforms(_arrT[1], transforms)
                            }
                        }
                }
                return ""
            
            },
            removeLastChar: function (string, char) {
                if (string.lastIndexOf(char) == string.length - 1)
                    string = string.substr(0, string.length - 2)
                return string
            },
            getConstitucion: function (cadena, _keys, _next, data) {
                //var _ret = []
                //debugger
                const _op = ['Comienzo de operaciones:', 'Objeto social:', 'Domicilio:', 'Capital:']
                const _pos = this.getPosExploreItems(cadena, _op)                             //sacamos el counjunto de posiciones segun plabras clave
                const _s = this.extraeArrDeCadena(cadena, _pos, { keys: { arr: _keys } }, 'Constitucion')       //extraemos las cadenas de las subopciones
           
                return _s
            },
            getAmpliaCapital: function (cadena, _keys, _next, data) {
            
                const _op = ['Capital:', 'Resultante_Suscrito:', 'Resultante_Desembolsado:', ' Suscrito:', 'Desembolsado:'] //0.100,00 Euros. Resultante Suscrito: 120.206,01 Euros.'
                const _pos = this.getPosExploreItems(cadena, _op, false,"_")                             //sacamos el counjunto de posiciones segun plabras clave
                const _s = this.extraeArrDeCadena(cadena, _pos, { keys: { arr: _keys } }, 'Ampliacion de Capital')       //extraemos las cadenas de las subopciones
                //debugger
                return _s
            },
            EnConcurso: function (type, cadena, _keys, _next, data) {
                return [{ key: _keys.c, value: cadena }]
            },
            getDirectivos: function (type, cadena, _keys, _next, data) {
                const _COriginal = cadena
                const cuenta = function (str) {
                    str = str.replace(/[^.]/g, "").length
                    return str;
                }
                const isEmpresa = function (cadena) {
                    if (cadena.substr(cadena.length - 1, 1) != ".")
                        cadena = cadena + '.'
                    cadena = cadena.toUpperCase().replaceAll(/#\$$/, ".")

                    //if (cadena.indexOf('&') > 0)
                    //    debugger

                    return (cadena.indexOf('SOCIEDAD ANONIMA') > -1 ||
                        cadena.indexOf('SOCIEDAD LIMITADA') > -1 ||
                        cadena.indexOf(' SL.') > -1 ||
                        cadena.indexOf(' SL') == cadena.length - 3 ||
                        cadena.indexOf(' SA') == cadena.length - 3 ||
                        cadena.indexOf(' SA.') > -1 ||
                        cadena.indexOf('SAT ') > -1 ||
                        cadena.indexOf('SAU.') > -1 ||
                        cadena.indexOf('S.COOP') > -1)
                }
                const _k = function (_isEmpresa,key,cadena) {
                    return {
                        Empresa: _isEmpresa,
                        key: key,
                        value: _isEmpresa ? cadena.toUpperCase() : cadena
                    }
                }
                const _ret = []
                let i = 0

                const found = function (cargos, _cadena) {
                    let cad = _cadena
                    let _found = false
                    let _counter = 0

                    for (_counter in cargos) {

                        if (cad.toUpperCase().indexOf(cargos[_counter].toUpperCase()) > -1) {
                            const minus = cad.indexOf(cargos[_counter]) > -1
                            _found = true
                            var _rep = cargos[_counter].replace(/\ /g, "").replace(/\./g, "#")
                            cad = app._.trim(cad.replaceAll(minus ? cargos[_counter] : cargos[_counter].toUpperCase(), minus?_rep:_rep.toUpperCase() ) ) //.trim()
                        }
                    }
                    return { found: _found, cadena: cad }
                }
                if (cadena.toUpperCase() == cadena)
                    cadena = cadena.capitalizeAllFirstLetter()
                const _f = found([], cadena)
                cadena = _f.cadena
                
                //_cad = app._.trim( this.titleCase(_f.cadena.split(":")[0] + ":") )
                cadena = found([ app._.trim(this.titleCase(_f.cadena.split(":")[0] + ":")) ], cadena).cadena


                const _valores = []
                const _search = cadena.match(/[a-z]\. [A-Z]/g)
                app._.each(_search, function (o) {
                    cadena = cadena.replaceAll(o,o.replaceAll(" ",""))
                })
                var _m = cadena.match(/\s[A-Z][.]\s[A-Z][.]\s(SL|SA)/g)
                app._.each(app._.uniq(_m), function (o) {
                    //for (o in app._.uniq(_m)) {
                        const _x = (" " + o.replaceAll(" ", "") + " ")
                        cadena = cadena.replaceAll(o, _x.replaceAll(/[.]S/,". S").replaceAll(".","_"))
                    //}
                })
                cadena = this.transforms(app._.trim(cadena), this._transforms.getPatern(this._transforms).Directivos)
                
                //cadena = this.analizeEmpresaName(cadena, this._transforms.getPatern(this._transforms))

                cadena = cadena.replace(/S\W COOP\W/g, "/S_COOP_")
                    .replace(/AND\.\W/g, " ")
                    .replace(/w SA\W/g, " SA.")
                    .replace(/w SL\W/g, " SL.")
                    .replace(/S\.L\./g, 'SL.')
                    .replace(/S\.A\./g, 'SA.')

                    .replace(/\.\B/g, "#$")
                    .replace(/\. /g, "#$")
                    .replace(/\./g, "#") 
                    .replace(/\_/g, ".")
                //if (cadena != _c)
                //    debugger

                const _preval = app._.trim((cadena+' ')).split("#$ ")

                for (i in _preval) {

                    //if (_preval[i].length < 5)
                    //    debugger

                    if (_preval[i].length > 4) 
                        if (app._.trim( _preval[i] ).indexOf(":") == -1) {
                            _valores[_valores.length - 1] = _valores[_valores.length - 1] + _preval[i]
                        } else {
                            _valores[_valores.length] = app._.trim( _preval[i] ).replace(/#/g, ".").replace(/\$/g, "")
                        }
                }
                for (i in _valores) {
                    if (app._.trim( _valores[i] ).length > 0) {
                        const item = app._.trim( _valores[i]).split(": ")

                        if (item.length > 0) {
                            if (item[1] != null){

                                let d = 0
                                const _dir = app._.trim(item[1]).split(';')
                                for (d in _dir) {
                                    //_dir[d] = _dir[d]
                                    if (_dir[d].substr(_dir[d].length - 1, 1) == ".")
                                        _dir[d] = _dir[d].substr(0, _dir[d].length - 1)

                                    
                                    _dir[d] = _dir[d].replaceAll("/", "").replace(/(%|_)/g, ".") //.replaceAll("%", ".").replaceAll("_", ".")

                                    
                                    const _map = this._transforms.getPatern(this._transforms)

                                    var _c = ""

                                    //if (!_isEmpresa) {
                                        var _d = this.titleCase(_dir[d].replaceAll(".", ""))
                                        var _p = app._.findIndex(this._transforms.getPatern(this._transforms).recortes, function (e) {
                                            return _d.toLowerCase().indexOf(e) > -1
                                        })
                                        if (_p > -1) {
                                            _c = _d.replaceAll(new RegExp(_map.recortes[_p], 'gi'), "")
                                        } else {
                                            _c = _d
                                        }
                                    //} else {
                                    //    _c = _dir[d].toUpperCase()
                                    //}
                                    var _key = this.titleCase(app._.trim(item[0]).replace(/(#|%)/g, "."))
                                    const _isEmpresa = isEmpresa(_c)
                                    _c = _isEmpresa ? _c.toUpperCase() : _c
                                    
                                    var _r = _k(_isEmpresa, _key, _c)
         
                                    if (_r.value == _dir[d].toUpperCase() && !_isEmpresa)
                                        debugger

                                    if (_r.value.indexOf("%")>-1 && !_isEmpresa)
                                        debugger
                                    _ret.push(_r )

                                }
                            }
                        }
                    }
                }
                //_valores = null
                return _ret

            },
            //////////////////////////////////////////////////////////////////////////////////////
            //
            //
            // 
            SQL: {
                Concurso: function (_linea, __data, callback) {
                    callback({ type: __data.type, key: app._.trim(__data.values.key.replace(".", "").replace(":", "")), value: app._.upperFirst(__data.values.value.toLowerCase()) }, 0)
                },
                Varios: function (_linea, __data, callback) {
                    callback({ type: __data.type, key: app._.trim(__data.values.key.replace(".", "").replace(":", "")), value: app._.upperFirst(__data.values.value.toLowerCase()) }, 0)
                },
                Constitucion: function (_linea, __data, callback) {
                    callback({ type: __data.type, key: __data.values.key, value: __data.values.value }, 0)
                },
                AmpliaCapital: function (_linea, __data, callback) {
                    //debugger
                    callback({ type: __data.type, key: __data.values.key, value: __data.values.value }, 0)
                },
                Disolucion: function (_linea, __data, callback) {
                    //debugger
                    callback({ type: __data.type, key: __data.values.key, value: __data.values.value }, 0)
                },
                Extincion: function (_linea, __data, callback) {
                    //debugger
                    callback({ type: __data.type, key: __data.values.key, value: __data.values.value }, 0)
                },
                SaveDirectivo: function (_linea, __data, Active, callback) {
                    const capitalizeFirstLetter= function(string) {
                        return string.charAt(0).toUpperCase() + string.slice(1);
                    }
                    var _e = 0
                    
                    __data.values.value = __data.values.value.replaceAll("#$", "")
                    
                    var _lesp = __data.values.value.lastIndexOf('#')
                    var _l = __data.values.value.length
                    if (_l - _lesp < 4)
                        __data.values.value = __data.values.value.substr(0, _lesp )

                    var _esp = __data.values.value.indexOf('#')
                    if (_esp > -1)
                        __data.values.value = __data.values.value.replaceAll("#", ".")
                    

                    var _table = __data.values.key.toUpperCase().indexOf("AUD")>-1 ? "Auditor" : __data.values.value == __data.values.value.toUpperCase() ? "Empresa" :  "Directivo"
                    __data.values.Empresa = (_table == "Empresa")
                    __data.values.Auditor = (_table == "Auditor")
                   
                    var _exclude = false
                    app._.forEach(options.diccionario.exclude, function (value) {
                        if (app._.toLower(__data.values.value).indexOf(value) == 0)
                            _exclude = true
                    })

                    app._.forEach(options.diccionario.recorta, function (value) {
                        if (app._.toLower(__data.values.value).indexOf(value) > -1)
                            __data.values.value = __data.values.value.substr(__data.values.value, app._.toLower(__data.values.value).indexOf(value) - 1)
                    })

                    if (!_exclude) {


                        if (__data.values.value.indexOf('#') > -1)
                            debugger
                        //__data.values.value = __data.values.value.replaceAll("#",".")
                        if (__data.values.value.indexOf('Administrad') > -1 && _table!="Auditor")
                            debugger

                        //if (_table == "Directivo")
                        //    __data.values.value = capitalizeFirstLetter(__data.values.value)


                        
                        //if (__data.values.key.toLowerCase() == "juzgado")
                        //    __data.values.value = capitalizeFirstLetter(__data.values.key + " " + __data.values.value)

                        if (__data.values.value.indexOf(":") > -1 && __data.values.value.indexOf(".") > 0)
                            if (__data.values.value.indexOf(":") > __data.values.value.indexOf("."))
                                __data.values.value = __data.values.value.substr(0,__data.values.value.indexOf("."))

                            //debugger
                        if (__data.values.value.indexOf(".") > -1) {
                            var _p = app._.findIndex(options.Rutines.maps.Replace, function (o) {
                                return __data.values.value.toUpperCase().indexOf(o[0].toUpperCase()) > -1
                            })
                            if (_p > -1) {
                                __data.values.value = __data.values.value.toUpperCase().replaceAll(options.Rutines.maps.Replace[_p][0].toUpperCase(), options.Rutines.maps.Replace[_p][1].toUpperCase())
                            }
                            if (__data.values.value.lastIndexOf(".") == __data.values.value.length - 1)
                                __data.values.value = __data.values.value.substr(0, __data.values.value.lastIndexOf("."))


                        }
  
                        const _emp = app._.findIndex(options.Rutines.maps.Empresas, function (o) { return __data.values.value.toUpperCase().indexOf(" " + o.toUpperCase()) > -1 })
                        
                        if (_emp > -1 ) {
                            const _cl = options.Rutines.maps.Empresas[_emp]
                            const _e = __data.values.value.toUpperCase().lastIndexOf(" " + _cl)
                            if (_e + 1 + _cl.length == __data.values.value.length) {

                                __data.values.value = __data.values.value.substr(0, _e + 1 + _cl.length).toUpperCase()
                                if (!__data.values.Auditor) {
                                    _table = "Empresa"
                                }
                                __data.values.Empresa = true
                            } 
                            //__data.values.Directivo=false
                        } else {
                            if (!__data.values.Auditor) {
                                _table = "Directivo"
                                __data.values.value = capitalizeFirstLetter(__data.values.value)
                            }
                        }
                        if (__data.values.value.length > 4) {
                            const _m = __data.values.value.match(/(SL\.|SA\.)/g)
                            if (_m)
                                __data.values.value = __data.values.value.substr(0, __data.values.value.indexOf(_m[0])+2)

                            app.BOLETIN.Rutines.getUnique(app.BOLETIN.Rutines.getUnique, __data.values.value, app.BOLETIN.SQL.db, function (_k) {
                                const go = function (options, params) {
                                    app.commonSQL.SQL.commands.insert.Borme.keys(options, params, function (params, _directivo) {

                                        if (_directivo.length > 0) {
                                            
                                            if (Active) {
                                                options.parser.printOut(app, options, '\x1b[32m', '', '')
                                            } else {
                                                options.parser.printOut(app, options, '\x1b[31m', '', '')
                                            }
                                            options.parser.printOut(app, options, '', __data.values.Empresa ? "e" : __data.values.Auditor ? "a" : "d", '')
                                            options.parser.printOut(app, options, '', '', '\x1b[0m')
                                            callback(__data, _directivo[0][0].Id, params, Active)
                                        }
                                    }, function (params) {
                                        callback(null)
                                    })
                                }


                                options.grafos.push.Object({
                                    table: _table,
                                    empresa: __data.values.Empresa ? true : false,
                                    e: __data.values.value,
                                    k: _k.replaceAll("-", ""), //app.shorter.generate(), //_l + _i.substr(0, 1) + _k.substr((_k.length - 1) - (8 - _l.length), 8 - _l.length) ,
                                    data: _linea.data
                                }, function (params) {
                                    go(options, params)
                                })

                            })
                        } else {
                            if (Active) {
                                options.parser.printOut(app, options, '\x1b[32m', '', '')
                            } else {
                                options.parser.printOut(app, options, '\x1b[31m', '', '')
                            }
                            options.parser.printOut(app, options, '',  "?", '')
                            options.parser.printOut(app, options, '', '', '\x1b[0m')
                            callback(__data, 0, null, false)
                        }
                        //})
                    } else {
                        callback(__data, 0, null, false)
                    }
               
                },
                Nombramiento: function (_linea, __data, callback) {
                    this.SaveDirectivo(_linea, __data, true, callback)
                },
                Reeleccion: function (_linea, __data, callback) {
                    this.SaveDirectivo(_linea, __data, true, callback)
                },
                Cese: function (_linea, __data,  callback) {
                    this.SaveDirectivo(_linea, __data, false, callback)
                },
                Revocacion: function (_linea, __data,  callback) {
                    this.SaveDirectivo(_linea, __data, false, callback)
                },
                Oficio: function (_linea, __data,  callback) {
                    this.SaveDirectivo(_linea, __data, false, callback)
                },
                Cancela: function (_linea, __data,  callback) {
                    this.SaveDirectivo(_linea, __data, false, callback)
                },
                Erratas: function (_linea, __data, callback) {
                    callback({ type: __data.type, key: app._.trim(__data.values.key.replace(".", "").replace(":", "")), value: __data.values.value }, 0)
                },
            },
            Constitucion: function ( cadena, _keys, _next, data) {
                const _ret = []
                const _values = this.getConstitucion(cadena, _keys, _next, data)
                let _i = 0

                for (_i in _values) {
                    //debugger
                    _ret[_ret.length] = { key: _values[_i].c.replace(":","") , value: _values[_i].f }
                }
                return _ret
            },
            Nombramiento: function ( cadena, _keys, _next, data) {
                return this.getDirectivos('Nombramientos', cadena, _keys, _next, data)
            },
            Cese: function ( cadena, _keys, _next, data) {
                return this.getDirectivos('Ceses', cadena, _keys, _next, data)
            },
            Revocacion: function ( cadena, _keys, _next, data) {
                return this.getDirectivos('Revocacion', cadena, _keys, _next, data)
            },
            Oficio: function ( cadena, _keys, _next, data) {
                return this.getDirectivos('Oficio', cadena, _keys, _next, data)
            },        
            Cancela: function ( cadena, _keys, _next, data) {
                return this.getDirectivos('Cancela', cadena, _keys, _next, data)
            },
            Disolucion: function ( cadena, _keys, _next, data) {
                return [{ key: 'Disolucion', value: cadena }]
            },
            Extincion: function ( cadena, _keys, _next, data) {
                return [{ key: 'Extincion', value: cadena.trim() }] //, cadena, _keys, _next, data)
            },
            Varios: function (cadena, _keys, _next, data) {
                return [{ key: _keys.c, value: cadena }]
            },
            Concurso: function (cadena, _keys, _next, data) {
                //this.EnConcurso(idEmpresa, 'Concurso', cadena, _keys, _next, data)
                return this.EnConcurso('Concurso', cadena, _keys, _next, data)      //[{ key: _keys.c, value: cadena }]
            },
            Cierre: function ( cadena, _keys, _next, data) {
                return this.getDirectivos(idEmpresa, 'Cierre', cadena, _keys, _next, data)
            },
            Reeleccion: function ( cadena, _keys, _next, data) {
                return this.getDirectivos('Reeleccion', cadena, _keys, _next, data)
            },       
            AmpliaCapital: function ( cadena, _keys, _next, data) {
                const _ret = []
                const _values = this.getAmpliaCapital(cadena, _keys, _next, data)
                let _i = 0

                for (_i in _values) {
                    //debugger
                    _ret.push( { key: _values[_i].c.replace(":", ""), value: _values[_i].f } )
                }
                return _ret
            },
            CambioDomicilio: function ( _keys, data) {},
            AmpliaObjetoSocial:function(_this , _keys, data){},
            CambiaObjetoSocial:function(_this , _keys, data){},
            Fusion:function(_this , _keys, data){},
            ModificaEstatutos:function(_this , _keys, data){},
            ReduceCapital:function(_this , _keys, data){},
            SetSociedadUnipersonal: function (_this, data) { },
            DeclaraSociedadUnipersonal: function (cadena, _keys, _next, data) {
                return { data: _keys, string: data }
            },
            SetSocioUnico:function(_this , _keys, data){},
            SetDatosRegistrales:function(_this , _keys, data){},
            UnsetUnipersonal: function (_this, data) { },
            DatosRegistro: function (cadena, _keys, _next, data) {
                return [{ key: 'DatosRgistro', value: cadena.trim() }]
            },
            Erratas: function (cadena, _keys, _next, data) {
                return [{ key: 'Erratas', value: cadena.trim() }]
            },

            actions: {
                constitucion: function (data, keys) {
                    const _k=keys.key.replace(/ /g, "_")
                    if (data[_k] == null)
                        data[_k] = []

                    data[_k][ data[_k].length] = keys.value
                    return data
                }
            },
            sortBy : function (_array, p) {
                return _array.slice(0).sort(function (a, b) {
                    return (a[p] > b[p]) ? 1 : (a[p] < b[p]) ? -1 : 0;
                });
            },
            getDataField: function (_keys, data, type) {
                //rutina para aplicar el mismo tratamiento a cada uno resultados de la cadena
                //obtenido un bubconjunto de resultados
                if (_keys.length > 0) {                                                          //si hay palabas clave para esta opcion
                    const _pos = this.getPosExploreItems(data, _keys)                             //sacamos el counjunto de posiciones segun plabras clave
                    const _s = this.extraeArrDeCadena(data, _pos, { keys: { arr: _keys } }, type)       //extraemos las cadenas de las subopciones
                    return { c: type, f: _s }
                }
                return { c: type, f: app._.trim(data) }
            },
            extraeArrDeCadena: function (cadena, map, _keys, _t) {
                //rutina clave que extrae de la cadena, el conjunto de datos entre palabras clave
                //haciendo la misma operación de analisis con palabras clave dentro del resultado
                //
                //partiendo del cojunto de posiciones "map"
                //
                var _parray = 0
                var _plength = 0
                const _explore = []
                //var _map = _keys.keys.arr                                                       //mapa de palabras clave
                for (_parray in map) {                                                               //recorremos la array con los resultado de la posiciones
            
                    const py= map[_parray].p + map[_parray].c.length                                                 //calculamos el punto inicial con la posicion en la cadena mas la longitud de la palabra clave
                    if (_parray*1 != map.length - 1) {                                                        //si no es el último elemento
                        _plength = map[_parray * 1 + 1].p - map[_parray].p - map[_parray].c.length          //calculamos la longitud final en base a la siguiente palabra clave
                    } else {
                        _plength = cadena.length  - py // map[_e].c.length                                  //si es el último elemento calculamos la longitud del resto de la cadena
                    }
                
                    var _string = app._.trim(cadena.substr(py, _plength).replaceAll(":","") )                               //extrayendo el resultado
                    if (_string.substr(_string.length - 1, 1) == ".")
                        _string= _string.substr(0, _string.length - 1)


  
                    _explore[_explore.length] = {
                        _t: _t,
                        c: map[_parray].c,
                        f: _string,
                        //py: py,
                    }
                    
                
                    //}
                }
                return _explore
            },
            getPosExploreItems: function (cadena, Explore,onlyposdata,extrachar) {
                //
                //inspeccionamos la cadena buscando las posiciones donde aparecen las palabras clave
                //devolviendo una array con los resultados OK ordenado por posiciones de las palabras clave en la cadena
                //
                let e = 0
                if (extrachar != null)
                    cadena = " " + cadena.substr(1, cadena.length).replaceAll(" ", "_")

                const _explore = []
                for (e in Explore) {                                                            //para cada una de las palabras clave
                    const py = cadena.indexOf(Explore[e], 0)                                    //miramos si hay alguna coincidencia de la palabra clave
                    if (py > -1) {
                        const _exp = Explore[e]
                        if (!app._.find(_explore, function (o) {
                            return o.c.indexOf(_exp) > -1
                        })) {                                                              //si hubo coincidicencia
                            _explore.push( onlyposdata ? { p: py, l: _exp.length } : { c: _exp.replaceAll("_", " ").replaceAll(".", "").replaceAll(":", ""), p: py, id: e * 1 }  )            //anotamos en la matriz de resultados una estructura
                        }
                    }
                }
                return _explore.length>0?this.sortBy(_explore,'p') : null                           //devolvemos el resultado ordenado por posiciones
            },
            getDifference:function (a, b)
            {
                var i = 0;
                var j = 0;
                var result = "";
    
                while (j < b.length)
                {
                    if (a[i] != b[j] || i == a.length)
                        result += b[j];
                    else
                        i++;
                    j++;
                }
                return result;
            },
            scrapDataFromMap: function (_this, lines, map) {
                if (lines.length == 0)
                    debugger

                const exclusion = ['Núm. ','Actos inscritos', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'SECCIÓN', 'Empresarios', 'BOLETÍN OFICIAL DEL REGISTRO MERCANTIL', 'Pág.', 'http://www.boe.es','D.L.:' ]
                const inclusion = ['cve:', 'A CORUÑA', 'LA CORUÑA', 'ARABA/ÁLAVA', 'ÁLAVA', 'ALBACETE', 'ALICANTE', 'ALMERÍA', 'ASTURIAS', 'ÁVILA', 'BADAJOZ', 'BARCELONA', 'BIZKAIA', 'BURGOS', 'CÁCERES', 'CÁDIZ', 'CANTABRIA', 'CASTELLÓN', 'CIUDAD REAL', 'CÓRDOBA', 'CUENCA', 'CEUTA', 'GIRONA', 'GRANADA', 'GUADALAJARA', 'GUIPÚZCOA', 'GIPUZKOA', 'HUELVA', 'HUESCA', 'ILLES BALEARS', 'ISLAS BALEARES', 'JAÉN', 'LA RIOJA', 'LAS PALMAS', 'LEÓN', 'LLEIDA', 'LUGO', 'MADRID', 'MÁLAGA', 'MELILLA', 'MURCIA', 'NAVARRA', 'ORENSE', 'OURENSE', 'PALENCIA', 'PONTEVEDRA', 'SALAMANCA', 'SEGOVIA', 'SEVILLA', 'SORIA', 'TARRAGONA', 'SANTA CRUZ DE TENERIFE', 'TERUEL', 'TOLEDO', 'VALENCIA', 'VALLADOLID', 'VIZCAYA', 'ZAMORA', 'ZARAGOZA']
                const sinonimos = ['A CORUÑA#LA CORUÑA', 'ALABAÁLABA#ÁLAVA', 'ARABA/ÁLAVA#ÁLAVA', 'GUIPÚZCOA#GIPUZKOA', 'ILLES BALEARS#ISLAS BALEARES', 'OURENSE#ORENSE', 'BIZKAIA#VIZCAYA']

                const isNumeric = function (n) {
                    return !isNaN(parseFloat(n)) && isFinite(n);
                }

                const patterns = _this._transforms.getPatern(this._transforms)
                const _xlines=[]
                var Borme = null
                var Provincia = null

                var _l = 0
                var line = ""
                var  _e = 0
                var  _excluye = null
                var i = 0

                for (_l in lines) {
                    //debugger
                    line = lines[_l].replace(/^\s+|\s+$/gm,"")
                    if (line.length > 3) {
                        var _excluye = false
                        for (_e in exclusion) {
                            if (line.indexOf(exclusion[_e]) > -1 && !_excluye)
                                _excluye = true
                        
                        }
                        //debugger
                        if (!_excluye) {
                            //debugger
                            if (line.indexOf('cve:') > -1) {
                                _excluye = 0
                            }else{
                                for (_e in inclusion) {
                                    if (this.getDifference(line, inclusion[_e]).length == 0 )
                                        if(line.length == inclusion[_e].length)
                                            _excluye = _e * 1
                                }
                            }
                    
                    
                            //debugger
                            if (!isNumeric(_excluye)) {
                                _xlines[_xlines.length] = line
                            } else {
                                if (_excluye == 0) {
                                    //debugger
                                    var _p = line.indexOf('cve:')
                                    Borme = line.replace(/\s+/, "").substr(_p + 4, line.length - _p - 4)
                                    //debugger
                                } else {
                                    Provincia = line.replace(/\s+/, "")
                                }
                            }
                        }
                    
                    }
                }
                for (i in sinonimos) {
                    if (sinonimos[i].indexOf(Provincia) > -1)
                        Provincia = sinonimos[i].split('#')[1]
                }
                lines = []
                if (Borme != null && Provincia != null) {               
                    var cadena = ""

                     for (_l in _xlines) {
                        var _e = _xlines[_l].substr(_xlines[_l].length - 4, 4)
                        if ( ((_e.charAt(0)>="0" &&  _e.charAt(0)<="9") && (_e.charAt(1)>="0" &&  _e.charAt(1)<="9") && _e.substr(2,2)==").") )  {
                            var _xline = cadena + (cadena.length > 0 ? ' ' : '') + _xlines[_l]
                            var _xcline = _xline.split("-")[0]
                            if(!isNaN(parseFloat(_xcline)) && isFinite(_xcline))
                                lines[lines.length] = _xline
                            cadena=""
                        } else {
                            var cadena = cadena + (cadena.length > 0 ? ' ' : '') + _xlines[_l]
                        }
                        
                     }

                    //leemos el texto convertido a matriz
                    //aplicandole un mapa de palabras clave
            
                    var _lines = []
                    for (i in lines) {
                        if (lines[i].length > 40) {                                                 //si la longitud del texto >40 pj
                            var _items = this.getPosExploreItems(lines[i], map.keys.arr,false)            //extraemos las posiciones donde existen palabras clave //extreamos las cadenas entre palabras clave y las traspasamos a una array
                            if (_items != null) {
                                if (lines[i].substr(0, _items[0].p).indexOf("(") > -1) {
                                    var _Empresa = lines[i].substr(0, _items[0].p).split("(")[0]        //extreamos la empresa del comienzo de la cadena
                                } else {
                                    var _Empresa = lines[i].substr(0, _items[0].p)
                                }
                                _Empresa = _Empresa.split("-")                                       //desechando lo que no interesa

                                var _n=2
                                while (_n < _Empresa.length ) {
                                    _Empresa[1] = _Empresa[1] + "-" + _Empresa[_n]
                                    _n++
                                }

                                _Empresa[1] = _this.transforms(app._.trim(_Empresa[1]) , patterns.Contratista) 
                                if (_Empresa[1].indexOf("UNION TEMPORAL DE EMPRESAS") > -1)
                                    _Empresa[1] = _Empresa[1].substr(0, _Empresa[1].length - _Empresa[1].indexOf("UNION TEMPORAL DE EMPRESAS"))

                                if (_Empresa[1].indexOf('SA.') > -1)
                                    _Empresa[1] = _Empresa[1].substr(0, _Empresa[1].indexOf('SA.') + 2)

                                if (_Empresa[1].indexOf('SL.') > -1)
                                    _Empresa[1] = _Empresa[1].substr(0, _Empresa[1].indexOf('SL.') + 2)

                                _lines[_lines.length] = {
                                    id: app._.trim(_Empresa[0]),
                                    e: _Empresa[1].split(".")[0].replace(/%/g,'.'),
                                    keys: _items,
                                    original: lines[i],
                                    contenido : _this.explora(lines[i], _items, _this.maps)
                                }              //acumulando los resultados en una matriz

                            
                            }
                        }
          
                    }

                    return { BORME:Borme, PROVINCIA:Provincia, data: _lines}
                } else {
                    debugger
                    return null
                }
            },
            getUnique: function (_this, _name, _db, callback) {
                const _k = app.aguid(_name)
                if (_db == null)
                    debugger

                _db.query("select * from borme_keys where _key=?", [_k], function (err, record) {
                    if (err)
                        console.log(err)

                    if (record.length > 0) {
                        if (record[0].Nombre.toLowerCase() === _name.toLowerCase()) {
                            callback(record[0]._key)
                        } else {
                            if (record[0]._key == _k) {
                                _this(_this, _name, _db, callback)
                            }else{
                                callback(_k)
                            }
                        }
                    } else {
                        callback(_k)
                    }
                })
            },
            analizeSimpleLine: function (options, line,  skey, recordset, callback) {
                
                const _db = options.SQL.db
                //const _this = options.Rutines
                const map = options.Rutines.maps
                
                //const patterns = _this._transforms.getPatern(_this._transforms)

                //if (line.indexOf(":") > -1)
                //    debugger

                const _items = this.getPosExploreItems(line, map.keys.arr, false)            //extraemos las posiciones donde existen palabras clave
                var _Empresa = ""

                if (_items != null) {
                    if (line.substr(0, _items[0].p).indexOf("(") > -1) {
                        _Empresa = line.substr(0, _items[0].p).split("(")[0]        //extreamos la empresa del comienzo de la cadena
                    } else {
                        _Empresa = line.substr(0, _items[0].p)
                    }
                    _Empresa = _Empresa.split("-")                                      //desechando lo que no interesa
                    
                    var _n = 2
                    while (_n < _Empresa.length) {
                        _Empresa[1] = _Empresa[1] + "-" + _Empresa[_n]
                        _n++
                    }

                    var _e = this.analizeEmpresaName(_Empresa[1], this._transforms.getPatern(this._transforms))
                    
                    this.getUnique(this.getUnique, _e , _db, function (_k) {
                        
                        

                            callback({
                                id: app._.trim(_Empresa[0]),
                                e: _e,
                                k: _k.replaceAll("-", "") ,
                                keys: _items,
                                original: line,
                                contenido: options.Rutines.explora(line, _items, options),
                                provincia: options.Provincia
                            }, skey, recordset)
                    })

                }



            },
            analizeEmpresaName: function (_NEmpresa, patterns) {
                 _NEmpresa = this.transforms(app._.trim( _NEmpresa), patterns.Contratista)
                if ( _NEmpresa.indexOf("UNION TEMPORAL DE EMPRESAS") > -1) {
                     _NEmpresa =  _NEmpresa.substr(0,  _NEmpresa.length -  _NEmpresa.indexOf("UNION TEMPORAL DE EMPRESAS"))
                }

                const _m = _NEmpresa.match(/(SL\.|SA\.)/g)
                if (_m)
                    _NEmpresa = _NEmpresa.substr(0, _NEmpresa.indexOf(_m[0]) + 2)




                var _e =  _NEmpresa.split(".")[0].replace(/%/g, '.')

                if (_e.indexOf(".") > -1) {
                    var _p = app._.findIndex(options.Rutines.maps.Replace, function (o) {
                        return _e.toUpperCase().indexOf(o[0].toUpperCase()) > -1
                    })
                    if (_p > -1) {
                        _e = _e.toUpperCase().replaceAll(options.Rutines.maps.Replace[_p][0].toUpperCase(), options.Rutines.maps.Replace[_p][1].toUpperCase())
                        console.log(_e)
                    }
                    if (_e.lastIndexOf(".") == _e.length - 1)
                        _e = _e.substr(0, _e.lastIndexOf("."))


                }
                return _e
            },
            explora: function (cadena, keys, options) {

                const _ret = []
                const array = options.Rutines.maps
                let _i = 0
                let _p = ""
                let _func = null
                let _t = null
                let _v = null
                let p = 0
                for (_i in keys) {
                    _i = _i * 1
                    _t = array.keys.arr[keys[_i].id]
                    if (array.nameKeys[keys[_i].id] != null)
                        _func = array.nameKeys[keys[_i].id]

                    if (_i < keys.length - 1 && _func != null) {
                        if (this[_func] != null) {
                            const _lo = array.keys.arr[keys[_i].id].length
                            _v = this[_func]( cadena.substr(keys[_i].p + _lo, keys[_i + 1].p - keys[_i].p - _lo) , keys[_i], (_i < keys.length - 2 ? keys[_i+1] : null), array)
                            for (p in _v) {
                                _ret.push( { type: _func, values: _v[p] } )
                            }
                            _func = null
                        } else {
                            console.log('BormeRutines Excepcion: explora ' + _func)
                            _func = null
                        }
                    }
                    if (_i == keys.length-1) {
                        //if (this[_func] != null) {
                            var _lo = array.keys.arr[keys[_i].id].length
                            //_v = this[_func](cadena.substr(keys[_i].p + _lo), keys[_i],  keys[_i] , array)
                            //for (p in _v) {
                            if (keys[_i].c.toLowerCase().indexOf("registrales")>-1)
                            _ret.DatosRegistrales = cadena.substr(keys[_i].p + _lo).trim() 
                            _ret.provincia = options.Provincia
                            //}
                            _func = null
                        }
                }
                if (keys.length == 0)
                    debugger

                _t =_v = _p = _i = p= null
                return _ret
            },
            titleCase: function(str) {
                const array = str.toLowerCase().split(' ');
                for (var c = 0; c < array.length; c++) {
                    array[c] = array[c].substr(0, 1).toUpperCase() + array[c].substring(1);
                }
                return array.join(' ');
            }
        
        }
};