module.exports = function (app, drop, callback) {

    return {

        SQL: {
            commands: {
                Sumario: {
                    insert: function (options, data, callback) {
                        var next = options.type + (options.type=="BOCM"?"":"-S-") + data.next.substr(6, 4) + data.next.substr(3, 2) + data.next.substr(0, 2)
                        if (data._list.length > 0) {
                            var sumariosql = "SELECT * FROM sumarios WHERE type='" + options.type + "' AND BOLETIN='" + data.id + "'"

                            options.SQL.db.query(sumariosql, function (err, rows) {
                                if (err) {
                                    console.log(err, sumariosql)
                                    debugger
                                }
                                if (rows != null) {
                                    if (rows.length == 0) {
                                        options.SQL.db.query("INSERT INTO sumarios (BOLETIN,SUMARIO_NEXT,Type) VALUES ( '" + data.id + "', '" + next + "','" + options.type + "')", function (err, records) {
                                            if (err) {
                                                debugger
                                            }
                                            app._xData.TSUMARIOS[options.type]++
                                            callback(data)
                                        })
                                    } else {
                                        //app._xData.TSUMARIOS[options.type]++
                                        callback(data)
                                        //console.log(err, sumariosql)
                                        //callback({ error: true, SUMARIO_NEXT: rows[0].SUMARIO_NEXT })
                                    }
                                } else {
                                    debugger
                                    console.log(err, sumariosql)
                                    callback({ error: true })
                                }
                            })
                        } else {
                            callback(data)
                        }
                    },
                    get: function (options, data, callback) {
                        var _this = this
                        var Sumario = options.Sumario
                        //local_file = app.PDFStore + 'sumarios_' + data.type.toUpperCase() + '/' + Sumario.substr(7, 4)  + Sumario.substr(11, 2) +".pdf"
                        ////app.fs.stat(local_file, function (err,stat) {                         
                            //if (err) {
                                var url = options.url + 'diario_' + data.type.toLowerCase() + '/xml.php?id=' + Sumario
                                if (options.type == "BOCM")
                                    var url = options.url + '_Seccion_BOCM/' + Sumario.substr(7, 4) + "/" + Sumario.substr(11, 2) + "/" + Sumario.substr(13, 2) + "/" + options.type + Sumario.substr(6,9) + ".PDF"
                            //
                            //Cargamos y analizamos las secciones con el parseador concreto de cada TYPE de documento
                            //BOE,BOCM,BORME......etc
                            
                            options.parser.Secciones(options, { encoding: null, method: "GET", uri: url, agent: false }, data, function (jsonData, repeat) {
                                if (repeat) {
                                    debugger
                                    callback(data,true)
                                } else {
                                    _this.insert(options, jsonData, function (jsonData) {
                                        callback(jsonData)
                                    })
                                }
                            })
                        //})

                        
                    },
                    update: function (options, data, callback) {
                        app._xData.Sumario[options.type] = {
                            SUMARIO_LAST: data.SUMARIO_LAST,
                            SUMARIO_NEXT: data.SUMARIO_NEXT
                        }
                        options.SQL.db.query("UPDATE lastread SET SUMARIO_LAST='" + data.SUMARIO_LAST + "',SUMARIO_NEXT='" + data.SUMARIO_NEXT + "',ID_LAST=null WHERE type='" + data.type.toUpperCase()  + "' AND Anyo= " + app.anyo , function (err, records) {
                            if (err) {
                                debugger
                            }
                            callback(options, data)
                        })
                    }
                }
            }
        },
        parser: function (app) {
            var _this = this
            return {
                NEW: function (options, data, analizer, callback) {
                    
                    var _this = this
                    var turl = data._list[data.e].pdf ? data._list[data.e].pdf : data._list[data.e] //.split("/")
                    this.Search(options, turl, data, analizer, function (data, repeat) {
                        if (data.e < data._list.length - 1) {
                            if (!repeat) {
                                data.e++
                            } else {
                                debugger
                            }
                            _this.NEW(options, data, analizer, callback)
                        } else {
                            callback(data)
                        }
                        //})
                    })
                },
                Search: function (options, doc, sdata, analizer, callback) {
                    //var _this = this
                    if (doc[options.type] != null)
                        doc = [options.type]

                    app.Rutines(app).askToServer(options, { encoding: null, method: "GET", uri: options.url + doc }, sdata, function (options, body, data) {
                        analizer(options, doc, body, data, callback)
                    })
                }
            }
        },
        Actualize: function (options, type, data) {
            var _r = { BOCM: 5, BOE: 6, BORME: 8 }
            var _this = this
            //var type = this.type
            var iyear = data.desde.substr(0, 4)
            var imonth = data.desde.substr(4, 2)
            var iday = data.desde.substr(6, 2)
            var _DATE = new Date(imonth + "/" + iday + "/" + iyear)
            if (app.update == null) {
                if (iyear == app.anyo) { //data.hasta) {
                    options.type = type.toUpperCase()
                    options.Sumario = data.type.toUpperCase() + "-S-" + iyear + imonth + iday
                    //
                    //Punto en el que llama a analiza un sumario correspondiente a un dia, con multiples subdocumentos
                    //
                    _this.SQL.commands.Sumario.get(options, data, function (data) {
                        if (data._list.length > 0) {
                            data.e = 0
                            _this.parser(app).NEW(options, data, options.parser.Preceptos, function (data) {
                                options._common.SQL.commands.Sumario.update(options, data, function (options, data) {
                                    data.desde = data.SUMARIO_NEXT.substr(_r[type], 8)
                                    _this.Actualize(options, type, data)
                                })
                            })
                        } else {
                            options._common.SQL.commands.Sumario.update(options, data, function (options, data) {
                                data.desde = data.SUMARIO_NEXT.substr(_r[type], 8)
                                _this.Actualize(options, type, data)
                            })
                        }
                    })
                } else {
                    cadsql = "UPDATE lastread SET Read_Complete = 1 WHERE Type='" + type + "' AND Anyo = " + app.anyo
                    options.SQL.db.query(cadsql, function (err, record) {
                        console.log('obtención de datos ' + type + ' del año ' + app.anyo + ' terminó')
                        process.exit(0)
                    })
                }
            } else {
                cadsql = "SELECT Read_Complete,SUMARIO FROM boletin LEFT JOIN lastread on boletin.anyo=lastread.anyo AND boletin.type=lastread.type WHERE boletin.BOLETIN='" + app.update + "'"
                //cadsql = "SELECT * FROM boletin WHERE BOLETIN='" + app.update + "'"
                options.SQL.db.query(cadsql, function (err, record) {
                    if (record.length > 0){
                        if (record[0].Read_Complete = 1) {
                            debugger
                        } else {
                            console.log('el escrapeo ' + type + ' del año ' + app.anyo + ' no ha concluido')
                            process.exit(0)
                        }
                    } else {
                        console.log('documento ' + app.update + ' del año ' + app.anyo + ' no encontrado')
                        process.exit(0)
                    }
                })

            }
        }
    }
}