var Version = '0.0.1' 
//debugger
console.log('loading Scrap - version -' + Version)
var myArgs = process.argv.slice(2);

if (myArgs.length == 0)
    myArgs = ['BOCM', '2010'] //, 'BOE-B-2003-31017' ]

if (myArgs[0] != 'BOCM') {

    var date = new Date(myArgs[1].substr(0, 4), 0, 1) //myArgs[1])

    if (date.getDay() == 0) {
        date.setDate(date.getDate() + 1)
    }
} else {

    var date = new Date(myArgs[1].substr(0, 4), 0, 2) //myArgs[1])
    if (date.getDay() == 6) {
        date.setDate(date.getDate() + 1)

    }
    if (date.getDay() == 0) {
        date.setDate(date.getDate() + 1)

    }
}

//
//ampliacion de primitivas para cadenas
// string.Trim()
// string.pad()
// string.Between()
// string.replaceAll()
// string.indexOfRegex()
//
String.prototype.Trim = function Trim(x) {
    if (typeof x === 'object') {
        for (i in x) {
            x[i] = x[i].replace(/^\s+|\s+$/gm, '');
        }
        return x
    } else {
        return x.replace(/^\s+|\s+$/gm, '');
    }
}

String.prototype.pad = function (size) {
    var s = "000000000" + this;
    return s.substr(s.length - size);
}

String.prototype.Between = function (init, last, contains, not) {
    var string = this.toString()
    var _exit = ""
    var _i = 0
    while (string.indexOf(last, _i) > 0) {
        var _str = ""
        var pf = pi = string.indexOf(last, _i)
        //var found = false
        while (pi > 0 && string.substr(pi, 1) != init) {
            var char = string.substr(pi, 1)
            if (char != not)
                _str = char + _str
            pi--
        }
        if (_str.indexOf(contains) > -1)
            _exit = ''.Trim(_str.substr(0, _str.indexOf(contains))) + (_exit.length > 0 ? ';' : '') + _exit
        string = string.substr(pf + 1, string.length)
    }
    return _exit.length > 0 ? _exit : null
}

String.prototype.replaceAll = function (target, replacement) {
    return this.split(target).join(replacement);
};
String.prototype.indexOfRegex = function (regex) {
    var match = this.match(regex);
    return match ? this.indexOf(match[0]) : -1;
}

String.prototype.lastIndexOfRegex = function (regex) {
    var match = this.match(regex);
    return match ? this.lastIndexOf(match[match.length - 1]) : -1;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// comienzo de la aplicación
//
// app

var App = {
    _fileCredenciales: 'ACCESO_mysql_TEXT',
    update: myArgs[2],
    anyo: !isNaN(myArgs[1]) ? myArgs[1] : date.getFullYear(),
    TypeBoletines: ["BOE", "BOCM", "BORME"],
    Mins: { BOE: 1995, BORME: 2009, BOCM: 2010 },
    _lb: { BOCM: 5, BOE: 6, BORME: 8 },
    timeDelay: 1500,
    drop: false,
    SqlIP: null, //'192.168.0.3',
    urlBOE: 'http://81.89.32.200/',
    urlBORME: 'http://81.89.32.200/',
    urlBOCM: 'http://w3.bocm.es/boletin/CM',
    PDFStore: "../DataFiles/_almacen/PDF/",
    mysql: require('mysql'),
    iconv: require('iconv-lite'),
    request: require('request'),
    mkdirp: require('mkdirp'),
    cheerio: require('cheerio'),
    path: require('path'),
    fs: require("fs"),
    http: require('http'),
    moment: require('moment'),
    _xData: {
        VisualCif: {
            Ranking: {
                Directivos: [],
                Empresas: []
            },
            Empresa: 0,
            Directivo: 0,
            counter: 1
        },
        Sumario: {
            BOE: { SUMARIO_LAST: '', SUMARIO_NEXT: 'BOE-S-19950102' },
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
    Rutines: function (app) {
        _this = this
        return require('./node_app/func_common.js')(app)
    },
    //punto de entrada
    // 
    init: function (app, cb) {
        //cb funcion  a ejecutar cuando acabe de cargar (sql_common.js)

        this.pdftotext = require('./node_app/pdftotext.js')
        require('./node_app/sql_common.js')(app, function (SQL) {
           
            // app.commonSQL.db = la base de datos
            app.commonSQL = SQL


            cb({
                SCRAP: function (type) {
                    
                    //cargamos la rutina de escrapeo específica del tipo de BOLETIN
                    //cuando cargamos la rutina incorporamos en la llamada app y la funcion de retorno una vez cargado el objeto
                    //el retorno es el objeto encargado del escrapeo                 
                    require('./node_app/scrap_boletin/' + type.toLowerCase() + '_text.js')(app, function (options) {
                        //options = objeto que realiza el escrapeo
                        //app.BOE.SQL.db = objeto para acceder directamente a la db en todas las funciones y rutinas
                        app.BOLETIN = options
                        //cargamos los contadores para poder continuar donde se dejó
                        app.commonSQL.SQL.getCounter(app, options, type, function (options) {
                            //realizamos el proceso de escrapeo
                            options._common.Actualize(options, type, { desde: app._xData.Sumario[type].SUMARIO_NEXT.substr(app._lb[type], 8), type: type , Secciones: "5A", hasta: new Date() })
                        })
                    })
                },
                CREATE: function (datafile) {
                    app.commonSQL.init({ SQL: { db: null } }, 'CREATE', function () {
                        process.exit(1)
                    })

                }
            })
            //})
        })
    },
    parameters: function (app, myArgs, callback) {


        var arg = myArgs[2]
        //app.SqlIP = myArgs[0]
        if (app.SqlIP != null && app.SqlIP != 'localhost') {
            if (app.SqlIP.match(/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/g).length != 1) {
                app.SqlIP = 'localhost'
            }
        } else {
            app.SqlIP = 'localhost'
        }

        if (app.TypeBoletines.indexOf(myArgs[0]) == -1) {
            console.log('parametros no validos falta BOCM,BOE')
            process.exit(1)
        }

        app.Type = myArgs[0]
        callback(app)
    
    }

}

//
//Punto de entrada de la aplicacion
//
// App.parameters normaliza los parametros de entrada devolviendo app como objeto aplicación,
//
App.parameters(App, myArgs, function (app) {
    if (myArgs[0] == 'BOCM' && app.Mins[myArgs[0]] == app.anyo) {
        myArgs[1] = (date.getFullYear() + '').pad(4) + '0212'
    } else {
        myArgs[1] = (date.getFullYear() + '').pad(4) + (date.getMonth() + 1 + '').pad(2) + (date.getDate() + '').pad(2)
    }

    if (app.Mins[myArgs[0]] <= app.anyo) {
        app.initDate = myArgs[1]
        console.log('MySQL IP:' + app.SqlIP)
        console.log('PROCESS:' + app.Type)
        console.log('DELETE DATA:' + app.drop)

        //Punto de entrada del proceso
        // in-> app y una funcion que ejecutara myArgs[0]() = BOE() BOCM()
        //
        app.init(app, function (_f) { _f.SCRAP(app.Type) })
        
    } else {
        console.log('no se puede analizar ' + myArgs[0] + ' con fecha anterior a ' + app.Mins[myArgs[0]])
    }
})