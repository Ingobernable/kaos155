
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
        replaceAll: function (string, _search, _repl, ignore) {
            return string.replace(new RegExp(_search.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, "\\$&"), (ignore ? "gi" : "g")), (typeof (_repl) == "string") ? _repl.replace(/\$/g, "$$$$") : str2);
        },
        replace: function (string, _search, _repl) {
            return string.replace(_search, _repl)
        },
        splitsecondpart: function (string, _search) {
            if (string.indexOf(_search) > -1)
                return string.split(_search)[1]
            return string
        },
        spliting: function (string, _regexp) {
            //debugger
            return Trim(string.split(_regexp)).join(';')
        },
        removeLastChar: function (string, char) {
            if (string.lastIndexOf(char) == string.length - 1)
                string = string.substr(0, string.length - 1)
            return string
        },
        removeFirstChar: function (string, char) {
            if (string.indexOf(char) == 0)
                string = string.substr(1, string.length - 2)
            return string
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
                    ['R', new RegExp(/Importe total,/, "g"), ""]
                ],
                Contratista: [

                    ["F", { f: _this.removeFirstChar }, '" "'],
                    //['R', new RegExp(/S.A/, "g"), "S.A.\";"],
                    // ['R', new RegExp(/S. A./, "g"), "S.A.\";"],
                    //['R', new RegExp(/S.A./, "g"), "S.A.\";"],

                    //['R', new RegExp(/S.L/, "g"), "S.L.\";"], 
                    //['R', new RegExp(/S. L./, "g"), "S.L.\";"],

                    //['R', new RegExp(/, Sociedad Anónima/, "g"), " S.A.\";"],

                    ['F', { f: _this.replaceAll }, ', Sociedad Anónima Española', ' SA'],
                    ['F', { f: _this.replaceAll }, 'Sociedad Anónima Española', ' SA'],
                    ['F', { f: _this.replaceAll }, ', Sociedad Anónima', ' SA'],
                    ['F', { f: _this.replaceAll }, ', Sociedad Limitada', ' SL'],
                    ['F', { f: _this.replaceAll }, 'Sociedad Anónima', ' SA'],

                    ['F', { f: _this.replaceAll }, ', sociedad anónima española', ' SA'],
                    ['F', { f: _this.replaceAll }, 'sociedad anónima española', ' SA'],
                    ['F', { f: _this.replaceAll }, ', sociedad anónima', ' SA'],
                    ['F', { f: _this.replaceAll }, 'sociedad anónima', ' SA'],

                    ['F', { f: _this.replaceAll }, ', Sociedad Anómima Española', ' SA'],
                    ['F', { f: _this.replaceAll }, 'Sociedad Anómima Española', ' SA'],
                    ['F', { f: _this.replaceAll }, ', Sociedad Anómima', ' SA'],
                    ['F', { f: _this.replaceAll }, 'Sociedad Anómima', ' SA'],

                    ['F', { f: _this.replaceAll }, ', sociedad anómima española', ' SA'],
                    ['F', { f: _this.replaceAll }, 'sociedad anómima española', ' SA'],
                    ['F', { f: _this.replaceAll }, ', sociedad anónima', ' SA'],
                    ['F', { f: _this.replaceAll }, 'sociedad anómima', ' SA'],
                    ['F', { f: _this.replaceAll }, ', SOCIEDAD ANÓNIMA', ' SA'],
                    ['F', { f: _this.replaceAll }, ', SOCIEDAD LIMITADA', ' SL'],

                    ['F', { f: _this.replaceAll }, 'SOCIEDAD ANÓNIMA', ' SA'],
                    ['F', { f: _this.replaceAll }, 'SOCIEDAD LIMITADA', ' SL'],

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
                    //['F', { f: _this.replaceAll }, '.A."ÑA', '"PAÑA"'], «
                    ['F', { f: _this.replaceAll }, '&amp;', '&'],
                    ['F', { f: _this.replaceAll }, ' c) Nacionalidad', ';'],
                    ['F', { f: _this.replaceAll }, '";",', '";"'],

                    ['R', new RegExp(/"/, "g"), ""],
                    ['R', new RegExp(/\.\.\./, "g"), ""],
                    ['R', new RegExp(/\.\./, "g"), "."],
                    //['R', new RegExp(/.../, "g"), ""]
                ]
            }
        }
    }
}