module.exports = function (app, callback) { 

    var options = {
        url: app.urlBOE,
        opc: ['-table', '-raw', '-layout', '-enc UTF-8'],
        pdfOpc: ['-raw', '-nopgbrk', '-enc UTF-8'],
        Rutines: require('../parser/BOLETIN/__Rutines')(app),
        //transforms: require('./BOLETIN/__Transforms')(app),
        _common: require('../parser_common')(app),
        SQL: {
            db: null           
        },
        parser: {
            Secciones: function (options, url, data, callback) {
                //cargamos el documento con una rutina comun de extracción
                app.Rutines(app).askToServer(app, { encoding: 'UTF-8', method: "GET", uri: url.uri, agent: false }, data, function (app, body, data) {
                    //try {
                    if (body != null) {
                        process.stdout.write('S')
                        //pasamos el XML a formato "JQUERY de node"
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
                            //options._common.SQL.commands.Sumario.update(options, data, function (options, data) {
                            if (data.Idate == null) {
                                data.Idate = $('sumario meta pubDate').html()
                            }
                            var _reg = []
                            var _Sections = data.Secciones.split(",")
                            var _analisis = []
                            //para todas las secciones del sumario
                            $('diario seccion').each(function (i, item) {
                                //creamos una lista con aquellas que son de nuestro interes (especificado en el parametro de entrras de Actualize()
                                if (_Sections.indexOf(item.attribs.num) > -1)

                                    $(item.children).find('departamento item').each(function (b, boe) {
                                        var _ok=false
                                        if (app._xData.Sumario.BOE.SCR_ID_LAST != null) {
                                            process.stdout.write('%')
                                            if (app._xData.Sumario.BOE.SCR_ID_LAST==boe.attribs.id)
                                                app._xData.Sumario.BOE.SCR_ID_LAST = null
                                        }else{
                                            _ok=true
                                        }
                                        if(_ok)
                                            _reg[_reg.length] = '/diario_boe/xml.php?id=' + boe.attribs.id
                                            _analisis[_analisis.length] = { BOE: boe.attribs.id }
                                    })

                            })
                            data.id = url.uri.split('=')[1]
                            data._analisis = _analisis
                            data._list = _reg
                        //retornamos una lista con los resultados
                            callback(data)
                        //})
                        }
                    } else {
                        //debugger
                        console.log('error de lectura de SUMARIO url ' + url)
                        callback(data)
                    }

                })
            },
            Preceptos: function (options, urlDoc, body, data, callback) {
                //app.Rutines(app).askToServer(app, { encoding: 'UTF-8', method: "GET", uri: options.url + urlDoc, agent: false }, data, function (app, body, data) {
                    //var xcadsql = null
                    //var contratos = []
                    if (body != null) {
                        
                        var $ = app.Rutines(app).XmlToDom(body)                 // convertimos el texto xml en objetos DOM
                        if ($('error').length == 0) {
                            data.codigo = options.Rutines.get.principal($)      // rescatamos las variables directas
                            var _analisis = options.Rutines.get.data(options, data)      //creamos la estructura con los datos principales
                            if (_analisis._type == null)
                                debugger

                            //if (["BOE-B-2001-3002"].indexOf(_analisis._BOLETIN.split("=")[1]) > -1)
                            //    debugger

                            if (_analisis._type.indexOf('Adjudicación') > -1 || _analisis._modalidad == "Formalización contrato") {
                                options.Rutines.get.p_parrafo(options, $, '.', body, function (_data) {
                                    if (_data != null) {
                                        //data.extra = _data._extra
                                        data.textExtend = _data._arr

                                        app.commonSQL.SQL.commands.insert.Boletin.text(options, _analisis, data, function (data) {
                                            callback(data)
                                        })
                                        //options.SQL.insert(options, _analisis , data, function (data) {
                                        //    callback(data)
                                        //})
                                    } else {
                                        callback(data,true)
                                    }
                                }, urlDoc, options.Rutines)
                            } else {
                                process.stdout.write('-')
                                callback(data)
                            }
                         

                        
                        } else {
                            callback(data)
                        }

                    } else {
                        console.log('Body - NULL reload True')
                        callback(data,true)
                    }
            }
        }
    }

   //creamos la conexión a la DB
    app.commonSQL.init(options, 'BOE', app._fileCredenciales, callback)

}