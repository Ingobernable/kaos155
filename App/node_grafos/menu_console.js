module.exports = function (app, _callback) {

    const options = function (_callback) {

        if (app.fs.existsSync(__basedir + "/sqlfiles/grafos/cred_grafos.json")) {
            app.credentials.getparamsfromfile('grafos/cred_grafos', function (err) {
                debugger
            }, function (resp) {
                app.grafos = { obj: require("./common_grafos.js")(app) }
                app.grafos.obj.driver = app.grafos_sys.driver('bolt://' + resp.host, app.grafos_sys.auth.basic(resp.user, resp.password), {
                    encrypted: 'ENCRYPTION_OFF'
                })
                app.grafos.obj.driver.onCompleted = function () {
                    //debugger
                    _callback(app)
                }
                app.grafos.obj.session = app.grafos.obj.driver.session();
            })
        
        } else {
            app.inquirer.prompt([

                { type: 'input', name: 'host', message: 'neo4db IP:port', default: 'localhost' },
                { type: 'input', name: 'user', message: 'neo4db user', default: 'grafos' },
                { type: 'password', name: 'password', message: 'neo4db password' }

            ]).then(function (resp) {

                app.grafos =  require("./common_grafos.js")(app)
                app.grafos.obj.driver = app.grafos_sys.driver('bolt://' + resp.host, app.grafos_sys.auth.basic(resp.user, resp.password), { encrypted: 'ENCRYPTION_OFF' })
                app.grafos.obj.driver.onCompleted = function () {
                    console.log('grafoss Driver created');
                    //debugger
                    app.credentials.saveparamstofile('grafos/cred_grafos', resp, null, function (_credenciales) {
                        _callback(app)
                    })
                };
                app.grafos.obj.driver.onError = function (error) {
                    console.log(error);
                };
                app.grafos.obj.session = app.grafos.obj.driver.session();

            })

        }
    }
    options(_callback)
}