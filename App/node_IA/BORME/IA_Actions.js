module.exports = function (app) {

    return {

        tools: {

           
            add: {
                cadSql: {
                    ask: "call sum_KeyTotales(?,?);",
                    insert: "INSERT IGNORE ia_data_contratos (_key,_type,_counter,_importe) values (?,?,?,?)"

                },
                data: {
                    ask: function (argv) {
                        return [argv.data.k, 'BOE,BOCM']
                    },
                    insert: function (argv, rec) {
                        return [argv.data.k, rec[0].type, , rec._COUNTER, , rec._IMPORTE]
                    }
                }
            }
        },
        add: function (argv) {
            app.IA.SQL.boedb.query(app._io.functions.BORME.tools.add.cadSql.ask, app._io.functions.BORME.tools.add.data.ask(argv), function (err, record) {
                if (err)
                    app.writeSync(app, err)

                if (record.length > 0) {
                    app._.each(record, function (rec) {

                        if (rec[0]._COUNTER != null) {
                            app.IA.SQL.boedb.query(app._io.functions.BORME.tools.add.cadSql.insert, app._io.functions.BORME.tools.add.data.insert(argv, rec[0]), function (err, record) {
                                app.writeSync(app, "-" + argv.table.substr(0, 7) + " - " + argv.data.e + "->" + record[0].type)
                                err = null
                                rec = null
                            })
                        } else {
                            app.writeSync(app, argv.data.e + "-" + "Sin Contratos")
                            err = null
                            rec = null
                           
                        
                        }
                       
                    })
                    record = null
                } else {
                    app.writeSync(app, 'ADD->' + argv.data.table + " - " + argv.data.e)
                }
                record = null
            })

        },
        update: function () {

        }
    }
}