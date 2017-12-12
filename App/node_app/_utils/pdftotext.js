
var exec = require('child_process').exec;
var execSync = require('child_process').execSync;
var path = require('path');

function pdftotext(filename, options) {
    this.options = options || {};
    //quote filename
    this.options.additional = [] //'"' + filename + '"'];

    pdftotext.prototype.add_options = function (optionArray) {
        if (typeof optionArray.length !== undefined) {
            var self = this;
            optionArray.forEach(function (el) {
                if (el.indexOf(' ') > 0) {
                    var values = el.split(' ');
                    self.options.additional.push(values[0], values[1]);
                } else {
                    self.options.additional.push(el);
                }
            });
        }
        return this;
    };



    pdftotext.prototype.getText = function (cb) {
        var self = this;
        var isWin = /^win/.test(process.platform);
        
        self.add_options([filename]);
        var _command = (isWin?path.normalize(path.dirname(__filename)+'/../../bin/win/'):'')+'pdftotext ' + self.options.additional.join(' ')
        //console.log(_command)
        exec(_command, cb);
    }

    pdftotext.prototype.error = function (callback) {
        this.options.error = callback;
        return this;
    };

    pdftotext.prototype.success = function (callback) {
        this.options.success = callback;
        return this;
    };
}

// module exports
exports = module.exports = function (filename, args) {
    return new pdftotext(filename, args);
};