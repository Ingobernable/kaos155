module.exports = function (app) {

    return {
        child_process : require('child_process'),
        data: function () { return [
                { name: 'add', action: "node_IA/BORME/add_Data.js" }
            ]
        },
        ejec: function (_this,js, _data) {
            //console.log(_this.child_process)
            var workerProcess = _this.child_process.spawn('node', [js, _data.e,_data.k], {
                cwd: process.cwd(),
                detached: true
            });
            workerProcess.stdout.on('data', function (data) {
                console.log('IA->: ' + data.toString());
            });
        },
        listen: function (io, callback) {
            const _f = this.ejec
            const _this = this
            io.on('connection', function (socket) {
                console.log('IO Connect ' + socket.id)
                console.log(_this.data())
                app._.each(_this.data(), function (e) {
                    console.log (e.name)
                    socket.on(e.name, function (data) {
                        //console.log(e.name + 'received')
                        _f(_this, e.action,data)
                    })
                })

            })
            callback(io)
        }
    }
}