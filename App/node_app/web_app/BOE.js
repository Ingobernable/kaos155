module.exports = function (app) {
    return {
            db: null,
            io: {
                count: function (_key, _callback) {
                    var CadSqlTipo_BOE = ""
                    var CadSqltramite = ""
                    if (_key.filters != null) {
                        //CadSqlTipo_BOE = "("
                        for (k in _key.filters.Tipo_BOE) {
                            CadSqlTipo_BOE = CadSqlTipo_BOE + (CadSqlTipo_BOE.length > 1 ? " OR " : "") + " boletin.Tipo_BOLETIN = '" + _key.filters.Tipo_BOE[k] + "'"
                        }
                        //CadSqlTipo_BOE = CadSqlTipo_BOE + ")"

                        //CadSqltramite = "("
                        for (k in _key.filters.tramite) {
                            CadSqltramite = CadSqltramite + (CadSqltramite.length > 1 ? " OR " : "") + " boletin.Tipo_TRAMITE = '" + _key.filters.tramite[k] + "'"
                        }
                        //CadSqltramite = CadSqltramite + ")"
                    }

                    var _cadsql = "SELECT count(*) FROM strings INNER JOIN boletin ON strings.BOLETIN = boletin.BOLETIN WHERE ((_keys Like '%" + _key.key + "%') " + (CadSqlTipo_BOE.length > 0 ? " AND ((" + CadSqlTipo_BOE + ")" : "") + (CadSqltramite.length > 0 ? (CadSqlTipo_BOE.length > 0 ? " AND ":" AND ") + "(" + CadSqltramite + ")" : "") + ")" + ( CadSqlTipo_BOE.length  > 0 ? ")":"")
                    //console.log(cadsql)
                    app.SQL.db.query(_cadsql, function (err, rows) {
                        //debugger
                        var x = _cadsql
                        app.SQL.getLsts(app, _key, function (err, lst, data) {
                            //app.io.emit('total', { data: app._xData, rows: lst })
                            console.log(rows[0]['count(*)'], _cadsql)
                            _callback(err, { lsts: lst, data: rows })
                        })
                    })
                    //this.ejec(cadsql, callback)
                },
                get: function (key, callback) {
                    var CadSqlTipo_BOE = ""
                    var CadSqltramite = ""
                    if (key.filters != null) {
                        //CadSqlTipo_BOE = "("
                        for (k in key.filters.Tipo_BOE) {
                            CadSqlTipo_BOE = CadSqlTipo_BOE + (CadSqlTipo_BOE.length > 1 ? " OR " : "") + " boe.Tipo_BOE LIKE '%" + key.filters.Tipo_BOE[k] + "%'"
                        }
                        //CadSqlTipo_BOE = CadSqlTipo_BOE + ")"

                        //CadSqltramite = "("
                        for (k in key.filters.tramite) {
                            CadSqltramite = CadSqltramite + (CadSqltramite.length > 1 ? " OR " : "") + " boe.Tipo_TRAMITE LIKE '%" + key.filters.tramite[k] + "%'"
                        }
                        //CadSqltramite = CadSqltramite + ")"
                    }

                    var cadsql = "SELECT boe.BOE, boe.Tipo_BOE, boe.Tipo_TRAMITE, boe.TEXTO, boe.PDF, strings._keys,  strings.Importes , contrato.precio, contrato.adjudicador, contrato.ambito_geografico, contrato.materias FROM boe INNER JOIN strings ON boe.BOE = strings.BOE INNER JOIN contrato ON boe.BOE = contrato.BOE   WHERE _keys Like '%" + key.key + "%' " + (CadSqlTipo_BOE.length > 0 ? " AND (" + CadSqlTipo_BOE + ")" : "") + (CadSqltramite.length > 0 ? " AND (" + CadSqltramite + ")" : "") + " order by boe.BOE"
                    console.log(cadsql)
                    this.ejec(cadsql, callback)
                },
                getDoc: function (key, callback) {
                    var cadsql = "call get_boletin(?)" + key.key + "'"
                    this.ejec(cadsql,  key, callback)
                },
                ejec: function (cadsql, callback) {
                    app.SQL.BOE.db.query(cadsql, function (err, rows) {
                        callback(err, rows)
                    })
                }
            }
        }
}
