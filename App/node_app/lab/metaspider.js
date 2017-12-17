var MetaInspector = require('node-metainspector');
var client = new MetaInspector("http://www.infocif.es/ficha-empresa/swat-sl", { timeout: 5000 });

client.on("fetch", function () {
    console.log("Description: " + client.description);

    console.log("Links: " + client.links.join(","));
});

client.on("error", function (err) {
    console.log(err);
});

client.fetch();