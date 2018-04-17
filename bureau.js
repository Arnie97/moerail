var city_names = '哈尔滨|长春|沈阳|大连|北京|天津|唐山|秦皇岛|石家庄|太原|包头|郑州|洛阳|新乡|武昌|西安|济南|青岛|上海|南京|苏州|无锡|杭州|温州|合肥|南昌|九江|厦门|广州|深圳|株洲|南宁|柳州|成都|重庆|贵阳|昆明|兰州|西宁';
var cities = city_names.split('|');

var bureau_names = 'B哈尔滨@X哈尔滨铁路局（原齐齐哈尔铁路局）|哈局（齐）@T沈阳@D沈阳铁路局（原锦州铁路局）|沈局（锦）@L沈阳铁路局（原吉林铁路局）|沈局（吉）@P北京铁路局|京局@V太原@C呼和浩特@F郑州@N武汉@Y西安@K济南@H上海@U上海@G南昌@S南昌铁路局（原福州铁路分局）|南局（福）@Q广州铁路（集团）公司|广铁@Z南宁铁路局|宁局@W成都@E成都@M昆明@J兰州@R乌鲁木齐@O青藏铁路公司|青藏@I口岸站|口岸站@A客票管理中心|客票所';
var bureaus = {};
bureau_names.split('@').forEach(function(i) {
    var pair = i.includes('|')?
        i.split('|'):
        [i + '铁路局', i[1] + '局'];
    bureaus[pair[0][0]] = [pair[0].slice(1), pair[1]];
});

var stations = station_names.split('@').map(function(i) {
    return i.split('|');
});
stations.shift();
