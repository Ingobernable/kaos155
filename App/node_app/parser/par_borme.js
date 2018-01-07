module.exports = function (app, callback) {

    options = {

        Command: app.command,
        Rutines: require('../_utils/BORME/Borme_Rutines.js')(app, require('../_utils/BORME/Borme_Transforms.js')(app)),
        pdfOpc: ['-nopgbrk', '-enc UTF-8'],
        keyMap: [
            'Constitución.',
            'Apertura de sucursal.',
            'Objeto social.',
            'Ampliacion del objeto social.',
            'Cambio de domicilio social.',
            'Cambio de objeto social.',
            'Cambio objeto social.',
            'Sociedad unipersonal.',
            'Declaración de unipersonalidad.',
            'Nombramientos.',
            'Modificación de poderes',
            'Emisión de obligaciones.',
            'Reelecciones.',
            'Modificación de poderes.',
            'Ceses/Dimisiones.',
            'Revocaciones.',
            'Segregación.',
            'Datos registrales',
            'Crédito incobrable.',
            'Suspensión de pagos.',
            'suspensión de pagos.',
            'Apertura de sucursal.',
            'Adaptación de sociedad',
            'Página web de la sociedad',
            'Cierre de Sucursal',
            'Primera inscripcion',
            'Fusión por unión.',
            'Modificación de duración',
            'Reactivación de la sociedad',
            'reactivación De La Sociedad (art242 Del Reglamento Del Registro Mercantil)',
            'Cierre provisional hoja registral por baja en el índice de Entidades Jurídicas.',
            'Fe de erratas:'],
        url: app.urlBORME,       
        _common: require('../_common.js')(app),
        SQL: { db: null },
        parser: {
            //cif: require('../_utils/BORME/keys/Cif_Metaspider.js')(app),
            saveEmpresaDeMovimiento: function (_linea, _cb) {
                //var _ok =false
                //var _this = this
                //options.SQL.db.query("select * From borme_keys where _key=?", [_linea.k], function (err, record) { 
                    //if (record.length == 0) { //|| record[0].cif == null || record[0].cif.length == 0) {
                        _linea.table = "Empresa"
                        //_this.cif.ask(_linea.k, _linea.e, function (cif) {
                            _linea.cif = null
                            app.commonSQL.SQL.commands.insert.Borme.keys(options, _linea, function (_linea, _rec) {
                                app.process.stdout.write(app, options, '\x1b[1m\x1b[36m', 'E', '\x1b[0m')
                                _linea.ID = _rec[0][0].Id

                                options.parser.saveDiarioMovimientos(_linea, _cb)

                            }, _cb)
                        //})
                    //}
                //})

            },
            saveDiarioMovimientos: function (_linea, _ret) {
                var saveLineContenido = function (_e, _linea, _cb, _func) {
                    var _this = this
                    var line = _linea.contenido[e]
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

                            if (_Dl == null || params == null) {
                                _cb(_linea)
                            } else {
                                //if (_line.data[e] == null)
                                //    debugger
                                var _idEmpresa = true
                                // if(idDirectivo>0)
                                //      _idEmpresa = options.foundEmpresas(options.DirEmpresas, _linea.k)
                                //if (_idEmpresa == null)
                                //    debugger

                                //debugger

                                params = [
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
                                ]

                                if (_Dl == null) {
                                    debugger
                                    console.log('_Dl = null error borme.js')
                                }
                                //
                                //insertamos un dato en el diario de movimientos
                                //
                                app.commonSQL.SQL.commands.insert.Borme.diario(options, params, function (err, _record) {
                                    app.process.stdout.write(app, options, '\x1b[33m', '.', '\x1b[0m')
                                    //repitiendo el proceso para todos los datos de una linea
                                    _e++
                                    _func(_e, _linea, _cb, _func)
                                })
                            }

                        })
                    } else {
                        //salida de la rutina de PARSEO
                        _cb(_linea)

                    }
                }
                //guardamos el contenido de la linea
                saveLineContenido(0, _linea, _ret, saveLineContenido)


            },
            Preceptos: function (options, type, callback) {
                //var _this = this
                var _lines = []
                //var _this = this
                //obtenemos el siguiente texto a parsear
                app.commonSQL.SQL.commands.select.NextTextParser(options, [type, app.anyo], function (err, recordset) {
                    if (recordset[0].length > 0) {
                        if (options.f != recordset[0][0].mes + '/' + recordset[0][0].dia)
                            app.process.stdout.write(app, options, '\x1b[36m', recordset[0][0].mes + '/' + recordset[0][0].dia, ':\x1b[0m')

                        if (options.Provincia != recordset[0][0].provincia)
                            app.process.stdout.write(app, options,'' ,recordset[0][0].provincia,'')

                        options.f = recordset[0][0].mes + '/' + recordset[0][0].dia
                        options.Provincia = recordset[0][0].provincia
                        app.process.stdout.write(app, options, '\x1b[33m', '+', '\x1b[0m')
                        //analizamos la linea y obtenemos una estructura con su contenido
                        _line = options.Rutines.analizeSimpleLine(options.Rutines, recordset[0][0].texto, options.Rutines.maps)
                        _line.data = recordset[0][0]
                        //console.log(_line.k, "=", _line.e)


                        //if (app.IA.find('BM', _line.k)==null)
                        //    if (app.IA.setinMemory('BM', _line.k, 1245489, app.IA.find, "_ks") != null)
                        //        debugger
                        //app.IA.send('setinMemory', { type: '_E', array: [_line.e], compress: 'shorthash.unique' }, function (data) {
                        //_line.data.ID_Empresa = data.data.array._id[0]
                        //_line.addNew = data.data.array.add[0]
                        options.parser.saveEmpresaDeMovimiento(_line, function () {
                            options.SQL.scrapDb.SQL.db.query("UPDATE _" + type.toLowerCase() + "_text_" + app.anyo + " set parser=1 where ID_BORME = ? ", [recordset[0][0].ID_BORME], function (err, record) {
                                options.parser.Preceptos(options, type, callback)
                            })
                        })
                        //})

                    } else {
                        callback(null, true)
                    }
                })
            }
        }
    }

    options.Rutines.cargos = [] //dataCargos
    app.commonSQL.init(options, 'PARSER', app._fileCredenciales + options.Command, function (options) {
        app.commonSQL.init({ SQL: { db: null } }, 'SCRAP', app._fileCredenciales + "SCRAP", function (scrapdb) {
            //debugger
            options.SQL.scrapDb = scrapdb
            callback(options)

        })
    })

}