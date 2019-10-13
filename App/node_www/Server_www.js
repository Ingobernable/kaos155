module.exports = function (app, callback) {


    console.log('www server 0.0.1')

    app.process.port = 80

    var express = require('express');
    //var serveStatic = require('serve-static')

    var www = express();
    var server = app.http.createServer(www);
    var io = require('socket.io')(server);

    // www.use(serveStatic('www/public/css', {'index': ['index.html', 'index.htm']}))
    //www.use('js', express.static(__dirname + '\www\public\js'))
    //www.use(express.static( '/node_modules'));

    www.get('/css/*', function (req, res) {
        res.sendFile(__dirname + '/www/public/' + req.url);
    })
    www.get('/js/*', function (req, res) {
        res.sendFile(__dirname + '/www/public/' + req.url);
    })

    www.get('/', function (req, res) {
        var file = __dirname + '/www/index.html'
        app.fs.readFile(file, function (err, data) {

            data = data.toString().replace('@key', req.path.split("/")[req.path.split("/").length - 1])
            res.send(data)

        })
    });

    www.get('/search/*', function (req, res) {
        var _p = req._parsedUrl.href.replaceAll("--", "-").replaceAll("-", " ").replaceAll("  ", " ").split("/")
        app.commonSQL.SQL.www.search(app.commonSQL.SQL, app.commonSQL, _p[2], _p[3], function (err, record) {
            if (err == null) {
                var _out = []
                app._.forEach(record, function (value) {
                    _out[_out.length] = JSON.parse(value.root)
                })
                res.send(_out)
            }
        });

    })

    server.listen(app.process.port, function (err) {
        app._io.listen(io, function (io) {
            console.log('www ' + app.command + ' listening on port 3' + app.anyo + '!');
            callback(io)
        })
    });
}