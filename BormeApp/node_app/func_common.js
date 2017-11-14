module.exports = function (app, callback) {


    return {
        lastupdate: Date.now(),
        askToServer: function (options, requestOptions, data, callback) {
            //console.log("\n"+requestOptions.uri)
            if (requestOptions.uri.file == null) {
               
                this.lastupdate = Date.now()
                var _d = new Date()
                var _bolet = requestOptions.uri.split("/")[requestOptions.uri.split("/").length - 1].split(".")[0]
                if (data.type != "BORME") {
                    var _boletin = data._analisis != null ? data._analisis.length > 0 ? data._analisis[data.e][data.type].trim() : _bolet : _bolet // data.type+"-"+data.desde
                } else {
                    var _boletin = requestOptions.uri.split("/")[requestOptions.uri.split("/").length - 1].split("=")[1]
                }
                    //console.log("\n" + app.moment().format('MMM D, HH:MM:SS') + "->" + requestOptions.uri)
                //leemos el documento SUMARIO
                app.request.get(requestOptions, function (req, res, body) {
                    if (body != null) {
                        if (body.length > 0) {
                            if (requestOptions.encoding == null) {
                                callback(options, body, data)
                            } else {
                                //var iconv = new app.Iconv('ISO-8859-1','UTF-8')
                                if (body.toString().indexOf('encoding="') > -1 || body.toString().indexOf('meta charset') > -1) {
                                    callback(options, _this.iconv.decode(new Buffer(body), _this.Rutines().ISO(body.toString())), data)
                                } else {
                                    debugger
                                    console.log("ERROR " + requestOptions.uri + ' response sin encoding valido')
                                    callback(_this, null, data)
                                }
                            }
                        } else {
                             //requestOptions.uri.split("/")[requestOptions.uri.split("/").length-1].split(".")
                            cadsql = "INSERT INTO errores (BOLETIN, SqlMensaje, SqlError) VALUES ('" + _boletin + "','PDF VACIO','" + requestOptions.uri + "')"
                            app.BOLETIN.SQL.db.query(cadsql, function(err,rec){
                                process.stdout.write("xxx")
                                callback(_this, null, data)
                            })
                        }
                    } else {
                        //debugger
                        console.log("ERROR " + requestOptions.uri + ' response ' + req)
                        setTimeout(function () { 
                            console.log('delay ok.')
                            callback(_this, null, data)
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
                        obj[nodeName] = _this.Rutines(_this).xmlToJson(item);
                    } else {
                        if (typeof (obj[nodeName].push) == "undefined") {
                            var old = obj[nodeName];
                            obj[nodeName] = [];
                            obj[nodeName].push(old);
                        }
                        obj[nodeName].push(_this.Rutines(_this).xmlToJson(item));
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
        }
    }
    
}