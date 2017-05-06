var stations = station_names.split('@').map(function(i) {
    return i.split('|');
});
stations.shift();

Array.prototype.findAll = function(fn) {
    var arr = [];
    this.forEach(function(i) {
        if (fn(i)) {
            arr.push(i);
        }
    });
    return arr;
};

String.prototype.format = function(args) {
    return this.replace(/{(\d+)}/g, function(match, number) {
        return typeof args[number] != 'undefined'? args[number]: match;
    });
};

function main() {
    $('#count').text(stations.length);
    $('img#ribbon').on('click', function() {
        $('input.search').focus();
    });

    query('北京');
    $('input.search').focus();
    $('input.search').on('change', function() {
        var inputText = $('input.search').val();
        query(inputText);
    });
}

function query(s) {
    var results = stations.findAll(cond(s));
    var tableRows = results.map(function(i) {
        return '<tr><td>{1}</td><td>-{2}</td><td>{0}</td></tr>'.format(i);
    });
    $('table>tbody').html(tableRows.join());
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

$(main);
