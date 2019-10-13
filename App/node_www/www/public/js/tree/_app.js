//debugger
App = function () {
    $('#graph_container').css('height',window.innerHeight-95+'px')
    return {
        root: window.graph,
        links: [[]],
        level: 0,
        vue: {
            objects: {},
            init: function (app) {
                Vue.component('list-item-search', {
                    props: ['List'],
                    template: '<div class="item" v-bind:data=List._key v-on:click=click(event)><i v-bind:class=icon(List)></i><div class="content">{{List.Nombre}}</div></div>',
                    methods: {
                        icon: function (item) {
                            return item._Empresa == 1 ? 'factory icon' : item._Directivo ? 'user icon' : item._Auditor ? 'Building icon' : 'Diamond icon'
                        },
                        click: function (_ev) {
                            $('#cleaner').addClass('hidden')
                            $('#next').addClass('hidden')
                            $('#panelSearch .item.selected').removeClass('selected')
                            $(_ev.currentTarget).addClass('selected')
                            $('#search').addClass('selected').attr({ 'data': $(_ev.currentTarget).attr("data") }).val($(_ev.currentTarget).find('.content').html())
                            $('#panelSearch').hide()
                            $('#Search').find('.icon.go').parent().addClass('loading')

                            //app.Framework.PanelSearch.actions.go($('#search'), function (data) {
                            //    $('#links').html('')
                            //    $('#nodes').html('')
                            //    $('#text').html('')

                            //    $('#Search').find('.icon.go').parent().removeClass('loading')
                                
                            //    $('#next').removeClass('hidden')
                                //debugger

                            //})
                            
                        }
                    }
                })
                app.vue.objects.search = new Vue({
                    el: '#panelSearch',
                    data: {
                        SearchList: []
                    }
                })
            },
            fill: function (key, obj, data) {
                var arr = this.objects[key]._data[obj]
                arr.splice(0, arr.length)
                for (n in data) {
                    arr.push(data[n])
                }
            }
        },
        Framework: {
            PanelSearch: {
                actions: {
                    go: function ($obj, callback) {
                        debugger
                        var t = $('#Search .checkbox.checked').find('input') // $('input[name="typeSearch"][checked="checked"]')
                        if (t.attr("data").length > 1 && $obj.attr('data') != null) {
                            //$('#panelSearch').addClass('loading').show()
                            $('#stateAsk').val( (t.attr("data") == 'Empresa' ? 0 : 1) )
                            var url = '/relations/' + $('#stateAsk').val() + '/' + $obj.attr('data') //+ '/' + $('#parent').val()
                            $.getJSON(url , function (data, sucess) {
                                callback(data)
                            })
                        }
                    },
                    find: function ($obj, callback) {
                        var t = $('#Search .checkbox.checked').find('input') // $('input[name="typeSearch"][checked="checked"]')
                        if ($obj.val().replaceAll(" ", "-").length > 1) {
                            $('#panelSearch').addClass('loading').show()
                            $.getJSON('/search/' + t.attr("data") + "/" + $obj.val().replaceAll(" ", "-"), function (data, sucess) {
                                callback(data)
                            })
                        }
                    },
                    clearData: function ($obj, del ) {
                        $('#search').removeClass('selected').removeAttr('data', '').parent().find('i').addClass('disabled')
                        if(del)
                            $('#search').val('')

                        $('#search').focus()
                        setTimeout(function(){
                            document.getElementById("search").focus(); //.parent().addClass('focus')
                        },100)
                    },
                    oldTree: function () {
                        App.root.prepare(3)
                        App.root.createBaseGraph(data, function (LastLoad, _parentData) {
                            //debugger
                            if (App.links[App.level] == null)
                                App.links[App.level] = []
                            //debugger
                            if (_.isArray(LastLoad)) {

                                var _diff = App.level > 1 ? _.differenceBy(LastLoad, App.links[App.level - 2], 'Id') : LastLoad
                                var _diff = App.links[App.level].length > 0 ? _.differenceBy(_diff, App.links[App.level], 'Id') : _diff
                                App.links[App.level] = _.unionBy(_diff, App.links[App.level], 'Id')
                            } else {
                                if (App.level == 0) {
                                    var _diff = [LastLoad]
                                    App.links[App.level] = _.unionBy(_diff, App.links[App.level], 'Id')
                                }
                            }



                            //}
                            if (App.level == 0)
                                App.level++




                        }, function (_r) {
                            if (_r.Mark == 1) {
                                //debugger
                                //if (_parentData != null && _.isArray(LastLoad)) {
                                var _Dom = function (id, origin, callback) {
                                    callback(_.findIndex(App.root.links, function (o) {
                                        //if (o.target.Id == id)
                                        //    debugger
                                        return o[origin].Id == id
                                    }), origin,
                                    )
                                }
                                var _Cont = function (counter, origin) {
                                    console.log(App.root.links[counter]['source'].Name, app.root.root.Name)
                                    if (counter > 0) {
                                        $('circle[data_key=' + App.root.links[counter]['source'].Id + ']').addClass('Mark')
                                        //$('line[data_target=' + App.root.links[counter]['source'].Id + ']').addClass('Mark')

                                        $('line[data_target=' + App.root.links[counter]['target'].Id + '][data_source=' + App.root.links[counter]['source'].Id + ']').addClass('Mark')

                                        $('#next').removeClass('hidden')

                                        $('#cleaner').removeClass('hidden')
                                        ///if (origin == 'target') {
                                        //    var newOrigin = 'source'
                                        //} else {
                                        //    var newOrigin = 'target'
                                        //}
                                        //debugger
                                        if (App.root.links[counter]['source'].Id != app.root.root.Id)
                                            _Dom(App.root.links[counter]['source'].Id, 'target', _Cont)
                                    }
                                }
                                /// _.forEach(LastLoad, function (_Mark) {


                                //debugger
                                _Dom(_r.Id, 'target', _Cont)
                                //debugger
                                //}
                                //})
                            }
                        })
                    }
                },
                $obj: {
                    panelSearch: {
                        panel: $('#panelSearch'),
                        go: $('.go'),
                        input: $('#search')
                    }
                },
                init: function (app) {
                    app.Timeout = null
                    var $obj = this.$obj
                    $('#Search .checkbox').checkbox({
                        onChecked: function () {
                            if ($('#search').attr('data') == null && $('#search').val().length > 0)
                                app.Framework.PanelSearch.actions.find($('#search'), function (data) {
                                    if(data.length>0)
                                        $('#panelSearch').show().removeClass('loading')
                                    app.vue.fill('search', 'SearchList', data)
                                })
                            app.Framework.PanelSearch.actions.clearData($('#search'), $('#search').attr('data') != null );
                            
                        }
                    })

                    $('#panelSearch').hide().removeClass('hidden')

                    $obj.panelSearch.input.keyup(function () {
                        var obj = this
                        app.Framework.PanelSearch.actions.clearData($('#search'), false);
                        if (app.Timeout != null) {
                            $('#panelSearch').hide()
                            clearTimeout(app.Timeout)
                            app.Timeout = null
                        }
                        app.Timeout = setTimeout(function () {
                            app.Timeout = null
                            app.Framework.PanelSearch.actions.find($(obj), function (data) {
                                $('#panelSearch').show().removeClass('loading')
                                app.vue.fill('search', 'SearchList', data)
                            })

                        }, 1000)

                    }).focus(function () {
                        $('#panelSearch').hide()
                    })

                    $obj.panelSearch.go.click(function () {
                        var _btn = this
                        $(_btn).parent().addClass('loading')
                        app.Framework.PanelSearch.actions.go($('#search'), function (data) {
                            
                            $(_btn).parent().removeClass('loading')
                            $('#borme').removeClass('hidden').find('.content').html(data.Nombre)
                            $('#borme .header .icon').removeClass('industry users travel').addClass(data.Type == 0 ? 'industry' : data.Type == 1 ? 'users' : 'travel')
                            $('#next').removeClass('hidden')
                            $('#parent').val(data.Id)

                            App.root.createBaseGraph(data, function (LastLoad, _parentData) {
                                //debugger
                                if (App.root.links[App.level] == null)
                                    App.root.links[App.level] = []
                                //debugger
                                if (_.isArray(LastLoad)) {

                                    var _diff = App.level > 1 ? _.differenceBy(LastLoad, App.links[App.level - 2], 'Id') : LastLoad
                                    var _diff = App.root.links[App.level].length > 0 ? _.differenceBy(_diff, App.root.links[App.level], 'Id') : _diff
                                    App.root.links[App.level] = _.unionBy(_diff, App.root.links[App.level], 'Id')
                                } else {
                                    if (App.level == 0) {
                                        var _diff = [LastLoad]
                                        App.root.links[App.level] = _.unionBy(_diff, App.root.links[App.level], 'Id')
                                    }
                                }

                                var _Dom = function (id, origin, callback) {
                                    callback(_.findIndex(App.root.links, function (o) {
                                        //if (o.target.Id == id)
                                        //    debugger
                                        return o[origin].Id == id
                                    }), origin,
                                    )
                                }
                                var _Cont = function (counter, origin) {
                                    if (counter > 0) {
                                        $('circle[data_key=' + App.root.links[counter]['target'].Id + ']').addClass('Mark')
                                        $('line[data_target=' + App.root.links[counter]['source'].Id + ']').addClass('Mark')
                                        debugger
                                        ///if (origin == 'target') {
                                        //    var newOrigin = 'source'
                                        //} else {
                                        //    var newOrigin = 'target'
                                        //}
                                        _Dom(App.root.links[counter]['source'].Id, 'target', _Cont)
                                    }
                                }

                                //var _Mark = _.find(LastLoad, function (o, key) {
                                //    return LastLoad[_key] != null;
                                //});

                                //if (_Mark != null) {
                                    $('#cleaner').removeClass('hidden')

                                    _Dom(LastLoad.Id, 'target', _Cont)
                                    //debugger
                                //}
                                //}
                                if (App.level == 0)
                                    App.level++




                            }, function (_r) {
                                //debugger
                            })
                        })
                    })

                    App.vue.init(App)
                }
            }
        }
    }
}