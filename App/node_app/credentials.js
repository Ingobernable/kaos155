module.exports = function (app) {


    return {
        encryptor : require('simple-encryptor')("bbdd_kaos155_text"),
        getlogsparamsfromfile: function (_file, _cberr, _cb) {
            const _this = this
            app.fs.readFile(app.path.normalize('sqlfiles/x_' + _file + '.json'), function (err, _JSON) {
                if (err) {
                    _cberr()
                } else {
                    try {
                        var _sql = JSON.parse(_JSON.toString())
                    }
                    catch (e) {
                        console.log('error en el fichero de Credenciales ' + _file + '  no valido, sistema detenido', e)
                        process.exit(1)
                    }
                    _sql.password = _this.encryptor.decrypt(_sql.password)
                    _cb(_sql)
                }
            })
        },
        savelogsparamstofile: function (_file, resp, db, _cb) {
            var _credenciales = {
                host: resp.host,
                user: resp.user,
                password: this.encryptor.encrypt(resp.password),
                database: db,
                multipleStatements: true,
                waitForConnection: true,
            }
            app.fs.writeFile(app.path.normalize('sqlfiles/x_' + _file + '.json'), JSON.stringify(_credenciales), function (err, _JSON) {
                console.log("\x1b[32m Nuevas credenciales de acceso "+_file+ " guardadas OK \x1b[0m");
                _cb(_credenciales)
            })
        }
    }
}