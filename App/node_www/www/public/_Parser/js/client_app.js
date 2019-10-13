var App = {
    Init: function (app) {

            console.log(document.location)
            app.ioresponses.listen(app,
                io.connect(document.location.host, {
                    reconnection: true,
                    reconnectionDelay: 1000,
                    reconnectionDelayMax: 5000,
                    reconnectionAttempts: 9999,
                    loglevel: 0
                })
            )

        

    }
}