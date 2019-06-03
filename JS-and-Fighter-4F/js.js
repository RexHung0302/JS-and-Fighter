//抓取地區時間的Function

function MyClock(location, location2) {
    let GotTime = new Date().toLocaleString(location, { timeZone: location2, hour12: false });
    return GotTime.split(" ");
}

//設定月份及重新排列日期順序的Function

function SetDate(location) {
    //設定月份英文
    let months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

    //設定日期並重新排列順序及修改成英文月份
    let date = location.split('/');
    let date2 = date[2] + ' ' + months[date[1] - 1] + ' ' + date[0]
    return date2;
}

//設定套入及帶入時間Function的地區&&設定套入日期

function SetTime() {

    //設定地區及套入(地區時間的Function)的值
    let NY = MyClock("zh-TW", "America/New_York");
    let LN = MyClock("zh-TW", "Europe/London");
    let BK = MyClock("zh-TW", "Asia/Bangkok");
    let TW = MyClock('zh-TW', 'Asia/Taipei');
    let SY = MyClock("zh-TW", "Australia/Sydney");

    //修改各地區預設的時間
    $('.NEW-YORK-Time').html(NY[1].slice(0, 5));
    $('.LONDON-Time').html(LN[1].slice(0, 5));
    $('.BANGKOK-Time').html(BK[1].slice(0, 5));
    $('.TW-Time').html(TW[1].slice(0, 5));
    $('.SYDNEY-Time').html(SY[1].slice(0, 5));


    let NY_D = SetDate(NY[0]);
    let LN_D = SetDate(LN[0]);
    let BK_D = SetDate(BK[0]);
    let TW_D = SetDate(TW[0]);
    let SY_D = SetDate(SY[0]);

    //修改各地區預設的日期
    $('.NEW-YORK-date').html(NY_D);
    $('.LONDON-date').html(LN_D);
    $('.BANGKOK-date').html(BK_D);
    $('.TW-date').html(TW_D);
    $('.SYDNEY-date').html(SY_D);

    // console.log(TW);
    // console.log(TW[0]);
    // console.log(TW_D);
    // console.log(TW[1].slice(0, 5));
}



setInterval(SetTime, 1000);