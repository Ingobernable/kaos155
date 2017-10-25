$(document).ready(function () {
    //debugger
    App.Init(App)


    $('#Find_BOE').focus(function () {
        //debugger
        $(this).unbind().keyup(function () {
            //debugger
            if ($(this).val().length > 2) {
                //var data = 
                App.vueAppFramework.search.BOE = $(this).val()
                if (App.timeout != null) {
                    clearTimeout(App.timeout)
                    App.timeout == null
                }
                App.timeout = setTimeout(function () {
                    $('.GO').addClass('loading')
                    App.timeout == null
                    App.socket.emit('BOE', {
                        command: 'count',
                        key: App.vueAppFramework.search.BOE.toLowerCase(),
                        filters: App.filters('BOE')
                        //sql: "SELECT * FROM Strings WHERE LOWER(keys) Like '%" + App.vueAppFramework.search.toLowerCase() + "%' order by BOE"
                        //sql: "SELECT count(*) FROM Strings WHERE LOWER(keys) Like '%" + App.vueAppFramework.search.toLowerCase() + "%'"
                    })
                    //app.socket.emit('sqlLite', {
                    //    command:'count',                            
                    //    sql: "SELECT count(*) FROM [contratistas] WHERE LOWER(razonsocial) LIKE '" + data.toLowerCase() + "%'"
                    //})
                }, 500)
            }
        })
    })
    $('#Find_BOCM').focus(function () {
        //debugger
        $(this).unbind().keyup(function () {
            //debugger
            if ($(this).val().length > 0) {
                //var data = 
                App.vueAppFramework.search.BOCM = $(this).val()
                if (App.timeout != null) {
                    clearTimeout(App.timeout)
                    App.timeout == null
                }
                App.timeout = setTimeout(function () {
                    $('.GO').addClass('loading')
                    App.timeout == null
                    //debugger
                    App.socket.emit('BOCM', {
                        command: 'count',
                        key: App.vueAppFramework.search.BOCM.toLowerCase(),
                        filters: App.filters('BOCM')
                        //sql: "SELECT * FROM Strings WHERE LOWER(keys) Like '%" + App.vueAppFramework.search.toLowerCase() + "%' order by BOE"
                        //sql: "SELECT count(*) FROM Strings WHERE LOWER(keys) Like '%" + App.vueAppFramework.search.toLowerCase() + "%'"
                    })
                    //app.socket.emit('sqlLite', {
                    //    command:'count',                            
                    //    sql: "SELECT count(*) FROM [contratistas] WHERE LOWER(razonsocial) LIKE '" + data.toLowerCase() + "%'"
                    //})
                }, 200)
            }
        })
    })
    $('#Find_BORME').focus(function () {
        //debugger
        $(this).unbind().keyup(function (event) {

            if ($(this).val().length > 0 && event.which == 13) {
                //var data = 
                App.vueAppFramework.search.BORME = $(this).val()
                //if (App.timeout != null) {
                //    clearTimeout(App.timeout)
                //    App.timeout == null
                //}
                //App.timeout = setTimeout(function () {
                $('.COUNT.BORME').addClass('loading')
                //App.timeout == null
                App.socket.emit('BORME', {
                    command: 'count',
                    key: App.vueAppFramework.search.BORME.toLowerCase(),
                    filters: App.filters('BORME'),
                    type: $('#Find_BORME').attr('placeholder').indexOf('Empresas') > -1
                    //sql: "SELECT * FROM Strings WHERE LOWER(keys) Like '%" + App.vueAppFramework.search.toLowerCase() + "%' order by BOE"
                    //sql: "SELECT count(*) FROM Strings WHERE LOWER(keys) Like '%" + App.vueAppFramework.search.toLowerCase() + "%'"
                })
                //app.socket.emit('sqlLite', {
                //    command:'count',                            
                //    sql: "SELECT count(*) FROM [contratistas] WHERE LOWER(razonsocial) LIKE '" + data.toLowerCase() + "%'"
                //})
                //}, 200)
            }
        })
    })
    $('.COUNT.BORME').click(function () {
        if (!$(this).hasClass('loading')) {


            $(this).addClass('loading')
            App.vueAppFramework.search.BORME = $('#Find_BORME').val()
            App.socket.emit('BORME', {
                command: 'count',
                key: App.vueAppFramework.search.BORME.toLowerCase(),
                filters: App.filters('BORME'),
                type: $('#Find_BORME').attr('placeholder').indexOf('Empresas') > -1
                //sql: "SELECT * FROM Strings WHERE LOWER(keys) Like '%" + App.vueAppFramework.search.toLowerCase() + "%' order by BOE"
                //sql: "SELECT count(*) FROM Strings WHERE LOWER(keys) Like '%" + App.vueAppFramework.search.toLowerCase() + "%'"
            })


        }
    })
    $('.PLAY.BORME').click(function () {
        if (!$(this).hasClass('loading')) {
            $('.menu .item').tab('change tab', 'primero/a');
            $('#Find_BORME_TEXT').val('')
            window.App.vueAppFramework.SELECT_BORME_TEXT.splice(0, 1)

            $(this).addClass('loading')
            App.socket.emit('BORME', {
                command: 'get',
                key: App.vueAppFramework.search.BORME.toLowerCase(),
                filters: App.filters('BORME'),
                type: $('#Find_BORME').attr('placeholder').indexOf('Empresas') > -1
                //sql: "SELECT BOE.Tipo_BOE, Strings.BOE, Strings.keys, Strings.Importes FROM         BOE INNER JOIN Strings ON BOE.BOE = Strings.BOE WHERE LOWER(keys) Like '%" + App.vueAppFramework.search.toLowerCase() + "%' order by BOE"
            })


        }
    })
    $('.GO.BOE').click(function () {
        if (!$(this).hasClass('loading')) {
            $('.menu .item').tab('change tab', 'segundo/b');

            $(this).addClass('loading')
            App.socket.emit('BOE', {
                command: 'get',
                key: App.vueAppFramework.search.BOE.toLowerCase(),
                filters: App.filters('BOE')
                //sql: "SELECT BOE.Tipo_BOE, Strings.BOE, Strings.keys, Strings.Importes FROM         BOE INNER JOIN Strings ON BOE.BOE = Strings.BOE WHERE LOWER(keys) Like '%" + App.vueAppFramework.search.toLowerCase() + "%' order by BOE"
            })


        }
    })
    $('.GO.BOCM').click(function () {
        if (!$(this).hasClass('loading')) {
            $('.menu .item').tab('change tab', 'tercero/b');

            $(this).addClass('loading')
            App.socket.emit('BOCM', {
                command: 'get',
                key: App.vueAppFramework.search.BOCM.toLowerCase(),
                filters: App.filters('BOCM')
                //sql: "SELECT BOE.Tipo_BOE, Strings.BOE, Strings.keys, Strings.Importes FROM         BOE INNER JOIN Strings ON BOE.BOE = Strings.BOE WHERE LOWER(keys) Like '%" + App.vueAppFramework.search.toLowerCase() + "%' order by BOE"
            })


        }
    })
    $('input[name="tanyos"].BOE').change(function () {
        if ($(this).attr('checked') != null) {
            $(this).removeAttr('checked')
            //debugger
            $(App.vueAppFramework.ANYOS.BOE).each(function (i, item) {
                $('input[data="' + item + '"]').parent().checkbox('set unchecked')

            })
            App.vueAppFramework.SELECT_ANYOS.BOE.splice(0, App.vueAppFramework.SELECT_ANYOS.length)
        } else {
            $(this).attr('checked', 'ckecked')
            $(App.vueAppFramework.ANYOS.BOE).each(function (i, item) {
                $('input[data="' + item + '"]').parent().checkbox('set checked')
                App.vueAppFramework.SELECT_ANYO.BOES.push(item)
            })
        }
        //alert($(this).attr('checked'))
    })
    $('input[name="tanyos"].BORME').change(function () {
        if ($(this).attr('checked') != null) {
            $(this).removeAttr('checked')
            //debugger
            $(App.vueAppFramework.ANYOS.BORME).each(function (i, item) {
                $('input[data="' + item + '"]').parent().checkbox('set unchecked')

            })
            App.vueAppFramework.SELECT_ANYOS.BORME.splice(0, App.vueAppFramework.SELECT_ANYOS.BORME.length)
        } else {
            $(this).attr('checked', 'ckecked')
            $(App.vueAppFramework.ANYOS.BORME).each(function (i, item) {
                $('input[data="' + item + '"]').parent().checkbox('set checked')
                App.vueAppFramework.SELECT_ANYOS.BORME.push(item)
            })
        }
        //alert($(this).attr('checked'))
    })
    $('input[name="TswBoe"]').change(function () {
        var accion = $(this).parent().hasClass('checked') ? 'set checked' : 'set unchecked'
        $(this).parent().parent().find('.checkbox').checkbox(accion);
        $('.GO').addClass('notched circle loading')
        App.socket.emit('BOE', {
            command: 'count',
            key: App.vueAppFramework.search.BOE.toLowerCase(),
            filters: App.filters('BOE')
            //sql: "SELECT * FROM Strings WHERE LOWER(keys) Like '%" + App.vueAppFramework.search.toLowerCase() + "%' order by BOE"
            //sql: "SELECT count(*) FROM Strings WHERE LOWER(keys) Like '%" + App.vueAppFramework.search.toLowerCase() + "%'"
        })
    })
    $('input[name="TswBocm"]').change(function () {
        var accion = $(this).parent().hasClass('checked') ? 'set checked' : 'set unchecked'
        $(this).parent().parent().find('.checkbox').checkbox(accion);
        $('.GO').addClass('notched circle loading')
        App.socket.emit('BOCM', {
            command: 'count',
            key: App.vueAppFramework.search.BOCM.toLowerCase(),
            filters: App.filters('BOCM')
            //sql: "SELECT * FROM Strings WHERE LOWER(keys) Like '%" + App.vueAppFramework.search.toLowerCase() + "%' order by BOE"
            //sql: "SELECT count(*) FROM Strings WHERE LOWER(keys) Like '%" + App.vueAppFramework.search.toLowerCase() + "%'"
        })
    })
    $('.menu .item').tab({
        'onVisible':
        function () {
            return false


        }
    })
    $('.ui.radio.checkbox').checkbox()

    $('#visual-check').checkbox({
        onChecked: function () {
            $('#RelationsCard input:not(:checked)').parent().parent().parent().addClass("hidden")
            App.vueAppFramework.visual_cif.Puertas.hidden.splice(0, 1)
            App.vueAppFramework.visual_cif.Puertas.hidden.push(1)
            if ($('#RelationsCard input:checked').length > 0)
                $('.ui.button.save').removeClass('disabled')
        },
        onUnchecked: function () {
            $('#RelationsCard input:not(:checked)').parent().parent().parent().removeClass("hidden")
            App.vueAppFramework.visual_cif.Puertas.hidden.splice(0, 1)
            App.vueAppFramework.visual_cif.Puertas.hidden.push(0)
            $('.ui.button.save').addClass('disabled')
        }
    })
    $('#BORME-check').checkbox({
        onChecked: function () {
            $('#stateBORME').html('Texto')
            $('#Find_BORME').attr("placeholder", "Buscar Texto en BORME")
        },
        onUnchecked: function () {
            $('#stateBORME').html('Empresas')
            $('#Find_BORME').attr("placeholder", "Buscar Empresas en BORME")
        }
    })
    $('.TLIST').click(function () {
        if ($(this).hasClass('teal')) {
            $('.TLIST').not('.active').addClass('teal')
            $(this).removeClass('active teal')
        } else {
            $('.TLIST.teal').removeClass('teal')
            $(this).addClass('teal')
        }
        App.vueAppFramework.visual_cif._Ranking.Empresas.tipo.splice(0, 1)
        App.vueAppFramework.visual_cif._Ranking.Empresas.tipo.push($(this).attr("data"))

    })

    window.graph.prepare()

})