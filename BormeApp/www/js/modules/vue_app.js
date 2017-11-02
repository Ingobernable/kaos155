App.directives = function (app, _Vue) {
    _Vue.directive("checkboxboe", {
        bind: function (el) {
            $(el).checkbox({
                onChecked: function () {
                    $('.GO.BOE').addClass('notched circle loading')
                    debugger
                    App.socket.emit('BOE', {
                        command: 'count',
                        key: App.vueAppFramework.search.BOE.toLowerCase(),
                        filters: App.filters('BOE')
                        //sql: "SELECT * FROM Strings WHERE LOWER(keys) Like '%" + App.vueAppFramework.search.toLowerCase() + "%' order by BOE"
                        //sql: "SELECT count(*) FROM Strings WHERE LOWER(keys) Like '%" + App.vueAppFramework.search.toLowerCase() + "%'"
                    })
                },
                onUnchecked: function () {
                    $('.GO.BOE').addClass('notched circle loading')
                    debugger
                    App.socket.emit('BOE', {
                        command: 'count',
                        key: App.vueAppFramework.search.BOE.toLowerCase(),
                        filters: App.filters('BOE')
                        //sql: "SELECT * FROM Strings WHERE LOWER(keys) Like '%" + App.vueAppFramework.search.toLowerCase() + "%' order by BOE"
                        //sql: "SELECT count(*) FROM Strings WHERE LOWER(keys) Like '%" + App.vueAppFramework.search.toLowerCase() + "%'"
                    })
                }
            });
        }
    })
    _Vue.directive("checkboxbocm", {
        bind: function (el) {
            $(el).checkbox({
                onChecked: function () {
                    $('.GO.BOCM').addClass('notched circle loading')
                    App.socket.emit('BOCM', {
                        command: 'count',
                        key: App.vueAppFramework.search.BOCM.toLowerCase(),
                        filters: App.filters('BOCM')
                        //sql: "SELECT * FROM Strings WHERE LOWER(keys) Like '%" + App.vueAppFramework.search.toLowerCase() + "%' order by BOE"
                        //sql: "SELECT count(*) FROM Strings WHERE LOWER(keys) Like '%" + App.vueAppFramework.search.toLowerCase() + "%'"
                    })
                },
                onUnchecked: function () {
                    $('.GO.BOCM').addClass('notched circle loading')
                    App.socket.emit('BOCM', {
                        command: 'count',
                        key: App.vueAppFramework.search.BOCM.toLowerCase(),
                        filters: App.filters('BOCM')
                        //sql: "SELECT * FROM Strings WHERE LOWER(keys) Like '%" + App.vueAppFramework.search.toLowerCase() + "%' order by BOE"
                        //sql: "SELECT count(*) FROM Strings WHERE LOWER(keys) Like '%" + App.vueAppFramework.search.toLowerCase() + "%'"
                    })
                }
            });
        }
    })
    _Vue.directive("anyo", {
        bind: function (el) {
            $(el).checkbox({
                onChecked: function () {
                    var _t = $(this).hasClass('BOE') ? 'BOE' : $(this).hasClass('BORME') ? 'BORME' : 'BOCM'
                    App.vueAppFramework.SELECT_ANYOS[_t].push($(this).attr('data'))
                },
                onUnchecked: function () {
                    var _t = $(this).hasClass('BOE') ? 'BOE' : $(this).hasClass('BORME') ? 'BORME' : 'BOCM'
                    index = App.vueAppFramework.SELECT_ANYOS[_t].indexOf($(this).attr('data'))
                    App.vueAppFramework.SELECT_ANYOS[_t].splice(index, 1)
                }
            });
        }
    })

    app.vueAppFramework = new Vue({
        el: '#Framework',
        data: {
            Tipo_TRAMITE: ['Urgente', 'Urgencia', 'Emergencia', 'Urgenteanticipada', 'Uregente', 'Ugente'],
            search: { BOE: '', BORME: '', BOCM: '' },
            Total: [],
            contratistas: [],
            LTIPOBOE: [],
            LTIPOBOCM: [],
            LTRAMITACION: [],
            ANYOS: { BOE: [], BORME: [], BOCM: [] },
            SELECT_ANYOS: { BOE: [], BORME: [], BOCM: [] },
            SELECT_BORME_TEXT: [],
            BORME: [],
            BOE: [],
            BOCM: [],
            BORMEFILE: [],
            BORMETEXT: [],
            BOEFILE: [],
            BOETEXT: [],
            BOCMFILE: [],
            BOCMTEXT: [],
            TBOE: [],
            TBORME: [],
            TBOCM: [],
            TSUMARIOS: [],
            SUMARIOS: [],
            TLAST: [],
            visual_cif: {
                _Search: [""],
                _TRAMAS: [],
                _Ranking: {
                    Empresas: { tipo: [0], BOE: [], BOCM: [] },
                    Directivos: []
                },
                _list: [],
                relaciones: [],
                empresas: [],
                total: { Directivo: [], Empresa: [] },
                Puertas: {
                    Entramado: [],
                    hidden: [0],
                }
            }
        },
        methods: {
            visualcif: function (event) {
                if (event != null)
                    var _obj = $(event.currentTarget)

                var _this = this
                return {
                    popUp: function() {
                        var w = window.open('blank.html', '_blank');
                        w.onload = function () {
                            setTimeout(function () { $(w.document.body).find('#RelationsCard').html($('#RelationsCard').html()) }, 2000);
                        }
                        //$(w.document.head).innerHTML =''


                        //var doc = new jsPDF()
                        //doc.fromHTML($('#RelationsCard').html(), 10, 10)
                        //doc.save('relaciones.pdf')
                    },
                    isInList: function (i, search, tab) {
                        if (search.length == 0 || !$("[data-tab='" + tab + "']").hasClass('active')) {
                            return true
                        } else {
                            if ($('#visualId').val().substr(0, 1) == '-') {
                                //if (search.length == 1) {
                                //    return true
                                //} else {

                                return i.toUpperCase().substr(0, search.length) == search.toUpperCase() //.substr(1, search.length)
                                //}
                            } else {
                                console.log(i, search)
                                return i.toUpperCase().indexOf(search.toUpperCase()) > -1
                            }
                        }
                        //return false
                        //return (search.substr(0, 1) == '-' ? : i.indexOf(search.toUpperCase() ) > -1 && search.length > 0) || search.length == 0
                    },
                    ranking: function (val) {
                        //if ($(_obj).attr('checked').length==0)
                        //    debugger
                        //$(event.currentTarget)
                        var _form = {
                            command: 'setmark',
                            Type: 'Directivo',
                            Id: $(_obj).attr('data-key'),
                            value: $(_obj).parent().attr('data-check').length == 0 ? val + 1 : 0
                        }
                        //debugger
                        app.socket.emit('relaciones', _form)
                        //$(_obj).attr('checked', $(_obj).attr('checked').length==0?"checked":""))
                    },
                    getEntramado: function () {
                        var _form = {}

                        _form.Type = "Directivo"
                        _form.Titular = _obj.attr('data-title')
                        _form.level = 0
                        _form.tree = []
                        _form.command = 'getEntramado'
                        _form.Id = _obj.attr('data-key')
                        _form.Nodes = [{
                            Id: _obj.attr('data-key'),
                            Name: _form.Titular,
                            Type: _form.Type == 'Empresa' ? 1 : 2,
                            Roles: '',
                            PersonId: _form.Type != 'Empresa' ? _obj.attr('data-key') : 0,
                            CompanyId: _form.Type == 'Empresa' ? _obj.attr('data-key') : 0,
                            Active: 1,
                            ActiveRelations: '',
                            JuridicId: 0
                        }]
                        debugger
                        app.socket.emit('relaciones', _form)
                        $('.blue').removeClass('blue')
                        $(_obj).find('.ui.button').addClass('blue')
                        $('.visual-empresas').addClass('loading')
                    },
                    focus: function (state) {
                        var _tab = $('[data-tab="cuarto"] .ui.menu .active').attr("data-pos") * 1
                        if (_tab < 2)
                            if (state) {
                                $('#lst-VisualCif').removeClass('hidden')
                            } else {
                                $('#lst-VisualCif').addClass('hidden')
                            }
                    },
                    select: function () {
                        var _tab = $('[data-tab="cuarto"] .ui.menu .active').attr("data-pos") * 1

                        //_lst = { Id: ,}
                        $('#' + _obj.attr('data-type')).parent().checkbox('set checked')
                        $('#visualId').attr('data-id',_obj.attr('data-key')).val(_obj.attr('data'))
                        $('#lst-VisualCif').addClass('hidden')
                        $('.ui.button.play').removeClass('disabled').attr({ 'data-key': _obj.attr('data-key'), 'data-boe': _obj.attr('data-boe'), 'data-bocm': _obj.attr('data-bocm') })
                        if (app._xData == null) {
                            app._xData = app.vueAppFramework.visual_cif._Ranking.Directivos
                        }
                        if (_tab == 2) {
                            app.vueAppFramework.visual_cif._Ranking.Directivos.splice(0, app.vueAppFramework.visual_cif._Ranking.Directivos.length)
                            app.vueAppFramework.visual_cif._Ranking.Directivos.push({ Id: _obj.attr('data-key'), Name: _obj.attr('data'), ActiveRelations: _obj.attr('data-relations'), mark: 0, juridicId: 0, type: _obj.attr('data-type') })
                        }
                        if (_tab == 0) {
                            $('#RelationsCard .visual_cif').html('')
                            app.treeRelations = []
                            //app.vueAppFramework.visual_cif._Ranking.Directivos.splice(0, app.vueAppFramework.visual_cif._Ranking.Directivos.length)
                            //app.vueAppFramework.visual_cif._Ranking.Directivos.push({ Id: _obj.attr('data-key'), Name: _obj.attr('data'), ActiveRelations: _obj.attr('data-relations'), mark: 0, juridicId: 0, type: _obj.attr('data-type') })
                        }
                    },
                    search: function () {
                        var _tab = $('[data-tab="cuarto"] .ui.menu .active').attr("data-pos") * 1
                        var _vguion = _obj.val().substr(0, 1) == "-" ? _obj.val().substr(1, _obj.val().length - 1) : _obj.val()
                        var _value = _tab < 2 ? _obj.val() : _vguion

                        app.vueAppFramework.visual_cif._Search.splice(0, 1)
                        app.vueAppFramework.visual_cif._Search.push(_value)

                        if (_tab < 2 || event.keyCode == 13) {
                            $('#lst-VisualCif').removeClass('hidden')
                            if (_obj.val().length == 0) {
                                $('#visual-check').checkbox('uncheck')
                                $('.titTrama').html('Entramado')

                                _this.visual_cif._list.splice(0, 50)
                                $('.ui.button.play').addClass('disabled').removeAttr('data-key')
                                $('.ui.list.visual_cif').html('').removeAttr('id')
                                if (app.vueAppFramework.visual_cif._Ranking.Directivos != null)
                                    if (app.vueAppFramework.visual_cif._Ranking.Directivos.length == 1) {
                                        debugger
                                        app.vueAppFramework.visual_cif._Ranking.Directivos.splice(0, 1)
                                        app.vueAppFramework.visual_cif._Ranking.Directivos.push(app._xData)
                                    }
                            } else {
                                //debugger
                                $('#lst-VisualCif').removeClass('hidden')
                                if (window.Timeout != null) {
                                    clearTimeout(window.Timeout)
                                    window.Timeout = null
                                }
                                window.Timeout = setTimeout(function () {

                                    window.Timeout = null
                                    $('#lst-VisualCif').addClass('loading')
                                    //debugger
                                    var _form = { command: 'search', value: $(event.target).val(), tab: $('[data-tab="cuarto"] .menu .item.active').attr("data-tab") } // == 1 ? 'Empresa' : 'Directivo' }
                                    //debugger
                                    app.socket.emit('relaciones', _form)

                                }, 500)
                            }
                        }
                    },
                    save: function () {

                        $('.ui.modal').modal({
                            closable: false,
                            onVisible: function () {
                                //debugger
                                $('#IDTrama').unbind().keydown(function (event) {
                                    $('#IDTrama').val().length > 0 ? $('.ui.approve.button').removeClass('disabled') : $('.ui.approve.button').addClass('disabled')
                                })
                            },
                            onDeny: function () {
                                return true;
                            },
                            onApprove: function () {
                                app.createNodeSave(app)
                            }
                        }).modal('show')


                    },
                    go: function () {

                        //$('.spinTree').css({ visibility: 'visible' })
                        //$('.spinTree_a').html("")

                        //setTimeout(function () {
                            var _form = app.form()
                        //debugger
                            if (_form.id > 0 && $('.ui.list.visual_cif').children().length == 0) {

                            
                           
                             
                                //debugger
                                _form.Titular = $('#visualId').val()
                                _form.level = 0
                                _form.tree = []
                                _form.command = 'setDataTree'
                                _form.Id = _obj.attr('data-key')
                                _form.Nodes = [{
                                    Id: _obj.attr('data-key'),
                                    Name: _form.Titular,
                                    Type: _form.Type == 'Empresa' ? 1 : 2,
                                    Roles: '',
                                    PersonId: _form.Type != 'Empresa' ? _obj.attr('data-key') : 0,
                                    CompanyId: _form.Type == 'Empresa' ? _obj.attr('data-key') : 0,
                                    Active: 1,
                                    BOE: _obj.attr('data-boe'),
                                    BOCM: _obj.attr('data-bocm'),
                                    ActiveRelations: '',
                                    JuridicId: 0
                                }]
                                //$('#' + (data.level - 1) + "_" + data.Id + '_' + data.type)
                                $('.ui.list.visual_cif').attr({ 'data-level-i': _form.level + 1, 'id': _form.level + '_' + _form.Id + '_' + _form.Type }).html('') // ==1?'Empresa':'Directivo')).html('')
                                app.ioresponses.relaciones(app, _form, null, function (data) { 

                                    app.vueAppFramework.visual_cif.relaciones = 0
                                    app.vueAppFramework.visual_cif.empresas = 0

                                    $('.pause').parent().removeClass('disabled')
                                    $('.play').parent().addClass('disabled')
                                    $('#RelationsCard').removeClass('hide')
                                    app._Data.status = 'play'
                                    _form.level = 1
                                    _form.steps = 1
                                    _form.step = 1
                                    _form.e = 1
                                    _form.te = 1
                                    _form.command = "getRelationsAuto"
                                    app.socket.emit('relaciones', _form)
                                })
                            
                            } else {
                                //$('.spinTree').css({ visibility: 'visible' })
                                $('.ui.button.play').addClass('loading')
                                _form = { level: ($('.ui.list.visual_cif').attr('data-level-i') * 1) }
                                _form.lst = app.treeSearch = app.treeRelations[_form.level - 1] //app.treeRelations //[_form.level]
                                //debugger
                                app.next(app, 0, _form.level ) //, function () {
                               //     debugger
                               //     alert('acab?')
                               // })
                            }
                        //}, 500)
                    }
                }
            },
            g: function (e) {
                //console.log(e)
                return e
            },
            getClass: function (i, effect) {
                var myClass = {};
                //debugger
                myClass[effect] = i == 1;
                return myClass;
            },
            goTrama: function (event) {
                var _form = { command: 'getTrama', value: $(event.target).attr('data') } // == 1 ? 'Empresa' : 'Directivo' }
                //debugger
                app.socket.emit('relaciones', _form)
            },
            goDoc: function (type, event) {
                $('.menu .item').tab('change tab', type == 'BORME' ? 'primero/b' : type == 'BOE' ? 'segundo/c' : 'tercero/c');
                var _this = $(event.currentTarget)
                if (type != "BOCM") {

                    if (!$(_this).hasClass('loading')) {
                        data = _this.attr('data')
                        data_id = _this.attr('data-id')
                        $(_this).addClass('loading')
                        app.socket.emit(type, {
                            command: 'getDoc',
                            key: data_id,
                            anyo: data.substr(6, 4)
                        })
                    }
                    if (type == "BOE") {
                        debugger
                        $('#boepdf').attr('src', '/js/proxy.jsx?url=http://www.boe.es/' + $(_this).attr('datapdf'))
                    }
                } else {
                    $('#bocmdpf').attr('src', '/js/proxy.jsx?url=' + $(_this).attr('data'))
                }
                //return data[i][cmp]
            },
            set: function (e) {
                return e
            },
            splitter: function (text, spl, i) {
                if (i == null)
                    return text.split(spl)
                return text.split(spl)[i]
            },
            hover: function (key) {
                $('[data="' + key + '"]').attr('style', 'position:absolute;display:inline')
            },
            leave: function (key) {
                $('[data="' + key + '"]').attr('style', 'position:absolute;display:none')
            },
            pdf: function (i) {
                $('.ui.modal').modal('show')
                //debugger
            },
            parsedMsg: function (msg, search) {
                //console.log(this.search)
                msg = msg == null ? '' : msg

                var _split = [msg]
                if (msg.indexOf(search) > -1) {
                    var _split = msg.replace(search, "#" + search + '#').split('#')
                }

                return _split
            },
            isInAnyo: function (type, doc) {
                //console.log(type,doc)
                if (this.SELECT_ANYOS[type] != null)
                    return this.SELECT_ANYOS[type].indexOf(type == 'BOE' ? doc.substr(6, 4) : type == 'BORME' ? doc.substr(8, 4) : doc.substr(5, 4)) > -1
            },
            isFindInText: function (text) {
                var _f = this.SELECT_BORME_TEXT
                return _f != null ? (_f.length == 0 ? true : text.toLowerCase().indexOf(_f[0].toLowerCase()) > -1) : false

            },
            setTextBORMESearch: function (event) {
                this.SELECT_BORME_TEXT.splice(0, 1)
                if ($(event.currentTarget).val().length > 0)
                    this.SELECT_BORME_TEXT.push($(event.currentTarget).val())
            },
            replacene: function (original) {
                return original.replace(/&#xF1;/g, String.fromCharCode(241))
            },
            numberWithCommas: function (x) {
                var parts = x.toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                return parts.join(".");
            },
            Sospechoso: function (lst) {

                return lst.Sospechoso != null ? lst.RankingTop != null ? 'color:violet' : 'color:red' : 'color:black'
            },
        },
        computed: {
            parsedSearch: function (search) {
                //debugger
                return this.search.trim().replace(/ +/g, '|');
            }
        },
    })
}

