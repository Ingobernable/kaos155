module.exports = function (app, url) {

    return {
        url: url,
        getRelaciones: function (type, id, response, callback) {
            curl = app.curl(this.url + type + '/Relaciones/' + id, '')
            curl.nav(type, function(jSonData) {

                console.log(jSonData)
                response.writeHead(200, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify(jSonData))
            })
        },
        getdataId: function (type, id, response, callback) {
            curl = app.curl(this.url + type + '/' + id, '')
            curl.nav(type, function (body) {

                var key = 'var root = createBaseGraph('
                var p = body.indexOf(key)
                var f = p > 0 ? body.indexOf('}', p) : 0

                data = body.substr(p + key.length, (f - p - key.length) + 1).replace('+ 100000000', '')
                response.writeHead(200, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify(JSON.parse(data)))
            })
        }
    }
}