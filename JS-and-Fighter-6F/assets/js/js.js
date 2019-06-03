let starTime = 3; //開始前的倒數計時
let CountDownMusic = $('#audio'); //倒數時音樂
let BgMusic = $('#audio2') //玩遊戲時背景音樂
let timeout = $('#audio3') //時間到的聲音
let bad = $('#audio4') //低於十分的聲音
let good = $('#audio5') //高於十分的聲音
let count_time = 60 //60秒倒數
let sign_code = 0 //運算符號的代號
let answer = 0 //答案
let again = false //判斷是否因為除不盡或負數而第二次抓值
let again_code = 0 //存放因為哪個符號而重來的值
let again_sign = ''; //存放因為那個符號而重來的字串
let star_keydown = false; //判斷是否已經按過空白鍵並進入遊戲內了
let enter_keydown = false; //判斷是否可以按Enter回答問題了
let score = 000; //得分分數

$('.before-star-box').hide(); //倒數畫面
$('.step2-box').hide(); //玩遊戲畫面
$('.step3-box').hide(); //結果畫面

//按下開始按鍵
$('.star-box').click(function() {
    $('.step1-box').hide();
    $('.before-star-box').show();
    beforeStarCount();
})

//or按下空白鍵
$('body').keydown(function(e) {
    // if (!e) var e = window.event;
    if (e.keyCode == 32 && !star_keydown) {
        star_keydown = true;
        $('.step1-box').hide();
        $('.before-star-box').show();
        beforeStarCount();
    }
});

//開始前的倒數
function beforeStarCount() {
    CountDownMusic[0].play();
    setTimeout(function() {
        $('.before-star-text').html(starTime);
        $('.before-star-box').addClass('animated zoomIn');
    }, 500)
    setTimeout(function() {
        $('.before-star-box').removeClass('animated zoomIn');
    }, 1450)
    setTimeout(function() {
        starTime--;
        $('.before-star-text').html(starTime);
        $('.before-star-box').addClass('animated zoomIn');
    }, 1500)
    setTimeout(function() {
        $('.before-star-box').removeClass('animated zoomIn');

    }, 2450)
    setTimeout(function() {
        starTime--;
        $('.before-star-text').html(starTime);
        $('.before-star-box').addClass('animated zoomIn');
    }, 2500)
    setTimeout(function() {
        $('.before-star-box').hide();
        $('.step2-box').show();
        BgMusic[0].play();
        StarGame(); //開始遊戲
        print_number() //產生第一組隨機數字
    }, 3500)
}





//開始後
function StarGame() {
    $('.step2-box').children('.up-part').children('.right-part').addClass('animated infinite rubberBand')

    //倒數計時
    var interval = setInterval(() => {
        count_time--;
        if (count_time > 9) {
            $('.count-time').html('00 :' + ' ' + count_time);
        } else {
            $('.count-time').html('00 :' + ' 0' + count_time);
        }
        if (count_time == 1) {
            $('.step2-box').children('.up-part').children('.right-part').removeClass('animated infinite rubberBand')
        }
        if (count_time <= 0) {
            $('.count-time').html('00 : 00');
            $('.step2-box').children('.up-part').children('.right-part').addClass('animated shake')
            $('.answer-input').attr('disabled', true);
            $('.answer-input').css('background-color', '#dadada');
            BgMusic[0].pause();
            timeout[0].play();

            //清除自動倒數的函式
            clearInterval(interval);

            //讓Enter鍵無法使用
            enter_keydown = false;

            setTimeout(function() {
                $('.step2-box').hide();
                $('.step3-box').show();
                //播放音效
                if (score < 10) {
                    bad[0].play();
                } else {
                    good[0].play();
                }
            }, 200)
        }
    }, 1000);
}

