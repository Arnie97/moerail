'use strict';

if (!Array.prototype.find) {
    Array.prototype.find = function(fn, thisArg) {
        for (var i = 0; i < this.length; i++) {
            if (fn.call(thisArg, this[i], i, this)) {
                return this[i];
            }
        }
        return undefined;
    };
}

Array.prototype.findAll = function(fn) {
    var arr = [];
    this.forEach(function(i) {
        if (fn(i)) {
            arr.push(i);
        }
    });
    return arr;
};

Array.prototype.randomElement = function() {
    return this[Math.floor(Math.random() * this.length)];
};

Array.prototype.link = function(i, url) {
    url = url.format(this);
    if (url.startsWith('/')) {  // internal links
        var link = '<a href="{0}">{1}</a>';
    } else if (url.includes('//')) {  // external links
        var link = '<a href="{0}" target="_blank">{1}</a>';
    } else {
        var link = '<a onclick="{0}">{1}</a>';
    }
    return (this[i] = link.format([url, this[i]]));
};

String.prototype.format = function(args) {
    return this.replace(/{(\w+)}/g, function(match, key) {
        return typeof args[key] != 'undefined'? args[key]: match;
    });
};

if (!String.prototype.startsWith) {
    String.prototype.startsWith = function(s, position) {
        return this.substr(position || 0, s.length) === s;
    };
}

if (!String.prototype.includes) {
    String.prototype.includes = function(s, position) {
        return this.indexOf(s, position || 0) !== -1;
    };
}

if (!String.prototype.trim) {
    String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, '');
    };
}
