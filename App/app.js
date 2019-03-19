'use strict';
//////////////////////////////////////////////////////////////////////
//
// para activar la db de grafos grafosS, crear una carpeta vacia App/sqlfiles/grafos
//
global.__basedir = __dirname;
const pjson = require('./package.json');
console.log('kaos155 App - version -' + pjson.version + '.')
//debugger

var App = {
    version: pjson.version,
    ip_IA: function ( cb) {
        const _this = this
        const file = _this.path.normalize('sqlfiles/ia/iaioip.json')
        _this.fs.readFile(file, function (err, _JSON) {
            
            if (!err) {
                try {
                    JSON.parse(_JSON.toString())
                    //sqlPss = JSON.parse(_JSON.toString()).password
                }
                catch (e) {
                    console.log('error en el fichero de Credenciales socket-io ia, json no valido, sistema detenido', e)
                    _this.exit(function () { process.exit(1) })
                    //process.exit(1)
                }
                const _j = JSON.parse(_JSON.toString())
                _this.ip_ia = 'http://' + _j.host + ':' + _j.port
                cb(_this.ip_ia)
            } else {
                _this.inquirer.prompt([
                    { type: 'input', name: 'host', message: 'socket-io ia IP', default: 'localhost' },
                    { type: 'input', name: 'port', message: 'socket-io ia PORT', default: '8080' }

                ]).then(function (resp) {
                    _this.fs.writeFile(file, JSON.stringify(resp), function () {
                        console.log('sistema listo para con ia, vuelva a ejecutar de nuevo')
                        _this.exit(function () { process.exit(1) })
                    })
                })
            }
        })
    },
    //datos generales
    //_fileCredenciales: 'cred_',
    TypeBoletines: ["BORME", "BOE", "BOCM"],
    Commands: ['SCRAP', 'PARSER', 'GRAFOS', 'IA', 'EXIT'],
    Mins: { BOE: 2001, BOCM: 2010, BORME: 2009 },

    //Plugins
    _: require('lodash'),
    dns: require('dns'),
    net : require('net'),
    mysql: require('mysql'),
    iconv: require('iconv-lite'),
    request: require('request'),
    mkdirp: require('mkdirp'),
    cheerio: require('cheerio'),
    path: require('path'),
    fs: require("fs"),
    http: require('http'),
    moment: require("moment"),
    merge: require('merge'),
    inquirer: require('inquirer'),
    resolvePath: require('resolve-path'),
    aguid: require('aguid'),
    schedule: require('node-schedule'),
    child_process:require('child_process'),
    os: require("os"),
    exit: function (_func) {
        console.log("Pulse una tecla para terminar");
        process.stdin.setRawMode(true);
        process.stdin.resume();
        process.stdin.on('data', _func );
    },
    _returnfunc : function (app, options, data, ok) {
        if (ok || app.forever) {
            options._common.Actualize(options, options.Type, {}, app._returnfunc)
        } else {
            console.log("año " + (app.anyo - 1) + " terminado")
            
            app.exit( function () { process.exit(0) } )
            
        }
    }, 
    forever: false,
}



String.prototype.pad = function (size) {
    const s = "000000000" + this;
    return s.substr(s.length - size);
}

