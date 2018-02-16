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
           
            saveEmpresaDeMovimiento: function (_linea, _cb) {

                _linea.table = "Empresa"
                _linea.cif = null

                    options.grafos.push.Object(_linea, function (_linea) {  //,  function (options, params) {
                
                        app.commonSQL.SQL.commands.insert.Borme.keys(options, _linea, function (_linea, _rec) {
                            app.process.stdout.write(app, options, '\x1b[1m\x1b[36m', 'E', '\x1b[0m')
                            _linea.ID = _rec[0][0].Id

                            options.parser.saveDiarioMovimientos(_linea, _cb)

                        }, _cb)
                    })
            },
            saveLineContenido : function (_e, _linea, _cb, _func) {
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
                                        (_Dl.value == null && _Dl.values == null ? null : _Dl.value ? _Dl.value : _Dl.values == null ? null : _Dl.values.value)
                                    ] , function (err, _record) {
                                    app.process.stdout.write(app, options, '\x1b[33m', '.', '\x1b[0m')
                                    //repitiendo el proceso para todos los datos de una linea
                                    _e++
                                    _func(_e, _linea, _cb, _func)
                                })
                            }, _Dl, Active)

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
                app.commonSQL.SQL.commands.select.NextTextParser(options, [type, app.anyo], function (err, recordset) {
                    if (err)
                        console.log(err)

                    if (recordset[0].length > 0) {
                        if (options.f != recordset[0][0].mes + '/' + recordset[0][0].dia)
                            app.process.stdout.write(app, options, '\x1b[36m', recordset[0][0].mes + '/' + recordset[0][0].dia, ':\x1b[0m')

                        if (options.Provincia != recordset[0][0].provincia)
                            app.process.stdout.write(app, options,'' ,recordset[0][0].provincia,'')

                        options.f = recordset[0][0].mes + '/' + recordset[0][0].dia
                        options.Provincia = recordset[0][0].provincia
                        app.process.stdout.write(app, options, '\x1b[33m', '+', '\x1b[0m')

                        //analizamos la linea y obtenemos una estructura con su contenido
                        options.Rutines.analizeSimpleLine(options.SQL.db, options.Rutines, recordset[0][0].texto, options.Rutines.maps, options.Provincia, function (_line) { 
                            _line.data = recordset[0][0]

                            options.parser.saveEmpresaDeMovimiento(_line, function () {
                                options.SQL.scrapDb.SQL.db.query("UPDATE _" + type.toLowerCase() + "_text_" + app.anyo + " set parser=1 where ID_BORME = ? ", [recordset[0][0].ID_BORME], function (err, record) {
                                    options.parser.Preceptos(options, type, callback)
                                })
                            })
                        //})
                        })
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
        app.commonSQL.init({ SQL: { db: null } }, 'SCRAP', function (scrapdb) {
            options.SQL.scrapDb = scrapdb
            app.commonSQL.init({ SQL: { db: null } }, 'GRAFOS', function (grafosdb) {
                options.SQL.grafosDb = grafosdb               
                callback(options)
            })

        })
    })

}