module.exports = function (app, callback) { 

    options = {
        Rutines: require('../parser/BORME/Borme_Rutines')(app, require('../parser/BORME/Borme_Transforms')(app)),
        //Rutines: require('../parser/BOLETIN/__Rutines')(app),
        _common: require('../parser_common')(app),
        pdfOpc: ['-nopgbrk', '-enc UTF-8'],
        url: app.urlBORME,
        
        SQL: { db: null },
        DirEmpresas: [],
        parser: {
            Secciones: function (options, url, data, callback) {
                app.Rutines(app).askToServer(options, url, data, function (options, body, data) {
                    //debugger
                    //try {
                        if (body != null) {
                            var $ = app.cheerio.load(body, {
                                withDomLvl1: true,
                                normalizeWhitespace: true,
                                xmlMode: true,
                                decodeEntities: false
                            })

                            data.SUMARIO_LAST = app._xData.Sumario.BORME.SUMARIO_LAST
                            data.SUMARIO_NEXT = app._xData.Sumario.BORME.SUMARIO_NEXT //"BORME-S-" + data.next.substr(6, 4) + data.next.substr(3, 2) + data.next.substr(0, 2)

                            if ($('error').length > 0) {
                                data._list = []
                                data.SUMARIO_NEXT = app.moment(data.SUMARIO_NEXT, "YYYYMMDD").add(1, 'days').format('YYYYMMDD');
                                callback(data)
                            } else {
                                data.next = $('sumario meta fechaSig').html()
                                data.Fdate = $('sumario meta pubDate').html() // = $('sumario meta fechaSig').html()

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

                                    data._list = []
                                    data._analisis = _reg
                                    for (n in _reg) {
                                        data._list[data._list.length] = _reg[n].pdf
                                    }
                                    //data._list = _reg
                                    //retornamos la lista del contenido del sumario
                                    callback(data)
                                //})
                            }
                        } else {
                            debugger
                            callback(data,true)
                        }
                    //}
                    //catch (err) {
                    //    debugger
                    //    callback(data)
                    //}
                })
            },
            saveStrings: function (ID_Sumario, _lines, idEmpresa, _l, cb) {
                var _data = _lines.data[_l]
                if (_data == null || idEmpresa==null)
                    debugger

                var _p = {
                    BORME_Id: Number.isInteger(_data.id*1)?_data.id:0,
                    BOLETIN: _lines.BORME,
                    Empresa_Id: idEmpresa,
                    Empresa: _data._empresa,
                    Original: _data._original ,
                    _l: _l
                }

                process.stdout.write('.') //console.log(_p.Empresa+"->"+_p.Empresa_Id)
                //cadsql = "UPDATE lastread SET ID_LAST="+_p.BORME_Id +";"
                options.SQL.db.query("UPDATE lastread SET ID_LAST='"+ ID_Sumario + "#" + _p.BOLETIN+ '#' + _p.BORME_Id + "' WHERE Type='BORME' and Anyo=" + app.anyo + "; SELECT "+_l+" as _l;", function (err, Diario) {
                    if (err) {
                        debugger
                        console.log(err)
                    }
                    cb(Diario[1][0]._l)
                    //cadsql = "SELECT _l FROM strings Where id=" + Diario[1].insertId
                    //options.SQL.db.query(cadsql,{id:Diario.insertId}, function(err,_rec){
                    //    cb(_rec[0]._l)
                    //})
                                                                                        
                })
            },
            saveLinesDeMovimientos: function (_l,_lines, data, _cb) {
                //var _ok =false
                var _this = this

                _ok = function (options, _l, _lines) {
                    // if (_ok) {
                    options.SQL.db.query("CALL Insert_Data_BORME_Empresa(?," + _l + ")", _lines.data[_l]._empresa, function (err, _rec) {
                        //console.log(_rec2)
                        if (err != null || _rec[0][0] == null) {
                            var cadsql = "INSERT INTO errores ?"
                            options.SQL.db.query(_cadsql, { BOLETIN: _lines.BORME, SqlError: err.sql }, function (err, reg) {
                                if (_l == _lines.data.length - 1) {
                                    app._xData.TBORME++
                                    options.parser.saveDiarioMovimientos(0, _lines, data, _cb)
                                } else {

                                    _l++
                                    options.parser.saveLinesDeMovimientos(_l, _lines, data, _cb)
                                }
                            })
                        } else {
                            process.stdout.write('E')
                            options.DirEmpresas[_rec[0][0].i] = _rec[0][0]

                            var _empresa = {
                                // id: _rec[0][0].Id,
                                Name: _rec[0][0].Name,
                                ActiveRelations: 0,
                                TotalRelations: 0,
                                Nodes: [],
                                //CompanyId: _rec[0][0].Id,
                                Type: 1,
                                CapitalSocial: 0,
                                Provincia: data._list[data.e].titulo,
                                Year: data.next.substr(6, 4),
                                LastUpdate: data.SUMARIO_LAST.substr(8, 8)
                            }


                            if (_lines.data[_l].keys.length > 0) {
                                for (_n in _lines.data[_l].contenido) {
                                    var _t = _lines.data[_l].contenido[_n].type.toLowerCase()
                                    //console.log(_t)
                                    if (options.Rutines.actions[_t] != null)
                                        _empresa = options.Rutines.actions[_t](_empresa, _lines.data[_l].contenido[_n].values)
                                }
                                //debugger
                            }
                            if (app._io)
                                app._io.elasticIO.send('NEW', 'BORME', 'Empresa', _rec[0][0].Id, _empresa)

                            options.parser.saveStrings(data.id, _lines, _rec[0][0].Id, _rec[0][0].i, function (_l) {
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

                }



                _linea = _lines.data[_l]

                _lines.data[_l]._empresa = ''.Trim(_linea.e.replace(/'/g, "\'").replace(/'/g, "\'"))
                _lines.data[_l]._original = _linea.original.replace(/"/g, "").replace(/'/g, "\'").replace(/\n/g, "")
                
                if (data.into != null) {
                    if (data.into.split('#').length > 1) {
                        //if (data.into.split('#')[2] * 1 == _linea.id * 1) {
                            //debugger
                        //} else {
                            if (data.into.split('#')[2] * 1 < _linea.id * 1) {
                                data.into = null
                                _ok(options, _l, _lines)

                            } else {
                                cadSQl = "SELECT Id,Name," + _linea.id+" as i FROM borme_empresa WHERE Name='" + _linea._empresa.replaceAll("'","\\'") + "'"

                                options.SQL.db.query(cadSQl, function (err, _rec) {
                                    if (err != null) {
                                        debugger
                                    } else {
                                        if (_rec.length > 0) {
                                            options.DirEmpresas[_rec[0].i] = _rec[0]
                                        }

                                        if (_l == _lines.data.length - 1) {
                                            app._xData.TBORME++
                                            options.parser.saveDiarioMovimientos(0, _lines, data, _cb)
                                        } else {
                                            _l++
                                            options.parser.saveLinesDeMovimientos(_l, _lines, data, _cb)
                                        }
                                       
                                    }
                                })
                            }
                        //}
                    } else {
                        _ok(options,_l,_lines)
                    }
                } else {
                    _ok(options, _l, _lines)
                }

 

            },
            saveDiarioMovimientos: function ( e, _lines, _data, _ret) {
                var saveLineContenido = function ( e, _e, _line, _data, _cb) {
                    var _this = this
                    var line = _line.data[e]
                    if (_e < _line.data[e].contenido.length) {
                        if (options.Rutines.SQL[_line.data[e].contenido[_e].type] == null)
                            debugger

                        options.Rutines.SQL[_line.data[e].contenido[_e].type](_line.data[e].contenido[_e], _data, function (_Dl, idDirectivo, Active) {
                            if (_Dl == null)
                                debugger
                            if (_line.data[e] == null)
                                debugger
                            var _idEmpresa = options.foundEmpresas(options.DirEmpresas, _line.data[e]._empresa)
                            if (_idEmpresa == null)
                                debugger

                            params = [
                                 _line.BORME,
                                 _line.data[e].id.match(/[\d]{1,7}$/)[0],
                                 _data.id.substr(14, 2),
                                 _data.id.substr(12, 2),
                                 _data.id.substr(8, 4),
                                 _line.PROVINCIA,
                                 _idEmpresa.Id,
                                 idDirectivo,
                                 _idEmpresa.empresa ? 0 : 1,
                                 (Active ? 1 : 0),
                                 _Dl.type ? _Dl.type : _Dl.values.type,
                                 _Dl.key ? _Dl.key : _Dl.values.key.substr(0, 55),
                                 (_Dl.value == null && _Dl.values == null ? null : _Dl.value ? _Dl.value : _Dl.values == null ? null : _Dl.values.value)
                            ]

                            if (_Dl == null) {
                                debugger
                                console.log('_Dl = null error borme.js')
                            }
                            options.SQL.db.query("CALL INSERT_Data_BORME_Diario(?,?,?,?,?,?,?,?,?,?,?,?,?)", params, function (err, _rec) {
                                process.stdout.write('D')
                                _e++
                                saveLineContenido(e, _e, _line, _data, _cb)

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
                                if (e < _lines.data.length-1) {
                                    e++
                                    //if (_lines.data[e].Id == null)
                                    //    debugger
                                    _this.saveDiarioMovimientos(e, _lines, _data, _ret)

                                }else{
                                    _ret(_data)
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
                    _ret(_data)
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

                                                        app.commonSQL.SQL.commands.insert.Borme.text(options, _lines, data, function (data) {
                                                            callback(data)
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
                } else {
                    callback(data,true)
                }
            }
        }
    }
    app.commonSQL.init(options, 'BORME', app._fileCredenciales, callback)

}