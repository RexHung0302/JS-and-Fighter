let n = 72;
let X = 0; //X軸角度
let Y = -100; //Y軸角度
let O = 0; //基準點角度
let P = 0; //角度

let amhour = '1';
let pmhour = '13';


for (j = 1, i = 5; j <= n; j++) {
    $('.clock-times').append(
        '<div class="orange-times" id="' + j +
        '" style="transform: rotate(' + (j * 5 + P) + 'deg)translateY(' + Y + 'px)translateX(' + X + 'px);z-index:-1;transform-origin: ' +
        (0) + '% ' + (j + 420 - O) + '% ;">' + '<div class="white-point"></div>' + '</div>'
    )
    if (j % 6 == 5) { //橘色長線
        Y = 5;
        O = 20;
        X = 1;
        P = 0;
        $('#' + j).append('<span class="am" style="transform: rotate(' + (360 - i * j) + 'deg)">' + amhour + '</span>')
        $('#' + j).append('<span class="pm" style="transform: rotate(' + (360 - i * j) + 'deg)">' + pmhour + '</span>')
        amhour++;
        pmhour++;
    } else if (j % 6 == 2) { //第三顆星星
        Y = -98;
        X = -6;
    } else {
        Y = -100;
        X = -4;
        P = 1;
    }
}

let hour = '';
let min = '';
let sec = '';

let hourHand = 0;
let minHand = 270;
let secHand = 180;


function getDate() {

    let nowDate = new Date();

    sec = nowDate.getSeconds();
    min = nowDate.getMinutes();
    hour = nowDate.getHours();

    hourHand = hour * 360 / 12 + 270;
    minHand = min * 360 / 60;
    secHand = sec * 360 / 60 + 180;

    $('.second-hand').css('transform', "rotate(" + secHand + "deg)");
    $('.hour-hand').css('transform', "rotate(" + hourHand + "deg)");
    $('.minute-hand').css('transform', "rotate(" + minHand + "deg)");


}

setInterval(getDate, 100);