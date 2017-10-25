module.exports = function (app) {
    return {

        db: null,
        io: {
            count: function (_key, _callback) {

                if (_key.type) {
                    var cadsql = "SELECT count(*) FROM borme INNER JOIN strings ON borme.BORME = strings.BORME WHERE Empresa Like '%" + _key.key.toUpperCase() + "%' " //+ (CadSqlTipo_BOE.length > 0 ? " AND (" + CadSqlTipo_BOE + ")" : "") + (CadSqltramite.length > 0 ? " AND (" + CadSqltramite + ")" : "")
                } else {
                    var cadsql = "SELECT count(*) FROM borme INNER JOIN strings ON borme.BORME = strings.BORME WHERE Original Like '%" + _key.key.toUpperCase() + "%' " //"SELECT count(*) FROM BORME WHERE LOWER(texto) Like '%" + _key.key + "%' " //+ (CadSqlTipo_BOE.length > 0 ? " AND (" + CadSqlTipo_BOE + ")" : "") + (CadSqltramite.length > 0 ? " AND (" + CadSqltramite + ")" : "")
                }
                //console.log(cadsql)
                app.SQL.BORME.db.query(cadsql, function (err, rows) {
                    app.SQL.getLsts(app, _key, function (err, lst, data) {
                        //app.io.emit('total', { data: app._xData, rows: lst })
                        _callback(err, { lsts: lst, data: rows })
                    })
                })
                //this.ejec(cadsql, callback)
            },
            get: function (_key, callback) {
                if (_key.type) {
                    var cadsql = "SELECT borme.BORME, strings.borme_Id, strings.Original as TEXTO, strings.Empresa as _strings FROM BORME INNER JOIN strings ON BORME.BORME = strings.BORME WHERE Empresa Like '%" + _key.key.toUpperCase() + "%' " // + (CadSqlTipo_BOE.length > 0 ? " AND (" + CadSqlTipo_BOE + ")" : "") + (CadSqltramite.length > 0 ? " AND (" + CadSqltramite + ")" : "") + " order by BOE.BOE"
                } else {
                    var cadsql = "SELECT borme.BORME, strings.borme_Id, strings.Original as TEXTO, strings.Empresa as _strings FROM BORME INNER JOIN strings ON BORME.BORME = strings.BORME WHERE Original Like '%" + _key.key.toUpperCase() + "%' " // + (CadSqlTipo_BOE.length > 0 ? " AND (" + CadSqlTipo_BOE + ")" : "") + (CadSqltramite.length > 0 ? " AND (" + CadSqltramite + ")" : "") + " order by BOE.BOE"
                }
                //cadsql = "SELECT _keys FROM strings WHERE _keys like '%A%'"
                //console.log(cadsql)
                this.ejec(cadsql, callback)
            },
            getDoc: function (_key, callback) {
                var cadsql = "SELECT borme.BORME,borme.PDF, strings.Original as TEXTO, strings.Empresa as _strings FROM borme INNER JOIN strings ON borme.BORME = strings.BORME WHERE borme.Anyo=" + _key.anyo + " AND strings.borme_id = " + _key.key
                this.ejec(cadsql, callback)
            },
            ejec: function (cadsql, callback) {
                console.log(cadsql)
                app.SQL.BORME.db.query(cadsql, function (err, rows) {
                    console.log(err, cadsql)
                    callback(err, rows)
                })
            }
        }
    }
}