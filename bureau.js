var restrictions = ['_', '⊗', '<span style="font-family: monospace;">※</span>', '△', '<span style="border: black 1px solid;">G</span>'];

var city_names = '哈尔滨|长春|沈阳|大连|北京|天津|唐山|曹妃甸|秦皇岛|通辽|承德|大同|包头|神木|太原|石家庄|新乡|郑州|洛阳|西安|襄阳|漯河|信阳|武昌|咸宁|岳阳|株洲|娄底|怀化|邵阳|衡阳|桂林|柳州|南宁|钦州|湛江|广州|深圳|厦门|福州|温州|杭州|南昌|九江|景德镇|合肥|铜陵|芜湖|上海|苏州|无锡|南京|徐州|济南|潍坊|青岛|烟台|西宁|兰州|广元|成都|内江|南充|重庆|遵义|贵阳|昆明';
var cities = city_names.split('|');

var bureau_names = 'B哈尔滨@X哈尔滨铁路局（原齐齐哈尔铁路局）|哈局（齐）@T沈阳@D沈阳铁路局（原锦州铁路局）|沈局（锦）@L沈阳铁路局（原吉林铁路局）|沈局（吉）@P北京铁路局|京局@V太原@C呼和浩特@F郑州@N武汉@Y西安@K济南@H上海@U上海@G南昌@S南昌铁路局（原福州铁路分局）|南局（福）@Q广州铁路（集团）公司|广铁@Z南宁铁路局|宁局@W成都@E成都@M昆明@J兰州@R乌鲁木齐@O青藏铁路公司|青藏@I口岸站|口岸站@A其他|其他';
var bureaus = {};
bureau_names.split('@').forEach(function(i) {
    var pair = /\|/.test(i)?
        i.split('|'):
        [i + '铁路局', i[1] + '局'];
    bureaus[pair[0][0]] = [pair[0].slice(1), pair[1]];
});

var stations = station_names.split('@').map(function(i) {
    return i.split('|');
});
stations.shift();
