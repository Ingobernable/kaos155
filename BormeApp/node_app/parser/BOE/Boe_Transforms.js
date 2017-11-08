
module.exports = function (app) {
    return {
        ADD: function (_arraysIn) {
            var _arrOut = []
            for (i in _arraysIn) {
                for (p in _arraysIn[i]) {
                    _arrOut.push(_arraysIn[i][p])
                }
            }
            return _arrOut
        },
        replaceAll: function (opc, string, _search, _repl, ignore) {
            return string.replace(new RegExp(_search.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, "\\$&"), (ignore ? "gi" : "g")), (typeof (_repl) == "string") ? _repl.replace(/\$/g, "$$$$") : str2);
        },
        replace: function (opc, string, _search, _repl) {
            return string.replace(_search, _repl)
        },
        splitsecondpart: function (opc,string, _search) {
            if (string.indexOf(_search) > -1)
                return string.split(_search)[1]
            return string
        },
        spliting: function (opc,string, _regexp) {
            //debugger
            return Trim(string.split(_regexp)).join(';')
        },
        removeFromLastChar: function (opc,string, char) {
            if (string.lastIndexOf(char) > -1) {
                return string.substr(0, string.lastIndexOf(char) + 1)
            } else {
                return string
            }
        },
        replaceLastChar: function (opc,string, char, charReplace) {
            if (string.lastIndexOf(char) == string.length - 1) {
                return string.substr(0,string.length-1) + charReplace
            } else {
                return string
            }

        },
        removeLastChar: function (opc,string, char) {
            if (string.lastIndexOf(char) == string.length - 1)
                string = string.substr(0, string.length - 1)
            return string
        },
        removeFirstChar: function (opc,string, char) {
            if (string.indexOf(char) == 0)
                string = string.substr(1, string.length - 1)
            return string
        },
        moveToEnd: function (opc, string, char) {
            return string.substr(char.length, string.length) + char + "."
        },
        recortaDesdeLast: function (opc, string, end) {
            return string.substr(0, string.lastIndexOf(end) + end.length )
        },
        executeIF: function (opc,string, _func, arrayOk) {
            if (_func(string)) {
                return opc.transforms(string.toUpperCase(), arrayOk)
            } else {
                return string
            }

        },
        getPatern: function (_this) {
            return {
                General: [
                    ['F', { f: _this.replaceAll }, "'", ''],
                    ['R', new RegExp(/'/, "g"), ""],
                    ['R', new RegExp(/  /, "g"), " "],
                    ['F', { f: _this.splitsecondpart }, ":"],
                ],
                Importes: [
                    ['R', new RegExp(/Importe total,/, "g"), ""],
                    ['F', { f: _this.executeIF }, function (string) {
                        return string.indexOf(",") > -1 
                    }, [
                            ['F', { f: _this.replaceAll }, ",", '#'],
                            ['F', { f: _this.replaceAll }, ".", ''],
                            ['F', { f: _this.replaceAll }, "#", '.'],
                    ]],
                    ['F', { f: _this.replaceAll }, "y ", ''],
                    ['F', { f: _this.removeFromLastChar }, "s"],
                    ['F', { f: _this.executeIF }, function (string) {
                        return (string.match(/:/g) || []).length>1
                    }, [
                            ['F', { f: _this.replace }, ":", ''],
                        ]]
                ],
                Contratista: [

                    ["F", { f: _this.removeFirstChar }, '" "'],
                    ['F', { f: _this.replaceAll }, ', SAU.', ' SA.'],
                    ['F', { f: _this.replaceAll }, 'S o c i e d a d A n ó n i -ma', ' SA.'],
                    ['F', { f: _this.replaceAll }, ', S o c i e d a d A n ó n i m a', ' SA.'],
                    ['F', { f: _this.replaceAll }, ', S oc ie d ad Lim i ta da', ' SL.'],
                    ['F', { f: _this.replaceAll }, 'Sociedad Limitada de Riegos,', ' SL.'],
                    ['F', { f: _this.replaceAll }, ', Sociedad de Responsabilidad Limitada', ' SL.'],
                    ['F', { f: _this.replaceAll }, ', Sociedad Anóni ma', ' SA.'],

                    ['F', { f: _this.replaceAll }, ', Sociedad Anónima Laboral', ' SA.'],
                    ['F', { f: _this.replaceAll }, ', Sociedad Anónima Española', ' SA.'],
                    ['F', { f: _this.replaceAll }, 'Sociedad Anónima Española', ' SA.'],
                    ['F', { f: _this.replaceAll }, ', Sociedad Anónima', ' SA.'],
                    ['F', { f: _this.replaceAll }, ', Sociedad Limitada', ' SL.'],
                    ['F', { f: _this.replaceAll }, ', Sociedad Limitada', ' SL.'],
                    ['F', { f: _this.replaceAll }, ' Sociedad Limitada', ' SL.'],
                    ['F', { f: _this.replaceAll }, 'Sociedad Anónima', ' SA.'],

                    ['F', { f: _this.replaceAll }, ', sociedad anónima española', ' SA.'],
                    ['F', { f: _this.replaceAll }, 'sociedad anónima española', ' SA.'],
                    ['F', { f: _this.replaceAll }, ', sociedad anónima', ' SA.'],
                    ['F', { f: _this.replaceAll }, 'sociedad anónima', ' SA.'],

                    ['F', { f: _this.replaceAll }, ', Sociedad Anómima Española', ' SA.'],
                    ['F', { f: _this.replaceAll }, 'Sociedad Anómima Española', ' SA.'],
                    ['F', { f: _this.replaceAll }, ', Sociedad Anómima', ' SA.'],
                    ['F', { f: _this.replaceAll }, 'Sociedad Anómima', ' SA.'],

                    ['F', { f: _this.replaceAll }, ', sociedad anómima española', ' SA.'],
                    ['F', { f: _this.replaceAll }, 'sociedad anómima española', ' SA.'],
                    ['F', { f: _this.replaceAll }, ', sociedad anónima', ' SA.'],
                    ['F', { f: _this.replaceAll }, 'sociedad anómima', ' SA.'],
                    ['F', { f: _this.replaceAll }, 'union temporal de empresas', 'UTE '],
                    ['F', { f: _this.replaceAll }, 'Union Temporal de Empresas', 'UTE '],
                    ['F', { f: _this.replaceAll }, 'Unión Temporal de Empresas', 'UTE '],
                    ['F', { f: _this.replaceAll }, 'unión temporal de empresas', 'UTE '],


                    ['F', { f: _this.replaceAll }, ' S A', ' SA.'],
                    ['F', { f: _this.replaceAll }, '. S L', ' SL.'],
                    ['F', { f: _this.replaceAll }, '. S A', ' SA.'],
                    ['F', { f: _this.replaceAll }, ', S A L', ' SA.'],
                    ['F', { f: _this.replaceAll }, ', SAL', ' SA.'],
                    ['F', { f: _this.replaceAll }, ', S L L', ' SL.'],
                    ['F', { f: _this.replaceAll }, '. S L U',  ' SL.'],
                    ['F', { f: _this.replaceAll }, 'S.L.', 'SL.'],
                    ['F', { f: _this.replaceAll }, 'S.A.', 'SA.'],
                    ['F', { f: _this.replaceAll }, ', S A', ' SA.'],
                    ['F', { f: _this.replaceAll }, ' SAE', ' SA.'],
                    ['F', { f: _this.replaceAll }, '. SAU', ' SA.'],
                    ['F', { f: _this.replaceAll }, 'UTE ', 'UTE. '],

                    //['R', new RegExp(/Sociedad Anónima/, "g"), "S.A.\";"],
                    //['R', new RegExp(/, Sociedad Anónima Española/, "g"), "S.A.\";"],
                    //['R', new RegExp(/Sociedad Anónima Española/, "g"), "S.A.\";"],

                    //['R', new RegExp(/, Sociedad Limitada/, "g"), " S.L.\";"],
                    //['R', new RegExp(/Sociedad Limitada/, "g"), "S.L.\";"],
                    //['R', new RegExp(/, Sociedad Limitada Española/, "g"), "S.L.\";"],
                    //['R', new RegExp(/Sociedad Limitada Española/, "g"), "S.L.\";"],

                    //['R', new RegExp(/, sociedad anónima/, "g"), " S.A.\";"],
                    //['R', new RegExp(/sociedad anónima/, "g"), "S.A.\";"],
                    //['R', new RegExp(/, sociedad anónima española/, "g"), "S.A.\";"],
                    //['R', new RegExp(/sociedad anónima española/, "g"), "S.A.\";"],
                    //['R', new RegExp(/, sociedad limitada/, "g"), " S.L.\";"],
                    //['R', new RegExp(/sociedad limitada/, "g"), "S.L.\";"],
                    //['R', new RegExp(/, sociedad limitada española/, "g"), "S.L.\";"],
                    //['R', new RegExp(/sociedad limitada española/, "g"), "S.L.\";"],



                    //['R', new RegExp(/.../, "g"), ""]
                ],
                specialContratista: [
                    ['F', { f: _this.executeIF }, function (string) {
                        return string.indexOf('SA.') > -1 || string.indexOf('SL.') > -1
                    }, [
                            ['R', new RegExp(/"/, "g"), ""],
                            ['R', new RegExp(/\.\.\./, "g"), ""],
                            ['R', new RegExp(/\.\./, "g"), "."],
                            ['R', new RegExp(/\L\./, "g"), "L"],
                            ['R', new RegExp(/\A\./, "g"), "A"],
                            ['R', new RegExp(/\,/, "g"), ""]
                        ]],
                    ['F', { f: _this.executeIF }, function (string) {
                        return string.indexOf(' SA ') == 1
                    }, [
                            ['F', { f: _this.moveToEnd }, ' SA ', '']
                        ]],
                    ['F', { f: _this.executeIF }, function (string) {
                        return string.indexOf(' SL ') == 1
                    }, [
                            ['F', { f: _this.moveToEnd }, ' SL ', ''],
                        ]],
                    ['F', { f: _this.executeIF }, function (string) {
                        return string.lastIndexOf(' SA.') > 0 && string.lastIndexOf(' SA.') < string.length - 4
                    }, [
                            ['F', { f: _this.recortaDesdeLast }, ' SA.', '']
                        ]],
                    ['F', { f: _this.executeIF }, function (string) {
                        return string.lastIndexOf(' SL.')>0 && string.lastIndexOf(' SL.') < string.length - 4
                    }, [
                            ['F', { f: _this.recortaDesdeLast }, ' SL.', '']
                        ]],
                    
                ],
                exoticChars: [
                    ['F', { f: _this.replaceAll }, '/(À|Á|Â|Ã|Ä|Å|Æ)/gi', 'A'],
                    ['F', { f: _this.replaceAll }, '/(È|É|Ê|Ë)/gi', 'E'],
                    ['F', { f: _this.replaceAll }, '/(Ì|Í|Î|Ï)/gi', 'I'],
                    ['F', { f: _this.replaceAll }, '/(Ò|Ó|Ô|Ö)/gi', 'O'],
                    ['F', { f: _this.replaceAll }, '/(Ù|Ú|Û|Ü)/gi', 'U']

                ],
                especialChars: [
                    ['F', { f: _this.replaceAll }, '«', '"'],
                    ['F', { f: _this.replaceAll }, '»', '"'],
                    ['F', { f: _this.replaceAll }, '" "', '""'],
                    ['F', { f: _this.replaceAll }, ' "', '"'],
                    ['F', { f: _this.replaceAll }, '""', '"'],
                    ['F', { f: _this.replaceAll }, '"."', '";"'],
                    ['F', { f: _this.replaceAll }, 'e"', ';"'],
                    ['F', { f: _this.replaceAll }, '" y "', '";"'],
                    ['F', { f: _this.replaceAll }, '"y "', '";"'],
                    ['F', { f: _this.replaceAll }, '" y"', '";"'],
                    ['F', { f: _this.replaceAll }, '" y"', '";"'],
                    ['F', { f: _this.replaceAll }, '", y"', '";"'],
                    //['F', { f: _this.replaceAll }, '.A."ÑA', '"PAÑA"'], «
                    ['F', { f: _this.replaceAll }, '&amp;', '&'],
                    ['F', { f: _this.replaceAll }, ' c) Nacionalidad', ';'],
                    ['F', { f: _this.replaceAll }, '";",', '";"'],
                    ['F', { f: _this.replaceAll }, 'A.-', 'A.;'],
                    ['F', { f: _this.replaceAll }, 'L.-', 'L.;'],
                    ['F', { f: _this.replaceAll }, '- ', '-'],
                    
                    

                    
                ]
            }
        }
    }
}