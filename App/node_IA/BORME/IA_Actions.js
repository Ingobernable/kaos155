module.exports =  {
    add: function (app, options,argv) {
        let cadSql = "call sum_KeyTotales(?,?);"
        options.SQL.boedb.query(cadSql, [argv.k, 'BOE,BOCM'], function (err, record) {
            if (record.length > 0) {
                cadSql = "INSERT IGNORE ia_data_contratos (_key,_type,_counter,_importe) values (?,?,?,?)"
                app._.each(record, function (rec) {
                    if (rec.fieldCount != null) {

                    } else {                   
                        if (rec[0]._COUNTER != null) {
                            options.SQL.db.query(cadSql, [argv.k, rec[0].type, , rec[0]._COUNTER, , rec[0]._IMPORTE], function (err, recordInsert) {
                                console.log(argv.command.substr(0, 3), argv.k + "-" + argv.table.substr(0, 7) + " - " + argv.e + "->" + record[0].type)
                            })
                        } else {
                            console.log(argv.command.substr(0, 3), argv.k)
                        }
                    }
                })
            }
        })
        
    },
    update: function (options,argv) {
        //const cadSql = "SELECT Count(*) as _c FROM boletin_contratos WHERE _key=?"
        //options.SQL.boedb.query(cadSql, [argv.k], function (err, record) {
        //    console.log(argv.command.substr(0, 3), argv.k + "-" + argv.table.substr(0, 7) + " - " + argv.e + "->" + record[0]._c)
        //})
    }
    
}