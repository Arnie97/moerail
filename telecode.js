var stations = station_names.split('@').map(function(i) {
    return i.split('|');
});
stations.shift();

function query(s) {
    return stations.find(cond(s));
}

function cond(s) {
    if (s.startsWith('-')) {
        return (function(i) {
            return i[2] === s.slice(1).toUpperCase();
        });
    } else if (s.charCodeAt(0) > 'z'.charCodeAt(0)) {
        return (function(i) {
            return i[1].startsWith(s);
        });
    } else {
        return (function(i) {
            return i[0] === s.toLowerCase() || i[2] === s.toUpperCase();
        });
    }
}
