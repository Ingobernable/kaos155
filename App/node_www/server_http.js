module.exports = function (app, callback) {

    console.log('www server 0.0.1')

    app.process.port = ((app.TypeBoletines.indexOf(app.Type)+2) + app.anyo) * 1

    var express = require('express');
    //var serveStatic = require('serve-static')

    var www = express();
    var server = app.http.createServer(www);
    var io = require('socket.io')(server);
    
   // www.use(serveStatic('www/public/css', {'index': ['index.html', 'index.htm']}))
    //www.use('js', express.static(__dirname + '\www\public\js'))
    //www.use(express.static( '/node_modules'));

    www.get('/css/*', function (req, res) {
        res.sendFile(__dirname + '/www/public/'+ req.url);
    })
    www.get('/js/*', function (req, res) {
        res.sendFile(__dirname + '/www/public/' + req.url);
    })

    //www.get('/', function (req, res) {
    //    res.send('Hello World!');
    //});
    www.get('/' + app.Command + '/' + app.Type, function (req, res) {
       res.sendFile(__dirname + '/www/_index.html');
    });
    

    
    server.listen(app.process.port, function (err) {
        app._io.listen(io, function(io){
            console.log('www ' + app.command + ' listening on port 3' + app.anyo + '!');
            callback(io)
        })
    });
}