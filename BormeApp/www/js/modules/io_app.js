App.ioevents = ['Connecting', 'connected', 'sqlLite', 'BOE', 'BORME', 'BOCM', 'total', 'relaciones', 'total_cif', 'lst_cif', 'elasticsearch'],
App.ioresponses= {
    Connecting: function (app, data) {

    },
    connected: function (app, data) {
        if (data.data != null) {
            this.total(app, data)
            this.total_cif(app, { total: { Directivo: data.data.VisualCif.Directivo, Empresa: data.data.VisualCif.Empresa } })
            this.lst_cif(app, data)
        }
        //app.db.push(app.vueAppFramework.TSUMARIOS, [data.data.TSUMARIOS])
        //app.db.push(app.vueAppFramework.TBOE, [data.data.TBOE])
        //app.db.push(app.vueAppFramework.TLAST, [data.data.Sumario.SUMARIO_LAST])
        app.socket.emit('sqlLite', {
            command: 'getLsts',
            key: App.vueAppFramework.search.BOE.toLowerCase()
        })
    },
    elasticsearch: function (app, data, socket) {
        debugger
        socket.send('elasticsearch',data)
    },
    lst_cif: function (app, data) {
        //debugger
        if (data.Directivo != null)
            app.db.push(app.vueAppFramework.visual_cif._Ranking.Directivos, data.Directivo)
        if (data.Empresa != null) {
            app.db.push(app.vueAppFramework.visual_cif._Ranking.Empresas.BOE, data.Empresa.BOE)
            app.db.push(app.vueAppFramework.visual_cif._Ranking.Empresas.BOCM, data.Empresa.BOCM)
        }
        if (data.Tramas != null)
            app.db.push(app.vueAppFramework.visual_cif._TRAMAS, data.Tramas)
        // app.db.push(app.vueAppFramework.visual_cif._Ranking.Directivos, data.data.VisualCif.Ranking.Directivos)

    },
    total_cif: function (app, data) {
        //if (data.data != null) {
            if (data.total == null || app.vueAppFramework.visual_cif.total.Directivo == null)
                debugger
            app.db.push(app.vueAppFramework.visual_cif.total.Directivo, [data.total.Directivo])
            app.db.push(app.vueAppFramework.visual_cif.total.Empresa, [data.total.Empresa])
        //}
        //app.db.push(app.vueAppFramework.visual_cif._Ranking.Empresas, arr )
        //app.db.push(app.vueAppFramework.visual_cif._Ranking.Directivos, data.data.VisualCif.Ranking.Directivos)
    },
    total: function (app, data) {
        if (data.data != null) {
            app.db.push(app.vueAppFramework.TSUMARIOS, [data.data.TSUMARIOS])
            app.db.push(app.vueAppFramework.TBOE, [data.data.TBOE])
            app.db.push(app.vueAppFramework.TBORME, [data.data.TBORME])
            app.db.push(app.vueAppFramework.TBOCM, [data.data.TBOCM])
            app.db.push(app.vueAppFramework.SUMARIOS, [data.data.Sumario])
            //debugger

        }
        //app.db.push(app.vueAppFramework.TLAST, [data.data.Sumario.SUMARIO_LAST])
        //if (data.rows != null) {
        //    app.db.push(app.vueAppFramework.LTRAMITACION, data.rows.tramite)
        //    app.db.push(app.vueAppFramework.LTIPOBOE, data.rows.tipo)
        //}

        //debugger
    },
    relaciones: function (app, data,socket, callback) {
        //significado de colores iconos
        // negro ->sin cargar hijos
        // blue  ->cargadas dependencias
        // red   ->aparece la cadena de busqueda
        //
        if (data.command == 'setDataTree') {
            //var _parent = (data.level) + "_" + data.Id + "_" + data.Type
            //$('#' + _parent).find('content')

            if (app.treeRelations[data.level] == null)
                app.treeRelations[data.level] = []
            //var _kf = app.form()
            //app.tree.append(app, data, _kf)
            app.tree.printSingleNode(app, data.Nodes[0], data, function (data) {
                if (callback != null) {
                    callback(data)
                } else {
                    if (data.e==data.te && data.from == data.total) {
                        icon = $('.spinner.loading')
                        if (icon.length > 0)
                            icon.removeClass('spinner loading').addClass(icon.attr("type") + ' green')

                        $('.pause').parent().addClass('disabled')
                        $('.play').parent().removeClass('disabled').removeClass('loading')
                        $('.ui.list.visual_cif').attr('data-level-i', ($('.ui.list.visual_cif').attr('data-level-i') * 1)+1)
                    } else {
                        if (data.from == data.total) {
                            //_form = { level: ($('.ui.list.visual_cif').attr('data-level-i') * 1) }
                           // _form.lst = app.treeSearch //= app.treeRelations[_form.level - 1] //app.treeRelations //[_form.level]
                            //debugger
                            app.next(app, data.e, data.level) //, function () {
                            //    debugger
                            //    alert('acab?')
                            //})
                        }
                    }
                }
            })

        } else {
            if (data.command == "saveTrama") {

                if (data.error) {
                    $('.ui.modal').modal('show')
                    $('.ui.error.message').removeClass('hidden')
                } else {
                    $('.ui.modal').modal('hide')
                    $('.titTrama').html(data.newDoc.idTrama)
                    debugger
                }
            } else {
                if (data.error) {
                    console.log('ERROR', data)
                    data.iodata.type = data.iodata.type == 'Directivo' ? 'Persona' : 'Directivo'
                    app.socket.emit('go', data.iodata)

                    $('.pause').parent().addClass('disabled')
                    $('.play').parent().removeClass('disabled')
                } else {
                    if (data.command == "getEntramado") {
                        $('.titTrama').html('Entramado')
                        $('.visual-empresas').removeClass('loading')
                        app.db.push(app.vueAppFramework.visual_cif.Puertas.Entramado, data.Nodes.Nodes)
                    }
                    if (data.command == "getRelationsAuto") {
                        return true
                        //$('.spinTree_a').html("")
                        //setTimeout(function () { 
                        var _parent = (data.level) + "_" + data.Id + "_" + data.Type
                        $('#' + _parent).find('content')

                        if (app.treeRelations[data.level] == null)
                            app.treeRelations[data.level] = []
                        var _kf = app.form()
                        app.tree.append(app, data, _kf, function (data) {
                            if (data.last) {
                                icon = $('.spinner.loading')
                                if (icon.length > 0)
                                    icon.removeClass('spinner loading').addClass(icon.attr("type") + ' green')

                                $('.pause').parent().addClass('disabled')
                                $('.play').parent().removeClass('disabled').removeClass('loading')
                                //$('.spinTree').css({ visibility: 'hidden' })
                            } else {

                            }
                        })
                        //}, 500) 
                        //$('.spinTree').addClass('hide')
                        //, function (data) {
                        //    app.next(app, data, data.i++)
                        //})
                    } else {
                        if (data.command == "getRelations") {
                            //return
                            //if (app._Data.status == 'play') {
                            //debugger
                            icon = $('.spinner.loading')
                            if (icon.length > 0)
                                icon.removeClass('spinner loading').addClass(icon.attr("type") + ' green')

                            $('.pause').parent().addClass('disabled')
                            $('.play').parent().removeClass('disabled')
                            //debugger

                            //if (data.level > 0) {
                            //    if (data.level == 1)
                            //        app.treeRelations = []

                            //    app.treeRelations[data.level] = []
                            //for (i in data.Nodes) {
                            //    var _d = data.Nodes[i] //[data.level]
                            //    app.treeRelations[data.level].push(_d.Type + '_' + (_d.Type == 1 ? _d.CompanyId : _d.PersonId) + '_' + (_d.Type == 1 ? 'Empresa' : 'Directivo'))
                            //}
                            //}
                            if (callback != null)
                                callback(data)

                            var _kf = app.form()
                            app.tree.append(app, data, _kf, function (data) {
                                debugger
                                if (callback != null)
                                    callback(data)
                            })


                        }

                        if (data.command == "search") {
                            app.db.push(app.vueAppFramework.visual_cif._list, data.lst)
                            $('#lst-VisualCif').removeClass('loading')
                        }
                        if (data.command == "getTrama") {
                            var _level = 0
                            _form = { level: 0, Id: data.Trama.Nodes.Id, Type: data.Trama.Nodes.Type }
                            $('.ui.list.visual_trama').attr({ 'data-level-i': _form.level + 1, 'id': _form.level + '_' + _form.Id + '_' + _form.Type }).html('')
                            data.Trama.Nodes.level = _level
                            //debugger
                            var kf = {
                                Type: _form.Type == 1 ? 'Empresa' : 'Directivo',
                                id: _form.Id
                            }
                            data.Trama.Titular = data.Trama.Nodes.Titular = data.Trama.Nodes.Name
                            data.Trama.Type = data.Trama.Nodes.Type
                            data.Trama.Id = data.Trama.Nodes.Id
                            data.Trama.level = 0

                            app.tree.append(app, data.Trama, kf, function (data) {
                                debugger
                                app.tree.recorre.ejec(data.Nodes.Nodes, 1, null, function (obj, level, parent) {
                                    app.tree.printSingleNode(app, obj, parent == null ? { level: 0 } : parent)
                                    console.log('visitant', obj.Name, level, parent);
                                })
                            })






                            return

                            debugger
                            return
                            var addnodetotree = function (app, data, kf, callback) {
                                app.tree.append(app, data, kf, function (data) {
                                    if (callback != null)
                                        callback(app, data, kf, callbacknodeadd)
                                })
                            }
                            var callbacknodeadd = function (app, data, kf, callbacknodeadd) {
                                debugger
                                var _exit = false

                                var _data = data // data.level>0 ? data.Nodes: data.Nodes.Nodes
                                while (!_exit) {
                                    for (i = 0; i < data.level - 1; i++) {
                                        _data = _data.Nodes
                                        if (_data == null)
                                            _exit = true
                                    }
                                    if (!_exit) {
                                        _data.Nodes.level = data.level
                                        addnodetotree(app, _data.Nodes, kf)
                                        //_data.level = data.level + 1
                                        //for (p in _data) {
                                        ///    _data[p].level = data.level - 1
                                        //    addnodetotree(app, _data[p], kf)
                                        //}
                                    }
                                }
                            }
                            //data.Trama.Nodes.level=0
                            addnodetotree(app, data.Trama, kf, callbacknodeadd)
                            //alert(data.Trama)
                            //debugger
                            //app.db.push(app.vueAppFramework.visual_cif._list, data.lst)
                            //$('#lst-VisualCif').removeClass('loading')

                        }
                    }
                    //debugger

                }
            }
        }
        //if (callback != null)
        //    callback(data)

    },
    BOE: function (app, data) {
        this.cursor_off()
        if (data.command == 'ListTipoBoe') {
            app.db.push(app.vueAppFramework.LTIPOBOE, data.rows)
            //$('.ui.teal.label').html(data.rows[0]['count(*)'])
        }
        if (data.command == 'count') {
            //debugger
            if (data.rows != null) {
                app.db.push(app.vueAppFramework.LTRAMITACION, data.rows.lsts.tramite)
                app.db.push(app.vueAppFramework.LTIPOBOE, data.rows.lsts.tipo)
            }
            if (data.rows.data != null) {
                $('.ui.teal.label.BOE').html(data.rows.data[0]['count(*)'])
            } else {
                $('.ui.teal.label.BOE').html(0)
            }
        }
        if (data.command == 'get') {
            //var  query=$('input[name="Find"]').val()
            //$(data.rows).each(function (i,item) {
            //    data.rows[i].razonsocial = data.rows[i].razonsocial.replace(query, '<span class=\'highlight\'>' + query + '</span>')
            //})
            //app.db.push(app.vueAppFramework.contratistas, data.rows)
            app.vueAppFramework.ANYOS.BOE.splice(0, app.vueAppFramework.ANYOS.BOE.length)
            app.vueAppFramework.SELECT_ANYOS.BOE.splice(0, app.vueAppFramework.SELECT_ANYOS.BOE.length)
            app.db.push(app.vueAppFramework.BOE,
                data.rows,
                function (i, item) {
                    AnyoBoe = item.BOE.substr(6, 4)
                    if (app.vueAppFramework.ANYOS.BOE.indexOf(AnyoBoe) == -1) {
                        app.vueAppFramework.ANYOS.BOE.push(AnyoBoe)
                        app.vueAppFramework.SELECT_ANYOS.BOE.push(AnyoBoe)
                    }
                    return item
                }
            )
            app.vueAppFramework.BOEFILE.splice(0, app.vueAppFramework.BOEFILE.length)
            //$('.ui.teal.label').html(data.rows.length)

        }
        if (data.command == 'listaBoe') {
            debugger
            app.vueAppFramework.ANYOS.BOE.splice(0, app.vueAppFramework.ANYOS.BOE.length)
            app.vueAppFramework.SELECT_ANYOS.BOE.splice(0, app.vueAppFramework.SELECT_ANYOS.BOE.length)
            app.db.push(app.vueAppFramework.BOE,
                data.rows,
                function (app, i, item) {
                    debugger
                    if (app.vueAppFramework.ANYOS.BOE.indexOf(item.BOE.substr(7, 4)) == -1) {
                        app.vueAppFramework.ANYOS.BOE.push(item.BOE.substr(7, 4))
                        app.vueAppFramework.SELECT_ANYOS.BOE.push(item.BOE.substr(7, 4))
                    }
                    return item
                })

            //debugger
        }
        if (data.command == 'getDoc') {

            var arr = []
            var key = 0
            var boe = data.rows[0].TEXTO.replace('. c) ', '.<br>c) ').split("<br>")
            $(boe).each(function (i, item) {

                if ($.isNumeric(item.substr(0, 1))) {
                    key = (item.substr(0, 1) * 1) - 1
                    arr[key] = { text: item, subitems: [] }
                } else {
                    arr[key].subitems[arr[key].subitems.length] = { key: item.split(':')[0], text: item.split(':')[1] }
                }
            })
            //debugger
            app.db.push(app.vueAppFramework.BOEFILE, data.rows)
            app.db.push(app.vueAppFramework.BOETEXT, arr)
            //app.db.push(app.vueAppFramework.BOEFILE, data.rows)

            //debugger
        }
    },
    BORME: function (app, data) {
        this.cursor_off()
        //if (data.command == 'ListTipoBoe') {
        //    app.db.push(app.vueAppFramework.LTIPOBOE, data.rows)
        //$('.ui.teal.label').html(data.rows[0]['count(*)'])
        //}
        if (data.command == 'count') {
            //debugger
            //if (data.rows != null) {
            //    app.db.push(app.vueAppFramework.LTRAMITACION, data.rows.lsts.tramite)
            //    app.db.push(app.vueAppFramework.LTIPOBOE, data.rows.lsts.tipo)
            //}
            if (data.rows.data != null) {
                $('.ui.teal.label.BORME').html(data.rows.data[0]['count(*)'])
            } else {
                $('.ui.teal.label.BORME').html(0)
            }
        }
        if (data.command == 'get') {
            //var  query=$('input[name="Find"]').val()
            //$(data.rows).each(function (i,item) {
            //    data.rows[i].razonsocial = data.rows[i].razonsocial.replace(query, '<span class=\'highlight\'>' + query + '</span>')
            //})
            //app.db.push(app.vueAppFramework.contratistas, data.rows)

            debugger
            app.vueAppFramework.ANYOS.BORME.splice(0, app.vueAppFramework.ANYOS.BORME.length)
            app.vueAppFramework.SELECT_ANYOS.BORME.splice(0, app.vueAppFramework.SELECT_ANYOS.BORME.length)
            app.db.push(app.vueAppFramework.BORME,
                data.rows,
                function (i, item) {
                    AnyoBorme = item.BORME.substr(8, 4)
                    if (app.vueAppFramework.ANYOS.BORME.indexOf(AnyoBorme) == -1) {
                        app.vueAppFramework.ANYOS.BORME.push(AnyoBorme)
                        app.vueAppFramework.SELECT_ANYOS.BORME.push(AnyoBorme)
                    }
                    //var _pos = JSON.parse(item._extract)
                    //item.TEXTO = item.TEXTO.substr(_pos[0].p, item.TEXTO.length - _pos[0].p)
                    //item.TEXTO = item.TEXTO.substr(0, _pos[_pos.length - 1].p - _pos[0].p)
                    return item
                }
            )
            app.vueAppFramework.BORMEFILE.splice(0, app.vueAppFramework.BORMEFILE.length)
            //$('.ui.teal.label').html(data.rows.length)

        }
        if (data.command == 'listaBorme') {
            debugger
            app.vueAppFramework.ANYOS.splice(0, app.vueAppFramework.ANYOS.length)
            app.vueAppFramework.SELECT_ANYOS.splice(0, app.vueAppFramework.SELECT_ANYOS.length)
            app.db.push(app.vueAppFramework.BOE,
                data.rows,
                function (app, i, item) {
                    debugger
                    if (app.vueAppFramework.ANYOS.indexOf(item.BOE.substr(7, 4)) == -1) {
                        app.vueAppFramework.ANYOS.push(item.BOE.substr(7, 4))
                        app.vueAppFramework.SELECT_ANYOS.push(item.BOE.substr(7, 4))
                    }
                })

            //debugger
        }
        if (data.command == 'getDoc') {

            var arr = []
            var key = 0
            var text = data.rows[0].TEXTO //.replace('. c) ', '.<br>c) ').split("<br>")

            debugger
            app.db.push(app.vueAppFramework.BORMEFILE, data.rows)
            app.db.push(app.vueAppFramework.BORMETEXT, [text])

            $('#bormepdf').attr('src', '/js/proxy.jsx?url=' + app.urlBOE + data.rows[0].PDF)

            //app.db.push(app.vueAppFramework.BOEFILE, data.rows)

            //debugger
        }
    },
    BOCM: function (app, data) {
        this.cursor_off()
        if (data.command == 'count') {
            //debugger
            //debugger
            if (data.rows != null) {
                //    app.db.push(app.vueAppFramework.LTRAMITACION, data.rows.lsts.tramite)
                app.db.push(app.vueAppFramework.LTIPOBOCM, data.rows.lsts.BOCM)
            }
            if (data.rows.data != null) {
                $('.ui.teal.label.BOCM').html(data.rows.data[0]['count(*)'])
            } else {
                $('.ui.teal.label.BOCM').html(0)
            }
        }
        if (data.command == 'get') {
            //var  query=$('input[name="Find"]').val()
            //$(data.rows).each(function (i,item) {
            //    data.rows[i].razonsocial = data.rows[i].razonsocial.replace(query, '<span class=\'highlight\'>' + query + '</span>')
            //})
            //app.db.push(app.vueAppFramework.contratistas, data.rows)
            app.vueAppFramework.ANYOS.BOCM.splice(0, app.vueAppFramework.ANYOS.BOCM.length)
            app.vueAppFramework.SELECT_ANYOS.BOCM.splice(0, app.vueAppFramework.SELECT_ANYOS.BOCM.length)
            app.db.push(app.vueAppFramework.BOCM,
                data.rows,
                function (i, item) {
                    AnyoBocm = item.BOCM.substr(5, 4)
                    if (app.vueAppFramework.ANYOS.BOCM.indexOf(AnyoBocm) == -1) {
                        app.vueAppFramework.ANYOS.BOCM.push(AnyoBocm)
                        app.vueAppFramework.SELECT_ANYOS.BOCM.push(AnyoBocm)
                    }
                    return item
                }
            )
            app.vueAppFramework.BOCMFILE.splice(0, app.vueAppFramework.BOCMFILE.length)
            //$('.ui.teal.label').html(data.rows.length)

        }
    },
    sqlLite: function (app, data) {
        this.cursor_off()
        if (data.command == 'getLsts') {
            //debugger
            this.total(app,data.rows)
            app.db.push(app.vueAppFramework.LTRAMITACION, data.rows.tramite)
            app.db.push(app.vueAppFramework.LTIPOBOE, data.rows.tipo)
            app.db.push(app.vueAppFramework.LTIPOBOCM, data.rows.BOCM)

        }
    },
    cursor_off: function () {
        $('.loading').removeClass('loading')
        $('.GO').removeClass('notched circle')
        return
    },
    listen: function (app, socket) {
        app.socket = socket
        app.socket.firstConnect = true
        app.socket.on('connect', function () {
            //debugger

            //if (app.socket.firstConnect) {
                $(app.ioevents).each(function (i, item) {
                    console.log(item)
                    app.socket.on(item, function (data) {
                        console.log('(' + i + ')receive event:' + app.ioevents[i], data)
                        if (app.ioresponses[app.ioevents[i]] != null) {
                            app.ioresponses[app.ioevents[i]](app, data, socket);
                        }
                    })

                })

            //} else {
            //    app.socket.emit('app', {})
           // }

            app.socket.firstConnect = false

        })
        app.socket.on('reconnecting', function (delay, attempt) {
            console.log('reconnecting to server ' + delay);
        });
        app.socket.on('disconnect', function (err) {
            console.log('disconnected to server');
        });
    }
}