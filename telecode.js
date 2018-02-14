function main(csvFile) {
    records = $.csv.toArrays(csvFile);
    $('<tr>').join(records.shift(), '<th>').appendTo('thead');
    $('#count').text(records.length);
    $('#loading').hide();

    $('header,footer').geopattern(Math.random().toString());
    $('input.search').on('change', function() {
        location.hash = '#' + $('input.search').val();
    });
    $(window).on('hashchange', function() {
        if (!location.hash) {
            return $('input.search').focus();
        }
        var inputText = location.hash.slice(1);
        $('input.search').val(inputText);
        query(inputText);
        return tgvLink();
    });
    $(window).trigger('hashchange');
}

function query(s) {
    $('tbody').empty();
    s = s.toLowerCase();
    records.forEach(function(i) {
        if (i.some(cond(s))) {
            $('<tr>').join(i, '<td>').appendTo('tbody');
        }
    });
}

function cond(s) {
    if (s.match(/^\d+$/)) {
        return function(i) {
            return new RegExp('\\b' + s + '\\b').test(i);
        };
    } else {
        return function(i) {
            return i.toLowerCase().includes(s);
        };
    }
}

function tgvLink(node) {
    $('td:nth-child(9), td:nth-child(10)').contents().each(function (i, node) {
        while ((node = addSingleLink(node)));
    });
}

function addSingleLink(node) {
    var tgvCode = /\b(\d{3}|\d{5})\b(\/\d+)?/, match;
    if (!node.nodeValue || !(match = tgvCode.exec(node.nodeValue))) {
        return;
    }
    var link = $('<a>').attr('href', '#' + match[1]).text(match[0])[0];

    var after = node.splitText(match.index);
    node.parentNode.insertBefore(link, after);
    after.nodeValue = after.nodeValue.substring(match[0].length);
    return after;
}

$.fn.join = function(array, tag) {
    var parent = this;
    array.forEach(function(i) {
        $(tag).text(i).appendTo(parent);
    });
    return this;
};

$.get('tgv.csv').then(main);
