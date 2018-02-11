module.exports = function (app) {

    return {
        obj: require('neo4j-driver').v1, driver: null, session: null, cyper: [], run: function (options, params) {
            this.session.run(app.neo4j.cadNeoSql).subscribe({
                onError: function (error) {
                    //x = CyperString
                    console.log(error);
                }
            })

        }, push: {
            Object: function (options, table, params) {

                const _banca = options.isBanca(params)
                const _table = _banca ? "Financiera" : options.isSicav(params) ? "Sicav" : options.isUTE(params) ? "Ute" : table

                app.neo4j.cadNeoSql = "MERGE (:" + _table + " { " + "id: '" + params.k + "'" + ",nombre:'" + params.e.replaceAll("'", "\\'") + "' })"
                app.neo4j.run(options, params)
            },
            relation: function (options, table, origen, destino, OptionsDestino, active) {
                //debugger
                const _banca_origen = options.isBanca(origen)
                const _banca_destino = options.isBanca(destino)

                const _tableOrigen = _banca_origen ? "Financiera" : options.isSicav(origen) ? "Sicav" : options.isUTE(origen) ? "Ute" : "Empresa"
                const _tableDestino = _banca_destino ? "Financiera" : options.isSicav(destino) ? "Sicav" : options.isUTE(destino) ? "Ute" : table
                const _relation = _tableDestino == 'Auditor' ? "AUDITADO_POR" : _banca_destino ? "FINANCIADO_POR" : (_tableOrigen == _tableDestino && _tableDestino != 'Directivo') ? "PARTICIPADO_POR" : "DIRECTIVO"

                const _ko = origen.k
                const _kd = destino.k

                app.neo4j.cadNeoSql = "MATCH (emp:" + _tableOrigen + " {id:'" + _ko + "'}),(x:" + _tableDestino + " {id:'" + _kd + "'})"                                //cadNeoSql = cadNeoSql + " MERGE (emp)-[:" + OptionsDestino.values.key + " { tipo:'" + OptionsDestino.type + "', cargo:'" + OptionsDestino.values.key + "' ,activo:" + (active ? 1 : 0) + ",anyo:" + origen.data.BOLETIN.match(/[\d]{4}/)[0] + "}]-(x)"
                if (_relation == "FINANCIADO_POR" || _relation == "DIRECTIVO") {
                    app.neo4j.cadNeoSql = app.neo4j.cadNeoSql + " MERGE (x)-[r:" + _relation + "]-(emp)"
                } else {
                    app.neo4j.cadNeoSql = app.neo4j.cadNeoSql + " MERGE (emp)-[r:" + _relation + "]-(x)"
                }

                app.neo4j.run(options)
            }
        }
    }
}