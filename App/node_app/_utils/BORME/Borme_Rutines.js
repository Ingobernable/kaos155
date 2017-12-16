module.exports = function (app, transforms) {

        /*
        var cargos = [
            'Administr.:',
            'Adm.Conjunto:',
            'Adm.Concurs.:',
            'Apod.Conjun.:',
            'Adm. Unico:',
            'Admin.Unico:',
            'Adm. Mancom.:',
            'Admin.Manc:',
            'Adm. Solid.:',
            'Adm.Solidar.:',
            'Admin.Solid:',
            'Adm.Supl.:',
            'Adm.Unico:',
            'Apod.D.Gral.:',
            'Apo.Sol:',
            'Apo.Sol.:',
            'Apoderado:',
            'Apo.Man.Soli:',
            'Apo.Manc.:',
            'Aud.Supl.:',
            'Auditor Sup.:',
            'Aud.C.Con.:',
            'Auditor:',
            'Auditor Tit.:',
            'Audit.Cuent.:',
            'Audt.Cts.Con:',

            'Con.Delegado:',
            'Cons.Del.Sol:',
            'Cons.Del.Man:',
            'Cons. Deleg.:',
            'Co.De.Ma.So:',
            'Consejero:',
            'Comisario:',

            'Director Gen:',
            'Dir. General:',
            'Dtor.Sucurs.:',
            'Dtor.General:',
            'Def.Particip:',
            'Def.part.:',
            'Depositario:',

            'Ent. Gestora:',
            'Enti.Gestora:',
            'EntidDeposit:',

            'General:',
            'Gerente:',
            'Gerente Uni.:',
            'Ger.Com.Ger:',

            'Interventor:',

            'L. Asesor',
            'Liquidador:',
            'Liquidador M:',
            'Liquid.Manc.:',
            'LiquiSoli:',
            'Liquid.conc.:',

            'Miem.Com.Ej.:',
            'Miem.J.Rec:',
            'Miem.J.Dir.:',
            'Miem.J.G.P.V:',
            'Mie.Cons.Rec:',
            'Miem.Com.Ctr:',
            'Mro.Coms.Seq:',
            'Miem.Com.Liq:',
            'Mro.Coms.Ctr:',
            'Mbro.Jta.Dir:',
            'M.Com.Nom.Re:',

            'Pre.Com.A.YC:',
            'Pre.Coms.Eje:',
            'Pres.J.G.P.V:',
            'Presidente:',
            'Pres.J.Rec:',
            'Presi.Jta.Di:',
            'Pres.Ejecut.:',
            'Pres.Com.Ej.:',
            'Promotor:',

            'Represent.:',
            'Representan:',
            'Repr.143 Rrm:',
            'R.L.C.Perma.:',

            'Sec.J.Rec:',
            'SecreNoConsj:',
            'Secretario:',

            'Secr.No Cons:',
            'Sec.J.G.P.V:',
            'Soc.Prof.:',
            'Socio:',
            'Socio único:',

            'Tes.Com.Ej.C:',
            'Tes.C.Rec:',

            'Vicepresid.:',
            'Vicepresident:',
            'Vicepresiden:',
            'Vicesecret.:',
            'V-Sec No Con:',
            'Vocal Jta.Di:',
            'VsecrNoConsj:'
        ]
        */
        function Trim(x) {
            if (x == null)
                return ""

            return x.replace(/^\s+|\s+$/gm, '');
        }
        function pointer  (point, cadena) {
            var _numero = " .0123456789"
            while (_numero.indexOf(cadena.substr(point, 1)) > -1 && point > -1) {
                point--
            }
            return (point)
        }
        // Changes XML to JSON
        function titleCase(str) {
            str = str.toLowerCase();
            var array = str.split(' ');
            for (var c = 0; c < array.length; c++) {
                array[c] = array[c].substr(0,1).toUpperCase() + array[c].substring(1);
            }
            return array.join(' ');
        }

        return {
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
                    var _lastParragraf = true
                    var _arr = []

                    var DOMParser = require('xmldom').DOMParser
                    var xml = new DOMParser().parseFromString(body)
                    var _json = app.Rutines().xmlToJson(xml)
                    var _areas = []
                    var _content = []

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
                        var _t = Trim($($('p.parrafo')[p]).html())
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
                if (_regexp!=null)
                    //for (i in _array) {
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
                //}
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
                var _op = ['Comienzo de operaciones:', 'Objeto social:', 'Domicilio:', 'Capital:']
                var _pos = this.getPosExploreItems(cadena, _op)                             //sacamos el counjunto de posiciones segun plabras clave
                var _s = this.extraeArrDeCadena(cadena, _pos, { keys: { arr: _keys } }, 'Constitucion')       //extraemos las cadenas de las subopciones
           
                return _s
            },
            getAmpliaCapital: function (cadena, _keys, _next, data) {
            
                var _op = ['Capital:', 'Resultante_Suscrito:', 'Resultante_Desembolsado:', ' Suscrito:', 'Desembolsado:'] //0.100,00 Euros. Resultante Suscrito: 120.206,01 Euros.'
                var _pos = this.getPosExploreItems(cadena, _op, false,"_")                             //sacamos el counjunto de posiciones segun plabras clave
                var _s = this.extraeArrDeCadena(cadena, _pos, { keys: { arr: _keys } }, 'Ampliacion de Capital')       //extraemos las cadenas de las subopciones
                //debugger
                return _s
            },
            getDirectivos: function (type, cadena, _keys, _next, data) {
                var cuenta = function (str) {
                    str = str.replace(/[^.]/g, "").length
                    return str;
                }
                var isEmpresa = function (cadena) {
                    if (cadena.substr(_dir[d].length - 1, 1) != ".")
                        cadena = cadena + '.'

                    return (cadena.indexOf('SOCIEDAD ANONIMA') > -1 || cadena.indexOf('SOCIEDAD LIMITADA') > -1 || cadena.indexOf(' SL.') > -1 || cadena.indexOf(' SA.') > -1)
                }

                var _ret = []
                var found = function (cargos, _cadena) {
                    var cad = _cadena
                    var _found = false
                
                    for (i in cargos) {

                        if (cad.toUpperCase().indexOf(cargos[i].toUpperCase()) > -1) {
                            var minus = cad.indexOf(cargos[i]) > -1
                            _found = true
                            var _rep = cargos[i].replace(/\ /g, "").replace(/\./g, "#")
                            cad = cad.replaceAll(minus?cargos[i]:cargos[i].toUpperCase(), minus?_rep:_rep.toUpperCase() ).trim()
                        }
                    }
                    return { found: _found, cadena: cad }
                }
                var _f = found([], cadena)
                cadena = _f.cadena
                _found = false //_f.found

                if (! _found ) {
                
                    _cad = titleCase(_f.cadena.split(":")[0] + ":").trim()
                    //this.cargos.push( _cad )
                    cadena = found([_cad], cadena).cadena // this.cargos, cadena).cadena
                   // app.fs.writeFile(app.path.resolve('../DataFiles/cargos.json'), JSON.stringify(this.cargos.sort()), function (err) {
                   //     console.log('\n'+'AÑADIDO NUEVO CARGO ' + _cad + '/n')
                   // })
                }
                //var _head = cadena.replace(/S.L./g, 'SL.').replace(/S.A./g, 'SA.') //.split(".")
                var _valores = cadena.replace(/S\.L\./g, 'SL.').replace(/S\.A\./g, 'SA.').replace(/\.\B/g, "#$").replace(/\. /g, "#$").trim().replace(/\./g, "#") + ' '

                //if(_valores.substr(_valores.length-1,1)==" ")
                //    _valores.trim() + "$"

                var _preval = _valores.split("#$ ")
                var _valores = []
                //debugger
                for (i in _preval) {
                    if (_preval[i].length > 0) 
                        if (_preval[i].trim().indexOf(":") == -1) {
                            _valores[_valores.length - 1] = _valores[_valores.length - 1] + _preval[i]
                        } else {
                            _valores[_valores.length] = _preval[i].trim().replace(/#/g, ".").replace(/\$/g, "")
                        }
                }
                for (i in _valores) {
                    //debugger
                    if (_valores[i].trim().length > 0) {

                        // if (_valores[i].trim().indexOf("#") > -1) {
                        //     debugger
                        //     
                        // }else{
                        //     var item = _valores[i].trim().split(": ")
                        // }
                    
                        var item = _valores[i].trim().split(": ")

                        if (item.length > 0) {
                            if (item[1] != null){
                                //debugger

                                var _dir = item[1].trim().split(';')
                                for (d in _dir) {
                                    _dir[d] = _dir[d]
                                    if (_dir[d].substr(_dir[d].length - 1, 1) == ".")
                                        _dir[d] = _dir[d].substr(0, _dir[d].length - 1)
                                    _ret[_ret.length] = {
                                        Empresa: isEmpresa(_dir[d]),
                                        key: titleCase(item[0].trim().replace(/#/g, ".")),
                                        value: isEmpresa(_dir[d]) ? _dir[d] : titleCase(_dir[d])
                                    }

                                }
                            }
                        }
                    }
                }
                //debugger
                return _ret

            },
            //////////////////////////////////////////////////////////////////////////////////////
            //
            //
            // 
            SQL: {
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
                    var capitalizeFirstLetter= function(string) {
                        return string.charAt(0).toUpperCase() + string.slice(1);
                    }
                    var _e = 0
                    var _table = "Directivo"
                    //__data.values.Empresa = false
                    if (__data.values.value == __data.values.value.toUpperCase()) {
                        _table = "Empresa"
                        __data.values.Empresa = true
                    }
                    if (__data.values.key.toUpperCase() == "AUDITOR") {
                        _table = "Auditor"
                        __data.values.Auditor = true
                        //debugger
                    }
                    //app.IA.send('setinMemory', { type: _t, array: [__data.values.value], compress: 'shorthash.unique' }, function (data) {
                        params = {
                            table: _table,
                            e: __data.values.value,
                            k: app.shorter.unique(__data.values.value),
                        }
                        //params.table + "(?,?,?)", [params.data.ID, params.e, params.k]
                        app.commonSQL.SQL.commands.insert.Borme.keys(options, params, function (params, _directivo) {
                        //cadsql = "Call Insert_Data_Borme_" + capitalizeFirstLetter(_t.toLowerCase()) + "(?,?)"
                        //options.SQL.db.query(cadsql, [__data.values.value, app.shorter.unique(__data.values.value)], function (err, _directivo) {

                            if (_directivo.length == 0) {
                                debugger
                            } else {
                                if (_directivo.length > 1) {
                                    //debugger
                                    x=1
                                }
                                if (Active) {
                                    app.process.stdout.write(app, options, '\x1b[32m','','')
                                } else {
                                    app.process.stdout.write(app, options, '\x1b[31m', '', '')
                                }
                                app.process.stdout.write(app, options, '', __data.values.Empresa ? "e" : __data.values.Auditor ? "a" : "d",'')
                                app.process.stdout.write(app, options, '','', '\x1b[0m')
                                callback(__data, _directivo[0][0].Id, params , Active)
                            }
                        }, function (err, record) {
                            debugger
                        })
                    //})
               
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
                }
            },
            Constitucion: function ( cadena, _keys, _next, data) {
                var _ret = []
                var _values = this.getConstitucion(cadena, _keys, _next, data)
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
                return [{ key: 'Extincion', value: null }] //, cadena, _keys, _next, data)
            },
            Cierre: function ( cadena, _keys, _next, data) {
                return this.getDirectivos(idEmpresa, 'Cierre', cadena, _keys, _next, data)
            },
            Reeleccion: function ( cadena, _keys, _next, data) {
                return this.getDirectivos('Reeleccion', cadena, _keys, _next, data)
            },       
            AmpliaCapital: function ( cadena, _keys, _next, data) {
                var _ret = []
                var _values = this.getAmpliaCapital(cadena, _keys, _next, data)
                for (_i in _values) {
                    //debugger
                    _ret[_ret.length] = { key: _values[_i].c.replace(":", ""), value: _values[_i].f }
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
            DeclaraSociedadUnipersonal: function (_this, data) {
                return { data: _keys, string: data }
            },
            SetSocioUnico:function(_this , _keys, data){},
            SetDatosRegistrales:function(_this , _keys, data){},
            UnsetUnipersonal: function (_this, data) { },

            erratas: function (_this, data) { },

            actions: {
                constitucion: function (data, keys) {
                    var _k=keys.key.replace(/ /g, "_")
                    if (data[_k] == null)
                        data[_k] = []

                    data[_k][ data[_k].length] = keys.value
                    return data
                }
            },
            ////////////////////////////////////////////////////////////////////////////////////
            //
            // rutina para sacar de una cadena los datos desde un mapkey
            //
            maps: {
                keys: {
                    arr: [
                    'Constitución.',
                    //actos registrales que afectan a nombramientos
                    'Nombramientos.',
                    'Ceses/Dimisiones.',                
                    'Revocaciones.',

                    'Cancelaciones de oficio de nombramientos.',
                    'Disolución.',
                    'Reelecciones.',
                    'Extinción.',
                

                    'Declaración de unipersonalidad.',                 
                    'Sociedad unipersonal.',
                    'Socio único.',
                    'Empresario Individual.',
                    'Pérdida del caracter de unipersonalidad. ',

                    //otros actos registrales
                    'Ampliación de capital.',                
                
                    'Cierre provisional hoja registral art. 137.2 Ley 43/1995 Impuesto de Sociedades.',
                    'Ampliacion del objeto social.',
                
                    'Cambio de denominación social.',
                    'Cambio de domicilio social.',
                    'Cambio de objeto social',
                    'Cambio objeto social.',
                    'Fusión por absorción.',
                    'Modificaciones estatutarias.',
                    'Reducción de capital.',
                    'Escisión total.',
                    'Escisión parcial.',
                    'Transformación de sociedad.',
                    'Reapertura hoja registral',
                    'Situación concursal.',
                    'Primera sucursal de sociedad extranjera.',
                    'Articulo 378.5 del Reglamento del Registro Mercantil.',
                
                    'Desembolso de dividendos pasivos.',
                    'Modificaciones estatutarias.',
                    'Fe de erratas:',
                    'Qiebra:',
                    'Otros conceptos:',
                    'Datos registrales.',

                    ]
                }, nameKeys: [
                    'Constitucion',
                    'Nombramiento',
                    'Cese',
                    'Revocacion',
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
                    'AmpliaCapital'

                ]

            
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
                    var _pos = this.getPosExploreItems(data, _keys)                             //sacamos el counjunto de posiciones segun plabras clave
                    var _s = this.extraeArrDeCadena(data, _pos, { keys: { arr: _keys } }, type)       //extraemos las cadenas de las subopciones
                }
                return _keys.length > 0 ? { c: type, f: _s } : { c: type, f: Trim(data) }
            },
            extraeArrDeCadena: function (cadena, map, _keys, _t) {
                //rutina clave que extrae de la cadena, el conjunto de datos entre palabras clave
                //haciendo la misma operación de analisis con palabras clave dentro del resultado
                //
                //partiendo del cojunto de posiciones "map"
                //
                var _parray = 0
                var _plength = 0
                var _explore = []
                //var _map = _keys.keys.arr                                                       //mapa de palabras clave
                for (_parray in map) {                                                               //recorremos la array con los resultado de la posiciones

                    var py= map[_parray].p + map[_parray].c.length                                                 //calculamos el punto inicial con la posicion en la cadena mas la longitud de la palabra clave
                    if (_parray*1 != map.length - 1) {                                                        //si no es el último elemento
                        _plength = map[_parray * 1 + 1].p - map[_parray].p - map[_parray].c.length          //calculamos la longitud final en base a la siguiente palabra clave
                    } else {
                        _plength = cadena.length  - py // map[_e].c.length                                  //si es el último elemento calculamos la longitud del resto de la cadena
                    }
                
                    var _string = Trim(cadena.substr(py, _plength) )                               //extrayendo el resultado
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
                if (extrachar != null)
                    cadena = " " + cadena.substr(1, cadena.length).replaceAll(" ", "_")

                _explore = []
                for (e in Explore) {                                                            //para cada una de las palabras clave
                    py = cadena.indexOf(Explore[e], 0)                                          //miramos si hay alguna coincidencia de la palabra clave
                    if (py > -1) {                                                              //si hubo coincidicencia
                        _explore[_explore.length] = onlyposdata ? {  p: py, l: Explore[e].length } : { c: Explore[e].replaceAll("_"," "), p: py, id: e * 1 }              //anotamos en la matriz de resultados una estructura
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
                var exclusion = ['Núm. ','Actos inscritos', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'SECCIÓN', 'Empresarios', 'BOLETÍN OFICIAL DEL REGISTRO MERCANTIL', 'Pág.', 'http://www.boe.es','D.L.:' ]
                var inclusion = ['cve:', 'A CORUÑA', 'LA CORUÑA', 'ARABA/ÁLAVA', 'ÁLAVA', 'ALBACETE', 'ALICANTE', 'ALMERÍA', 'ASTURIAS', 'ÁVILA', 'BADAJOZ', 'BARCELONA', 'BIZKAIA', 'BURGOS', 'CÁCERES', 'CÁDIZ', 'CANTABRIA', 'CASTELLÓN', 'CIUDAD REAL', 'CÓRDOBA', 'CUENCA', 'CEUTA', 'GIRONA', 'GRANADA', 'GUADALAJARA', 'GUIPÚZCOA', 'GIPUZKOA', 'HUELVA', 'HUESCA', 'ILLES BALEARS', 'ISLAS BALEARES', 'JAÉN', 'LA RIOJA', 'LAS PALMAS', 'LEÓN', 'LLEIDA', 'LUGO', 'MADRID', 'MÁLAGA', 'MELILLA', 'MURCIA', 'NAVARRA', 'ORENSE', 'OURENSE', 'PALENCIA', 'PONTEVEDRA', 'SALAMANCA', 'SEGOVIA', 'SEVILLA', 'SORIA', 'TARRAGONA', 'SANTA CRUZ DE TENERIFE', 'TERUEL', 'TOLEDO', 'VALENCIA', 'VALLADOLID', 'VIZCAYA', 'ZAMORA', 'ZARAGOZA']
                var sinonimos = ['A CORUÑA#LA CORUÑA', 'ALABAÁLABA#ÁLAVA', 'ARABA/ÁLAVA#ÁLAVA', 'GUIPÚZCOA#GIPUZKOA', 'ILLES BALEARS#ISLAS BALEARES', 'OURENSE#ORENSE', 'BIZKAIA#VIZCAYA']
                isNumeric = function (n) {
                    return !isNaN(parseFloat(n)) && isFinite(n);
                }

                var patterns = _this._transforms.getPatern(_this._transforms)
                var _xlines=[]
                var Borme = null
                var Provincia = null
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
                        //if (_xlines[_l].indexOf('-') > -1) {
                        var _e = _xlines[_l].substr(_xlines[_l].length - 4, 4)
                        if ( ((_e.charAt(0)>="0" &&  _e.charAt(0)<="9") && (_e.charAt(1)>="0" &&  _e.charAt(1)<="9") && _e.substr(2,2)==").") )  {
                            var _xline = cadena + (cadena.length > 0 ? ' ' : '') + _xlines[_l]
                            _xcline = _xline.split("-")[0]
                            if(!isNaN(parseFloat(_xcline)) && isFinite(_xcline))
                                lines[lines.length] = _xline
                            cadena=""
                        } else {
                            var cadena = cadena + (cadena.length > 0 ? ' ' : '') + _xlines[_l]
                        }
                        //}
                    }
                    //leemos el texto convertido a matriz
                    //aplicandole un mapa de palabras clave
            
                    var _lines = []
                    //debugger
                    for (i in lines) {
                        if (lines[i].length > 40) {                                                 //si la longitud del texto >40 pj
                            var _items = this.getPosExploreItems(lines[i], map.keys.arr,false)            //extraemos las posiciones donde existen palabras clave
                            //var _result = this.extraeArrDeCadena(lines[i], _items, map)             //extreamos las cadenas entre palabras clave y las traspasamos a una array
                            if (_items != null) {
                                if (lines[i].substr(0, _items[0].p).indexOf("(") > -1) {
                                    var _Empresa = lines[i].substr(0, _items[0].p).split("(")[0]        //extreamos la empresa del comienzo de la cadena
                                } else {
                                    var _Empresa = lines[i].substr(0, _items[0].p)
                                }
                                _Empresa = _Empresa.split("-") //.replace(/^\s+|\s+$/gm, '')  //desechando lo que no interesa
                                //if (_Empresa.length > 2) {
                                var _n=2
                                while (_n < _Empresa.length ) {
                                    _Empresa[1] = _Empresa[1] + "-" + _Empresa[_n]
                                    _n++
                                }
                                //buscar un ID
                                //if (_Empresa[0] * 1 == 1359)
                                //    debugger
                                //}
                                _Empresa[1] = _this.transforms(Trim(_Empresa[1]), patterns.Contratista) 
                                if (_Empresa[1].indexOf("UNION TEMPORAL DE EMPRESAS") > -1)
                                    _Empresa[1] = _Empresa[1].substr(0, _Empresa[1].length - _Empresa[1].indexOf("UNION TEMPORAL DE EMPRESAS"))

                                if (_Empresa[1].indexOf('SA.') > -1)
                                    _Empresa[1] = _Empresa[1].substr(0, _Empresa[1].indexOf('SA.') + 2)

                                if (_Empresa[1].indexOf('SL.') > -1)
                                    _Empresa[1] = _Empresa[1].substr(0, _Empresa[1].indexOf('SL.') + 2)

                                _lines[_lines.length] = {
                                    id: Trim(_Empresa[0]),
                                    e: _Empresa[1].split(".")[0].replace(/%/g,'.'),
                                    keys: _items,
                                    original: lines[i],
                                    contenido : _this.explora(lines[i], _items, _this.maps)
                                }              //acumulando los resultados en una matriz
                                // debugger
                            
                            }
                        }
          
                    }

                    //debugger
                    return { BORME:Borme, PROVINCIA:Provincia, data: _lines}
                } else {
                    debugger
                    return null
                }
            },
            analizeSimpleLine: function (_this, line,map) {
                var patterns = _this._transforms.getPatern(_this._transforms)
                var _items = this.getPosExploreItems(line, map.keys.arr, false)            //extraemos las posiciones donde existen palabras clave

                //var _result = this.extraeArrDeCadena(lines[i], _items, map)             //extreamos las cadenas entre palabras clave y las traspasamos a una array
                if (_items != null) {
                    if (line.substr(0, _items[0].p).indexOf("(") > -1) {
                        var _Empresa = line.substr(0, _items[0].p).split("(")[0]        //extreamos la empresa del comienzo de la cadena
                    } else {
                        var _Empresa = line.substr(0, _items[0].p)
                    }
                    _Empresa = _Empresa.split("-") //.replace(/^\s+|\s+$/gm, '')  //desechando lo que no interesa
                    //if (_Empresa.length > 2) {
                    var _n = 2
                    while (_n < _Empresa.length) {
                        _Empresa[1] = _Empresa[1] + "-" + _Empresa[_n]
                        _n++
                    }
                    //buscar un ID
                    //if (_Empresa[0] * 1 == 1359)
                    //    debugger
                    //}
                    _Empresa[1] = _this.transforms(Trim(_Empresa[1]), patterns.Contratista)
                    if (_Empresa[1].indexOf("UNION TEMPORAL DE EMPRESAS") > -1) {
                        _Empresa[1] = _Empresa[1].substr(0, _Empresa[1].length - _Empresa[1].indexOf("UNION TEMPORAL DE EMPRESAS"))
                    }
                    if (_Empresa[1].indexOf('SA.') > -1) {
                        _Empresa[1] = _Empresa[1].substr(0, _Empresa[1].indexOf('SA.') + 2)
                        //var _k = app.shorter.unique(_Empresa[1].substr(0, _Empresa[1].indexOf('SA.')-1))
                    }

                    if (_Empresa[1].indexOf('SL.') > -1) {
                        _Empresa[1] = _Empresa[1].substr(0, _Empresa[1].indexOf('SL.') + 2)
                        //var _k = app.shorter.unique(_Empresa[1].substr(0, _Empresa[1].indexOf('SL.') - 1))
                    }
                    //if (_k == null)
                    //    debugger

                    var _e=_Empresa[1].split(".")[0].replace(/%/g, '.')
                    var _line = {
                        id: Trim(_Empresa[0]),
                        e: _e,
                        k: app.shorter.unique(_e),
                        keys: _items,
                        original: line,
                        contenido: _this.explora(line, _items, _this.maps)
                    }              //acumulando los resultados en una matriz

                    return _line

                }



            },
            explora: function (cadena, keys, array) {
                var _ret = []
                var _i = 0
                var _p = ""
                for (_i in keys) {
                    _i = _i * 1
                    //debugger
                    //if (_i > 0) {
                    var _func = null
                    var _t = array.keys.arr[keys[_i].id]
                    if (array.nameKeys[keys[_i].id] != null)
                        var _func = array.nameKeys[keys[_i].id]

                    if (_i < keys.length - 1 && _func != null) {
                        if (this[_func] != null) {
                            var _trozo = cadena.substr(keys[_i].p + keys[_i].c.length, keys[_i + 1].p - keys[_i].p - keys[_i].c.length)
                            var _v = this[_func]( _trozo, keys[_i], (_i < keys.length - 1 ? keys[_i] : null), array)
                            for (p in _v) {

                                _ret[_ret.length] = { type: _func , values: _v[p] }
                            }
                        } else {
                            debugger
                        }
                    }
                 
                    //if()
                    //}
                
                }
                //debugger
                return _ret
            }
        
        }
    //})
};