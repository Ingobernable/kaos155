module.exports = function (app) {
    return {
        io: require('socket.io-client'),
        ioevents: ['elasticsearch'],

        init: function (callback) {
            var _this =this
            this.socket = this.io.connect('http://elastic.BBDD.ovh:8080', { reconnect: true })
            this.socket.firstConnect = true
            this.socket.on('connect', function () {
                console.log('Connected!');
                if (_this.socket.firstConnect) {
                    for (n in this.ioevents) {
                        _this.socket.on(options.ioevents[n], function (data) {
                            console.log('(' + n + ')receive event:' + options.ioevents[n])
                            app[data.command](data)
                        })
                    }
                }
                _this.socket.firstConnect = false

                setTimeout(function () {
                    console.log('send elastic hello')
                    _this.socket.emit('elasticsearch', { command: 'hello' })
                }, 1000)
            });
            this.socket.on('disconnect', function () {
                console.log('Disconnected!');

            });
            callback(this)
        },
        receive: function (data, socket) {
            if(data.command=='hello')
                socket.emit('elasticsearch', data)
        },
        send: function (command, index, type ,id, data) {
            //debugger
            if(this.socket!=null)
                this.socket.emit('elasticsearch', { command: command, index: index, type: type, id:id, body: data })
        }
    }
}