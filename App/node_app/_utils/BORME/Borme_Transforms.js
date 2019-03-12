
module.exports = function (app, options) {

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
        replacePoints: function (string, regExp, replace ) {
            const _m = string.match(regExp)
            for (p in _m) {
                string = string.replaceAll(_m[p], replace(_m[p]) )
            }
            return string
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
                    //'UTE','SC',SRL','SLL','SAL','S.Coop.C','S.Coop','AEIE','SCP','CITYCE','SA','SL'
                    ["F", { f: _this.removeFirstChar }, " "],                    
                    ['R', new RegExp(/^\s+|\s+$/, "gm"), ""],
                    ['F', { f: _this.replaceAll }, 'LEY 18 1982 DE 26 DE MAYO', 'UTE'],

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
                    ['F', { f: _this.replaceAll }, 'UNION TEMPORAL DE EMPRESA', 'UTE'],

                    ['F', { f: _this.replaceAll }, 'UTE LEY 18 1982', 'UTE'],
                    ['F', { f: _this.replaceAll }, 'UTE LEY 18 1982 N 1', 'UTE'],
                    ['F', { f: _this.replaceAll }, 'UTE LEY 18/1982 DE 26 DE MAYO', 'UTE'],
                    ['F', { f: _this.replaceAll }, 'UTE LEY 18/1992 DE 26 DE MAYO', 'UTE'], // (UNION TEMPORAL DE EMPRESAS)
                    

                    ['F', { f: _this.replaceAll }, 'UTE DE 26 DE MAYO', 'UTE'],
                    ['F', { f: _this.replaceAll }, 'UNION TEMPORAL DE EMPRESA LEY 18/ 1982', 'UTE'],
                    ['F', { f: _this.replaceAll }, 'UNION TEMPORAL DE EMPRESA LEY 18/1982', 'UTE'], //UNIN TEMPORAL DE EMPRESAS LEY 18/1982 DE 26 DE MAYO
                    ['F', { f: _this.replaceAll }, 'UNION TEMPORAL DE EMPRESAS LEY 18/1982 DE 26 DE MAYO', 'UTE'], //
                    ['F', { f: _this.replaceAll }, 'UNIN TEMPORAL DE EMPRESAS LEY 18/1982 DE 26 DE MAYO', 'UTE'], //
                    ['F', { f: _this.replaceAll }, 'UTE LEY 18/1982', 'UTE'],
                    ['F', { f: _this.replaceAll }, 'UTE LEY 18/1982 DE 26 DE MAYO', 'UTE'], //'ELECTROMONTAJES ACOEMAN SL Y ELECTROMONTAJES RIMAR COMUNIDAD DE BIENES UTE LEY 18/1982'
                    ['F', { f: _this.replaceAll }, 'UTE LEY 18/1.982 DE 26 DE MAYO', 'UTE'], //'ELECTROMONTAJES ACOEMAN SL Y ELECTROMONTAJES RIMAR COMUNIDAD DE BIENES UTE LEY 18/1982'

                    ['F', { f: _this.replaceAll }, 'UTE LEY 1871982 DE 26 DE MAYO', 'UTE'], //'Adaptación Ley 44/2015'
                    ['F', { f: _this.replaceAll }, 'UTE SEGUN LEY 18/1982 DE 26 DE MAYO', 'UTE'],
                    ['F', { f: _this.replaceAll }, 'Adaptación Ley 44/2015', ''], // LLEI 18/82
                    ['F', { f: _this.replaceAll }, 'LLEI 18/82', ''], // LLEI 18/82

                    ['F', { f: _this.replaceAll }, 'UTE UTE', 'UTE'],
                    ['F', { f: _this.replaceAll }, 'UTE U.T.E.', 'UTE'],
                    ['F', { f: _this.replaceAll }, 'U.T.E.', 'UTE'],
                    ['F', { f: _this.replaceAll }, 'LEY 18/82', ''], //UTE SEGUN LEY 18/1982 DE 26 DE MAYO
                    ['F', { f: _this.replaceAll }, 'LEY 18/1982', ''], //UTE SEGUN LEY 18/1982 DE 26 DE MAYO
                    ['F', { f: _this.replaceAll }, 'Y DISPOSICIONES COMPLEMETARIAS', ''], //UTE LLEI 18 1982 DE 26 DE MAIG 
                    ['F', { f: _this.replaceAll }, 'UTE LLEI 18 1982 DE 26 DE MAIG', 'UTE'], //'BALFOUR BEATTY RAIL IBERICA SAU COBRA INSTALACIONES Y SERVICIOS SA ELECNOR SA EMTE SA Y SOCIEDAD ESPAÑOLA DE MONTAJES INDUSTRIALES UTE LEY 1871982 DE 26 DE MAYO UTE EUROASCE MANTENIMIENTO'

                    ['F', { f: _this.replaceAll }, 'SOCIEDAD ANONIMA', 'SA'],
                    ['F', { f: _this.replaceAll }, 'S.A.', ' SA'],
                    ['F', { f: _this.replaceAll }, 'SOCIEDAD LIMITADA', 'SL'],
                    ['F', { f: _this.replaceAll }, 'S.L.', 'SL'],
                    ['F', { f: _this.replaceAll }, 'EN LIQUIDACION', ' LIQ'],
                    ['F', { f: _this.replaceAll }, 'EN LIQUIDACION', ' LIQ'],
                    ['F', { f: _this.replaceAll }, 'S. E. I.', 'SEI'],
                    ['F', { f: _this.replaceAll }, 'C.I.T.Y.C.E.', 'CITYCE'],

                    ['R', new RegExp(/  /, "g"), " "],
                    ['R', new RegExp(/,/, "g"), ""],
                    ['R', new RegExp(/"/, "g"), ""],
                    ['R', new RegExp(/\.$/, "g"), "*"],
                    ['R', new RegExp(/\./g, "g"), "%"],
                    ['R', new RegExp(/\*$/, "g"), "."]
                    //["F", { f: _this.removeLastChar }, "."],
                ],
                Directivos: [
                    //['R', new RegExp(/'/, "g"), ""],
                    //'UTE','SC',SRL','SLL','SAL','S.Coop.C','S.Coop','AEIE','SCP','CITYCE','SA','SL'
                    ["F", { f: _this.removeFirstChar }, " "],
                    ['R', new RegExp(/^\s+|\s+$/, "gm"), ""],
                    ['F', { f: _this.replaceAll }, 'LEY 18 1982 DE 26 DE MAYO', 'UTE'],

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
                    ['F', { f: _this.replaceAll }, 'UNION TEMPORAL DE EMPRESA', 'UTE'],

                    ['F', { f: _this.replaceAll }, 'UTE LEY 18 1982', 'UTE'],
                    ['F', { f: _this.replaceAll }, 'UTE LEY 18 1982 N 1', 'UTE'],
                    ['F', { f: _this.replaceAll }, 'UTE LEY 18/1982 DE 26 DE MAYO', 'UTE'],
                    ['F', { f: _this.replaceAll }, 'UTE LEY 18/1992 DE 26 DE MAYO', 'UTE'], // (UNION TEMPORAL DE EMPRESAS)


                    ['F', { f: _this.replaceAll }, 'UTE DE 26 DE MAYO', 'UTE'],
                    ['F', { f: _this.replaceAll }, 'UNION TEMPORAL DE EMPRESA LEY 18/ 1982', 'UTE'],
                    ['F', { f: _this.replaceAll }, 'UNION TEMPORAL DE EMPRESA LEY 18/1982', 'UTE'], //UNIN TEMPORAL DE EMPRESAS LEY 18/1982 DE 26 DE MAYO
                    ['F', { f: _this.replaceAll }, 'UNION TEMPORAL DE EMPRESAS LEY 18/1982 DE 26 DE MAYO', 'UTE'], //
                    ['F', { f: _this.replaceAll }, 'UNIN TEMPORAL DE EMPRESAS LEY 18/1982 DE 26 DE MAYO', 'UTE'], //
                    ['F', { f: _this.replaceAll }, 'UTE LEY 18/1982', 'UTE'],
                    ['F', { f: _this.replaceAll }, 'UTE LEY 18/1982 DE 26 DE MAYO', 'UTE'], //'ELECTROMONTAJES ACOEMAN SL Y ELECTROMONTAJES RIMAR COMUNIDAD DE BIENES UTE LEY 18/1982'
                    ['F', { f: _this.replaceAll }, 'UTE LEY 18/1.982 DE 26 DE MAYO', 'UTE'], //'ELECTROMONTAJES ACOEMAN SL Y ELECTROMONTAJES RIMAR COMUNIDAD DE BIENES UTE LEY 18/1982'

                    ['F', { f: _this.replaceAll }, 'UTE LEY 1871982 DE 26 DE MAYO', 'UTE'], //'Adaptación Ley 44/2015'
                    ['F', { f: _this.replaceAll }, 'UTE SEGUN LEY 18/1982 DE 26 DE MAYO', 'UTE'],
                    ['F', { f: _this.replaceAll }, 'Adaptación Ley 44/2015', ''], // LLEI 18/82
                    ['F', { f: _this.replaceAll }, 'LLEI 18/82', ''], // LLEI 18/82

                    ['F', { f: _this.replaceAll }, 'UTE UTE', 'UTE'],
                    ['F', { f: _this.replaceAll }, 'UTE U.T.E.', 'UTE'],
                    ['F', { f: _this.replaceAll }, 'U.T.E.', 'UTE'],
                    ['F', { f: _this.replaceAll }, 'LEY 18/82', ''], //UTE SEGUN LEY 18/1982 DE 26 DE MAYO
                    ['F', { f: _this.replaceAll }, 'LEY 18/1982', ''], //UTE SEGUN LEY 18/1982 DE 26 DE MAYO
                    ['F', { f: _this.replaceAll }, 'Y DISPOSICIONES COMPLEMETARIAS', ''], //UTE LLEI 18 1982 DE 26 DE MAIG 
                    ['F', { f: _this.replaceAll }, 'UTE LLEI 18 1982 DE 26 DE MAIG', 'UTE'], //'BALFOUR BEATTY RAIL IBERICA SAU COBRA INSTALACIONES Y SERVICIOS SA ELECNOR SA EMTE SA Y SOCIEDAD ESPAÑOLA DE MONTAJES INDUSTRIALES UTE LEY 1871982 DE 26 DE MAYO UTE EUROASCE MANTENIMIENTO'

                    ['F', { f: _this.replaceAll }, 'SOCIEDAD ANONIMA', 'SA'],
                    ['F', { f: _this.replaceAll }, 'S.A.', ' SA'],
                    ['F', { f: _this.replaceAll }, 'SOCIEDAD LIMITADA', 'SL'],
                    ['F', { f: _this.replaceAll }, 'S.L.', 'SL'],
                    ['F', { f: _this.replaceAll }, 'S. L.', 'SL'],
                    ['F', { f: _this.replaceAll }, 'EN LIQUIDACION', ' LIQ'],
                    ['F', { f: _this.replaceAll }, 'EN LIQUIDACION', ' LIQ'],
                    ['F', { f: _this.replaceAll }, 'S. E. I.', 'SEI'],
                    ['F', { f: _this.replaceAll }, 'C.I.T.Y.C.E.', 'CITYCE'],
                    ['F', { f: _this.replacePoints }, new RegExp(/[A-Z]\W\s[A-Z]\W\s/g), function (e) { return e.replaceAll(". ", ".") + " " }],
                    ['F', { f: _this.replacePoints }, new RegExp(/\s([A-Z]\W){2,}/g), function (e) { return e.replaceAll(".", "") + " " }],
                    ['F', { f: _this.replacePoints }, new RegExp(/([A-Z]\.\s\w){1,}/g), function (e) { return e.replaceAll(". ", ".") }],

                    ['R', new RegExp(/  /, "g"), " "],
                    ['R', new RegExp(/,/, "g"), ""],
                    ['R', new RegExp(/"/, "g"), ""],
                    ['R', new RegExp(/\.$/, "g"), "*"],
                    ['R', new RegExp(/\*$/, "g"), "."]

                    //["F", { f: _this.removeLastChar }, "."],
                ], 
                replaces: [
                    [/(Sl Profesional|Sl Profesiona)/i, 'SLP'],
                    [/(Sociedad Limi|Sociedad Limita)/i, 'SL'],
                    ["s'sl", "s sl"],
                    [/(SL$| SL$)/i, " SL"],   //Faura Casas Auditors Consultors'sl
                ],
                recortes: ['admmancom',
                    'auditor Sup',
                    'admsolid',
                    'admunico',
                    'apoderado',
                    'apomanc',
                    'apomansoli',
                    'aposol',
                    'audccon',
                    'audccon',
                    'audsupl',
                    'auditor',
                    'auditor Sup',
                    'auditcuent',
                    'audtctscon',
                    'codemaso',
                    'condelegado',
                    'consejero',
                    'consdelman',
                    'consdelsol',
                    'entiddeposit',
                    'entregcont',
                    'gerente',
                    'liquidador',
                    'liquisoli',
                    'liqunico',
                    'Comejecutiv',
                    'miemcomej',                            
                    'presidente',
                    'repadmconc',
                    'repr143 Rrm',
                    'representan',
                    'seccomsaud',
                    'secretario',
                    'Secrenoconsj',
                    
                    'socio Miembr',
                    'socio Único',
                    'socuniprof',
                    'vicepresid'
                ]
            }
        }
    }
}