module.exports = function (app) {
    function Trim(x) {
        if (x == null)
            debugger
        return x.replace(/^\s+|\s+$/gm, '');
    }
    function pointer  (point, cadena) {
        var _numero = " .0123456789"
        while (_numero.indexOf(cadena.substr(point, 1)) > -1 && point > -1) {
            point--
        }
        return (point)
    }

    function getUrlDeBocm(url, id) {
        var _cod = id.split("-")
        var _aaaa = _cod[1].substr(0, 4)
        var _mm = _cod[1].substr(4, 2)
        var _dd = _cod[1].substr(6, 2)
        debugger
        return url+ '/' + _aaaa + '/' + _mm + '/' + _dd + '/' + id + '.PDF'

    }

    // Changes XML to JSON
    function xmlToJson(xml) {

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
                    obj[nodeName] = xmlToJson(item);
                } else {
                    if (typeof (obj[nodeName].push) == "undefined") {
                        var old = obj[nodeName];
                        obj[nodeName] = [];
                        obj[nodeName].push(old);
                    }
                    obj[nodeName].push(xmlToJson(item));
                }
            }
        }
        return obj;
    };

    return {
        get: function (id, data, Jparams, callback) {
            var url = app.Boe.url + id.split("-")[0].toLowerCase()+ "/xml.php?id=" + id
            //app.child_process.execSync("sleep 5");
            //console.log(url, data.counter)
            app.Boe.askToBoe(app, url, data, Jparams, function (app, body, data, Jparams) {
                callback(app, body, data , Jparams)
            }, id )
        },
        askToBoe: function (app, url, data, socket, callback) {
                console.log(url)
                app.request(url, function (req, res, body) {
                    callback(app, body, data, socket)
                })
        },
        XmlToDom: function (xml) {
            return app.cheerio.load(xml, {
                    withDomLvl1: true,
                    normalizeWhitespace: true,
                    xmlMode: true,
                    decodeEntities: false
            })
        },
        get: {
            principal: function ($) {
                console.log($('analisis modalidad').html())
                //if ($('analisis modalidad').html() == "Formalización contrato")
                //    debugger
                return {
                    id: $('analisis tipo').attr('codigo'),
                    text: $('analisis tipo').html(),
                    urlPdf: $('metadatos url_pdf').html()
                }
            },
            data: function (data) {
                try {
                    return {
                        _BOE: data._list[data.e],
                        _cod: data.codigo.id,
                        _type: data.codigo.text,
                        _tramitacion: '',
                        urlPdf: data.codigo.urlPdf,
                        urlXml: app.Boe.url + data._list[data.e].split("-")[0].toLowerCase() + "/xml.php?id=" + data._list[data.e],
                        Contratista: [],
                        Importe: []
                    }
                }
                catch (err) {
                    debugger
                }
            },
            p_parrafo: function ($, charEnd, body) {
                var _lastParragraf = true
                var _arr = []

                var DOMParser = require('xmldom').DOMParser
                var xml = new DOMParser().parseFromString(body)
                var _json = xmlToJson(xml)
                var _areas = []
                var _content = []

                if (_json.documento.texto.dl != null) {
                    //debugger
                    for (i in _json.documento.texto.dl.dt) {
                        _areas[i] = _json.documento.texto.dl.dt[i]['#text']
                        _content[i] = []
                    }
                    for (i in _areas) {
                        if (_json.documento.texto.dl.dd[i].dl != null) {
                            //debugger
                            for (e in _json.documento.texto.dl.dd[i].dl.dd) {
                                if (_json.documento.texto.dl.dd[i].dl.dt[e] == null) {
                                    _content[i][e] = _json.documento.texto.dl.dd[i].dl.dd[e]['#text']
                                } else {
                                    _content[i][e] = _json.documento.texto.dl.dd[i].dl.dt[e]['#text']
                                    _content[i][e] = _content[i][e] + _json.documento.texto.dl.dd[i].dl.dd[e]['#text']
                                }
                            }
                        } else {
                            _areas[i] = _areas[i] + _json.documento.texto.dl.dd[i]['#text']
                        }
                    }
                    for (i in _areas) {
                        _arr[_arr.length] = _areas[i]

                        if (_content[i].length > 0)
                            for (e in _content[i]) {
                                _arr[_arr.length] = _content[i][e]
                            }
                                
                    }
                        
                        
                }


                $('p.parrafo').each(function (p, _parraf) {
                    var _t = Trim($($('p.parrafo')[p]).html())
                    if (_t.length > 0) {
                        if (_t.indexOf(')') == 1 || _t.indexOf('.') == 1 || _lastParragraf) {
                            _arr[_arr.length] = _t
                        } else {
                            _arr[_arr.length - 1] = _arr[_arr.length - 1] + ' ' + _t
                        }
                        _lastParragraf = (_t.lastIndexOf(charEnd) == _t.length - 2)
                    }
                })

                return _arr
            }
        },
        transforms: function (_array, _regexp) {
            if (_regexp!=null)
                //for (i in _array) {
                for (p in _regexp) {

                    if (_regexp[p][0] == 'F') {
                            
                            _array = _regexp[p][1].f(_array, _regexp[p][2], _regexp[p][3])
                            
                    } else {
                        //console.log(_array, p)
                        //if (p == 9)
                            //debugger
                        _array = _array.replace(_regexp[p][1], _regexp[p][2] )
                            //console.log(_array, p)
                    }
                        
                        
                }
                //}
            return _array
        },
        extract: function (_arrayText, search, transforms) {
            //var _arr = []

            for (i in _arrayText) {
                //console.log(_arrayText[i])
                if (_arrayText[i].toLowerCase() != null)
                    if (_arrayText[i].toLowerCase().indexOf(search.toLowerCase()) > -1) {
                        _arrT = _arrayText[i].split(":")
                        if (_arrT.length > 1) {
                            if (_arrT[1].length>1)
                                return app.Boe.Rutines.transforms(_arrT[1], transforms)
                        }
                    }
            }
            return ""
            
        },
        removeLastChar: function (string, char) {
            if (string.lastIndexOf(char) == string.length - 1)
                string = string.substr(0, string.length - 2)
            return string
        }
    }
}