
var mysqlx = require('@mysql/xdevapi');
var _ = require('lodash');

var config = {
    host: "51.89.4.108",
    user: "root",
    password: "ia155",
    database: 'bbdd_kaos155_borme'
};


mysqlx.getSession(config)
    .then(function (session) {
        session.getSchema('bbdd_kaos155_borme').sql("SELECT Nodes FROM borme_keys WHERE id=28").execute().then( function (_err, record) {
            debugger
        })
    })



_id = function (conDestino,obj,cb) {


    const cadsql = 'SELECT  JSON_OBJECT(' +
        '"_id", borme_keys.id,' +
        '"_Nombre", borme_keys.Nombre,' +
        '"_type", _type(borme_keys._Empresa, borme_keys._Directivo,'+
                        'borme_keys._Auditor, borme_keys._Financiera, ' +
                        'borme_keys._Sicav, borme_keys._Socimi), ' +
        '"_tr", borme_keys.T_Relations,' +
        '"_ia", IF(borme_keys.Ia_suspicius, 1, 0),' +
        '"_Nodes", JSON_ARRAYAGG(JSON_OBJECT(' +
        '"_id", _Tr.id,' +
        '"_Nombre", _Tr.Nombre,' +
        '"_type", _type(_Tr._Empresa, _Tr._Directivo, _Tr._Auditor, _Tr._Financiera, _Tr._Sicav, _Tr._Socimi),' +
        '"_tr", _Tr.T_Relations,' +
        '"_ia", IF(_Tr.Ia_suspicius, 1, 0),' +
        '"_Nodes", _Tr.Nodes))) as JSON_Relations' +
        ' FROM ' +
        'borme_keys,' +
        'JSON_TABLE(Nodes, "$[*]" columns(' +
        'id int PATH "$"' +
        ')) node' +
        ' INNER JOIN borme_keys as _Tr ON _Tr.id = node.id' +
        ' where borme_keys.id = ?;'

 
}