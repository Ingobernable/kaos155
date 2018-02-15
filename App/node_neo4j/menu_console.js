module.exports = function (app, _callback) {

    const options = function (_callback) {

        if (app.fs.existsSync(__basedir + "/sqlfiles/neo4j/cred_neo4j.json")) {
            app.credentials.getparamsfromfile('neo4j/cred_neo4j', function (err) {
                debugger
            }, function (resp) {
                app.neo4j = { obj: require("./Common_Neo4j.js")(app) }
                app.neo4j.obj.driver = app.neo4j_sys.driver('bolt://' + resp.host, app.neo4j_sys.auth.basic(resp.user, resp.password), {
                    encrypted: 'ENCRYPTION_OFF'
                })
                app.neo4j.obj.driver.onCompleted = function () {
                    //debugger
                    _callback(app)
                }
                app.neo4j.obj.session = app.neo4j.obj.driver.session();
            })
        
        } else {
            app.inquirer.prompt([

                { type: 'input', name: 'host', message: 'neo4db IP:port', default: 'localhost' },
                { type: 'input', name: 'user', message: 'neo4db user', default: 'neo4j' },
                { type: 'password', name: 'password', message: 'neo4db password' }

            ]).then(function (resp) {

                app.neo4j =  require("./Common_Neo4j.js")(app)
                app.neo4j.obj.driver = app.neo4j_sys.driver('bolt://' + resp.host, app.neo4j_sys.auth.basic(resp.user, resp.password), { encrypted: 'ENCRYPTION_OFF' })
                app.neo4j.obj.driver.onCompleted = function () {
                    console.log('Neo4js Driver created');
                    //debugger
                    app.credentials.saveparamstofile('neo4j/cred_neo4j', resp, null, function (_credenciales) {
                        _callback(app)
                    })
                };
                app.neo4j.obj.driver.onError = function (error) {
                    console.log(error);
                };
                app.neo4j.obj.session = app.neo4j.obj.driver.session();

            })

        }
    }
    options(_callback)
}