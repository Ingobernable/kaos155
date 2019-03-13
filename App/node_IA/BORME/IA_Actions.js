module.exports =  {
    add: function (app, options,argv, iaparams) {
        let cadSql = "call sum_KeyTotales(?,?);"
        var _cadOut = ""
        options.SQL.boedb.query(cadSql, [argv.data.k, 'BOE,BOCM'], function (err, record) {
            if (err)
                console.log(err)

            if (record.length > 0) {
                cadSql = "INSERT IGNORE ia_data_contratos (_key,_type,_counter,_importe) values (?,?,?,?)"
                app._.each(record, function (rec) {
                    if (rec.fieldCount != null) {
                            //console.log(argv.command.substr(0, 3), argv.data.e, argv.data.k, _cadOut)

                                //debugger
                        
                    } else {                   
                        if (rec[0]._COUNTER != null) {
                            options.SQL.db.query(cadSql, [argv.data.k, rec[0].type, , rec[0]._COUNTER, , rec[0]._IMPORTE], function (err, recordInsert) {
                                _cadOut = "-" + argv.table.substr(0, 7) + " - " + argv.data.e + "->" + record[0].type
                            })
                        } else {
                            _cadOut = "-" + "Sin Contratos"
                        }
                    }
                })
            }
        })
        
    },
    movimiento: function (app, options, argv, iaparams) {
        //debugger
        if (argv.data.acto._def == "RELACION") {
            const cadSql = "call Insert_Data_IA_seguimiento(?,?,?)"
            options.SQL.db.query(cadSql, [argv.data._key_relation, argv.data._id_relation, iaparams.min_TRelations], function (err, rec) {
                if (err || rec == null) {
                    console.log(err)
                    debugger
                }

                //    console.log(argv.command.substr(0, 3), rec[0].T_relations, argv.e, argv.k, _cadOut)
                if (rec[0][0].counter != null) {
                    console.log(argv.data.acto._def, argv.data.acto._type, argv.data.acto._cargo, argv.data.acto._value)

                }
                //if (rec[0].T_relations > 10 && rec[0]._Directivo)
                //debugger
                //if (rec[0].Nombre != argv.e)
                //    debugger
            })

        } else {
            if (argv.data.acto._type == 'Constitucion') {
                const cadSql = "CALL insert_Data_IA_constitucion(?,?,?,?)"
                options.SQL.db.query(cadSql, [argv.data._fecha.mes, argv.data._fecha.anyo, argv.data._provincia, argv.data._id_empresa], function (err, rec) {
                    debugger
                })
            }
        }
        //const cadSql = "SELECT Count(*) as _c FROM boletin_contratos WHERE _key=?"
        //options.SQL.boedb.query(cadSql, [argv.k], function (err, record) {
        //    console.log(argv.command.substr(0, 3), argv.k + "-" + argv.table.substr(0, 7) + " - " + argv.e + "->" + record[0]._c)
        //})
    },
    update: function (app, options, argv) {
        //const cadSql = "SELECT Count(*) as _c FROM boletin_contratos WHERE _key=?"
        //options.SQL.boedb.query(cadSql, [argv.k], function (err, record) {
        //    console.log(argv.command.substr(0, 3), argv.k + "-" + argv.table.substr(0, 7) + " - " + argv.e + "->" + record[0]._c)
        //})
    }
    
}