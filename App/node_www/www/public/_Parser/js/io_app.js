App.leyendas = {
    meses: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'agosto', 'septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    BOE: {        
        data: ['S', 'X', 'XXX', '-', '+'],
        css: ['sum', 'file large red', 'file text large red', 'file outline grey', 'file text outline large green']
    },
    BORME: {
        data: ['↓', 'A CORUÑA', 'LA CORUÑA', 'ARABA/ÁLAVA', 'ÁLAVA', 'ALBACETE', 'ALICANTE', 'ALMERÍA', 'ASTURIAS', 'ÁVILA', 'BADAJOZ', 'BARCELONA', 'BIZKAIA', 'BURGOS', 'CÁCERES', 'CÁDIZ', 'CANTABRIA', 'CASTELLÓN', 'CIUDAD REAL', 'CÓRDOBA', 'CUENCA', 'CEUTA', 'GIRONA', 'GRANADA', 'GUADALAJARA', 'GUIPÚZCOA', 'GIPUZKOA', 'HUELVA', 'HUESCA', 'ILLES BALEARS', 'ISLAS BALEARES', 'JAÉN', 'LA RIOJA', 'LAS PALMAS', 'LEÓN', 'LLEIDA', 'LUGO', 'MADRID', 'MÁLAGA', 'MELILLA', 'MURCIA', 'NAVARRA', 'ORENSE', 'OURENSE', 'PALENCIA', 'PONTEVEDRA', 'SALAMANCA', 'SEGOVIA', 'SEVILLA', 'SORIA', 'TARRAGONA', 'SANTA CRUZ DE TENERIFE', 'TERUEL', 'TOLEDO', 'VALENCIA', 'VALLADOLID', 'VIZCAYA', 'ZAMORA', 'ZARAGOZA'],
        css: ['save', 'prov', 'prov', 'prov', 'prov', 'prov', 'prov', 'prov', 'prov', 'prov', 'prov', 'prov', 'prov', 'prov', 'prov', 'prov', 'prov', 'prov', 'prov', 'prov', 'prov', 'prov', 'prov', 'prov', 'prov', 'prov', 'prov', 'prov', 'prov', 'prov', 'prov', 'prov', 'prov', 'prov', 'prov', 'prov', 'prov', 'prov', 'prov', 'prov', 'prov', 'prov', 'prov', 'prov', 'prov', 'prov', 'prov', 'prov', 'prov', 'prov', 'prov', 'prov', 'prov', 'prov', 'prov', 'prov', 'prov', 'prov', 'prov']
    },
}
App.ioevents = ['Connecting', 'connected', 'graphData'],

App.ioresponses= {
    Connecting: function (app, data) {

    },
    connected: function (app, data) {
        app.data = data
        debugger
        //app.prism = Prism

        if ($('.boxcontainer .ui.styled.accordion').length == 0) {
            var accordion = $('<div>').addClass("ui styled accordion")
            $('.boxcontainer').append(accordion)
            $('.boxcontainer ')
            $(".boxtittle").text(data.command + " " + data.type + " " + data.anyo + " ON");
            $('.ui.accordion')
                .accordion();

            $('div.code').each(function (i, block) {
                hljs.highlightBlock(block);
            });
            //d3.select('body').append('p').attr("class", "boxBOL").text();
            //d3.select('body').append('div').attr("class", "boxcontainer");
        }
    },
    graphData: function (app, data) {
        var _t = data.code
        var x = "00m"
        if (data.color._i.indexOf('\x1b[') > -1) {
            var x = data.color._i.match(/\d{1,2}\m/)
        }
        if (app.leyendas[app.data.type].data.indexOf(_t) > -1) {
            var css = app.leyendas[app.data.type].css[app.leyendas[app.data.type].data.indexOf(_t)]
            var bol = data.record.SUMARIO.split("-")
            var mes = bol[bol.length - 1].substr(4, 2) * 1
            var dia = bol[bol.length - 1].substr(6, 2) * 1
            if (app.mes != mes) {

                var tittle = $('<div>').addClass("active title").append('<i class="dropdown icon"></i>').append(app.leyendas.meses[mes - 1])
                var content = $('<div>').addClass("active content mes_"  +mes).append($('<div>').addClass('accordion') )
                $('.boxcontainer .ui.styled.accordion').append(tittle)
                $('.boxcontainer .ui.styled.accordion').append(content)
                
                $('.ui.accordion').accordion('refresh');
                app.mes=mes
            }
            if (app.sumario != data.record.SUMARIO || _t == "S") {
               
                var tittle = $('<div>').addClass("active title").append('<i class="dropdown icon"></i>').append(dia)
                var content = $('<div>').addClass("active content mes_" + mes+'_dia_'+dia)
                $('.boxcontainer .mes_'+mes).append(tittle).append(content)
                //d3.select('.boxcontainer').append('br')
               // d3.select('.boxcontainer').append('span')
               //     .attr("data", data.record.SUMARIO )
               //     .attr("class", 'data ' + " sum ")
               //     .text( dia )
                app.sumario = data.record.SUMARIO
            }
            if (_t != "S") {
                var li = $('<i>').attr('data', _t == "S" ? data.record.SUMARIO : data.record.LAST_ID)
                                 .addClass( (_t=="-"?'':'data') + ' icon ' + x + " " + css)
                                 .hover(function () {
                                    $(this).addClass('gr')
                                    $('.bol').html($(this).attr('data'))
                                 }, function () {
                                    $(this).removeClass('gr')
                                    $('.bol').html('')
                                 })
                $(".boxcontainer .mes_" + mes + '_dia_' + dia).append(li)
                $('code').append(data.record.LAST_ID)
            }
            //    d3.select('.boxcontainer').append('i')
            //        .attr("data", _t == "S" ? data.record.SUMARIO : data.record.LAST_ID)
            //        .attr("class", 'data icon ' + x + " " + css)
                    //.text(_t)
            //        .on("click", function (d, i) {
             //           alert('mañana mas')
             //       })
              //      .on("mouseover", function (d, i) {
               //         $(this).addClass('gr')
               //         $('.bol').html( $(this).attr('data') )
               //     })
                //    .on("mouseout", function (d, i) {
                //        $(this).removeClass('gr')
                //        $('.bol').html('')
                 //   });
        
        }
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