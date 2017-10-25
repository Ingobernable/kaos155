App.tree = {
    recorre: {
        ejec: function (x, level, parent, printer) {

            if (this.isArray(x)) {
                this.Array(x, level, parent, printer);
            } else if ((typeof x === 'object') && (x !== null)) {
                this.Object(x, level, parent, printer);
            } else {
                // tipus primitiu
            }
        },
        isArray: function (o) {
            return Object.prototype.toString.call(o) === '[object Array]';
        },
        Array: function (arr, level, parent, printer) {
            var _this = this
            arr.forEach(function (x) {
                _this.ejec(x, level, parent, printer);
            });
            //console.log(level + "<array>");
        },
        Object: function (obj, level, parent, printer) {
            //console.log(level + "<object>");
            //var _this = this

            if (printer != null)
                printer(obj, level, parent)

            if (obj.Nodes) {
                level++
                parent = obj
            }
            this.ejec(obj.Nodes, level, parent, printer);
        }
    },
    printSingleNode: function (app, item, data, callback) {

        if (data.level > 0) {
            //debugger
            var _parent = (data.level - 1) + "_" + data.Id + "_" + data.Type
            var htmlParent = $('input[data="' + _parent + '"]')
            var _tree = htmlParent.attr('data-tree') + '/' + _parent

        } else {
            var _tree = "/"
            var _parent = "0_" + item.Id + "_" + item.Type
            
        }

        var iconE = $('<i class="industry icon ok" type="industry">')
        var iconP = $('<i class="spy icon ok" type="spy">')
        var iconD = $('<i class="diamond icon ok" type="diamond">')

        var content = $('<div class="content">')
        var header = $('<div class="header" style="width:100%">')
        var description = $('<div class="description">')

        var _item = $('<div class="item">') //.attr('id' , item.Type==1 ? item.CompanyId: item.PersonId )
        var _icon = item.Type == 1 ? iconE.clone() : item.Type == 2 ? iconP.clone() : iconD.clone()
        var _content = content.clone()
        var _header = header.clone()
        var _description = description.clone()
        var _descriptionBOE = $('<span class="visualboe" style="float:right;font-size:0.6em">').clone()
        var _checkbox = $('<input type="checkbox" style="width:10px">')
        var _defId = (item.Type == 1 ? item.CompanyId : item.PersonId) + "_" + (item.Type == 1 ? 'Empresa' : 'Directivo')
        var _locId = (data.level + "_") + _defId
        var _locNextId = (data.level + 1 + "_") + _defId
        //*if (app.treeRelations == null)
        //var _list = $('<div class="list transition">').attr({ 'id': _locId })

        var _list = $('<div class="list transition">').attr({ 'id': _locNextId, 'data-parent': _parent })
        //var parent = $('[data="' + (data.level - 2) + "_" + (item.Type == 1 ? item.CompanyId : item.PersonId) + '_' + (item.Type == 1 ? 'Empresa' : 'Directivo') + '"]')

        _descriptionBOE.html('BOE:').attr({ 'data': _locId })

        if ($('[data-key="' + _defId + '"]').length == 0 && item.JuridicId == 0 && item.ActiveRelations<5000) {

            _icon.click(function () {
                if ($("#" + $(this).attr("data")).children().length == 0) {
                    var _i = $(this).attr('type')

                    $(this).removeClass(_i).addClass('spinner loading')

                    var _data = $(this).attr("data").split("_")
                    var x = _form
                    //debugger
                    var _form = { command: 'getRelations', Id: _data[1], level: _data[0], tree: _formKeys.tree, Type: _data[2] } // == 1 ? 'Empresa' : 'Directivo' }
                    //debugger
                    app.socket.emit('visual_cif', _form)
                } else {
                    if ($(this).parent().parent().find('.content .list').hasClass('hidden')) {
                        $(this).parent().parent().find('.content .list').removeClass("hidden")

                    } else {
                        $(this).parent().parent().find('.content .list').addClass("hidden")
                    }
                }
                //$("#" + $(this).attr("data")).transition('swing right')
            }).attr({ 'data': _locId, 'data-parent': _parent, 'data-key': _defId, 'data-level': data.level, 'data-tree': _tree })

            _checkbox.attr({ 'data': _locId })
                .attr({ 'data-tree': _tree })
                .attr({ 'data-parent': _parent })
                .click(function (event) {
                if ($(this).attr('checked') != null) {
                    $(this).removeAttr('checked')
                } else {
                    $(this).attr('checked', 'checked')
                    //alert($(this).parent().attr("data"))
                    //var _l = ($(this).parent().parent().parent().find('i').attr("data").split("_")[0] * 1) - 1
                    var _Path = $(this).attr('data-tree').split('//')[1].split("/")

                    $(_Path).each(function (i, item) {
                        $('input[data="' + item + '"]').attr('checked', 'checked')
                    })


                    if ($('#RelationsCard input:checked').length > 0) {
                        $('[data-tab="tercero"] .input.inline .save').parent().removeClass('disabled')
                    } else {
                        $('[data-tab="tercero"] .input.inline .save').parent().addClass('disabled')
                    }
                    //debugger
                }
                event.stopPropagation();
            })
            //console.log(item.Mark)

            if (app.treeRelations[data.level] == null)
                app.treeRelations[data.level] = ""

            app.treeRelations[data.level] = app.treeRelations[data.level] + (app.treeRelations[data.level].length > 0 ? '#' : '') + _locId



        } else {
            _icon.attr({ 'data': _locId }).removeClass("ok").addClass("grey")
            //_item
            _checkbox.attr('disabled', 'disabled')
        }

        if (item.Mark == "1") {
            //debugger
            var _Path = _tree.split('//')[1].split("/")
            $(_Path).each(function (i, item) {
                var _content = $('input[data="' + item + '"]').attr('checked', 'checked').parent()
                //_content.find("i").removeClass("grey").css('color', '#641E16')
                //_content.find('.header').css('color', '#641E16')
                //_content.find('.description ').css('color', '#EE82EE')
            })

            _checkbox.attr('checked', 'checked')
            _icon.removeClass("grey").addClass("red")

            //_header.css('color', 'red')
            //_content.css('color', '#EE82EE')
            //_description.css('color', '#EE82EE')
        }

        _header.append(_checkbox).append($('<span>').attr('data-roles', item.Roles).html(item.Name))
        //console.log(item.Name.toUpperCase(),_form.nombre.toUpperCase(), item.Name.toUpperCase().indexOf(_form.nombre.toUpperCase()) )

        //if (item.Name.toUpperCase().indexOf(_form.nombre.toUpperCase()) > -1) {
        //    _header.css({ color: 'red' })
        //    _description.css({ color: 'red' })
        //    _icon.css({ color: 'red' })
        //    $('[data="' + (data.level - 1) + "_" + data.Id + '"]').addClass('red')
        //console.log('[data="' + (data.level-1) + "_" + data.Id + '"]', _form.nombre.toUpperCase(), item )
        //}
        _description.html(item.Roles)
        if (item.BOE != null)
            if (item.BOE > 0)
                _description.append($('<span style="color:blue;font-size:0.8em;">').html('boe:' + item.BOE))

        if (item.BOCM != null)
            if (item.BOCM > 0)
                _description.append($('<span style="color:green;font-size:0.8em;">').html('bocm:' + item.BOCM))

        //if (item.BOE > 0 || item.BOCM > 0)
        //    debugger


        _content.append(_header).append(_description).append(_list)
        _item.append(_icon).append(_content)

        //debugger

        var _key = (data.level) + "_" + data.Id + '_' + data.Type
        var _icon = $('#' + _key).parent().parent().find('i[data="' + (data.level - 1) + "_" + data.Id + '_' + data.Type + '"]')
        if (_icon != null)
            _icon.removeClass('spinner loading').removeClass('ok').addClass(_icon.attr("type") + ' green')
        $('#' + _key).append(_item) //.parent().parent().find('i[data="' + (data.level - 1) + "_" + data.Id + '_' + data.Type+'"]')

        if (callback != null)
            callback(data)
    },
    append: function (app, data, _formKeys, callback) {
        var _ok = true
        var _this = this

        //setTimeout(function(){
            if (data.Nodes.length > 500) {
                _ok = false
                //if(data.Nodes.length<4000)
                if (confirm('La consulta contiene ' + data.Nodes.length + 'y son demasiados, deseas continuar, bajo tu propio riesgo?')) {
                    _ok = true
                }
            }
            if (_ok) {

                var _parent = (data.level) + "_" + data.Id + "_" + data.Type
                var _tree = "/"

                if (data.level == 0) {
                    app._Data.tree = { Id: data.Id, Type: data.Type == 'Empresa' ? 1 : 2, Name: data.Titular, Nodes: [] }
                    //app.grapf.root = app.grapf.createBaseGraph( app._Data.tree );
                }

                _formKeys.tree = data.tree



                var printeachNodes = function (data, printeachNodes, callback) {
                    //var to = setInterval(function () {
                        var _el = $('.spinTree_a').html().split(".").length - 1
                        console.log(_el, data.Nodes.length)
                        if (_el >= data.Nodes.length && !data.exclude) {
                            $('.spinTree').css({ visibility: 'hidden' })
                            //clearInterval(to);
                            callback(data)
                        } else {
                            setTimeout(function () {
                                $('.spinTree_a').html($('.spinTree_a').html() + ". ")
                                var item = data.Nodes[_el]
                                console.log(_el, item)
                                var item = data.Nodes[_el]
                                _this.printSingleNode(app, item, data, function (data) {
                                    printeachNodes(data, printeachNodes, callback)
                                })
                            }, 1000)
                        }
                    
                    
                }

                $('.spinTree').css({ visibility: 'visible' })
                $('.spinTree_a').html('')
                //
                    printeachNodes(data, printeachNodes, function (data) {
                        data.level++
                        $('.ui.list.visual_cif').attr('data-level-i', data.level)
                        if (callback != null)
                            callback(data)

                        $('.spinTree').css({ visibility: 'hidden' })
                    })
                //}, 100)

                
                    
                    //$(data.Nodes).each(function (i, item) {

                        //var parent = $('[data="' + (data.level - 1) + "_" + (item.Type == 1 ? item.CompanyId : item.PersonId) + '_' + (item.Type == 1 ? 'Empresa' : 'Directivo') + '"]')
                        //console.log(parent)

                    //})
                
                
            }
        //},50)
        //$('.spinTree').addClass('hide')
    }
}