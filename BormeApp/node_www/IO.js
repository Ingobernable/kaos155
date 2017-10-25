module.exports = function (app) {

    return {

        listen: function (io, elasticIO) {
            var _this = this
            elasticIO.init(app, function (options) {
                _this.elasticIO = options
                io.on('connection', function (socket) {
                    console.log('IO Connect ' + socket.id)

                    //socket.on('elasticsearch', function (data) {
                    //    if (_this.elasticIO.socket == null && data.command == 'hello')
                    //        _this.elasticIO.socket = socket
                    //    _this.elasticIO.receive(data, socket)
                    
                    //})

                    socket.on('sqlLite', function (data) {
                        if (data == null)
                            debugger
                        //debugger
                        app.SQL[data.command](app, data, function (err, rows) {
                            data.rows = rows
                            data.error = err
                            //console.log(data, rows)
                            socket.emit('sqlLite', data)
                            //app.io.emit('total', { data: app._xData, rows: app.Sql.commands.getLsts() })
                        })
                    })
                    socket.on('BORME', function (data) {
                        if (data == null)
                            debugger
                        //debugger
                        app.SQL.BORME.io[data.command](data, function (err, rows) {
                            data.rows = rows
                            data.error = err
                            //console.log(data, rows)
                            socket.emit('BORME', data)
                        })
                    })
                    socket.on('BOE', function (data) {
                        if (data == null)
                            debugger

                        if (!app.semaforo.BOE) {
                            app.semaforo.BOE = true
                            app.SQL.BOE.io[data.command](data, function (err, rows) {
                                data.rows = rows
                                data.error = err
                                app.semaforo.BOE = false
                                socket.emit('BOE', data)
                            })
                        }
                    })

                    socket.on('BOCM', function (data) {
                        if (data == null)
                            debugger
                        if (!app.semaforo.BOCM) {
                            app.semaforo.BOCM = true
                            app.SQL.BOCM.io[data.command](data, function (err, rows) {
                                data.rows = rows
                                data.error = err
                                app.semaforo.BOCM = false
                                socket.emit('BOCM', data)
                            })
                        }
                    })
                    //return
                    socket.on('boe', function (data) {
                        if (data.command == 'Sumario') {
                            var iyear = data.desde.substr(0, 4)
                            var imonth = data.desde.substr(4, 2)
                            var iday = data.desde.substr(6, 2)
                            app.Boe.Sumario = data.type.toUpperCase() + "-S-" + iyear + imonth + iday

                            app.Sql.get.Sumario(app.Boe.Sumario, data, function (jsonData) {
                                socket.emit('boeSumario', jsonData)
                            })

                        }
                        if (data.command == 'Get') {
                            var boe = data._list[data.e]
                            var url = app.Boe.url + data.type.toLowerCase() + '/xml.php?id=' + boe
                            app.Boe.Search(app, url, data, function (data) {
                                socket.emit('boeGet', { id: boe, type: data.type, _list: data._list, e: data.e, Seccion: data.Seccion, codigo: jsonData.codigo, text: jsonData.text, analisis: jsonData.analisis })
                            })
                        }
                    })
                    socket.on('relaciones', function (iodata) {
                        //console.log('go', iodata)
                        //debugger
                        if (iodata.command == 'setmark') {
                            app.Relaciones.io()[iodata.command](iodata, socket)
                        } else {
                            if (iodata.command == 'saveTrama' || iodata.command == 'getTrama') {
                                app.Relaciones.io()[iodata.command](iodata, socket)
                            } else {
                                app.Relaciones.callOut(iodata, socket)
                            }
                        }

                    })
                    socket.on('app', function (iodata) {
                        console.log('app', iodata)


                        app.SQL.commands.getLstEmpresas(app, app.SQL.BORME.db, function (app, _this, data) {
                            var send = { Directivo: data.Directivo, Empresa: data.Empresa, data: app._xData, list: { tipo: [], tramite: [] } }
                            socket.emit('connected', send)
                        })


                    })

                   // app.SQL.commands.getLstEmpresas(app, app.SQL.BORME.db, function (app, _this, data) {
                   //     var send = { Directivo: data.Directivo, Empresa: data.Empresa, data: app._xData, list: { tipo: [], tramite: [] }, Tramas: data.trama }
                    socket.emit('connected', {})
                        //socket.emit('lst_cif', data)
                    //})
                    //}

                })
                io.on('disconnect', function (reason) {
                    debugger
                    console.log('disconnect', reason)
                })
            })
            return io
        }
    }
}