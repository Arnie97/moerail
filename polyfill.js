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

if (!String.prototype.includes) {
    String.prototype.includes = function(s, position) {
        return (
            (position || 0) + s.length <= this.length &&
            this.indexOf(s, position || 0) !== -1
        );
    };
}
