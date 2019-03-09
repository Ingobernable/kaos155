module.exports = function (app,argv) {
    return function () {
        console.log('add ', argv[1])
    }
}