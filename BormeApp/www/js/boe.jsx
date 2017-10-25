module.exports = function (app, url, callback) {

    require('datejs')

    var data = {
        counter: 0,
        found:0,
        Sumario: { _list: [] }
    }


    if (url.params.length > 0) {

        var Jparams = app.Boe.params.create(url)
        var iyear = Jparams.desde.substr(0, 4)
        var imonth = Jparams.desde.substr(4, 2)
        var iday = Jparams.desde.substr(6, 2)

        var fyear = Jparams.hasta.substr(0, 4)
        var fmonth = Jparams.hasta.substr(4, 2)
        var fday = Jparams.hasta.substr(6, 2)

        
        if (Jparams.command != null){
            switch (Jparams.command) {
                case 'sumarios':
                    data.type = Jparams.type
                    data.seccion = Jparams.key
                    data.key = Jparams.ask
                    data.find = Jparams.find

                    var url = app.Boe.url + '?id=' + Jparams.type.toUpperCase() + "-S-" + iyear + imonth + iday

                    break;
                case 'populate':


                    data.type = Jparams.type
                    data.seccion = Jparams.key
                    data.key = Jparams.ask
                    data.find = Jparams.find

                    var url = app.Boe.url + '?id=' + Jparams.type.toUpperCase() + "-S-" + iyear + imonth + iday
                    console.log(url)

                    var firstDate = new Date(iyear +"-"+ imonth +"-"+ iday)
                    var lastDate = new Date(fyear + "-" + fmonth + "-" + fday)
                    var calcReturn = function (callback, _return) {
                        if (_return.next == null)
                            debugger

                        var iyear = _return.next.substr(6, 4)
                        var imonth = _return.next.substr(3, 2)
                        var iday = _return.next.substr(0, 2)

                        //var actualDate = new Date(_return.next)
                        var actualDate = new Date(iyear + "-" + imonth + "-" + iday)

                        if (actualDate < lastDate) {
                            var url = app.Boe.url + '?id=' + Jparams.type.toUpperCase() + "-S-" + actualDate.format("Ymd")
                            app.Boe.Secciones(app.request, url, Jparams, data, callback, calcReturn)
                        } else {
                            callback(JSON.stringify(data))
                        }
                    }

                    app.Boe.Secciones(app.request, url, Jparams, data, callback, calcReturn )
                    break;
                default:
                    app.Boe.askToBoe(app.request, url, function (body) {
                        var xml = app.cheerio.load(body)
                        debugger
                        callback(
                            xml
                        )
                    })
            }
        } else {
            callback("{ error:true }")
        }
    } else {
        callback("{ error:true }" )
    }

}
