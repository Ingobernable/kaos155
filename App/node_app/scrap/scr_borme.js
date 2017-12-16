module.exports = function (app, callback) {

    options = {
        Type : 'BORME',
        Command: app.command,
        Rutines: require('../_utils/BORME/Borme_Rutines.js')(app, require('../_utils/BORME/Borme_Transforms.js')(app)),
        //Rutines: require('../parser/BOLETIN/__Rutines')(app),
        _common: require('../_common.js')(app),
        pdfOpc: ['-nopgbrk', '-enc UTF-8'],
        url: app.urlBORME,

        SQL: { db: null },
        scrap: {
            Secciones : function (options, url, data, callback) {
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
                                                                _into = data.into = null
                                                            } else {
                                                                console.log(_into, lst.attribs.id)
                                                                app.process.stdout.write(app, options, '','S ','')
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
                            data._list =[]
                            callback(data,true)
                        }
                })
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

                                                _lines = options.Rutines.scrapDataFromMap(options.Rutines, lines, options.Rutines.maps)
                                                //debugger
                                                if (_lines != null) {
                                                    if (_lines.data.length == 0) {
                                                        debugger
                                                        callback(data, null)
                                                    } else {
                                                        data.textExtend = _lines
                                                        //data.err = _data._err
                                                        app.commonSQL.SQL.commands.insert.Borme.text(options, data, function (data) {
                                                            callback(data)
                                                        })

                                                        //app.commonSQL.SQL.commands.insert.Boletin.text(options, _lines, data, function (data) {
                                                        //    callback(data)
                                                        //})

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
    app.commonSQL.init(options, options.Type , app._fileCredenciales + options.Command, function (options) {
        app.commonSQL.SQL.commands.insert.AnyoRead(options, options.SQL.db, app.command , function (options) {
           callback(options)
        })
    })
}
