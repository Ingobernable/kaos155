
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
                Contratista: [
                    //['R', new RegExp(/'/, "g"), ""],
                    
                    ["F", { f: _this.removeFirstChar }, " "],                    
                    ['R', new RegExp(/^\s+|\s+$/, "gm"), ""],
                    ['F', { f: _this.replaceAll }, 'LEY 18 1982 DE 26 DE MAYO', 'L.18/1982'],

                    ['F', { f: _this.replaceAll }, 'SOCIEDAD COLECTIVA', 'SC'],
                    ['F', { f: _this.replaceAll }, 'SOCIEDAD COLECTIVA', 'SC'],
                    ['F', { f: _this.replaceAll }, 'SOCIEDAD DE RESPONSABILIDAD LIMITADA', 'SRL'],
                    ['F', { f: _this.replaceAll }, 'SOCIEDAD LIMITADA LABORAL', 'SLL'],
                    ['F', { f: _this.replaceAll }, 'SOCIEDAD LABORAL', 'SAL'],

                    ['F', { f: _this.replaceAll }, 'SOCIEDAD COOPERATIVA DE CREDITO', 'S.Coop.C'],
                    ['F', { f: _this.replaceAll }, 'SOCIEDAD COOPERATIVA', 'S.Coop'],
                    ['F', { f: _this.replaceAll }, 'AGRUPACION EUROPEA DE INTERES ECONOMICO', 'AEIE'],

                    ['F', { f: _this.replaceAll }, 'SOCIEDAD CIVIL PROFESIONAL', 'SCP'],
                    ['F', { f: _this.replaceAll }, 'UNION TEMPORAL DE EMPRESAS', 'UTE'],

                    ['F', { f: _this.replaceAll }, 'SOCIEDAD ANONIMA', 'SA'],
                    ['F', { f: _this.replaceAll }, 'S.A.', ' SA'],
                    ['F', { f: _this.replaceAll }, 'SOCIEDAD LIMITADA', 'SL'],
                    ['F', { f: _this.replaceAll }, 'S.L.', 'SL'],
                    ['F', { f: _this.replaceAll }, 'EN LIQUIDACION', ' LIQ'],
                    ['F', { f: _this.replaceAll }, ',', ''],
                    ['R', new RegExp(/  /, "g"), " "],
                    ['R', new RegExp(/,/, "g"), ""],
                    ['R', new RegExp(/"/, "g"), ""],
                    ['R', new RegExp(/\.$/, "g"), "*"],
                    ['R', new RegExp(/\./g, "g"), "%"],
                    ['R', new RegExp(/\*$/, "g"), "."]
                    //["F", { f: _this.removeLastChar }, "."],
                   

                ]
            }
        }
    }
}