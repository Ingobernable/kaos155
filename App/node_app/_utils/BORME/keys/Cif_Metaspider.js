module.exports = function (app) {
    var _ = app._

    return {
        www: 'http://www.infocif.es',
        MetaInspector: require('node-metainspector'),
        ask: function (key, empresa, callback) {
            var client = new this.MetaInspector(this.www+ "/ficha-empresa/" + _.kebabCase(empresa) , { timeout: 5000 });
            client.on("fetch", function () {
                data = client.description.match(/\w\d{8}/) || [""]
                //console.log("Description: " + client.description);
                //console.log("Links: " + client.links.join(","));
                client = null
                callback(data[0])
            });

            client.on("error", function (err) {
                client = null
                console.log(err);
                callback(data)
                //console.log("");
            });
            client.fetch();
        }
    }
}