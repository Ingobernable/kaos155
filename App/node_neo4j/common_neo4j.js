module.exports = function (app) {

    return {
        obj: require('neo4j-driver').v1,
        driver: null,
        session: null,
        push: {
            run: function (string) {
                //console.log(string)
                //if (false) {
                app.neo4j.session.run(string).subscribe({

                    onError: function (error) {
                        //        debugger
                        console.log(error);
                    }
                })
                //}
            },
            Object: function (params) {
                // console.log(this.Get.Object(params))

                this.run(this.Get.Object(params))

            },
            relation: function (table, origen, destino) { //, OptionsDestino, active) {
                // console.log(this.Get.relation(table, origen, destino))

                this.run(this.Get.relation(table, origen, destino))
            },
            Get: {
                Object: function (params) {
                    return "MERGE (:" + (this.utils.isBanca(params) ? "Financiera" : this.utils.isSicav(params) ? "Sicav" : this.utils.isUTE(params) ? "Ute" : params.table) + (params.e || params.k ? (" { " + (params.k ? ("id: '" + params.k + "'") : "") + (params.e && params.k ? "," : "") + (params.e ? ("nombre:'" + params.e.replaceAll("'", "\\'") + "'") : "") + " }") : "") + ")"
                },
                relation: function (table, origen, destino) {
                    return "MATCH (emp:" + this.utils._table("Empresa", origen) + " {id:'" + origen.k + "'}),(x:" + this.utils._table(table, destino) + " {id:'" + destino.k + "'})" + ((this.utils._relation(table, origen, destino) == "FINANCIADO_POR" || this.utils._relation(table, origen, destino) == "DIRECTIVO") ? " MERGE (x)-[r:" + this.utils._relation(table, origen, destino) + "]-(emp)" : " MERGE (emp)-[r:" + this.utils._relation(table, origen, destino) + "]-(x)")
                }, utils: {
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