
var App = {
    urlBOE: 'http://81.89.32.200',
    treeRelations: [],
    selector: 'BOE',
    Trim: function (x) {
        return x.replace(/^\s+|\s+$/gm, '');
    },
    _xData: null,
    db: {
        push: function (array, rows, extra) {
            if (array != null) {
                array.splice(0)
                $(rows).each(function (i, item) {
                    if (extra != null)
                        item = extra(i, item)
                    array.push(item)
                })
            } else {
                debugger
            }
        }
    },

    form: function () {
        return {
            Type: $('#Empresa').prop('checked') ? 'Empresa' : $('#Persona').prop('checked') ? 'Persona' : 'Directivo',
            id: $('#visualId').attr('data-id')*1
        }
    },
    filters: function (_type) {
        if (_type == 'BOE') {
            var _tipo = []
            var _tramite = []
            $('.TBoe.checked').each(function (i, item) {
                if ($(item).attr('data') != null)
                    _tipo[_tipo.length] = $(item).attr('data-code')
            })
            var _tramite = []
            $('.Tramitacion.checked').each(function (i, item) {
                if ($(item).attr('data') != null)
                    _tramite[_tramite.length] = $(item).attr('data-code')
            })
            return { Tipo_BOE: _tipo, tramite: _tramite }
        }
        if (_type == 'BOCM') {
            var _tipo = []
            var _tramite = []
            //debugger
            $('.TipoBocm.checked').each(function (i, item) {
                if ($(item).attr('data-code') != null)
                    _tipo[_tipo.length] = $(item).attr('data-code')
            })
            var _tramite = []
            return { Tipo_BOCM: _tipo }
        }
        if (_type == 'BORME') {
            var _tipo = []
            var _tramite = []
            $('.TBorme.checked').each(function (i, item) {
                if ($(item).attr('data') != null)
                    _tipo[_tipo.length] = $(item).attr('data')
            })
            var _tramite = []
            return { Tipo_BORME: _tipo }
        }
    },


    Init: function (app) {

        localStorage.debug = 'none';
        clients = [['dev.bbdd.ovh', 'www.kaos155.com'], ['192.99.58.60', '164.132.43.153']]
        var host = clients[1][clients[0].indexOf(document.location.host)]
        //debugger
        if (host != null) {
            //console.log(document.location)
            app.ioresponses.listen(app,
                io.connect(host, {
                    reconnection: true,
                    reconnectionDelay: 1000,
                    reconnectionDelayMax: 5000,
                    reconnectionAttempts: 9999,
                    //rejectUnauthorized: false,
                    //transports: ['http','websocket'],
                    loglevel: 0
                })
            )
        }
        app.directives(app, Vue)

    }, _Data: {
        search: {
            BOE: {
                cadena: null,
                _list: []
            },
            BORME: {
                cadena: null,
                _list: []
            },
            BOCM: {
                cadena: null,
                _list: []
            }
        }
    },
    next: function ( app, n,  i) {
        var fx = app.treeSearch.split('#') //data.lst.split('#')
        
        //var _f = $('#' + f).parent().parent() //$(data.lst).parent().find('.content .item[data-pendiente="'+i+'"]')
        //debugger
        if (fx.length > 0) {
            //var fx = f
            //for (n in f) {
            //    var _f = $(".icon[data='" + f[n] + "']") //.parent().parent()
            //    var t = 0;
            //    for (t == 0;t < _f.length;t++){
            //        if (!$(_f[t]).hasClass('grey') && !$(_f[t]).hasClass('green')) {
            //          fx[fx.length] = f[n]  
            //        }
            //    }
            //}

            //for (n in fx) {
                var _f = $(".icon.ok[data='" + fx[n] + "']") //.parent().parent()
                var _fp = _f.parent().parent()
                //debugger
                if (!_f.hasClass('grey') && !_f.hasClass('green')) {
                    var _form = { i: n * 1, t: fx.length - 1, command: 'getRelationsAuto' }  // lst: data.lst, items: f
                    _form.Id = _f.attr('data').split('_')[1] * 1
                    _form.Type = _f.attr('data').split('_')[2] //*1
                    _form.tree = _f.attr('data-tree')
                    _form.level = i //(_f.attr('data-level') * 1) //+ 1
                    _form.step = (n*1) + 1
                    _form.steps = fx.length
                    //_form.te = fx.length

                    //_form.lst = data
                    //debugger
                    //concole.log()
                    app.socket.emit('relaciones', _form)
                }
            //}
            //$('.ui.button.play').removeClass('loading')
            //callback(data)
        } //else {
        //$('.ui.button.play').removeClass('loading')
        //var _l = $('.ui.list.visual_cif').attr('data-level-i') * 1
        //_l++
        //$('.ui.list.visual_cif').attr('data-level-i',_l )
        //}
        //$('.ui.button.play').removeClass('loading')
        //debugger
        //callback(data)
    },
    createNodeSave: function (app) {
        debugger
        var items = {
            tree: {},
            _id: { Empresa: [], Directivo: [] },
            _list: [],
            _name: [],
            _roles: [],
            itemToRecord: function (it) {
                var data = it.split("_")
                var record = {
                    Id: data[1],
                    Nodes: [],
                    Name: data[3],
                    Roles: data[4],
                    Type: data[2] == 'Empresa' ? 1 : 2,
                    PersonId: data[2] != 'Empresa' ? data[1] : 0,
                    CompanyId: data[2] == 'Empresa' ? data[1] : 0,
                }

                return record
                //debugger
            }, addInTree: function (path, newNode) {
                path = path.split("/")
                var _tree = this.tree
                //debugger
                $(path).each(function (i, _path) {
                    var __path = _path.split("_")
                    var _exit = false
                    var n = 0
                    while (!_exit) {
                        if (__path[1] == _tree.Nodes[n].Id) {
                            _tree = _tree.Nodes[n]
                            _exit = true
                        } else {
                            n++
                            if (n == _tree.Nodes.length)
                                _exit = true
                        }
                    }

                })
                _tree.Nodes[_tree.Nodes.length] = newNode
            }
        }

        $('#RelationsCard input:checked').each(function (i, item) {
            if ($(item).attr('data') != null) {
                var _d = $(item).attr('data').split("_")
                if (i == 0) {
                    _idTrama = _d[1]
                    _nameTrama = $(item).parent().find('span').html()
                }

                items._id[_d[2]][items._id[_d[2]].length] = {
                    Id: _d[1],
                    Name: $(item).parent().find('span').html(),
                    idTrama: _idTrama,
                    nameTrama: _nameTrama
                }


                items._name[items._name.length] = $(item).parent().find('span').html()
                items._roles[items._roles.length] = $(item).parent().find('span').attr('data-roles')
                items._list[items._list.length] = _d.join("_") + $(item).attr('data-tree')
            } else {
                debugger
            }
        })
        debugger
        $(items._list).each(function (i, it) {
            if (it.indexOf('//') > 0) {
                var data = items.itemToRecord(it.split("//")[0] + '_' + items._name[i] + '_' + items._roles[i])
                items.addInTree(it.split("//")[1], data)
                //debugger
            } else {
                //nodo Principal
                items.tree = { Nodes: [items.itemToRecord(it.split('/')[0] + '_' + items._name[i] + '_' + items._roles[i])] }
            }

        })
        debugger
        app.socket.emit('visual_cif', { command: 'saveTrama', idTrama: $('#IDTrama').val(), data: items.tree, _lst: items._id })
        return false
    }
}

