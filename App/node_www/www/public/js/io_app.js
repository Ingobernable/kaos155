App.leyendas = { BOE: { data: ['S', 'X', 'XXX', '-', '+'], css: ['sum', 'fail', 'fail', 'menos', 'mas'] } }
App.ioevents = ['Connecting', 'connected', 'graphData'],

App.ioresponses= {
    Connecting: function (app, data) {

    },
    connected: function (app, data) {
        app.data = data
        if ($('.boxtittle').length == 0) {
            $(".boxtittle").text(data.command + " " + data.type + " " + data.anyo + " ON");
            d3.select('body').append('p').attr("class", "boxBOL").text();
            d3.select('body').append('div').attr("class", "boxcontainer");
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
            d3.select('.boxcontainer').append('span')
                .attr("data", _t == "S" ? data.record.SUMARIO : data.record.LAST_ID)
                .attr("class", 'data ' + x + " " + css)
                .text(_t)
                .on("click", function (d, i) {
                    alert('mañana mas')
                })
                .on("mouseover", function (d, i) {
                    $(this).addClass('gr')
                    $('.bol').html( $(this).attr('data') )
                })
                .on("mouseout", function (d, i) {
                    $(this).removeClass('gr')
                    $('.bol').html('')
                });
        } else {
            d3.select('.boxcontainer').append('span').text(_t);
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