module.exports = function (app, options) {

    return {
        //child_process: require('child_process'),
        //memwatch : require('memwatch'),
        functions: {
            BORME: require('../node_IA/BORME/IA_Actions.js')
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
                console.log('IO Connect ' + socket.id)
                app.sockets.array[socket.id] = socket
                app.sockets.array[socket.id].on('add', function (_data) {
                    
                    app._io.functions.BORME.add(app._io.functions.BORME.tools.add, app, options, _data, app._io._IAparameters,  function () {                            
                        _data = null
                    })
                })
                app.sockets.array[socket.id].on('update', function (_data) {
                    
                    app._io.functions.BORME.update(app._io.functions.BORME.tools.update, app, options, _data, app._io._IAparameters, function () {
                        _data = null
                    })
                })
                app.sockets.array[socket.id].on('movimiento', function (_data) {
                    
                    app._io.functions.BORME.movimiento(app._io.functions.BORME.tools.movimiento, app, options, _data, app._io._IAparameters, function () {
                        _data = null
                    })
                })
                app.sockets.array[socket.id].on('relacion', function (_data) {
                    
                    app._io.functions.BORME.relacion(app._io.functions.BORME.tools.relacion, app, options, _data, app._io._IAparameters, function () {
                        _data = null
                    })
                })
                socket=null
            })
            //callback(io)
        }
    }
    //return _this
}