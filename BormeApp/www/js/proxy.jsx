module.exports = function (app, url, callback) {
    console.log('PROXY TO:'+url.params[0][1])
    //debugger
    requestOptions = { encoding: null, method: "GET", uri: url.params[0][1] }
    app.request.get(requestOptions, function (req, res, body) {
        console.log(req,body)
        callback(body)
   })

}