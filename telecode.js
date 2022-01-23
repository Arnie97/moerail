'use strict';

function main() {
    var ua = navigator.userAgent;
    if (navigator.onLine === false) {
        $('#offline').removeClass('hidden');
    } else if (/Android/.test(ua)) {
        $('#apk,#client').removeClass('hidden');
    } else if (/iPad|iPhone|iPod/.test(ua)) {
        $('#ios,#client').removeClass('hidden');
    } else if (/Windows NT|Macintosh|X11/.test(ua)) {
        $('#ext,#client').removeClass('hidden');
    }

    $('#stations').text(stations.length);
    $('header,footer').geopattern(Math.random().toString());
    $('.github-fork-ribbon').on('click', function() {
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
    $('.component').addClass('hidden');
    if (s.match(/^0?[GDC]\d{1,4}$/)) {
        $('#train-list').removeClass('hidden');
        loadTrains(API_ROOT + '/train/' + $('input.search').val(), s);
        return;
    }

    var results = stations.findAll(matchKeyword(s));
    if (results.length) {
        $('#station-list').removeClass('hidden');
        show(results.map(formatStation));
    } else {
        $('#train-list').removeClass('hidden');
        loadTrains(API_ROOT + '/emu/' + s);
    }
}

function formatStation(i) {
    i = i.slice(0);  // clone the array
    var pair = bureaus[i[2].slice(-1)] || ['', ''];
    i.push('<span class="hidden-xs">{0}</span><span class="visible-xs-block">{1}</span>'.format(pair));
    i.push(i[1].match(/[^(]+/));

    var bit_mask = parseInt(i[4].slice(1), 36) || 0, prefixes = '';
    i[4] = i[4].slice(0, 1);
    for (var j = 0; j < restrictions.length; j++) {
        if (bit_mask & 1 << j) {
            if (j) {
                prefixes += restrictions[j];
            } else {
                i[1] = '<span class="joint">{1}</span>'.format(i);
            }
        }
    }
    i.push(prefixes);

    if (i[2]) {
        i[2] = '-' + i[2].slice(0, 3);
    }
    i.link(1, 'https://zh.wikipedia.org/zh-cn/{6}站');
    i.link(2, 'https://jprailfan.com/tools/stat/?telecode={2}');
    i.link(0, 'https://jprailfan.com/tools/stat/?pinyincode={0}');
    i.link(3, 'http://hyfw.95306.cn/hyinfo/action/FwcszsAction_czcx?hzzm&tmism={3}');
    i.link(4, 'https://www.amap.com/search?query={6}站');
    i.link(5, API_ROOT + '/map/{6}');
    return '<tr><td>{7}</td><td>{1}</td><td>{5}</td><td>{4}</td><td>{2}</td><td>{0}</td><td>{3}</td></tr>'.format(i);
}

function formatTrain(i) {
    var train_no_link = i.train_no.split('/')[0];
    var match = i.emu_no.match(/^(\w+)(\d{4})$/);
    if (match) {
        i.emu_no = match[1] + "-" + match[2];
    }
    i = [i.emu_no, i.train_no, i.date.substring(0, 16), train_no_link];
    i.link(0, '/#{0}');
    i.link(1, '/#{3}');
    i.link(2, "showTrainRouteGraph(this, '{3}');")
    return '<tr><td>{0}</td><td>{1}</td><td>{2}</td></tr>'.format(i);
}

function loadTrains(url, trainNumber) {
    var msg = '<tr><td>-</td><td>-</td><td>{0}</td></tr>';
    show([msg.format(['少女祈祷中…'])]);
    $.getJSON(url).done(function(results) {
        if (results.length) {
            show(results.map(formatTrain));
            $('#train-list').trigger('sorton', [[0, 2]]);
        } else if (trainNumber) {
            show([formatTrain({
                'emu_no': '-',
                'train_no': trainNumber,
                'date': '显示交路图…',
            })]);
        } else {
            show([msg.format(['暂未收录'])]);
        }
    }).fail(function() {
        show([msg.format(['加载失败'])]);
    });
}

function showTrainRouteGraph(link, trainNumber) {
    var currentRow = $(link).parents('tr');
    if (currentRow.next().hasClass('route-graph')) {
        currentRow.next().remove();
        return;
    }

    var url = '/img/{0}.png'.format([trainNumber]);
    $('<tr class="route-graph"><td colspan="3"><a target="_blank"><img class="img-thumbnail">')
        .insertAfter(currentRow)
        .find('a').attr('href', url)
        .find('img').attr('src', url).on('error', function() {
            $(this).unbind('error').attr('src', '/img/404.png');
        });
}

function show(tableRows) {
    $('table:not(.hidden)>tbody').html(tableRows.join());
    $('table:not(.hidden)').trigger('update');
}

function matchKeyword(s) {
    if (!s) {
        s = cities.randomElement();
    } else if (s.match(/^\d+$/)) {
        $('#station-list').trigger('sorton', [[[6, 0]]]);
        return (function(i) {
            return i[3].startsWith(s);
        });
    }

    $('#station-list').trigger('sorton', [[]]);
    if (s.startsWith('-')) {
        return (function(i) {
            return i[2].slice(0, 3) === s.slice(1).toUpperCase();
        });
    } else if (s.charCodeAt(0) > 'z'.charCodeAt(0)) {
        return (function(i) {
            return i[1].startsWith(s);
        });
    } else {
        return (function(i) {
            return i[0] === s.toLowerCase() || i[2].slice(0, 3) === s;
        });
    }
}

$(main);
