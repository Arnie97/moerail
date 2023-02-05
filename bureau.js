var restrictions = ['_', '<span style="font-family: serif;">⊗</span>', '<span style="font-family: serif;">※</span>', '△', '<span style="border: black 1px solid;">G</span>'],
    cityNames = '哈尔滨|长春|沈阳|锦州|大连|丹东|北京|天津|唐山|曹妃甸|秦皇岛|承德|通辽|包头|大同|神木|太原|石家庄|新乡|郑州|西安|襄阳|漯河|信阳|武昌|咸宁|济南|潍坊|青岛|烟台|连云|徐州|南京|无锡|苏州|上海|杭州|温州|合肥|芜湖|铜陵|九江|南昌|景德镇|福州|厦门|深圳|广州|衡阳|株洲|岳阳|娄底|邵阳|怀化|桂林|柳州|南宁|钦州|湛江|昆明|贵阳|遵义|重庆|内江|成都|南充|广元|兰州|西宁|格尔木',
    cities = cityNames.split('|'),
    bureauNames = 'B:哈尔滨@X:哈尔滨铁路局（原齐齐哈尔铁路局）:哈局（齐）@T:沈阳@D:沈阳铁路局（原锦州铁路局）:沈局（锦）@L:沈阳铁路局（原吉林铁路局）:沈局（吉）@P:北京铁路局:京局@V:太原@C:呼和浩特@F:郑州@N:武汉@Y:西安@K:济南@HU:上海@G:南昌@S:南昌铁路局（原福州铁路分局）:南局（福）@QA:广州铁路（集团）公司:广铁@Z:南宁铁路局:宁局@WE:成都@M:昆明@J:兰州@R:乌鲁木齐@O:青藏铁路公司:青藏@I:口岸站:口岸站@-:其他:其他',
    bureaus = {};

bureauNames.split('@').forEach(function(item) {
    var triple = item.split(':'),
        key = triple[0],
        value = triple.length < 3?
            [triple[1] + '铁路局', triple[1][0] + '局']:
            triple.slice(1);
    for (var i = 0; i < key.length; i++) {
        bureaus[key[i]] = value;
    }
});

var stations = stationNames.split('@').map(function(i) {
    return i.split('|');
});
stations.shift();
