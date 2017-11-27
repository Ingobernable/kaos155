module.exports = function (app, drop, callback) {

    return {

        SQL: {
            commands: {
                Sumario: {
                    SetScrapLabel: function (options, data, callback) {
                        app.commonSQL.SQL.commands.update.ScrapLabel(options, data, function (err, rows) {
                            callback(data)
                        })
                    },
                    insert: function (options, data, callback) {
                        var next = data.SUMARIO_NEXT
                        if (data._analisis == null) {
                            if (data._list[data.e][data.type] == null) {
                                var _boletin = data._list[data.e].split("=")[1]
                            } else {
                                var _boletin = data._list[data.e][data.type].split("=")[1]
                            }
                        } else {
                            if (data._analisis[data.e]==null)
                                debugger

                            var _boletin = data._analisis[data.e][data.type] == null ? data._list[data.e].split("=")[1] : data._analisis[data.e][data.type]
                        }
                        if (data._list.length > 0) {

                            app.commonSQL.SQL.commands.select.Sumario(options, _boletin, function(err,rows) {
                                if (err) {
                                    console.log(err, sumariosql)
                                    debugger
                                }
                                if (rows != null) {
                                    if (rows.length == 0) {
                                        app.commonSQL.SQL.commands.insert.Sumario(options, data.id, _boletin, function () {
                                            callback(data)
                                        })
                                    } else {
                                        if (rows[0].scrap == 1) {
                                            process.stdout.write('#')
                                            callback(data, true)
                                        } else {
                                            process.stdout.write('%')
                                            callback(data)
                                        }

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

                        var url = options.url + 'diario_' + data.type.toLowerCase() + '/xml.php?id=' + Sumario
                        if (options.type == "BOCM")
                            if (Sumario.indexOf("-S-") == -1) {
                                var url = options.url + '_Boletin_BOCM/' + Sumario.substr(5, 4) + "/" + Sumario.substr(9, 2) + "/" + Sumario.substr(11, 2) + "/" + Sumario + ".PDF"
                            } else {
                                var url = options.url + '_Boletin_BOCM/' + Sumario.substr(7, 4) + "/" + Sumario.substr(11, 2) + "/" + Sumario.substr(13, 2) + "/" + options.type + Sumario.substr(6, 9) + ".PDF"
                            }
                        //
                        //Cargamos y analizamos las secciones con el parseador concreto de cada TYPE de documento
                        //BOE,BOCM,BORME......etc
                        // si el campo STOP estuviera a 1
                        //salimos del proceso

                        cadsql = "SELECT STOP FROM LastRead WHERE Type='" + options.type + "' AND anyo = " + Sumario.substr(5, 4)
                        options.SQL.db.query(cadsql, function (err, record) {
                            if (record[0].STOP == 0) {
                                options.scrap.Secciones(options, { encoding: null, method: "GET", uri: url, agent: false }, data, function (jsonData, repeat) {
                                    callback(data, repeat)
                                })
                            } else {
                                cadsql = "UPDATE LastRead set STOP=0 WHERE Type='" + options.type + "' AND anyo = " + Sumario.substr(5, 4)
                                options.SQL.db.query(cadsql, function (err,record) {
                                    console.log('proceso obligado a parar')
                                    process.exit(1)
                                })
                            }
                        })


                        
                    },
                    update: function (options, data, callback) {
                        app._xData.Sumario[options.type] = {
                            SUMARIO_LAST: data.SUMARIO_LAST,
                            SUMARIO_NEXT: data.SUMARIO_NEXT
                        }
                        app.commonSQL.SQL.commands.update.lastRead(options, data, function () {
                            callback()
                        })

                    }
                }
            }
        },
        parser: function (app) {
            var _this = this
            return {
                NEW: function (options, data, analizer, callback) {
                    var __this = this
                    _this.SQL.commands.Sumario.insert(options, data, function (data, isrepeat) {
                        if (!isrepeat) {
                            if (data._analisis != null) {
                                var turl = data._analisis[data.e].pdf != null ? data._analisis[data.e].pdf : data._list[data.e] //: //.split("/")
                            } else {
                                var turl = data._list[data.e]
                            }
                            __this.Search(options, turl, data, analizer, function (data, repeat, fail) {
                                if (fail) {
                                    _this.SQL.commands.Sumario.SetScrapLabel(options, data, function (data) {
                                        if (data.e < data._list.length - 1) {
                                            data.e++
                                            __this.NEW(options, data, analizer, callback)
                                        } else {
                                            callback(data)
                                        }
                                    })
                                } else {
                                    if (data.e < data._list.length - 1) {
                                        if (!repeat) {
                                            data.e++
                                        }
                                        __this.NEW(options, data, analizer, callback)

                                    } else {
                                        callback(data)
                                    }
                                }
                                //})
                            })
                        } else { 
                            if (data.e < data._list.length - 1) {
                               data.e++
                                __this.NEW(options, data, analizer, callback)
                            } else {
                                callback(data)
                            }
                        }
                    })
                },
                Search: function (options, doc, sdata, analizer, callback) {
                    if (doc[options.type] != null)
                        doc = [options.type]

                    app.Rutines(app).askToServer(options, { encoding: null, method: "GET", uri: options.url + doc }, sdata, function (options, body, data) {
                        analizer(options, doc, body, data, callback)
                    })
                }
            }
        },
        Actualize: function ( options, type, data, callback) {
            var _this = this
            if (options.Command == app.Commands[0]) {
                var iyear = data.desde.substr(0, 4)
                var imonth = data.desde.substr(4, 2)
                var iday = data.desde.substr(6, 2)
                var _DATE = new Date(imonth + "/" + iday + "/" + iyear)
                if (app.update == null) {
                    if (iyear == app.anyo) { 
                        options.type = type.toUpperCase()
                        options.Sumario = data.type.toUpperCase() + "-" + (type != "BOCM" ? "S-" : "") + iyear + imonth + iday
                        //
                        //Punto en el que llama a analiza un sumario correspondiente a un dia, con multiples subdocumentos
                        //
                        _this.SQL.commands.Sumario.get(options, data, function (data) {
                            if (data._list.length > 0) {
                                data.e = 0
                                _this.parser(app).NEW(options, data, options.scrap.Preceptos, function (data) {
                                    options._common.SQL.commands.Sumario.update(options, data, function () {
                                        data.desde = data.SUMARIO_NEXT.substr(app._lb[type], 8)
                                        _this.Actualize(options, type, data)
                                    })
                                })
                            } else {
                                options._common.SQL.commands.Sumario.update(options, data, function () {
                                    data.desde = data.SUMARIO_NEXT.substr(app._lb[type], 8)
                                    _this.Actualize(options, type, data)
                                })
                            }
                        })
                    } else {
                        cadsql = "UPDATE lastread SET Read_Complete = 1 WHERE Type='" + type + "' AND Anyo = " + app.anyo
                        options.SQL.db.query(cadsql, function (err, record) {
                            cadsql = "UPDATE anyosread SET " + options.Command.toLowerCase() + " = 1 WHERE Type='" + options.Type + "' AND Anyo = " + app.anyo
                            options.SQL.db.query(cadsql, function (err, record) {
                                console.log('obtención de datos ' + type + ' del año ' + app.anyo + ' terminó')
                                process.exit(0)
                            })
                        })
                    }
                } else {
                    cadsql = "SELECT Read_Complete,SUMARIO FROM boletin LEFT JOIN lastread on boletin.anyo=lastread.anyo AND boletin.type=lastread.type WHERE boletin.BOLETIN='" + app.update + "'"
                    options.SQL.db.query(cadsql, function (err, record) {
                        if (record.length > 0) {
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
            } else {
                options.parser.Preceptos(type)
            }
        }
    }
}