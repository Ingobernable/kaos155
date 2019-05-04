var mysql = require('mysql');
var _ = require('lodash');

var conOrigen = mysql.createConnection({
    host: "kaostext.bbdd.ovh",
    user: "root",
    password: "ia155"
});
var conDestino = mysql.createConnection({
    host: "54.36.112.100",
    user: "root",
    password: "ia155"
});
conOrigen.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");

    conDestino.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        //_q(conOrigen, conDestino, _q)
        _id(conDestino,1, _id)

    });


    const _q = function (conOrigen, conDestino, _q) {
         
        conOrigen.query("select * From bbdd_kaos155_text._borme_text_2017 where parser=0 LIMIT 1", function (err, record) {
            if (record[0]) {
                const params = [
                    record[0].dia,
                    record[0].mes,
                    record[0].BOLETIN,
                    record[0].texto,
                    record[0].ID_BORME,
                    record[0].provincia
                ]
                conDestino.query("INSERT INTO bbdd_kaos155_text._borme_text_2017 (dia,mes,BOLETIN,texto,ID_BORME,Provincia) VALUES(?,?,?,?,?,?)", params, function (_err, _record) {
                    conOrigen.query("UPDATE bbdd_kaos155_text._borme_text_2017 SET parser=1 WHERE id=?", [record[0].id], function () {
                        process.stdout.write(".")
                        _q(conOrigen, conDestino,_q)
                    })
                })
            } else {
                process.exit(0)
            }
        })
    }
    const _id = function (conDestino,i, _q) {
        conDestino.query("SELECT id,Nodes,Nombre,T_Relations FROM bbdd_kaos155_borme.borme_keys where id=?", [i], function (err, record) {
            t = _.uniq(JSON.parse(record[0].Nodes))
            if ('[' + t.join(", ")+']' == record[0].Nodes) {
                console.log(record[0].id, record[0].Nombre)
                _q(conDestino, i+1, _q)
            } else {
                conDestino.query("UPDATE  bbdd_kaos155_borme.borme_keys SET Nodes=?,T_relations=? WHERE id=?", [ '[' + t.join(", ") + ']',t.length,record[0].id], function (_err, _record) {

                    console.log(record[0].id, record[0].Nombre, t) 

                    _q(conDestino, i+1, _q)
                })
            }
            
            
        })
    }
});