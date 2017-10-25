module.exports = function (app, drop, dataCargos, callback) {

    options = {
       
        Rutines: require('./BORME/Borme_Rutines')(app, require('./BORME/Borme_Transforms')(app)),
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
            'Reelecciones.',
            'Modificación de poderes.',
            'Ceses/Dimisiones.',
            'Revocaciones.',
            'Datos registrales.',
            'Fe de erratas:'],
        url: app.urlBORME,
        _common: require('../parser_common')(app),
        SQL: { db: null },
        DirEmpresas: [],
        foundEmpresas: function (DirEmpresas, _empresa) {
            for (n in options.DirEmpresas) {
                if (options.DirEmpresas[n].Name == _empresa)
                    return options.DirEmpresas[n]
            }
            return false
        },
        parser: {
            Secciones: function (options, url, data, callback) {
                app.Rutines(app).askToServer(options, url, data, function (options, body, data) {
                    //debugger
                    try {
                        if (body != null) {
                            var $ = app.cheerio.load(body, {
                                withDomLvl1: true,
                                normalizeWhitespace: true,
                                xmlMode: true,
                                decodeEntities: false
                            })

                            if ($('error').length > 0) {
                                var _r = { error: true, descripcion: $('error descripcion').html() }
                                callback(data)
                            } else {
                                data.next = $('sumario meta fechaSig').html()
                                data.Fdate = $('sumario meta pubDate').html() // = $('sumario meta fechaSig').html()
                                data.SUMARIO_LAST = app._xData.Sumario.BORME.SUMARIO_NEXT
                                data.SUMARIO_NEXT = "BORME-S-" + data.next.substr(6, 4) + data.next.substr(3, 2) + data.next.substr(0, 2)
                                //debugger
                               // options._common.SQL.commands.Sumario.update(options, data, function (options, data) {
                                
                                var _into = data.into==null?null: data.into.split("#")[1] // * 1

                                    if (data.Idate == null) {
                                        data.Idate = $('sumario meta pubDate').html()
                                    }
                                    var _reg = []
                                    //var _Sections = data.Secciones.split(",")
                                    $('diario seccion').each(function (i, item) {
                                        seccion = { code: item.attribs.num, name: item.attribs.nombre }
                                        //if (_Sections.indexOf(item.attribs.num) > -1)
                                        if (seccion.code == "A")
                                            $(item).find('emisor').each(function (b, borme) {
                                                //emisor = borme.attribs.nombre
                                                $(borme).find('item').each(function (b, lst) {
                                                    //// id = lst.attribs.id
                                                    var pdf = $(lst).find("urlPdf")[0].children[0].data
                                                    var titulo = $(lst).find("titulo")[0].children[0].data
                                                    if(titulo.indexOf('ARABA')>-1) titulo="ÁLABA"
                                                    //$(lst).find("titulo").each(function (b, titular) {
                                                    if (titulo.indexOf('DE SOCIEDADES') == -1)
                                                        if (_into == null) {
                                                            _reg[_reg.length] = { BORME: lst.attribs.id, pdf: pdf, titulo: titulo }
                                                        } else {
                                                            if (_into == lst.attribs.id) {
                                                                _reg[_reg.length] = { BORME: lst.attribs.id, pdf: pdf, titulo: titulo }
                                                                _into=null
                                                            }
                                                        }

                                               })
                                            })
                                    })
                                    data.id = url.uri.split('=')[1]
                                    data._list = _reg
                                    callback(data)
                                //})
                            }
                        } else {
                            debugger
                            callback(data)
                        }
                    }
                    catch (err) {
                        debugger
                        callback(data)
                    }
                })
            },
            saveStrings: function (ID_Sumario, _lines, idEmpresa, _l, cb) {
                var _data = _lines.data[_l]
                if (_data == null || idEmpresa==null)
                    debugger

                var _p = {
                    BORME_Id: Number.isInteger(_data.id*1)?_data.id:0,
                    BORME: _lines.BORME,
                    Empresa_Id: idEmpresa,
                    Empresa: _data._empresa,
                    Original: _data._original ,
                    _l: _l
                }

                process.stdout.write('.') //console.log(_p.Empresa+"->"+_p.Empresa_Id)
                //cadsql = "UPDATE lastread SET ID_LAST="+_p.BORME_Id +";"
                options.SQL.db.query("UPDATE lastread SET ID_LAST='"+ ID_Sumario + "#" + _p.BORME+ '#' + _p.BORME_Id + "';INSERT INTO strings SET ? ", _p, function (err, Diario) {
                    if (err) {
                        debugger
                        console.log(err)
                    }
                    cadsql = "SELECT _l FROM strings Where id=" + Diario[1].insertId
                    options.SQL.db.query(cadsql,{id:Diario.insertId}, function(err,_rec){
                        cb(_rec[0]._l)
                    })
                                                                                        
                })
            },
            saveLinesDeMovimientos: function (_l,_lines, data, _cb) {
                var _ok =false
                var _this = this
                _linea = _lines.data[_l]

                _lines.data[_l]._empresa = ''.Trim(_linea.e.replace(/'/g, "\'").replace(/'/g, "\'"))
                _lines.data[_l]._original = _linea.original.replace(/"/g, "").replace(/'/g, "\'").replace(/\n/g, "")
                
                if (data.into != null) {
                    if (data.into.split('#')[2] * 1 == _linea.id * 1) {
                        debugger
                    }
                    if (data.into.split('#')[2] * 1 < _linea.id * 1) {
                        data.into = null
                        _ok = true
                    }
                } else {
                    _ok=true
                }
                if (_ok) {
                    options.SQL.db.query("CALL InsertEmpresa(?," + _l + ")", _lines.data[_l]._empresa, function (err, _rec) {
                        //console.log(_rec2)
                        if (err != null || _rec[0][0] == null) {
                            var cadsql = "INSERT INTO errores ?"
                            options.SQL.db.query(_cadsql, { table: 'empresa', text: err.sql }, function (err, reg) {
                                if (_l == _lines.data.length - 1) {
                                    app._xData.TBORME++
                                    options.parser.saveDiarioMovimientos(0, _lines, data, _cb)
                                } else {
                                    
                                    _l++
                                    options.parser.saveLinesDeMovimientos(_l, _lines, data, _cb)
                                }
                            })
                        } else {

                            options.DirEmpresas[_rec[0][0].i] = _rec[0][0]
                            
                            var _empresa = {
                                // id: _rec[0][0].Id,
                                Name: _rec[0][0].Name,
                                ActiveRelations: 0,
                                TotalRelations:0,
                                Nodes: [],
                                //CompanyId: _rec[0][0].Id,
                                Type: 1,
                                CapitalSocial:0,
                                Provincia: data._list[data.e].titulo,
                                Year: data.next.substr(6, 4),
                                LastUpdate: data.SUMARIO_LAST.substr(8,8)
                            }

                           
                            if (_lines.data[_l].keys.length > 0) {
                                for (_n in _lines.data[_l].contenido) {
                                    var _t = _lines.data[_l].contenido[_n].type.toLowerCase()
                                    console.log(_t)
                                    if (options.Rutines.actions[_t] != null)
                                        _empresa = options.Rutines.actions[_t](_empresa, _lines.data[_l].contenido[_n].values)
                                }
                                //debugger
                            }

                            app._io.elasticIO.send('NEW', 'BORME' , 'Empresa', _rec[0][0].Id , _empresa)

                            options.parser.saveStrings( data.id, _lines, _rec[0][0].Id, _rec[0][0].i, function (_l) {
                                if (_l == _lines.data.length - 1) {
                                    app._xData.TBORME++
                                    options.parser.saveDiarioMovimientos(0, _lines, data, _cb)
                                } else {
                                    process.stdout.write('+')
                                    _l++
                                    options.parser.saveLinesDeMovimientos(_l, _lines, data, _cb)
                                }
                            })
                        }

                    })
                } else {
                    //debugger
                    if (_l == _lines.data.length - 1) {
                        app._xData.TBORME++
                        options.parser.saveDiarioMovimientos(0, _lines, data, _cb)
                    } else {
                        _l++
                        options.parser.saveLinesDeMovimientos(_l, _lines, data, _cb)
                    }
                }
                    
        

            },
            saveDiarioMovimientos: function ( e, _lines, _data, _ret) {
                var saveLineContenido = function ( e, _e, _line, _data, _cb) {
                    var _this = this
                    var line = _line.data[e]
                    if (_e < _line.data[e].contenido.length) {
                        if (options.Rutines.SQL[_line.data[e].contenido[_e].type] == null)
                            debugger

                        options.Rutines.SQL[_line.data[e].contenido[_e].type](_line.data[e].contenido[_e], _data , function (_Dl, idDirectivo, Active) {
                            if (_Dl == null)
                                debugger

                            var _idEmpresa = options.foundEmpresas(options.DirEmpresas,_line.data[e]._empresa)
                            if (_idEmpresa ==null)
                                debugger

                            cadsql = "INSERT INTO diario SET ?"
                            //if (_Dl.value == null && _Dl.values == null)
                            //    debugger
                            params = {
                                BORME: _line.BORME,
                                BORME_Id: _line.data[e].id.match(/[\d]{1,7}$/)[0],
                                Dia: _data.id.substr(14, 2),
                                Mes: _data.id.substr(12, 2),
                                Anyo: _data.id.substr(8, 4),
                                Provincia: _line.PROVINCIA,
                                Empresa_Id: _idEmpresa.Id,
                                Directivo_Id: idDirectivo,
                            }
                            if (_Dl != null) {
                                params.type = _Dl.type ? _Dl.type : _Dl.values.type,
                                params._key = _Dl.key ? _Dl.key : _Dl.values.key.substr(0, 55),
                                params._value = (_Dl.value == null && _Dl.values == null ? null : _Dl.value ? _Dl.value : _Dl.values==null ? null : _Dl.values.value)
                            } else {
                                debugger
                            }

                            //if (params.Provincia == "BARCELONA")
                            //    debugger
                            //debugger
                            options.SQL.db.query(cadsql, params, function (err, _record) {
                                if (err)
                                    debugger

                                process.stdout.write('D')

                                cadsql = "SELECT * FROM diario where id="+_record.insertId
                                options.SQL.db.query(cadsql, function(err,_params){
                                    if (err)
                                        debugger
                                    var params = _params[0]
                                    _params = {
                                        BORME: _params[0].BORME,
                                        BORME_ID: _params[0].BORME_ID,
                                        Dia: _params[0].Dia,
                                        Mes: _params[0].Mes,
                                        Anyo: _params[0].Anyo,
                                        Provincia: _params[0].Provincia,
                                        Empresa_Id: _params[0].Empresa_Id,
                                        Directivo_Id: _params[0].Directivo_Id,
                                        type: _params[0].type,
                                        key: _params[0]._key,
                                        value: _params[0]._value
                                    }
                                    app._io.elasticIO.send('NEW', 'BORME', 'Diario', params.id, _params)

                                    if (_e == line.contenido.length - 1) {
                                        if (params.Empresa_Id > 0 && params.Directivo_Id>0) {
                                            cadsql = "INSERT INTO relaciones SET ? ON DUPLICATE KEY UPDATE Activo=" + (Active?1:0)


                                            var _params = { Diario_Id: _record.insertId, Empresa_Id: params.Empresa_Id, Directivo_Id: params.Directivo_Id, Motivo: _Dl.type, Cargo: _Dl.values.key, Activo: (Active ? 1 : 0), Anyo: params.Anyo }
                                            options.SQL.db.query(cadsql, _params, function (err, _recordR) {
                                                if (err || _recordR.insertId == null)
                                                    debugger

                                                //app._io.elasticIO.send('NEW', 'Relations', _paramsIO)
                                                //if (_recordR.insertId > 0) {
                                                    _params = { id: _recordR.insertId }
                                                //} else {
                                                //    _params = [_params.Diario_Id,]
                                                //}
                                                cadsql = "SELECT * FROM relaciones WHERE ?"
                                                options.SQL.db.query(cadsql, _params, function (err, _record) {
                                                    if (err || _record[0] == null || _recordR.insertId==null)
                                                        debugger
                                                    var _params = { Diario_Id: _record[0].Diario_Id, Empresa_Id: _record[0].Empresa_id, Directivo_Id: _record[0].Directivo_id, Cargo: _record[0].Cargo, Motivo: _record[0].Motivo, Activo: _record[0].Activo[0], Anyo: _record[0].Anyo ,LastUpdate: _data.SUMARIO_LAST.substr(8,8)}
                                                    app._io.elasticIO.send('NEW','BORME', 'Relaciones', _record[0].id, _params)
                                                    process.stdout.write('R')
                                                    _e++
                                                    saveLineContenido(e, _e, _line, _data, _cb)
                                                })
                                            })
                                            //debugger
                                            //} else {
                                            //    _cb(e, _line)
                                        } else {
                                            _e++
                                            saveLineContenido(e, _e, _line, _data, _cb)
                                        }
                                    } else {
                                        _e++
                                        saveLineContenido(e, _e, _line, _data, _cb)
                                    }
                                })
                            })

                        })

                    } else {
                        //e++
                        _cb(e, _line)
                        //_this.saveDiarioMovimientos(e, _lines, _data, callback)

                    }
                }
                if (_lines.data == null)
                    debugger

                var _this = this
                if (e < _lines.data.length) {
                    var line = _lines.data[e]
                    //if (_lines.data[e].Id == 68)
                    //    debugger

                    //console.log(_lines.data[e]._empresa)
                    if (line.contenido.length > 0) {
                        saveLineContenido( e, 0, _lines, _data, function (e, _line) {
                            //for (_e in line.contenido) {
                                if (e < _lines.data.length) {
                                    e++
                                    //if (_lines.data[e].Id == null)
                                    //    debugger
                                    _this.saveDiarioMovimientos(e, _lines, _data, _ret)

                                }else{
                                    _ret(_data, _lines)
                                }
                            //}
                        })
                    } else {
                        e++
                        //if (_lines.data[e].Id == null)
                        //    debugger
                        _this.saveDiarioMovimientos(e, _lines, _data, _ret)
                    }
                    

                } else {
                    _ret(_data, _lines)
                }
            },
            Preceptos: function (options, urlDoc, body, data, callback) {
                var _this = this
                var _lines = []
                var xcadsql = null

                var _file = app.PDFStore + urlDoc.split("/")[urlDoc.split("/").length - 1]
                //var bocm = turl[turl.length - 1].split(".")[0]

                //punto de guardado del PDF precepto
                if (body != null) {
                    app.mkdirp(app.PDFStore, function (err) {
                        app.fs.writeFile(_file, body, function (err) {
                            var pdf = new app.pdftotext(_file)
                            pdf.add_options(options.pdfOpc);

                            pdf.getText(function (err, text, cmd) {
                                //
                                if (err) {
                                    debugger
                                    console.error(err);
                                } else {
                                    //debugger

                                    var _fileText =  _file.split(".pdf")[0] + ".txt"
                                    //console.log(_fileText)
                                    app.fs.readFile( _fileText , 'utf8', function (err, text) {
                                        app.fs.unlink(_fileText, function (err) { 
                                            app.fs.unlink(_file,function(err){

                                                options.DirEmpresas = []
                                                lines = text.replace(/"/g, "").split('\n')

                                                _lines = options.Rutines.getDataFromMap(options.Rutines, lines, options.Rutines.maps)
                                                //debugger
                                                if (_lines != null) {
                                                    if (_lines.data.length == 0){
                                                        callback(data, null)
                                                    } else {
                                                        var cadsql = {
                                                            SUMARIO: data.id,
                                                            BORME: _lines.BORME,
                                                            Anyo: data.desde.substr(0, 4),
                                                            Provincia: _lines.PROVINCIA,
                                                            PDF: urlDoc
                                                        }

                                                        options.SQL.db.query('INSERT INTO borme SET ? ', cadsql , function (err, DataRecord) {

                                                            var _avanza = true
                                                            if (err)
                                                                if (err.code = 'ER_DUP_ENTRY') {
                                                                    _avanza = false
                                                                } else {
                                                                    debugger
                                                                }

                                                            var _counter = 0
                                                            if (_avanza) {
                                                                options.parser.saveLinesDeMovimientos(0, _lines,data, callback)
                                                            } else {
                                                                callback(data, null)
                                                            }
                                                        })
                                                    }
                                                
                                                } else {
                                                    debugger
                                                    callback(data, null)
                                                }
                                            })
                                        })
                                    })
                                }
                            })
                        })
                    })
                }
            }
        }
    }
    options.Rutines.cargos = dataCargos
    app.commonSQL.init(options, drop, 'BORME', callback)

}