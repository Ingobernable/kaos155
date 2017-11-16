module.exports = function (app, callback) { 

    options = {
        Command: app.command,
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

                            data.SUMARIO_LAST = app._xData.Sumario.BORME.SUMARIO_NEXT

                            if ($('error').length > 0) {
                                data._list = []
                                data.SUMARIO_NEXT = app.moment(data.SUMARIO_NEXT, "YYYYMMDD").add(1, 'days').format('YYYYMMDD');
                                callback(data)
                            } else {
                                data.next = $('sumario meta fechaSig').html()
                                data.Fdate = $('sumario meta pubDate').html() // = $('sumario meta fechaSig').html()
                                data.SUMARIO_NEXT = "BORME-S-" + data.next.substr(6, 4) + data.next.substr(3, 2) + data.next.substr(0, 2)

                                //debugger
                               // options._common.SQL.commands.Sumario.update(options, data, function (options, data) {
                                
                                var _into = data.into==null?null: data.into //.split("#")[1] // * 1

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
                                                            } else {
                                                                process.stdout.write('.')
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
            }
        }
    }
    app.commonSQL.init(options, 'BORME', app._fileCredenciales + options.Command , callback)

}