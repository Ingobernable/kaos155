'use strict';

console.log('KAOS155 PDF STORE SYSTEM');
const { spawn } = require('child_process');
const cheerio = require('cheerio')
var _ = require('lodash')
var _this = this

var argsIN = [80]

if (process.env['KAOS_PDF_STORE_PORT'] != null) {
    argsIN = [process.env['KAOS_PDF_STORE_PORT']]
}

if (argsIN.length == 0) {
    argsIN = process.argv.slice(2)
    if (argsIN.length == 0) {
        console.log("ERROR : especifique el puerto de escucha web")
        process.exit(1)
    }
}
var App = {
    reconnect : 0,
    TikaServer: 'http://localhost:9998/tike',
    PDFStore:"../DataFiles/_almacen/PDF/",
    TikaJar:'tika-server-1.16',
    port: argsIN[0],
    path: require('path'),
    express: require('express'),
    exec: require('child_process').exec,
    request:require('request'),
    shorter:require("shorthash"),
    fs:require('fs'),
    zlib:require('zlib'),
    mkdirp:require('mkdirp'),
    Rutines: function (app) {
       
        return require('./node_app/func_common.js')(app)
    },
    isWin: /^win/.test(process.platform),
    getPdfText:function(app,_file, callback){
    
        var Tika = require('node-tika');
        var tika = new Tika();
        var options = {

            // Hint the content-type. This is optional but would help Tika choose a parser in some cases.
            contentType: 'application/pdf'
        };

        tika.text(_file, options, function(err, text) {
            debugger
            console.log(text);
        });

        return

       // var _command = app.appPath + 'curl -i -H "fileUrl:"' + fileUrl + ' -H "Accept:application/pdf" -X PUT ' + app.TikaServer
        var _command = app.appPath + 'curl -X PUT --data-binary ' + _file + ' ' + app.TikaServer + ' --header "Content-type: application/pdf" ' 
        var _lin = []
        app.exec(_command, function (err, data) {
            const $ = cheerio.load(data, {
                withDomLvl1: true,
                normalizeWhitespace: false,
                xmlMode: true,
                decodeEntities: false
            });
            var x = $('p')
            _.forEach(x, function (value) {
                if ($(value).html())
                    _lin[_lin.length] = $.parseHTML($(value).html())[0].data //.normalize()

                ///debugger
            })
            callback(_lin)
        });
    
    
    },
    getRemotePdf:function(app,domain, fileUrl, callback){
        var _path =  app.path.normalize(app.path.dirname(__filename) +"\\"+ app.PDFStore + domain.split("//")[1])
        var _file = _path + "\\" + app.shorter.unique(fileUrl)+".pdf"
        app.mkdirp(_path, function (err) {
            var _r = app.request(fileUrl).on('response', function (res) {
                res.pipe(app.fs.createWriteStream(_file));
                //debugger
            }).on('end', function(err, res){
                setTimeout(function(){
                    app.getPdfText(app,_file, function(arr_text){
                        callback(arr_text);
                    })
                },100)
            
            });
        })
        /*
        app.Rutines(app).askToServer(app, {uri:fileUrl,headers: { 'Content-type' : 'application/pdf' }} , {} , function (options, body, data) { 
            var _path =  app.path.normalize(app.path.dirname(__filename) +"\\"+ app.PDFStore + domain.split("//")[1])
            //var _file = _path + "\\" + app.shorter.unique(fileUrl)+".kaos"
            var _file = _path + "\\" + app.shorter.unique(fileUrl)+".pdf"
            //var bocm = turl[turl.length - 1].split(".")[0]

            //punto de guardado del PDF precepto
            if (body != null) {
                app.mkdirp(_path, function (err) {
                    //app.zlib.deflate(body, function(err,zbuffer){
                    app.fs.writeFile(_file, body, 'binary', function (err) {
                        if(err)
                            debugger
                        app.getPdfText(app,_file, function(arr_text){
                            callback(arr_text);
                        })  
                    })
                    //})
                })
            }

        })
        */
    },
    init: function (app) {

        var webapp = app.express();

        webapp.get(['/http://*','/https://*'], function (req, res) {
            var url = req.originalUrl
            var type = url.toLowerCase().indexOf(".pdf") > -1 ? url.toLowerCase().split(".pdf")[1] : null
            var file=""

                //var url = ''//url.indexOf("/") > -1 ? url.split("?")[0] : null
                if ( url.indexOf("/") > -1) {
                    var origin = url.split("/")
                    if (origin[1].indexOf("http")==0) {
                        if( origin[2].length==0)
                            var e = 1
                        
                        var domain = origin[1] + (origin[1].indexOf(":")>-1 ? ("//"+ origin[2+e]) : ("://" + origin[2+e] + "." + origin[3+e] + "." + origin[4+e]) )
                        origin = origin.slice(5-e, origin.length)
                        var file = domain + '/' + origin.join("/")
                        console.log(url, file)
                        app.getRemotePdf(app, domain, file, function(arr_text){
                            res.send(arr_text.join("<br>"));
                        })

                    } else {
                        res.send('url mal formada falta http o https de destino')
                    }
                } else {
                    res.send('url mal formada')
                }
            //} 

            //console.log(url)
            //debugger
        })
        console.log('escuchando en puerto '+ app.port)
        webapp.listen(app.port)
    },
    TestTikaServer: function (app,TestServer, callback) {
        //inicializamos els erver
        callback(app)
        return

        app.appPath = app.isWin ? app.path.normalize(app.path.dirname(__filename) + '/bin/win/') : ''
        var _command = app.appPath + 'curl ' + app.TikaServer
        app.exec(_command, function (err, data) {
            if (err && app.reconnect < 3) {
                app.reconnect++
                const ls = spawn('java',[ '-jar' , app.path.normalize(app.path.dirname(__filename) + '/bin/jar/' + app.TikaJar + '.jar')])
                setTimeout(function(){ 
                    TestServer(app, TestServer,callback)
                },1000)
            }else{
                callback(app)
            }
        });
    }
}

App.TestTikaServer(App, App.TestTikaServer, function (app) { 
    
    app.init(app)
})