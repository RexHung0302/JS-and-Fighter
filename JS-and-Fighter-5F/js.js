// const api = 'http://opendata.epa.gov.tw/webapi/Data/REWIQA/?format=json'
// let AQIapi = 'https://cors-anywhere.herokuapp.com/' + api
const AQIAPI = 'https://script.google.com/macros/s/AKfycbxBJAu9PdhYscCV_Injmm5nfBtQeIbspxE8F-3fLHNubxdkO_I/exec?url=http://opendata.epa.gov.tw/webapi/Data/REWIQA/?format=json'

let Country = []; //縣市
let data = {};

$('.footer-box').hide();

//取得api
setTimeout(function() {
    getapi();
}, 500)

function getapi() {
    let promise = new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('get', AQIAPI, true);
        xhr.send(null);
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 400) {
                resolve(xhr.response);
            } else {
                reject("取得資料失敗: " + xhr.status);
            }
        }
    });
    promise.then((res) => {
        $('.loading-box').hide();
        $('.title-box').css('display', 'inline-flex');
        $('.contents-left-part').css('display', 'block');
        $('.footer-box').show();
        data = JSON.parse(res);
        alldata();
    });
    promise.catch((error) => {
        console.log(error);
    });
}

//過濾縣市 && 把縣市放盡select的option內
function alldata() {
    let result = data.filter((item, index, array) => {
        if ($.inArray(item.County, Country) == -1) {
            Country.push(item.County);
            $('.select-box').append('<option>' + item.County + '</option>');
            return true;
        } else {
            return false;
        }
    });
}

//選擇縣市後顯示地區 && 判斷AQI後加上顏色
$('.select-box').change(function() {
    $('.contents-right-part').empty();
    change = false; //防止重複更新左側地區名稱和AQI等資料
    let result = data.filter((item, index, array) => {
        let color = '';
        if (item.County == $(this).val()) {
            switch (item.Status) {
                case '良好':
                    color = 'color-1'
                    break;
                case '普通':
                    color = 'color-2'
                    break;
                case '對敏感族群不健康':
                    color = 'color-3'
                    break;
                case '對所有族群不健康':
                    color = 'color-4'
                    break;
                case '非常不健康':
                    color = 'color-5'
                    break;
                case '危害':
                    color = 'color-6'
                    break;
                default:
                    console.log('數值過低或超標啦！');
                    break;
            };
            $('.contents-right-part').append(
                '<li>' +
                '<div class="location-box">' +
                '<div class="locoation-name' + '"' + ' ' + 'data-name="' + item.SiteName + '"' + ' ' + 'data-AQI="' + item.AQI + '"' + ' ' + 'data-O3="' + item.O3 + '"' + ' ' + 'data-PM10="' + item.PM10 + '"' + ' ' + 'data-PM2.5="' + item['PM2.5'] + '"' + ' ' + 'data-CO="' + item.CO + '"' + ' ' + 'data-SO2="' + item.SO2 + '"' + ' ' + 'data-NO2="' + item.NO2 + '">' +
                '<span>' + item.SiteName + '</span>' +
                '</div>' + '<div class="location-num' + ' ' + color + '">' +
                '<span>' + item.AQI + '</span>' +
                '</div>' + '</div>' + '</li>');
            if (change == false) {
                $('.contents-left-part .city-name').html(item.SiteName);
                $('.contents-left-part .location-num').removeClass();
                $('.contents-left-part #city-AQI').addClass('location-num' + ' ' + color);
                $('.contents-left-part #city-AQI').html(item.AQI);
                $('.location-contents-box .num-1').html(item.O3);
                $('.location-contents-box .num-2').html(item.PM10);
                $('.location-contents-box .num-3').html(item["PM2.5"]);
                $('.location-contents-box .num-4').html(item.CO);
                $('.location-contents-box .num-5').html(item.SO2);
                $('.location-contents-box .num-6').html(item.NO2);
                change = true;
            }
        }
        //更新縣市 && 更新時間
        $('.updata-city-name').html($(this).val());
        $('.updata-time').html(item.PublishTime + ' ' + '更新');
        return item.County == $(this).val();
    });
    // console.log(result);
})

//點擊右側事件
$('.contents-right-part').on('click', '.locoation-name', function() {
    //更改左方縣市名稱及AQI數值
    $('.contents-left-part .locoation-name .city-name').html($(this).data('name'));
    $('.contents-left-part .location-num').html($(this).data('aqi'));

    //更改顏色部分
    const classname = $(this).parent().find('.location-num').attr('class'),
        color = classname.split(' ')[1];
    $('.contents-left-part .location-num').removeClass();
    $('#city-AQI').addClass('location-num' + ' ' + color);

    //更改下方數值
    $('.location-contents-box .num-1').html($(this).data('o3'));
    $('.location-contents-box .num-2').html($(this).data('pm10'));
    $('.location-contents-box .num-3').html($(this).data('pm2.5'));
    $('.location-contents-box .num-4').html($(this).data('co'));
    $('.location-contents-box .num-5').html($(this).data('so2'));
    $('.location-contents-box .num-6').html($(this).data('no2'));
})