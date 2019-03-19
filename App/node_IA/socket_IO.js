module.exports = function (app, options) {

    return {
        //child_process: require('child_process'),
        functions: {
            BORME: require('../node_IA/BORME/IA_Actions.js')
        },
        _IAparameters: {
            min_TRelations:25
        },
        listen: function (io) {
            //const _f = 
            //const _this = this
            io.on('connection', function (socket) {
                console.log('IO Connect ' + socket.id)
               
                socket.on('add', function (_data) {
                    
                    app._io.functions.BORME.add(app._io.functions.BORME.tools.add, app, options, _data, app._io._IAparameters,  function () {                            
                        _data = null
                    })
                })
                socket.on('update', function (_data) {
                    
                    app._io.functions.BORME.update(app._io.functions.BORME.tools.update, app, options, _data, app._io._IAparameters, function () {
                        _data = null
                    })
                })
                socket.on('movimiento', function (_data) {
                    
                    app._io.functions.BORME.movimiento(app._io.functions.BORME.tools.movimiento, app, options, _data, app._io._IAparameters, function () {
                        _data = null
                    })
                })
                socket.on('relacion', function (_data) {
                    
                    app._io.functions.BORME.relacion(app._io.functions.BORME.tools.relacion, app, options, _data, app._io._IAparameters, function () {
                        _data = null
                    })
                })

            })
            //callback(io)
        }
    }
    //return _this
}