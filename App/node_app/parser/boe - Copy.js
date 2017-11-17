module.exports = function (app, drop, callback) {

    var options = {
        url: app.urlBOE,
        opc: ['-table', '-raw', '-layout', '-enc UTF-8'],
        pdfOpc: ['-raw', '-nopgbrk', '-enc UTF-8'],
        Rutines: require('./BOE/Boe_Rutines')(app),
        transforms: require('./BOE/Boe_Transforms')(app),
        _common: require('../parser_common')(app),
        SQL: {
            db: null,
            insert: function (options, _analisis, data, callback) {
                    var boecadsql = "SELECT * FROM boe WHERE  BOE='" + _analisis._BOE + "'"
                    var boecadsqlINSERT = "INSERT INTO boe (SUMARIO,BOE,Tipo_BOE,Tipo_TRAMITE, Texto, pdf) VALUES ('" + data.id + "','" + _analisis._BOE.split("=")[1] + "','" + app.Rutines(app).getCleanedString(_analisis._type) + "','" + app.Rutines(app).getCleanedString(_analisis._tramitacion) + "','" + data.textExtend.join("<br>").replace(/'/g, '') + "','" + _analisis.urlPdf + "')"
                    options.SQL.db.query(boecadsql, function (err, rows) {
                        if (err)
                            console.log(err, boecadsql)
                        if (rows != null) {
                            if (rows.length == 0) {
                                options.SQL.db.query(boecadsqlINSERT, function (err, irows) {
                                    if (err == null) {
                                        app._xData.TBOE++
                                        callback(_analisis, data)
                                    } else {
                                        debugger
                                        console.log(err, boecadsqlINSERT)
                                    }

                                })
                            }
                        } else {
                            callback(_analisis, data)
                        }
                    })
                }
        },
        parser: {
            Secciones: function (options, url, data, callback) {
                app.Rutines(app).askToServer(app, { encoding: 'UTF-8', method: "GET", uri: url.uri, agent: false }, data, function (app, body, data) {
                    //try {
                    if (body != null) {
                        var $ = app.Rutines(app).XmlToDom(body)
                        if ($('error').length > 0) {
                            //var _r = { error: true, descripcion: $('error descripcion').html() }
                            callback(data)
                        } else {
                            data.next = $('sumario meta fechaSig').html()
                            data.Fdate = $('sumario meta pubDate').html() // = $('sumario meta fechaSig').html()
                            data.SUMARIO_LAST = app._xData.Sumario.BOE.SUMARIO_NEXT
                            data.SUMARIO_NEXT = "BOE-S-" + data.next.substr(6, 4) + data.next.substr(3, 2) + data.next.substr(0, 2)
                            //debugger
                            options._common.SQL.commands.Sumario.update(options, data, function (options, data) {
                                if (data.Idate == null) {
                                    data.Idate = $('sumario meta pubDate').html()
                                }
                                var _reg = []
                                var _Sections = data.Secciones.split(",")
                                $('diario seccion').each(function (i, item) {
                                    if (_Sections.indexOf(item.attribs.num) > -1)

                                        $(item.children).find('departamento item').each(function (b, boe) {
                                            _reg[_reg.length] = '/diario_boe/xml.php?id=' + boe.attribs.id
                                        })

                                })
                                data.id = url.uri.split('=')[1]
                                data._list = _reg
                                callback(data)
                            })
                        }
                    } else {
                        debugger
                        callback(data)
                    }
   
                })
            },
            Preceptos: function (options, urlDoc, body, data, callback) {
                app.Rutines(app).askToServer(app, { encoding: 'UTF-8', method: "GET", uri: options.url + urlDoc, agent: false }, data, function (app, body, data) {
                    var xcadsql = null
                    //var turl = url
                    if (body != null) {

                        var $ = app.Rutines(app).XmlToDom(body)                 // convertimos el texto xml en objetos DOM
                        if ($('error').length == 0) {
                            data.codigo = options.Rutines.get.principal($)      // rescatamos las variables directas
                            var _analisis = options.Rutines.get.data(options, data)      //creamos la estructura con los datos principales
                            if (_analisis._type == null)
                                debugger
                            //console.log(_analisis._modalidad)

                            if (_analisis._type.indexOf('Adjudicación') > -1 || _analisis._modalidad == "Formalización contrato") {
                                options.Rutines.get.p_parrafo(options, $, '.', body, function (_data) {
                                    data.extra = _data._extra
                                    //console.log(_extra)
                                    var textExtend = data.textExtend = _data._arr   // recojemos todo el texto en una array (con caracter final)
                                    if (data.textExtend.length > 0) {
                                        var patterns = options.transforms.getPatern(options.transforms)
                                        data.contratista = options.Rutines.extract(data.textExtend, 'contratista',
                                           options.transforms.ADD(
                                                [patterns.General,
                                                patterns.Contratista,
                                                [["F", { f: options.transforms.removeFirstChar }, ' ']]
                                                ]))


                                        data.extra.adjudicador = options.Rutines.extract(data.textExtend, 'Organismo',
                                            options.transforms.ADD(
                                                [patterns.General,
                                                patterns.Contratista,
                                                [["F", { f: options.transforms.removeFirstChar }, ' ']]
                                                ]))


                                        //console.log(data.contratista)

                                        data.importe = options.Rutines.extract(data.textExtend, 'd) Importe ', options.transforms.ADD(
                                            [patterns.General]
                                        ))

                                        _analisis._tramitacion = ''.Trim(options.Rutines.extract(data.textExtend, 'Tramitación', options.transforms.General))
                                        _analisis._objeto = ''.Trim(options.Rutines.extract(data.textExtend, 'Descripción del objeto:', options.transforms.General))

                                        //b) Descripción del objeto:
                                        if (data.contratista != null) {
                                            options.SQL.insert(options, _analisis, data, function (_analisis, data) {
                                                if (data.contratista != null) {
                                                    if (data.contratista.length > 0) {

                                                        var params = { BOE:_analisis._BOE.split("=")[1] , _keys:data.contratista.substr(0, 254).replace(/'/g, '')}
                                                        if (data.importe != null) {
                                                            params.Importes = ''.Trim(data.importe.substr(0, 254).replace(/\n/g, "").replace(/'/g, ''))
                                                            //xcadsql = "INSERT INTO strings (BOE,_keys,Importes) VALUES ('" + _analisis._BOE.split("=")[1] + "','" + data.contratista.substr(0, 254).replace(/'/g, '') + "','" + ''.Trim(data.importe.substr(0, 254).replace(/\n/g, "").replace(/'/g, '')) + "')"
                                                        } 
                                                        //console.log(xcadsql)

                                                        //var boecadsql = "SELECT * FROM boe WHERE  BOE='" + _analisis._BOE + "'"
                                                        //var boecadsqlINSERT = "INSERT INTO boe (SUMARIO,BOE,Tipo_BOE,Tipo_TRAMITE, Texto, pdf) VALUES ('" + data.id + "','" + _analisis._BOE.split("=")[1] + "','" + app.Rutines(app).getCleanedString(_analisis._type) + "','" + app.Rutines(app).getCleanedString(_analisis._tramitacion) + "','" + data.textExtend.join("<br>").replace(/'/g, '') + "','" + _analisis.urlPdf + "')"
                                                        debugger
                                                        var p = [
                                                            data.id,                                                    //SUMARIO
                                                            _analisis._BOE,                                             //BOE
                                                            app.Rutines(app).getCleanedString(_analisis._type),         //Tipo_BOE
                                                            app.Rutines(app).getCleanedString(_analisis._tramitacion),  //Tipo_TRAMITE
                                                            _analisis.urlPdf,                                           //PDF                                                           
                                                            data.textExtend.join("<br>").replace(/'/g, ''),             //Texto

                                                            data.contratista.substr(0, 254).replace(/'/g, ''),          //_keys
                                                            ''.Trim(data.importe.substr(0, 254).replace(/\n/g, "").replace(/'/g, '')) //Importes
                                                        ]

                                                        for (i in data.extra) {
                                                            p[p.length] = data.extra[i].replace(/'/g, "").replace(/\n/g, "")
                                                        }
                                                        debugger
                                                        options.SQL.db.query('INSERT INTO strings SET ?', params , function (err) {
                                                            if (err != null)
                                                                debugger
                                                            //debugger
                                                            xcadsql = "('" + _analisis._BOE.split("=")[1] + "'" //' //'" + data.contratista.replace(/'/g, '') + "','" + data.importe.replace(/'/g, '') + "')"
                                                            xcadsqlcmp = "(BOE"
                                                            for (i in data.extra) {
                                                                xcadsqlcmp = xcadsqlcmp + "," + i
                                                                xcadsql = xcadsql + ",'" + data.extra[i].replace(/'/g, "").replace(/\n/g, "") + "'"
                                                            }
                                                            xcadsql = 'INSERT INTO Contratos ' + xcadsqlcmp + ") VALUES " + xcadsql + ")"
                                                            options.SQL.db.query(xcadsql, function (err) {
                                                                if (err)
                                                                    debugger
                                                                //_cadsql = "UPDATE Empresa set nBOE = nBOE+1 where INSTR('" + data.contratista.substr(0, 254).replace(/'/g, '') + "', Name )>0;"
                                                                //app.VisualCif.SQL.db.query(_cadsql, function (err, records) {
                                                                if (err)
                                                                    debugger
                                                                callback(data)
                                                                //})
                                                                //callback(data)
                                                            })
                                                        })
                                                    } else {
                                                        callback(data)
                                                    }
                                                } else {
                                                    callback(data)
                                                }
                                            })
                                        } else {
                                            callback(data)
                                        }
                                    } else {
                                        callback(data)
                                    }
                                })
                            } else {
                                //debugger
                                callback(data)
                            }
                        } else {
                            callback(data)
                        }

                    }
                })
            }
        }
    }


   app.commonSQL.init(options, drop, 'BOE', callback)

}