console.log('www server 0.0.1')

//app.process.port = ((app.TypeBoletines.indexOf(app.Type) + 2) + app.anyo) * 1
var App = {
    express : require('express'),
    http : require('http'),
    fs: require("fs"),
    path: require('path'),
    mysql: require('mysql'),
    inquirer: require('inquirer'),
}

require('./node_app/sql_common.js')(App, function (SQL) {
    SQL.init({ SQL: { db: null } }, 'PARSER', 'ACCESO_mysql_PARSER', function (options) {
        var www = App.express();
        var server = App.http.createServer(www).listen(80);

        www.get('/css/*', function (req, res) {
            res.sendFile(__dirname + '/www/public/' + req.url);
        })
        www.get('/js/*', function (req, res) {
            res.sendFile(__dirname + '/www/public/' + req.url);
        })
        www.get('/tree/*', function (req, res) {
            var file = __dirname + '/node_www/www/tree.html'
            App.fs.readFile(file, function (err, data) {

                data = data.toString().replace('@key', req.path.split("/")[req.path.split("/").length - 1])
                res.send(data)

            })
        });
        www.get('/relaciones/*', function (req, res) {
            //debugger
            var _key = req.path.split("/")[req.path.split("/").length - 1]
            options.SQL.db.query("SELECT * FROM borme_tree where _key = ? ", [_key], function (err, record) {
                if(record.length>0)
                    res.send(record[0]._tree)
            })
        });
    })
})