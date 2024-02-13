var info = decodeURI(location.hash.slice(1));
if (/^[A-Z]\d{10,13}[A-Z]\d{6}$/.test(info)) {
    var qrCode = info;
    if (info.length == 18) {
        info = info.slice(0, 11) + '   ' + info.slice(11);
    }
    info = [
        info.slice(14),
        '      AAA        31W010   0000020??',
        info.slice(10, 14),
        '-   ',
        info.slice(0, 10),
        '    ',
        info.slice(10, 14),
        '00????   ',
    ].join('');
} else if (/^\d{144}-\w{16}.{8}\w{66}.{10,20}\d{7}$/.test(info)) {
    var qrCode = info.slice(0, 144);
    info = info.slice(144 + 1);
} else {
    $('.ticket').text('参数错误');
    throw new Error();
}


$('#qr-code').qrcode({
    text: qrCode,
    correctLevel: 1,
    background: $('.ticket').css('background-color'),
    width: this.width,
    height: this.height,
});


$('[data-slice]').each(function() {
    var slice = this.dataset.slice.split(':');
    this.textContent = info.slice.apply(info, slice);
});

$('[data-show-if]').each(function() {
    var slice = this.dataset.showIf.split(':');
    if (!new RegExp(slice.pop()).test(info.slice.apply(info, slice))) {
        $(this).hide();
    }
});

$('.trim-zeros').each(function () {
    this.textContent = this.textContent.trim() && +this.textContent;
});


$('#office').text(function(_, officeNumber) {
    var office = stations.find(function(s) {
        return s[3] === officeNumber;
    });
    if (office) {
        return office[1];
    }
});
$('.manual-mod').click(function() {
    this.innerText = prompt('票面修正', this.innerText);
});


if ($('.right.station').text() === $('#terminus .station').text() && +$('#year').text() >= 2023) {
    $('#terminus, #validity').hide();
    $('#restrictions').text('退票费 仅供报销使用');
}

var stationMap = {'JQO': ['红磡(九龙)', 'HungHom(Kowloon)']};
stationNames.slice(1).split('@').forEach(function(station) {
    station = station.split('|', 4);
    stationMap[station[2].slice(0, 3)] = [station[1], station[2].slice(0, 3)];
});
station_names.slice(1).split('@').forEach(function(station) {
    station = station.split('|', 4);
    stationMap[station[2]] = [station[1], station[3]];
});

$('.station').each(function () {
    var station = stationMap[this.textContent];
    if (!station) {
        return;
    }
    this.textContent = station[0];
    this.dataset.pinyin = station[1];
});


$('#year').click(function() {
    $(this).text(function(_, value) {
        value -= 7;
        if (value > 2009) {
            return value;
        }
        var now = new Date().getFullYear();
        value = now - now % 7 + value % 7;
        if (value > now) {
            value -= 7;
        }
        return value;
    });
});


var ticketTypes = ' 孩学军 探半孩团兵红返卧团农助令';
$('#ticket-type').text(function(_, value) {
    return ticketTypes[value - 1].trim();
});


$('#coach-number').text(function(_, value) {
    if (value < 31 || value >= 64) {
        return value;
    } else if (value == 31) {
        return 99;
    } else if (value == 32) {
        return '加';
    }
    return '加' + (value - 33);
});


var seatTypeStr = '0棚车@1硬座@2软座@3硬卧@4软卧@5包厢硬卧@4高级软卧@2一等软座@2二等软座@2商务座@6鸳鸯软卧@1混编硬座@3混编硬卧@2包厢软座@2特等软座@4动卧@6二人软包@6一人软包@2一等卧@2二等卧@2混编软座@4混编软卧@2一等座@@2二等座@2特等座@2多功能座@2一等包座@4二等包座@@@@0无座';
var seatTypes = {};
seatTypeStr.split('@').forEach(function (value, index) {
    if (!value) {
        return;
    }
    if (index >= 10) {
        index = String.fromCharCode(index - 10 + 'A'.charCodeAt());
    }
    seatTypes[index] = [value.slice(0, 1), value.slice(1)];
});

var seatType;
$('#seat-type').text(function(_, value) {
    seatType = seatTypes[value];
    if (seatType) {
        return seatType[1];
    }
});


function seatName(seatNumber, seatInfo) {
    switch (+seatInfo) {
    case 3:
        return ['', '无座'];

    case 4: case 5:
        var row = Math.floor(seatNumber / 6);
        var column = String.fromCharCode(seatNumber % 6 + 'A'.charCodeAt());
        row = ('0' + (row + 1)).slice(-2);
        return [row + column, ''];

    default:
        if (seatType[0] < 3) {
            return [seatNumber, ''];
        }

        return [
            '0' + seatNumber.slice(0, -1),
            '下中上'[seatNumber.slice(-1) - 1] + '铺',
        ];
    }
}

$('#seat-number').text(function(_, seatNumber) {
    $('#seat-info').text(function(_, seatInfo) {
        var seat = seatName(seatNumber, seatInfo);
        seatNumber = seat[0];
        return seat[1];
    });
    return seatNumber;
});


$('#restrictions').click(function() {
    this.innerText = '仅供报销使用';
});
$('#validity span').click(function() {
    this.innerText = +this.innerText + 1;
    if (+this.innerText > 15) {
        this.innerText = 2;
    }
});
$('#bureau').text(function (_, value) {
    if (bureaus[value]) {
        return bureaus[value][1];
    }
});


var idTypeStr = '@二代居民身份证@一代居民身份证@临时身份证@武警警官证@军官证@士兵证@军队学员证@军队文职干部证@军队离退休干部证@军人保障卡@护照@港澳居民回乡证@救助证@港澳通行证@台湾通行证@台湾内地通行证@外国人居留证@外国人出入境证@外交官证@领事馆证@海员证@学生证@户口簿@铁路乘车证签证@释放证@机动车驾驶证@居住证、暂住证@结婚证@社会保障卡@医疗保险卡@非实名制车票';
var idTypes = idTypeStr.split('@');
var idType = +$('#id-number').text().slice(0, 2);
$('#id-name').text(function(_, value) {
    if (idType <= 1 || idType >= 31) {
        return value;
    }
    return value + ' ' + idTypes[idType];
});

$('#id-number').text(function(_, value) {
    if (idType == 0 || idType >= 31) {
        return ' ';
    }
    return value.slice(-value.slice(2, 4));
});