String.prototype.Between = function (init, last, contains, not) {
    let string = this.toString()
    let _exit = ""
    let _i = 0
    let pf = 0
    let pi = 0
    while (string.indexOf(last, _i) > 0) {
        let _str = ""
        let pf = pi = string.indexOf(last, _i)
        while (pi > 0 && string.substr(pi, 1) != init) {
            let char = string.substr(pi, 1)
            if (char != not)
                _str = char + _str
            pi--
        }
        if (_str.indexOf(contains) > -1)
            _exit = _.trim(_str.substr(0, _str.indexOf(contains))) + (_exit.length > 0 ? ';' : '') + _exit
        string = string.substr(pf + 1, string.length)
    }
    return _exit.length > 0 ? _exit : null
};
String.prototype.replaceAll = function (target, replacement) {
    return this.split(target).join(replacement);
};
String.prototype.indexOfRegex = function (regex) {
    const match = this.match(regex);
    return match ? this.indexOf(match[0]) : -1;
};
String.prototype.lastIndexOfRegex = function (regex) {
    const match = this.match(regex);
    return match ? this.lastIndexOf(match[match.length - 1]) : -1;
};
String.prototype.capitalizeFirstLetter = function () {

    return this.charAt(0).toUpperCase() + this.toLowerCase().slice(1);
}
String.prototype.capitalizeAllFirstLetter = function () {
    var container = this.trim().split(" ")
    container.forEach( function (i, e) {
        container[e] = i.capitalizeFirstLetter()
    })
    return container.join(" ")
}
    App.credentials= require('./node_utils/credentials.js')(App)
    require("./node_app/menu_console.js")(App, process.argv.slice(2), function (app, myArgs, date, automatic, test) {

        
        //var machineId = App.os.networkInterfaces().Ethernet ? App.os.networkInterfaces().Ethernet[0].mac : App.os.networkInterfaces().eth0[0].mac


        const client = app.net.connect({ port: 80, host: "google.com" }, function() {
            console.log('ping google.com ok')
            console.log('MyIP=' + client.localAddress);
            console.log('MyPORT=' + client.localPort);
            //debugger
            let App = app.merge(app, {
                //idMachine: machineId,
                command: myArgs[0],
           
                update: myArgs[3],
                anyo: myArgs[0]=='IA'? null: !isNaN(myArgs[2]) ? myArgs[2] : date.getFullYear(),
                Command: myArgs[0],


                _lb: { BOCM: 5, BOE: 6, BORME: 8 },
                localAdress: client.localAddress,
                timeDelay: 1500,
                drop: false,
                SqlIP: test.host,
                urlBOE: 'http://81.89.32.200/',
                urlBORME: 'http://81.89.32.200/',
                urlBOCM: 'http://w3.bocm.es/boletin/CM',
                PDFStore: "../DataFiles/_almacen/PDF/",
                _xData: {
                    Sumario: {
                        BOE: { SUMARIO_LAST: '', SUMARIO_NEXT: 'BOE-S-20010102' },
                        BORME: { SUMARIO_LAST: '', SUMARIO_NEXT: 'BORME-S-20090102' },
                        BOCM: { SUMARIO_LAST: '', SUMARIO_NEXT: 'BOCM-S-20100212' }
                    },
                    TSUMARIOS: {
                        BOE: 0,
                        BORME: 0,
                        BOCM: 0
                    },
                    TBOE: 0,
                    TBORME: 0,
                    TBOCM: 0
                },
                _lData: {},
                poolSql: [],
                writeSync: function (app, string) {
                    app.fs.writeSync(process.stdout.fd, string+'\n')
                },
                Rutines: function (app) {
                    //_this = this
                    return require('./node_app/func_common.js')(app)
                },
                init: function (app, _cb) {
                    console.log('init ......')
                    require('./node_app/sql_common.js')(app, function (SQL) {
                        app.commonSQL = SQL
                        console.log('init OK')
                        _cb({
                            IA: function () {
                                console.log('ejecute IA init.....')
                                require('./node_app/sql_common.js')(app, function (SQL) {
                                    app.command = 'PARSER'
                                    app.commonSQL = SQL
                                    require('./node_app/parser/par_borme.js')(app, function (options) {

                                        app.commonSQL.init({ SQL: { db: null }, Command: 'PARSER' }, 'BOE', function (boedb) {

                                            options.SQL.boedb = boedb.SQL.db
                                            //app.commonSQL.init({ SQL: { db: null }, Command: 'IA' }, 'IA', function (iadb) {
                                            //    options.SQL.iadb = iadb.SQL.db
                                                app._io = require('./node_IA/socket_IO.js')(app, options)
                                                app._io.listen(require('socket.io')(8080), function (io) {
                                                    console.log("Sistema a la escucha")
                                                    //debugger
                                                })
                                            //})
                                        })
                                    })
                                })



                                        //var cadsql = "CALL Insert_Data_Tree(?,?)"
                                        //options.SQL.db.query(cadsql, [_key, JSON.stringify(app.response)], function (err, recordTree) {
                                        //process.exit(code)
                                        //})
                                    //})
                                //})
                            },
                            SCRAP: function (type) {
                                app.pdftotext = require('./node_app/_utils/pdftotext.js')
                                const prefix = app.command.substr(0, 3).toLowerCase() + "_"
                                require('./node_app/scrap/' + prefix + type.toLowerCase() + '.js')(app, function (options) {
                                    app.BOLETIN = options
                                    app.commonSQL.SQL.getCounter(app, options, type, function (options) {
                                        //debugger

                                        var _desde = app._xData.Sumario[type].SUMARIO_NEXT.substr(app._lb[type], 8)
                                        if (_desde.length == 0)
                                            var _last = app._xData.Sumario[type].SUMARIO_LAST.substr(app._lb[type], 8)

                                        var _data = { desde: _desde.length > 0 ? _desde : _last, into: app._xData.Sumario[type].ID_LAST, type: type, Secciones: "5A", hasta: new Date() }
                                        if (!app.forever) {
                                            app._io = require('./node_www/IO.js')(app)
                                            require('./node_www/server_http.js')(app, function (io) {
                                                debugger
                                                app.process.stdout.io = io
                                                //comienza la rutina de SCRAP (Extracción de data en pdf y convertir en registros TEXTO (bbdd_kaos155_text))
                                                options._common.Actualize(options, type, _data)

                                            })
                                        } else {
                                            options._common.Actualize(options, type, _data)
                                        }
                                    })
                                })
                            },
                            PARSER: function (type) {
                                require('./node_app/parser/' + app.command.substr(0, 3).toLowerCase() + "_" + type.toLowerCase() + '.js')(app, function (options) {
                                    if (app.BOLETIN == null) {
                                        app.BOLETIN = options

                                        app.ip_IA(function (ip) {
                                            options._common.io_client = require("socket.io-client")(ip)
                                            console.log('conectando con socket ia en '+ip)
                                            options._common.io_client.on('connect', function () {
                                                console.log('socket ia conectado continuamos.... ')
                                                if (app._io==null)
                                                    if (!app.forever) {
                                                        app._io = require('./node_www/IO.js')(app)
                                                        require('./node_www/server_http.js')(app, function (io) {
                                                            if (app.process.stdout.io == null) {
                                                                app.process.stdout.io = io

                                                                options._common.Actualize(options, type, {}, app._returnfunc)
                                                            }
                                                        })
                                                    } else {
                                                        options._common.Actualize(options, type, {}, app._returnfunc)
                                                    }
                                            })
                                           // return require("socket.io-client")(ip, {
                                           ////     reconnection: true,
                                            //    reconnectionDelay: 1000,
                                            //    reconnectionDelayMax: 5000,
                                            //    reconnectionAttempts: 99999
                                         })



                                        
                                    } else {
                                        debugger
                                    }

                                })
                            },
                            
                            GRAFOS: function (type) {

                                require('./node_app/sql_common.js')(app, function (SQL) {
                                    SQL.Command = app.Command
                                    SQL.init(SQL, 'GRAFOS', function (options) {

                                        const query = function (options, exec, _back) {
                                            options.SQL.db.query("CALL parser_data_cypher();", function (err, record) {
                                                if (err) {
                                                    console.log(err)
                                                } else {
                                                    if (record.length > 0) {
                                                        app.grafos.obj.insert(record[0][0].__cypher, function () {
                                                            console.log(record[0][0].__cypher)
                                                            exec(options, exec, _back)
                                                        })
                                                    } else {
                                                        _back()
                                                    }
                                                }

                                            })
                                        }
                                        query(options, query, function () {
                                            debugger
                                        })

                                    })
                                })


                            },
                            EXIT: function (type) {
                                console.log('EXIT !')
                                app.exit(function () { process.exit(0) })
                                //process.exit(0)
                            }
                        })

                    })
                },
                logStop: function (i, text) {
                    console.log(i + '.-' + text)
                    console.log('SISTEMA DETENIDO')
                    app.exit(function () { process.exit(1) })
                },
                parameters: function (app, myArgs, callback) {
                    if (app.Commands.indexOf(myArgs[0]) <= app.Commands.length - 2) {
                        app.Type = myArgs[1]
                        if (app.Commands.indexOf(myArgs[0]) == -1) {
                            app.logStop(1, 'comando no valido falta SCRAP PARSE GRAFOS IA EXIT')

                        } else {

                            if (myArgs[1] != null && app.TypeBoletines.indexOf(myArgs[1]) == -1) {
                                app.logStop(2, 'parametros no validos falta BORME BOE BOCM')
                            }
                        }
                        if (app.SqlIP != null && app.SqlIP != 'localhost') {
                            console.log('parameters->app.SqlIP.match')
                            if (app.SqlIP.match(/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/g) != null) {
                                console.log('app.SqlIP.match->', app.SqlIP, ' yes')
                                app.SqlIP = app.dns.lookup(app.SqlIP, function (err, address, family) {
                                    if (err) {
                                        console.log(err)
                                    } else {
                                        console.log('lookup ', app.SqlIP, ' yes')
                                    }
                                    app.SqlIP = address
                                    callback(app)
                                }) //'localhost'

                            }
                        } else {
                            app.SqlIP = 'localhost'

                            callback(app)
                        }


                    }

                },
                getCounter: function (app, _options, type, callback) {
                    const _cadsql = "SELECT * FROM lastread WHERE Type = '" + type + "' AND Anyo = " + app.anyo
                    _options.SQL.db.query(_cadsql, function (err, Record) {
                        if (err) {
                            debugger
                        } else {
                            if (Record.length == 0) {
                                const _cadsql = "INSERT INTO lastread (Type, Anyo, SUMARIO_NEXT) VALUES ('" + type + "'," + app.anyo + ",'" + type + "-S-" + app.initDate + "')"  //2001
                                _options.SQL.db.query(_cadsql, function (err, _data) {
                                    app._xData.Sumario[type] = { SUMARIO_LAST: '', SUMARIO_NEXT: type + '-S-' + app.initDate }
                                })
                            } else {
                                app._xData.Sumario[type] = Record[0]
                            }
                            const _cadsql = "SELECT count(*) FROM sumarios WHERE Type='" + type + "'"
                            _options.SQL.db.query(_cadsql, function (err, Record) {

                                app._xData.TSUMARIOS[type] = Record[0]["count(*)"]

                                const _cadsql = "SELECT count(*) FROM boletin where Type='" + type + "'"
                                _options.SQL.db.query(_cadsql, function (err, Record) {
                                    app._xData['T' + type] = Record[0]["count(*)"]
                                    callback(_options)
                                })
                            })
                        }
                    })
                },
                process: {
                    stdout: {
                        write: function (app, options, _cini, string, _cfin) {

                            process.stdout.write(_cini + string + _cfin)
                            // const cadsql = "SELECT * FROM lastread WHERE Type=? AND Anyo=?;" //sumarios (_counter, Anyo, SUMARIO, BOLETIN, Type) VALUES ('" + (app._xData.TSUMARIOS[options.type] + 1) + "','" + app.anyo + "','" + _sumario + "', '" + _boletin + "','" + options.type + "')"

                            //options.SQL.scrapDb.SQL.db.query("SELECT * FROM lastread WHERE Type=? AND Anyo=?;", [app.Type, app.anyo], function (err, records) {
                            //    if (err) {
                            //        console.log(err)
                            //    } else {
                            //        app.process.stdout.io.emit('graphData', { code: string, color: { _i: _cini, _f: _cfin }, record: { SUMARIO: records[0].SUMARIO_NEXT, LAST_ID: records[0].ID_LAST } })
                            //    }
                            //})

                        }
                    }
                }


            })
        
            App.parameters(App, myArgs, function (app) {
                //debugger
                if (app.Commands.indexOf(myArgs[0]) < app.Commands.length - 3) {
                    //const date = new Date()
                    //myArgs[2] = myArgs[2] + "0102"
                    //if (myArgs[1] == 'BOCM' && app.Mins[myArgs[1]] == app.anyo) {
                    //    myArgs[2] = (date.getFullYear() + '').pad(4) + '0212'
                    //} else {
                    //    if (myArgs[1] == 'BOE' && app.Mins[myArgs[1]] == app.anyo) {
                    //        myArgs[2] = (date.getFullYear() + '').pad(4) + "0102"
                    //    } else {
                    //        if (myArgs[1] == 'BOCM' && app.Mins[myArgs[1]] == app.anyo) {
                    //            myArgs[2] = (date.getFullYear() + '').pad(4) + "0102"
                    //        } else {
                    //            myArgs[2] = (date.getFullYear() + '').pad(4) + (date.getMonth() + 1 + '').pad(2) + (date.getDate() + '').pad(2)
        //
                    //        }

                    //    }
                    //}

                    if (app.Mins[myArgs[1]] <= app.anyo) {
                        app.initDate = myArgs[2] + (myArgs[1] == 'BOCM'? app.Mins[myArgs[1]] == app.anyo ? "0212":"0102":"0102")
                        console.log('MySQL IP:' + app.SqlIP)
                        console.log('PROCESS:' + app.Type)
                        console.log('Anyo:' + app.anyo)
                        console.log('Args:' + myArgs)
                        app.myArgs = myArgs
                        app.init(app, function (_f) { _f[myArgs[0]](app.Type) })

                    } else {
                        console.log('no se puede analizar ' + myArgs[1] + ' con fecha anterior a ' + app.Mins[myArgs[1]])
                    }
                } else {
                    
                    app.init(app, function (_f) { _f[myArgs[0]](app.Type) })
                }

            })
        })
    })


