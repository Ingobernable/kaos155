module.exports = function (app) {

    return {
        obj: require('neo4j-driver').v1,
        driver: null,
        session: null,
        insert: function (string, _back) {
                this.session.run(string).then(function () {
                    _back()
                })
        },
        push: {

            run: function (keyA, KeyB, string, _return,params) {
 
                if (_return == null)
                    debugger

                app.BOLETIN.SQL.grafosDb.SQL.db.query("INSERT IGNORE INTO cypher_data_grafos (_cypher,_keyA,_keyB,r,boletin, command) VALUES (?,?,?,?,?,?)", [string, keyA, KeyB, params._Extra.r, params._Extra.b, params._Extra.c ], function (err, record) {
                    params._Extra = null
                    _return(params)
                })

            },
            Object: function (params, _return) {

                params._Extra = {
                    b: params.data.BOLETIN + "#" + params.data.ID_BORME,
                    r: this.Get.utils._table(params.table, params),
                    c: "MERGE"
                }

                this.run(params.k, null ,this.Get.Object(params), _return, params)

            },
            relation: function (table, origen, destino, _return, _Dl, Active, boletin) { 
                if (origen.k && destino.k) {
                    this.run(origen.k, destino.k, this.Get.relation(table, origen, destino), _return, { _Extra: { b: boletin, r: this.Get.utils._relation(table, origen, destino), c: "MATCH" } } )
                } else {
                    if (_return == null)
                        debugger
                    _return()
                }
            },
            Get: {
                Object: function (params) {
                    return "MERGE (:" + this.utils._table(params.table, params) + (params.e || params.k ? (" { " + (params.k ? ("id: '" + params.k + "'") : "") + (params.e && params.k ? "," : "") + (params.e ? ("nombre:'" + params.e.replaceAll("'", "\\'") + "'") : "") + " }") : "") + ")"
                },
                relation: function (table, origen, destino) {
                    return "MATCH (emp:" + this.utils._table("Empresa", origen) + " {id:'" + origen.k + "'}),(x:" + this.utils._table(table, destino) + " {id:'" + destino.k + "'})" + ((this.utils._relation(table, origen, destino) == "FINANCIADO_POR" || this.utils._relation(table, origen, destino) == "DIRECTIVO") ? " MERGE (x)-[r:" + this.utils._relation(table, origen, destino) + "]-(emp)" : " MERGE (emp)-[r:" + this.utils._relation(table, origen, destino) + "]-(x)")
                }, utils: {
                    //type: function (params) {
                    //    return (this.utils.isBanca(params) ? "Financiera" : this.utils.isSicav(params) ? "Sicav" : this.utils.isUTE(params) ? "Ute" : params.table)
                    //},
                    isBanca: function (params) {
                        if (params == null) {
                            return false
                        } else {
                            if (params.e == null) {
                                return false
                            } else {
                                return params.e.toUpperCase().indexOf('BANCO ') > -1 || params.e.toUpperCase().indexOf('CAJA ') > -1 || params.e.toUpperCase().indexOf('CAIXA ') > -1 || params.e.toUpperCase().indexOf('CAIXA ') > -1 || params.e.toUpperCase().indexOf('SEGUROS ') > -1
                            }
                        }

                    },
                    isSicav: function (params) {
                        if (params == null) {
                            return false
                        } else {
                            if (params.e == null) {
                                return false
                            } else {
                                return params.e.indexOf(' SICAV ') > -1
                            }
                        }
                    },
                    isUTE: function (params) {
                        if (params == null) {
                            return false
                        } else {
                            if (params.e == null) {
                                return false
                            } else {
                                return params.e.indexOf(' UTE ') > -1
                            }
                        }
                    },
                    _table: function (table, data) {
                        return this.isBanca(data) ? "Financiera" : this.isSicav(data) ? "Sicav" : this.isUTE(data) ? "Ute" : table
                    },
                    _relation: function (table, origen, destino) {
                        return this._table(table, destino) == 'Auditor' ? "AUDITADO_POR" : this.isBanca(destino) ? "FINANCIADO_POR" : (this._table("Empresa", origen) == this._table(table, destino) && this._table(table, destino) != 'Directivo') ? "PARTICIPADO_POR" : "DIRECTIVO"
                    }
                }
            }
        }
    }
}