//開始產生隨機數字
function print_number() {
    let question_number_1 = 1;
    let question_number_2 = 1;

    //判斷秒數並抓取隨機不等於零的亂數
    if (count_time >= 40) {
        //取個位數
        num1 = 1;
        num2 = 9;
        num3 = 1;
        num4 = 9;
    } else if (count_time >= 20) {
        //取雙數
        num1 = 1;
        num2 = 99;
        num3 = 1;
        num4 = 99;
    } else if (count_time >= 0) {
        //取三位數
        num1 = 1;
        num2 = 999;
        num3 = 1;
        num4 = 999;
    }
    question_number_1 = number(num1, num2)
    question_number_2 = number(num3, num4)

    //判斷是否是第二次因為符號重新抓值
    if (again == false) {
        sign = gotsign()
    } else {
        sign = again_sign;
        sign_code = again_code;
    }

    //運算結果並判斷符號是否小於0或是相減為負數
    if (sign_code == 1) {
        answer = question_number_1 + question_number_2;
    } else if (sign_code == 2) {
        //判斷是否前一個數字小於後面以至於相減為負數
        if (question_number_1 < question_number_2) {
            again = true;
            again_sign = '-';
            again_code = 2;
            print_number()
            return;
        } else {
            answer = question_number_1 - question_number_2;
        }
    } else if (sign_code == 3) {
        answer = question_number_1 * question_number_2;
    } else if (sign_code == 4) {
        //判斷是否前一個數字小於後面以至於除不盡及相除不等於零
        if (question_number_1 < question_number_2 || question_number_1 % question_number_2 != 0) {
            again = true;
            again_sign = '÷';
            again_code = 4;
            print_number()
            return;
        } else {
            answer = question_number_1 / question_number_2;
        }
    }

    //換上隨機取得的數字及符號
    $('.question-number-1').html(question_number_1);
    $('.question-number-2').html(question_number_2);
    $('.question-sign-1').html(sign);

    //讓Enter鍵可以使用
    enter_keydown = true;

    //讓因為負數或除不盡而重來的判斷回覆
    again_sign = '';
    again_code = 0;
    again = false;
}


//產生隨機數字
function number(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

//產生隨機運算符號
function gotsign() {
    let plus = '+';
    let minus = '-';
    let multiplied = 'x';
    let divide = '÷';

    //隨機抓取四個運算符號
    let sign = ['+', '-', 'x', '÷'];
    let signnumber = Math.floor(Math.random() * 4)

    //判斷抓取的符號並給他sign_code去讓上面式子判斷
    if (sign[signnumber] == plus)[
        sign_code = 1
    ]
    else if (sign[signnumber] == minus)[
        sign_code = 2
    ]
    else if (sign[signnumber] == multiplied)[
        sign_code = 3
    ]
    else if (sign[signnumber] == divide)[
        sign_code = 4
    ]

    return sign[signnumber];
}

//按下空白鍵回答問題
$('body').keydown(function(e) {
    if (e.keyCode == 13 && enter_keydown) {
        console.log($('.answer-input').val());
        //判斷分數的位數
        if ($('.answer-input').val() == answer) {
            //判斷時間後答對加分
            if (count_time >= 20) {
                score++;
            } else if (count_time > 0 && count_time < 20) {
                //小於20秒答對加五分
                score += 5;
            }

            //觸發答對動畫
            $('.answer-input').addClass('success');
            setTimeout(function() {
                    $('.answer-input').removeClass('success');
                    $('.answer-input').css('box-shadow', 'inset 0px 0px 4px 7px #efe6e4');
                }, 300)
                //清空輸入欄
            $('.answer-input').val('');
            //判斷是否正在遊戲頁面及是否可以使用Enter
            enter_keydown = false;
            if (score > 0 && score < 10) {
                $('.score-box').html('00' + score);
                print_number()
                return;
            } else if (score > 9 && score < 100) {
                $('.score-box').html('0' + score);
                print_number()
                return;
            } else {
                $('.score-box').html(score);
                print_number()
                return;
            }
        } else {
            //觸發答錯動畫
            $('.answer-input').addClass('error');
            setTimeout(function() {
                    $('.answer-input').removeClass('error');
                    $('.answer-input').css('box-shadow', 'inset 0px 0px 4px 7px #efe6e4');
                }, 300)
                //判斷時間還有分數後扣分
            if (count_time >= 0 && score > 0) {
                score--;
                if (score > 0 && score < 10) {
                    $('.score-box').html('00' + score);
                    return;
                } else if (score > 9 && score < 100) {
                    $('.score-box').html('0' + score);
                    return;
                } else {
                    $('.score-box').html('000');
                    return;
                }
            }
        }
    }
});



//按下重玩一次按鍵
$('.try-again-btn span').click(function() {
    $('.step3-box').hide();
    $('.step1-box').show();
    //重置函數
    starTime = 3;
    count_time = 60;
    answer = 0;
    again = false;
    star_keydown = false;
    enter_keydown = false;
    score = 000;
    //清空輸入欄
    $('.answer-input').val('');
    //取消disabled
    $('.answer-input').attr('disabled', false);
    $('.answer-input').css('background-color', '#fff');
    //取消時間Class並加上原本的Class
    $('.step2-box').children('.up-part').children('.right-part').removeClass('animated shake')
    $('.step2-box').children('.up-part').children('.right-part').addClass('animated infinite rubberBand')
})