module.exports = function (app, folder ) {
    var server = {
        _date: new Date(),
        folderWeb: folder,
        _ext : {
            woof: 'application/font-woff',
            woff2: 'application/font-woff2',
            ttf: 'application/octet-stream',
            otf: 'application/x-font-opentype',
            eot: 'application/vnd.ms-fontobject',
            svg: 'image/svg+xml',
            js: 'text/javascript',
            css: 'text/css',
            json: 'application/json',
            png: 'image/png',
            jade: 'text/html',
            map: 'text/html',
            xml: 'application/xml',
            jsx: 'application/json',
            pdf: 'application/pdf'
        },
        listener: function (request, response, secureContext) {
            _this = this
            if (request.url == '/stop') {
                process.exit(1);
            } else {
                request.addListener('end', function () {
                    if (request.headers.host != null) {
                        //var _domain = secureContext.Domains._list[request.headers.host.split('.').join("_")]
                        //if (_domain != null)
                        if (request.url.indexOf('/vsf') > -1 && app.responseHttp.vs_Service != null ) {
                            var x = request.url.split("/")
                            if (x[2] == "Empresa" || x[2] == "Directivo")
                                if (x[3] == 'Relaciones') {
                                    app.responseHttp.vs_Service.getRelaciones(x[2], x[4], response)
                                } else {
                                    app.responseHttp.vs_Service.getdataId(x[2], x[3], response)
                                }
                        } else {

                            var file = _this.file(request.url)
                            if (file != null && request.url.indexOf('?SSL') == -1) {
                                if (file.url.indexOf('/vsr') > -1) {
                                    var x = file.url.split("/")
                                    debugger
                                }
                                if (file.url.indexOf('/bocm') > -1 || file.url.indexOf('/pdf') > -1) {
                                    if (request.method.toLowerCase() != 'post') {

                                        response.writeHead(200, { 'Content-Type': file.contentType });
                                        response.end('<html><head></head><body><form action="pdf" enctype="multipart/form-data" method="post" >' +
                                            '<input type="text" name="title"><br>' +
                                            '<input type="file" name="upload" multiple="multiple"><br>' +
                                            '<input type="submit" value="Upload">' +
                                            '</form></body></html>', 'utf-8');
                                    }
                                    //response.setHeader('Cache-Control', 'public, max-age=31557600');
                                } else {
                                    if (file.url.indexOf('/plugins') > -1) {
                                        response.setHeader('Cache-Control', 'public, max-age=31557600');
                                    }
                                    if (file.contentType != null)
                                        _this.serveFile(file, response, _this.getCallerIP(request))
                                }
                            } else {
                                response.writeHead(200, { 'Content-Type': 'text/html' });
                                response.end('<html><head></head><body></body></html>', 'utf-8')
                            }
                        }
                    //} else {
                        //if (contentType) {
                            //response.writeHead(200, { 'Content-Type': 'utf-8' });
                            //response.end(content);
                        /////}

                    }
                }).resume();
            }
        },
        ext: function (file) {
            //console.log(file)
            var extname = app.path.extname(file.split('?')[0]);
            var contentType = 'text/html';
            return {
                extname: extname,
                contentType: extname != null ? this._ext[extname.split(".")[1]] != null ? this._ext[extname.split(".")[1]] : contentType : contentType

            }
        },
        file: function ( url ) {
            //var _type = secureContext.Domains._type[_domain.split('.').join("_")]
            //var type = secureContext.Domains._types[_type]

            var filePath = '.' + url.split('?')[0];
            if (filePath == './') {
                filePath = '/index.html' // + secureContext.Domains._index[_type];
            } else {
                filePath = url.split('?')[0];
            }

            var file =  _this.folderWeb + filePath
            //console.log(file)
            var ext = this.ext(file)
            //console.log(file)
            var params = []
            if (url.split('?').length > 1)
                if (url.split('?')[1].length > 0) {
                    //console.log(app)
                    _params = app.urlencode.decode(url.split('?')[1], "gbk").split('&')
                    for (param in _params) {
                        params.push(_params[param].split('='))
                    }
                }
            //var _extname = 
            var _contentType = this.ext(file).contentType
            if (url.indexOf('proxy.jsx') > 0 && url.indexOf('?url=') > -1) {
                //var _extname = secureContext.ext(params[0][1].split('/')[params[0][1].split('/').length - 1].toLowerCase()).extname
                var _contentType = this.ext(params[0][1].split('/')[params[0][1].split('/').length - 1].toLowerCase()).contentType
            }


            return {
                //_domain: _domain,
                //_type: _type,
                //type: type,
                url: file,
                extname: this.ext(file).extname,
                params: params,
                contentType: _contentType
            }
        },
        serveFile: function (file, response, IP) {

            console.log(this._date.toISOString() + " [" + IP + "]" + file.url)
            app.fs.readFile(app.path.resolve(file.url), function (error, content) {
                if (error) {
                    if (error.code == 'ENOENT') {
                        console.log(error)
                        response.writeHead(404, 'No Encontrado');
                        response.write('404: Fichero no Encontrado!');
                        return response.end();
                    }
                    else {
                        response.writeHead(500);
                        response.end('Error en servidor, contacte con el administrador : ' + error.code + ' ..\n');
                        response.end();
                    }
                }
                else {
                    if (file.extname == '.jsx') {
                        //debugger
                        require('../' + file.url)(app, file, function (content) {
                            response.writeHead(200, { 'Content-Type': file.contentType });
                            response.end(content, 'utf-8');
                        })
                        //debugger
                    } else {
                        if (file.extname == '.jade') {
                            var _pre = process.platform == 'linux' ? '/var' : "D:"
                            console.log(process.platform)
                            var content = app.jade.render(content, {
                                filename: file.url, // _pre + '/NodeProyects/' + file._type + '/' + file._domain + '/' + file.type + '/img/jade.template/index.jade',
                                pretty: true
                            });
                        }

                        response.writeHead(200, { 'Content-Type': file.contentType });
                        response.end(content, 'utf-8');
                    }
                }
            });
        },
        getCallerIP: function (request) {
                var ip = request.headers['x-forwarded-for'] ||
                    request.connection.remoteAddress ||
                    request.socket.remoteAddress //||
                //request.connection.socket.remoteAddress;
                ip = ip.split('.')[0];
                ip = ip.split(':').slice(-1); //in case the ip returned in a format: "::ffff:146.xxx.xxx.xxx"
                return ip[0];
            }
        
    }

    return server
}