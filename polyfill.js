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
    } else {  // external links
        var link = '<a href="{0}" target="_blank">{1}</a>';
    }
    return (this[i] = link.format([url, this[i]]));
};

String.prototype.format = function(args) {
    return this.replace(/{(\d+)}/g, function(match, number) {
        return typeof args[number] != 'undefined'? args[number]: match;
    });
};

if (!String.prototype.startsWith) {
    String.prototype.startsWith = function(s, position) {
        return this.substr(position || 0, s.length) === s;
    };
}
