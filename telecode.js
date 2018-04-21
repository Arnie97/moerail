function main() {
    $('#stations').text(stations.length);
    $('header,footer').geopattern(Math.random().toString());
    $('img#ribbon').on('click', function() {
        $('input.search').focus();
    });
    $('input.search').on('change', function() {
        location.hash = '#' + escape($('input.search').val());
    });
    $(window).on('hashchange', function() {
        var inputText = unescape(location.hash.slice(1)).toUpperCase();
        $('input.search').val(inputText);
        return query(inputText);
    });
    $('table').tablesorter();
    $(window).trigger('hashchange');
}

function query(s) {
    if (s.match(/[GDC]\d{1,4}/i)) {
        var url = '/img/{0}.png'.format([s]);
        $('a#route>img').attr('src', url).on('error', function() {
            $(this).unbind('error').attr('src', 'img/404.png');
        });;
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
        i = i.slice(0);  // clone the array
        var pair = bureaus[i[2].slice(-1)] || ['', ''];
        i.push('<span class="hidden-xs">{0}</span><span class="visible-xs-block">{1}</span>'.format(pair));
        if (i[2]) {
            i[2] = '-' + i[2];
        }
        i.link(1, 'https://zh.wikipedia.org/zh-cn/{1}站'.format(i[1].match(/[^(]+/)));
        i.link(2, 'https://jprailfan.com/tools/stat/?telecode={2}');
        i.link(3, 'https://jprailfan.com/tools/stat/?statnumb={3}');
        return '<tr><td>{1}</td><td>{5}</td><td>{4}</td><td>{2}</td><td>{0}</td><td>{3}</td></tr>'.format(i);
    });
    $('table>tbody').html(tableRows.join());
    $('table').trigger('update');
}

function cond(s) {
    if (!s) {
        s = cities.randomElement();
    } else if (s.match(/\d+/)) {
        $('table').trigger('sorton', [[[5, 0]]]);
        return (function(i) {
            return i[3].startsWith(s);
        });
    }

    $('table').trigger('sorton', [[]]);
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
            return i[0] === s.toLowerCase() || i[2] === s;
        });
    }
}

$(main);
