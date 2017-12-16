var App = {
    Init: function (app) {

        //localStorage.debug = 'none';
        clients = [
            ['dev.bbdd.ovh', 'www.kaos155.com'],
            ['192.99.58.60', '164.132.43.153']
        ]
        var host = clients[1][clients[0].indexOf(document.location.host.split(":")[0])] + ":" + document.location.host.split(":")[1]
        //debugger
        if (host != null) {
            //console.log(document.location)
            app.ioresponses.listen(app,
                io.connect(host, {
                    reconnection: true,
                    reconnectionDelay: 1000,
                    reconnectionDelayMax: 5000,
                    reconnectionAttempts: 9999,
                    loglevel: 0
                })
            )
        }
        

    }
}