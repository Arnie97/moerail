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
    $('#stations').text(stations.length);
    $('header,footer').geopattern(Math.random().toString());
    $('img#ribbon').on('click', function() {
        $('input.search').focus();
    });
    $('a#route>img').on('error', function() {
        $('a#route').addClass('hidden');
    });

    query('北京');
    $('input.search').focus();
    $('input.search').on('change', function() {
        var inputText = $('input.search').val().toUpperCase();
        $('input.search').val(inputText);
        query(inputText);
    });
}

function query(s) {
    if (s.match(/[GDC]\d{1,4}/i)) {
        var url = '/img/{0}.png'.format([s]);
        $('a#route>img').attr('src', url);
        $('a#route').attr('href', url);
        $('a#route').removeClass('hidden');
        $('table').addClass('hidden');
        return;
    } else {
        $('a#route').addClass('hidden');
        $('table').removeClass('hidden');
    }
    var results = stations.findAll(cond(s));
    var tableRows = results.map(function(i) {
        var pair = bureaus[i[2].slice(-1)] || '';
        i.push('<span class="hidden-xs">{0}</span><span class="visible-xs-block">{1}</span>'.format(pair));
        return '<tr><td>{1}</td><td>{6}</td><td>-{2}</td><td>{0}</td></tr>'.format(i);
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
