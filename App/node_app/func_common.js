module.exports = function (app, callback) {

    //var _this = this

    return {
        
        lastupdate: Date.now(),
        askToServer: function (options, requestOptions, data, callback) {
            //console.log("\n"+requestOptions.uri)
            if (requestOptions.uri.file == null) {
               
                this.lastupdate = Date.now()
                var _d = new Date()
                if (requestOptions.uri.indexOf("=")==-1){
                    var _bolet = requestOptions.uri.split("/")[requestOptions.uri.split("/").length - 1].split(".")[0]
                } else {
                    var _bolet = requestOptions.uri.split("=")[1]
                }
                if (data.type != "BORME") {
                    var _boletin = data._analisis != null ? data._analisis.length > 0 ? data._analisis[data.e][data.type].trim() : _bolet : _bolet // data.type+"-"+data.desde
                } else {
                    if (requestOptions.uri.split("/")[requestOptions.uri.split("/").length - 1].indexOf("=") > 0) {
                        var _boletin = requestOptions.uri.split("/")[requestOptions.uri.split("/").length - 1].split("=")[1]
                    } else {
                        var _boletin = requestOptions.uri.split("/")[requestOptions.uri.split("/").length - 1].split(".")[0]
                    }
                }
                    //console.log("\n" + app.moment().format('MMM D, HH:MM:SS') + "->" + requestOptions.uri)
                //leemos el documento SUMARIO
                app.request.get(requestOptions, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                    //if (body != null) {
                        if (body.length > 0) {
                            if (requestOptions.encoding == null) {
                                callback(options, body, data)
                            } else {
                                if (body.toString().indexOf('encoding="') > -1 || body.toString().indexOf('meta charset') > -1) {
                                    callback(options, options.iconv.decode(new Buffer(body), options.Rutines(options).ISO(body.toString())), data, response.statusCode)
                                } else {
                                    debugger
                                    console.log("ERROR " + requestOptions.uri + ' response sin encoding valido')
                                    callback(_this, null, data, response.statusCode)
                                }
                            }
                        } else {
                             //requestOptions.uri.split("/")[requestOptions.uri.split("/").length-1].split(".")
                            cadsql = "INSERT INTO errores (BOLETIN, SqlMensaje, SqlError) VALUES ('" + _boletin + "','PDF VACIO','" + requestOptions.uri + "')"
                            app.BOLETIN.SQL.db.query(cadsql, function(err,rec){
                                process.stdout.write("xxx")
                                callback(_this, null, data, response.statusCode)
                            })
                        }
                    } else {
                        //debugger
                        console.log("ERROR " + requestOptions.uri )
                        setTimeout(function () { 
                            console.log('delay ok.')
                            if (response.statusCode == 404)
                                debugger
                            callback(_this, null, data, response.statusCode)
                        }, app.timeDelay)

                    }

                })
            } else {

            }
        },
        ISO: function (body) {

            var py = body.toString().indexOf('encoding="') > 0 ? body.toString().indexOf('encoding="') + 10 : body.toString().indexOf('meta charset') + 14
            var pf = body.toString().indexOf('encoding="') > 0 ? body.toString().indexOf('?', 2) : body.toString().indexOf('/>', py) - 1
            //debugger
            return body.toString().substr(py, pf - py - 1)
        },
        XmlToDom: function (xml) {
            return app.cheerio.load(xml, {
                withDomLvl1: true,
                normalizeWhitespace: true,
                xmlMode: true,
                decodeEntities: false
            })
        },
        xmlToJson: function (xml) {

            // Create the return object
            x = _this

            var obj = {};

            if (xml.nodeType == 1) { // element
                // do attributes
                if (xml.attributes.length > 0) {
                    obj["@attributes"] = {};
                    for (var j = 0; j < xml.attributes.length; j++) {
                        var attribute = xml.attributes.item(j);
                        obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
                    }
                }
            } else if (xml.nodeType == 3) { // text
                obj = xml.nodeValue;
            }

            // do children
            if (xml.hasChildNodes()) {
                for (var i = 0; i < xml.childNodes.length; i++) {
                    var item = xml.childNodes.item(i);
                    var nodeName = item.nodeName;
                    if (typeof (obj[nodeName]) == "undefined") {
                        obj[nodeName] = _this.Rutines().xmlToJson(item);
                    } else {
                        if (typeof (obj[nodeName].push) == "undefined") {
                            var old = obj[nodeName];
                            obj[nodeName] = [];
                            obj[nodeName].push(old);
                        }
                        obj[nodeName].push(_this.Rutines().xmlToJson(item));
                    }
                }
            }
            return obj;
        },
        getCleanedString: function (cadena) {
            // Definimos los caracteres que queremos eliminar
            var specialChars = "!@#$^&%*()+=-[]\/{}|:<>?,.";

            // Los eliminamos todos
            for (var i = 0; i < specialChars.length; i++) {
                cadena = cadena.replace(new RegExp("\\" + specialChars[i], 'gi'), '');
            }

            // Lo queremos devolver limpio en minusculas
            // cadena = cadena.toLowerCase();

            // Quitamos espacios y los sustituimos por _ porque nos gusta mas asi
            // cadena = cadena.replace(/ /g, "_");

            cadena = cadena.replace(/á/gi, "a");
            cadena = cadena.replace(/é/gi, "e");
            cadena = cadena.replace(/í/gi, "i");
            cadena = cadena.replace(/ó/gi, "o");
            cadena = cadena.replace(/ú/gi, "u");

            //cadena = cadena.replace(/�/gi, "a");
            //cadena = cadena.replace(/�/gi, "e");
            //cadena = cadena.replace(/�/gi, "i");
            //cadena = cadena.replace(/�/gi, "o");
            //cadena = cadena.replace(/�/gi, "u");
            //cadena = cadena.replace(/�/gi, "n");
            return cadena;
        },
        filewalker: function (dir, done) {
            var _this = this
            let results = [];

            app.fs.readdir(dir, function (err, list) {
                if (err) return done(err);

                var pending = list.length;

                if (!pending) return done(null, results);

                list.forEach(function (file) {
                    file = path.resolve(dir, file);

                    app.fs.stat(file, function (err, stat) {
                        // If directory, execute a recursive call
                        if (stat && stat.isDirectory()) {
                            // Add directory to array [comment if you need to remove the directories from the array]
                            results.push(file);

                           _this. filewalker(file, function (err, res) {
                                results = results.concat(res);
                                if (!--pending) done(null, results);
                            });
                        } else {
                            results.push(file);

                            if (!--pending) done(null, results);
                        }
                    });
                });
            });
        },
        normalizeTextContrato: function (arrayT, _keys, callback) {
            var _iniline = [":"]
            var _finline = ["."]
            var _lines = []
            var preline = ""

            valInKeys = function (text, _keys) {
                var _found = 0
                var _n = 0
                _.forEach(_keys, function(value){
                    _n++
                    if(text.indexOf(value)>-1)
                        _found = _n
                })
                return _found 
            }

            debugger

            _.forEach(arrayT, function(value){
                var _lchar = value.substr(value.length - 1, 1)
                if ((value.match(/^\d{1,2}\./) || []).length ==0) {

                    if ((value.match(/^\w{1}\)/) || []).length > 0) {
                        if (_finline.indexOf(_lchar) > -1) {
                            if (valInKeys(value, _keys))
                                _lines[_lines.length] = value.substr(3, value.length)
                        } else {
                            preline = value 
                        }
                    } else {
                        if (_finline.indexOf(_lchar) > -1) {
                            var _valp = valInKeys(preline, _keys)
                            if (_valp>0)
                                if (_valp < _keys.length) {
                                    _lines[_lines.length] = preline.substr(3, preline.length - 2) + ' ' + value
                                } else {
                                    var _v = preline.substr(3, preline.length - 2) + ' ' + value
                                    _lines[_lines.length] = 'firma: '+_v.split(_keys[_keys.length-1])[1].split(",")[1]
                                }

                            preline=''
                        } else {
                            preline = preline + value
                        }
                        //debugger
                    }
                }

            })
            callback(_lines)
            //debugger
        }
    }
    
}