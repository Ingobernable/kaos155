module.exports = function (app, options) {

    return {
        child_process: require('child_process'),
        functions: {
            BORME: require('../node_IA/BORME/IA_Actions.js')
        },
        data: function () { return [
                { name: 'add', action: "../node_IA/BORME/add_Data.js" },
                { name: 'update', action: "../node_IA/BORME/update_Data.js" },
                { name: 'movimiento', action: "../node_IA/BORME/update_Data.js" }
            ]
        },
        _IAparameters: {
            min_TRelations:25
        },
        ejec: function (_this,_func, _data) {
            //console.log(options)
            _func(app, options,_data,_this._IAparameters)
        },
        listen: function (io, callback) {
            const _f = this.ejec
            const _this = this
            io.on('connection', function (socket) {
                console.log('IO Connect ' + socket.id)
                //console.log(_this.data())
                app._.each(_this.data(), function (e) {
                    //console.log (e.name)
                    socket.on(e.name, function (data) {
                        data.command = e.name
                        //console.log(data.type,_this.functions[data.type], e.name) //data.type, e.action, _this.functions[data.type][e.action])
                        _f(_this, _this.functions[data.type][e.name], data)
                    })
                })

            })
            callback(io)
        }
    }
}