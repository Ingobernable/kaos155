'use strict';
module.exports = function (app, callback) {
    //debugger
    const options = {

        Command: app.command,
        
        pdfOpc: ['-nopgbrk', '-enc UTF-8'],

        diccionario: {
            exclude: [
                'si, Fecha De Resolución',
                'no, Fecha De Resolución',
                'se aprueba el plan de liquidación',
                'quedan en suspenso',
                'las facultades de administración',
                'abierta la fase de liquidación',
                'determinar que las facultades de administración',
                'conversión del procedimiento',
                'anotacion preventiva de la declaracion',
                'se abre la fase de liquidación',
                'conversión del procedimiento abreviado'
            ],
            recorta :['administrador concursal',
                'liquidador concursal',
                'situación concursal',
                'datos registrales',
                'no definido por traspaso',
                'cambio de domicilio social',
                'Adaptación Ley 2/95',
                'auxiliar delegado concursal'
            ]
        },

        url: app.urlBORME,       
        _common: require('../_common.js')(app),
        grafos: require('../../node_grafos/common_grafos.js')(app),
        SQL: { db: null },
        parser: {
            printOut: function (app, options, _ci, _data, _cf) {
                if (app.myArgs[app.myArgs.length - 1] != 'VERBOSE')
                    app.process.stdout.write(app, options, _ci, _data, _cf)
                //if (!app.forever || !process.send) {
                //    app.process.stdout.write(app, options, _ci, _data, _cf)
                //} else {
                //    process.send({ data: _data , ci:_ci, cf:_cf })
                //}
            },          
            saveEmpresaDeMovimiento: function (_linea, _cb) {
                //const _that = this
                _linea.table = "Empresa"
                _linea.cif = null

                    options.grafos.push.Object(_linea, function (_linea) {  //,  function (options, params) {
                
                        app.commonSQL.SQL.commands.insert.Borme.keys(options, _linea, function (_linea, _rec) {
                            options.parser.printOut(app, options, '\x1b[33m', '.', '\x1b[0m')
                            //app.process.stdout.write(app, options, '\x1b[1m\x1b[36m', 'E', '\x1b[0m')
                            _linea.ID = _rec[0][0].Id

                            options.parser.saveDiarioMovimientos(_linea, _cb)

                        }, _cb)
                    })
            },
            saveLineContenido: function (_e, _linea, _cb, _func) {
                //var _that = this
                if (_e < _linea.contenido.length) {
                    if (options.Rutines.SQL[_linea.contenido[_e].type] == null)
                        debugger
                    //
                    // !!! Magic Point ¡¡¡¡
                    // ejecutamos una rutina especifica dependiendo del valor de Type
                    // 
                    options.Rutines.SQL[_linea.contenido[_e].type](_linea, _linea.contenido[_e], function (_Dl, idRelacion, params, Active) {
                        if (params == null) {
                            params = { k: null }
                        }

                        if (_Dl == null) {
                            _cb(_linea)
                        } else {
                            //const _params = 

                            
                            //guardamos los datos
                            options.grafos.push.relation(_Dl.values ? _Dl.values.Auditor ? "Auditor" : "Directivo" : "Directivo", _linea, params, function () {
                                if (!_linea.contenido.DatosRegistrales) {
                                    _linea.contenido.DatosRegistrales = null
                                    debugger
                                } else {
                                    if (_linea.contenido.DatosRegistrales.length > 100) {
                                        _linea.contenido.DatosRegistrales = _linea.contenido.DatosRegistrales.substr(0, 100)
                                        debugger
                                    }
                                }

                                app.commonSQL.SQL.commands.insert.Borme.diario(options, [
                                        _linea.data.BOLETIN,
                                        _linea.id,
                                        _linea.data.dia,
                                        _linea.data.mes,
                                        _linea.data.BOLETIN.match(/[\d]{4}/)[0],
                                        _linea.data.provincia,
                                        _linea.ID,
                                        _linea.k,
                                        idRelacion,
                                        params.k,
                                        _Dl.values == null ? 0 : _Dl.values.Auditor ? 2 : _Dl.values.Empresa ? 0 : 1,
                                        (Active ? 1 : 0),
                                        _Dl.type ? _Dl.type : _Dl.values.type,
                                        _Dl.key ? _Dl.key : _Dl.values.key.substr(0, 55),
                                        (_Dl.value == null && _Dl.values == null ? null : _Dl.value ? _Dl.value : _Dl.values == null ? null : _Dl.values.value),
                                         _linea.contenido.DatosRegistrales     
                                ], {
                                        _boletin: _linea.data.BOLETIN,
                                        _id_boletin: _linea.id,
                                        _fecha: { dia: _linea.data.dia, mes: _linea.data.mes, anyo: _linea.data.BOLETIN.match(/[\d]{4}/)[0] },
                                        _provincia: _linea.data.provincia,
                                        _id_empresa: _linea.ID,
                                        _key_empresa: _linea.k,
                                        _id_relation: idRelacion,
                                        _key_relation: params.k,
                                        acto: {
                                            _def: idRelacion > 0 && _linea.ID>0?'RELACION':'EMPRESARIAL',
                                            _type: _Dl.type ? _Dl.type : _Dl.values.type,
                                            _cargo: _Dl.key ? _Dl.key : _Dl.values.key.substr(0, 55),
                                            _value: (_Dl.value == null && _Dl.values == null ? null : _Dl.value ? _Dl.value : _Dl.values == null ? null : _Dl.values.value),
                                        }
                                    }, function (err, _record) {
                                        //if (_that == null)
                                        //    debugger
                                            options.parser.printOut(app, options, '\x1b[33m', '.', '\x1b[0m')
                                    //app.process.stdout.write(app, options, '\x1b[33m', '.', '\x1b[0m')
                                    //repitiendo el proceso para todos los datos de una linea
                                    _e++
                                    _func(_e, _linea, _cb, _func)
                                })
                            }, _Dl, Active, _linea.data.BOLETIN + "#" + _linea.data.ID_BORME)

                        }

                    })
                } else {
                    //salida de la rutina de PARSEO                         
                    _cb(_linea)
                }
            },
            saveDiarioMovimientos: function (_linea, _ret) {
                this.saveLineContenido(0, _linea, _ret, this.saveLineContenido)
                //guardamos el contenido de la linea
            },
            Preceptos: function (options, type, callback) {
                //obtenemos el siguiente texto a parsear
                const startDate = new Date()
               // if (app.myArgs[app.myArgs.length - 1] == 'VERBOSE') {
                    
               //     console.log(' db text record peticion')
                //}
                var _this = this
                app.commonSQL.SQL.commands.select.NextTextParser(options, [type, app.anyo], function (err, recordset) {
                    const readDate = new Date()
                    //if (app.myArgs[app.myArgs.length - 1] == 'VERBOSE')
                    //    console.log(' extract Text in ' + (endDate.getTime() - startDate.getTime()) + ' miliseconds')

                    if (err)
                        console.log(err)

                    if (recordset[0].length > 0) {
                        if (options.f != recordset[0][0].mes + '/' + recordset[0][0].dia)
                            _this.printOut(app, options, '\x1b[36m', recordset[0][0].mes + '/' + recordset[0][0].dia, '\x1b[0m')

                        if (options.Provincia != recordset[0][0].provincia)
                            _this.printOut(app, options, '', recordset[0][0].provincia, '')
                        //app.process.stdout.write(app, options,'' ,recordset[0][0].provincia,'')

                        options.f = recordset[0][0].mes + '/' + recordset[0][0].dia
                        options.Provincia = recordset[0][0].provincia

                        //var _d = '+'
                        _this.printOut(app, options, '\x1b[33m', '+', '\x1b[0m')

                        //analizamos la linea y obtenemos una estructura con su contenido
                        var _textos = []
                       
                        var _t = recordset[0][0].texto
                        while (_t.indexOf((recordset[0][0].ID_BORME + 1+_textos.length) + " - ") > -1) {
                            const _e = _t.indexOf((recordset[0][0].ID_BORME + 1 + _textos.length) + " - ")
                            var _long = 0
                            if (_e > -1) {
                                if (_t.indexOf((recordset[0][0].ID_BORME + 2 + _textos.length) + " - ") > -1) {
                                    _long = _t.indexOf((recordset[0][0].ID_BORME + 2 + _textos.length) + " - ") - _e 
                                    _textos.push(_t.substr(0, _e))
                                    _t = _t.substr(_t, _long - _e)
                                } else {
                                    _textos.push(_t.substr(0, _e))
                                    _textos.push( _t.substr(_e, _t.length - _e) )
                                }
                                
             
                                
                            }
                        }
                        if (_textos.length == 0)
                            _textos = [recordset[0][0].texto]

                        var _n = 0

                        const _analizer = function (options,_textos,_n, analizer, callback, type, recordset) {
                            //for (_n == 0; _n <= _textos.length-1; _n++) {
                            options.Rutines.analizeSimpleLine(options, _textos[_n], _n, recordset, function (_line, _n, recordset) {
                                _line.data = recordset[0][0]
                                _line.data.texto = _textos[_n]
                                options.parser.saveEmpresaDeMovimiento(_line, function () {
                                    if (_n == _textos.length - 1) {
                                        callback(options,type,recordset,_line)
                                    } else {
                                        analizer(options, _textos, _n+1, analizer, callback, type, recordset)
                                    }
                                })
                                //})
                            }, recordset)
                        }
                        _analizer(options, _textos, 0, _analizer, function (options, type, recordset,_line) {
                            const endAnalizeDate = new Date()
                     
                            options.SQL.scrapDb.SQL.db.query("UPDATE _" + type.toLowerCase() + "_text_" + app.anyo + " set parser=1 where ID_BORME = ? ", [recordset[0][0].ID_BORME], function (err) {
                                const saveDate = new Date()

                                if (app.myArgs[app.myArgs.length - 1] == 'VERBOSE') {
                                    var timex = {
                                        extract: readDate.getTime() - startDate.getTime(),
                                        calculate: endAnalizeDate.getTime() - readDate.getTime(),
                                        update: saveDate.getTime() - endAnalizeDate.getTime()
                                    }
                                    timex._c = {
                                        _e: timex.extract > 1000 ? '\x1b[31m' : timex.extract > 100 ? '\x1b[33m' : '\x1b[32m',
                                        _c: timex.calculate > 1000 ? '\x1b[31m' : timex.calculate > 100 ? '\x1b[33m' : '\x1b[32m',
                                        _u: timex.update > 1000 ? '\x1b[31m' : timex.update > 100 ? '\x1b[33m' : '\x1b[32m',
                                    }
                                    console.log('\x1b[1m\x1b[36m' + _line.data.dia + "." + _line.data.mes, "\x1b[33m" + _line.data.provincia, timex._c._e + 'extract ' + timex.extract + 'ms', timex._c._c + 'calculate ' + timex.calculate + 'ms', timex._c._u + 'update text ' + timex.update + 'ms \x1b[37m', _line.e)
                                }
                                if (err)
                                    debugger
                                options.parser.Preceptos(options, type, callback)
                            })
                        },type, recordset)
                        //}

                    } else {
                        callback(null, true)
                    }
                })
            }
        },
    }

    //options.Rutines.cargos = [] //dataCargos
    
    options.Rutines = require('../_utils/BORME/Borme_Rutines.js')(app, options, require('../_utils/BORME/Borme_Transforms.js')(app, options) ),

        app.commonSQL.init(options, 'BORME', function (options) {
        app.commonSQL.init({ SQL: { db: null }, Command: 'SCRAP' }, 'SCRAP', function (scrapdb) {
            options.SQL.scrapDb = scrapdb
            app.commonSQL.init({ SQL: { db: null }, Command: 'GRAFOS' }, 'GRAFOS', function (grafosdb) {
                options.SQL.grafosDb = grafosdb               
                callback(options)
            })

        })
    })

}