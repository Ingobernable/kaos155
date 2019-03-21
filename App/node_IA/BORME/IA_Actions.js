module.exports = function (app) {

    return {

        tools: {

            relacion: {
                cadSql: "call Insert_Data_IA_seguimiento(?,?,?)",
                data: function (argv, iaparams) { return [argv.data._key_relation, argv.data._id_relation, iaparams.min_TRelations] },
            },
            movimiento: {
                cadSql: "CALL insert_Data_IA_movimiento(?,?,?,?,?,?,?,?,?,?,?,?)",
                data: function (argv) {
                    return [
                        argv.data._id_empresa,
                        argv.data.acto._type,

                        argv.data._fecha.dia,
                        argv.data._fecha.mes,
                        argv.data._fecha.anyo,
                        argv.data._provincia,

                        argv.data.record._Empresa.toString() == '\u0001' ? 1 : 0,
                        argv.data.record._Financiera.toString() == '\u0001' ? 1 : 0,
                        argv.data.record._Auditor.toString() == '\u0001' ? 1 : 0,
                        argv.data.record._Sicav.toString() == '\u0001' ? 1 : 0,

                        argv.data.acto._cargo,
                        argv.data.acto._value ? (argv.data.acto._type == 'Constitucion' ? argv.data.acto._value.substr(0, 8) : argv.data.acto._value.split('.')[0]) : '',

                    ]
                }
            },
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
                            app.IA.SQL.db.query(app._io.functions.BORME.tools.add.cadSql.insert, app._io.functions.BORME.tools.add.data.insert(argv, rec[0]), function () {
                                app.writeSync(app, "-" + argv.table.substr(0, 7) + " - " + argv.data.e + "->" + record[0].type)
                                err = null
                                rec = null
                                record = null
                                _cb()
                            })
                        } else {
                            app.writeSync(app, argv.data.e + "-" + "Sin Contratos")
                            err = null
                            rec = null
                            record = null
                            _cb()
                        }

                    })
                } else {
                    app.writeSync(app, 'ADD->' + argv.data.e)
                    err = null
                    rec = null
                }
                record = null
            })

        },
        relacion: function (argv) {
            //console.log('relacion')
            //const cadSql = "call Insert_Data_IA_seguimiento(?,?,?)"
            //const _this = this

            app.IA.SQL.db.query(app._io.functions.BORME.tools.update.cadSql, app._io.functions.BORME.tools.update.data(argv, app._io._IAparameters), function (err, rec) {
                if (err || rec == null) {
                    app.writeSync(app, err)
                    debugger
                }

                //    console.log(argv.command.substr(0, 3), rec[0].T_relations, argv.e, argv.k, _cadOut)
                if (rec[0][0].counter != null) {
                    app.writeSync(app, argv.data.acto._def + ' ' + argv.data.acto._type + ' ' + argv.data.acto._cargo + ' ' + argv.data.acto._value)
                }
                err = null
                rec = null

                debugger
            })
        },
        movimiento: function (argv) {
            app.IA.SQL.db.query(app._io.functions.BORME.tools.movimiento.cadSql, app._io.functions.BORME.tools.movimiento.data(argv), function (err, rec) {
                if (err)
                    err ? app.writeSync(app, err) : app.writeSync(app, argv.data.acto._type + ' ' + argv.data.acto._cargo + ' ' + argv.data.acto._value)

                err = null
                rec = null

            })

        },
        update: function () {

        }
    }
}