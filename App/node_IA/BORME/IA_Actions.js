module.exports = {
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
                insert: function (argv,rec) {
                    return [argv.data.k, rec[0].type, , rec._COUNTER, , rec._IMPORTE]
                }
            }
        }
    },
    add: function (_tools, app, options,argv, iaparams) {
        //console.log('Nuevo ->cuenta contratos task')

        //let cadSql = "call sum_KeyTotales(?,?);"
        //var _cadOut = ""
        options.SQL.boedb.query(_tools.cadSql.ask, _tools.data.ask(argv), function (err, record) {
            if (err)
                console.log(err)

            if (record.length > 0) {
                app._.each(record, function (rec) {
                   
                        if (rec[0]._COUNTER != null) {
                            options.SQL.db.query(_tools.cadSql.insert, _tools.data.insert(argv, rec[0]) , function (err, recordInsert) {
                               console.log( "-" + argv.table.substr(0, 7) + " - " + argv.data.e + "->" + record[0].type)
                            })
                        } else {
                            console.log( "-" + "Sin Contratos" )
                        }
                    
                })
            }
        })
        
    },
    relacion: function (_tools,app, options, argv, iaparams) {
        //console.log('relacion')
        //const cadSql = "call Insert_Data_IA_seguimiento(?,?,?)"
        

        options.SQL.db.query(_tools.cadSql, _tools.data(argv, iaparams) , function (err, rec) {
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
    },
    movimiento: function (_tools,app, options, argv, iaparams) {
        //debugger
            //console.log('movimiento', argv.data.acto._type)

        //if (argv.data.acto._type == 'Constitucion' || argv.data.acto._type == 'Extincion') {
            //const _p = 
            //console.log(_p)
            //const cadSql = "CALL insert_Data_IA_movimiento(?,?,?,?,?,?,?,?,?,?,?,?)"
        options.SQL.db.query(_tools.cadSql, _tools.data(argv), function (err, rec) {
                    if (err) 
                        console.log(err)
                })
            //}
        
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