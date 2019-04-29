module.exports = function (app) {

    return {
        //child_process: require('child_process'),
        //memwatch : require('memwatch'),
        functions: {
            BORME: require('../node_IA/BORME/IA_Actions.js')(app)
        },
        _IAparameters: {
            min_TRelations:25
        },
        listen: function (io) {
            //const _f = 
            //const _this = this
            //this.memwatch.on('leak', function (info) {
            //    console.log('memory leak event')
            //    console.log(info)
            //});
            //this.memwatch.on('stats', function (stats) {
            //    console.log('memory leak stats')
            //    console.log(stats)
            //});
            io.on('connection', function (socket) {
                const act = function (_socket) {
                    _socket.on('add', function (_data) {

                        app._io.functions.BORME.add(_data)
                        _data = null
                    })
                    _socket.on('update', function (_data) {
                        app._io.functions.BORME.update(_data)
                        _data = null
                    })
                    _socket.on('movimiento', function (_data) {

                        app._io.functions.BORME.movimiento(_data)
                        _data = null
                    })
                    _socket.on('relation', function (_data) {

                        app._io.functions.BORME.relacion(_data)
                        _data = null
                    })
                  
                }
                console.log('IO Connect ' + socket.id)
                app.sockets.array[socket.id] = socket
                //act( app.sockets.array[socket.id] )
                socket=null
            })
            //callback(io)
        }
    }
    //return _this
}