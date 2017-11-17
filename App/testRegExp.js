var cadena = '{"Id":2345,"Nodes":[{"Id":100867970,"Name":"Gutierrez Del Rio Hortega Mariano Jose","Type":2,"Roles":"Liquidador (Activo) - Liquidador (Inactivo)","PersonId":867970,"CompanyId":0,"Active":1,"ActiveRelations":7,"JuridicId":0},{"Id":100003330,"Name":"Martin Lopez Jose Luis","Type":2,"Roles":"Apoderado (Activo)","PersonId":3330,"CompanyId":0,"Active":1,"ActiveRelations":26,"JuridicId":0},{"Id":100867968,"Name":"Gutierrez Garcia Mariano","Type":3,"Roles":"Adm. Unico (Inactivo)","PersonId":867968,"CompanyId":0,"Active":0,"ActiveRelations":10,"JuridicId":0}],"Links":[]}'

var resultado = cadena.match(/Id\"(?:1[0]+)([\d]+)$/g) //, /(?:1[0]+)([\d]+)$/)

console.log(resultado)