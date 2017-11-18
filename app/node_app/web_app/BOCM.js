module.exports = function (app) {
    return {
      
            db: null,
            io: {
                count: function (_key, _callback) {
                    var CadSqltramite = ""
                    if (_key.filters != null) {

                        for (k in _key.filters.Tipo_BOCM) {
                            CadSqltramite = CadSqltramite + (CadSqltramite.length > 1 ? " OR " : "") + " bocm.Tipo_TRAMITE = '" + _key.filters.Tipo_BOCM[k] + "'"
                        }
                        //CadSqltramite = CadSqltramite + ")"
                    }

                    var _cadsql = "SELECT count(*) FROM strings INNER JOIN bocm ON strings.BOCM = bocm.BOCM WHERE ((_keys Like '%" + _key.key + "%') " + (CadSqltramite.length > 0 ? " AND (" + CadSqltramite + ")" : "") + ")"
                    //console.log(cadsql)
                    app.SQL.BOCM.db.query(_cadsql, function (err, rows) {
                        //debugger
                        app.SQL.getLsts(app, _key, function (err, lst, data) {
                            //app.io.emit('total', { data: app._xData, rows: lst })
                            _callback(err, { lsts: lst, data: rows })
                        })
                    })
                    //this.ejec(cadsql, callback)
                },
                get: function (key, callback) {
                    var CadSqltramite = ""
                    if (key.filters != null) {
                        //CadSqlTipo_BOE = "("


                        //CadSqltramite = "("
                        for (k in key.filters.Tipo_BOCM) {
                            CadSqltramite = CadSqltramite + (CadSqltramite.length > 1 ? " OR " : "") + " bocm.Tipo_TRAMITE = '" + key.filters.Tipo_BOCM[k] + "'"
                        }
                        //CadSqltramite = CadSqltramite + ")"
                    }

                    var cadsql = "SELECT bocm.BOCM, bocm.Tipo_TRAMITE, bocm.TEXTO, strings._keys, bocm.PDF,  strings.Importes FROM strings INNER JOIN bocm ON strings.BOCM = bocm.BOCM WHERE ((_keys Like '%" + key.key + "%') " + (CadSqltramite.length > 0 ? " AND (" + CadSqltramite + ")" : "") + ") order by bocm.BOCM"
                    //console.log(cadsql)
                    this.ejec(cadsql, callback)
                },
                ejec: function (cadsql, callback) {
                    app.SQL.BOCM.db.query(cadsql, function (err, rows) {
                        if (err)
                            debugger
                        var _rows = []
                        for (i in rows) {
                            _rows[_rows.length] = rows[i]
                        }
                        callback(err, _rows)
                    })
                }
            }
        }
}