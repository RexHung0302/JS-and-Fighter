let count = ''; //上方顯示結果
let result = ''; //運算的時候
let countStatus = false; //按下數字後改為ture
let signStatus = false;
let point = true; //點下小數點
let zero = false // 是否為0
let equation = 0; //存放運算種數
let sign = ''; //存放運算符號
let resultStatus = false; //按下運算符號時

//按下數字時

$('.num-box').click(function() {

    if (resultStatus == true) {
        $('.result-num').html('0');
        $('.count-num').html('0');
        count = '';
        result = '';
        resultStatus = false;
    }

    if (signStatus == true) {
        result = '';
        signStatus = false;
    }

    if ($(this).attr('id') !== '0' && $(this).attr('id') !== '00' && $(this).attr('id') !== '.') {
        $('#AC').text('C');
        countStatus = true;
        result += $(this).attr('id');
        zero = false;
        $('.result-num').html(result);
        if ($(this).attr('id') == '.') {
            point = false;
            zero = false;
        }
    } else {
        if (result == '' && $(this).attr('id') == '.' && point == true && countStatus == false) {
            $('#AC').text('C');
            $('.result-num').html('0' + $(this).attr('id'));
            result = '0' + $(this).attr('id');
            point = false;
            zero = true;
        } else if (result && point == true) {
            result += $(this).attr('id');
            $('.result-num').html(result);
            if ($(this).attr('id') == '.') {
                point = false;
                zero = true;
            }
        } else if ($(this).attr('id') == '.') {
            point = false;
            zero = true;
        } else if (result && point == false) {
            result += $(this).attr('id');
            $('.result-num').html(result);
            zero = true;
        } else if (result == '' && zero == true && point == false) {
            point = true;
        } else if (result == '' && count) {
            result += $(this).attr('id');
            $('.result-num').html(result);
        }
    }

})

//按下Ｄelete時

$('#delete').click(function() {
    if (countStatus == true) {
        result = result.substr(0, result.length - 1);
        if (result.length == 0) {
            result = '0';
            $('#AC').html('AC');
        }
        $('.result-num').html(result);
    }
});

//按下AC時

$('#AC').click(function() {
    $('.count-num').html('歡迎，請點選下方數字計算');
    $('.result-num').html('0');
    countStatus = false;
    signStatus = false;
    zero = false
    equation = 0;
    sign = '';
    resultStatus = false;
    point = false;
    $('#AC').html('AC');
    result = '';
    count = '';
});

//按下運算符號時

$('.sign-box').click(function() {
    if (countStatus == true) {
        signStatus = true;
        if ($(this).attr('id') == 'divide') {
            if (count !== '') {
                $('.count-num').html(count + result + '÷');
                count = count + result + '÷';
                equation = operation(equation, parseFloat(result), sign);
                sign = '÷';
                console.log(equation);
            } else {
                $('.count-num').html(result + '÷');
                count = result + '÷';
                equation = parseFloat(result);
                sign = '÷';
            }
            $('.result-num').html('0');
            countStatus = false;
            result = '';
            point = true;
            console.log(equation);
            return;
        }
        if ($(this).attr('id') == 'multiply') {
            if (count !== '') {
                $('.count-num').html(count + result + 'x');
                count = count + result + 'x';
                equation = operation(equation, parseFloat(result), sign);
                sign = 'x';
                console.log(equation);
            } else {
                $('.count-num').html(result + 'x');
                count = result + 'x';
                equation = parseFloat(result);
                sign = 'x';
            }
            $('.result-num').html('0');
            countStatus = false;
            result = '';
            point = true;
            return;
        }
        if ($(this).attr('id') == 'plus') {
            if (count !== '') {
                $('.count-num').html(count + result + '+');
                count = count + result + '+';
                equation = operation(equation, parseFloat(result), sign);
                sign = '+';
                console.log(equation);
            } else {
                $('.count-num').html(result + '+');
                count = result + '+';
                equation = parseFloat(result);
                sign = '+';
            }
            $('.result-num').html('0');
            countStatus = false;
            result = '';
            point = true;
            return;
        }
        if ($(this).attr('id') == 'minus') {
            if (count !== '') {
                $('.count-num').html(count + result + '-');
                count = count + result + '-';
                equation = operation(equation, parseFloat(result), sign);
                sign = '-';
                console.log(equation);
            } else {
                $('.count-num').html(result + '-');
                count = result + '-';
                equation = parseFloat(result);
                sign = '-';
            }
            $('.result-num').html('0');
            countStatus = false;
            result = '';
            point = true;
            return;
        }
    } else {
        if (count && resultStatus == false) {
            if ($(this).attr('id') == 'divide') {
                if (count !== '') {
                    count = count.substr(0, count.length - 1);
                    $('.count-num').html(count + '÷');
                    count = count + '÷';
                } else {
                    $('.count-num').html(count + result + '÷');
                    count = count + result + '÷';
                }
                $('.result-num').html('0');
                countStatus = false;
                result = '';
                point = true;
                return;
            }
            if ($(this).attr('id') == 'multiply') {
                if (count !== '') {
                    count = count.substr(0, count.length - 1);
                    $('.count-num').html(count + 'x');
                    count = count + 'x';
                } else {
                    $('.count-num').html(count + result + 'x');
                    count = count + result + 'x';
                }
                $('.result-num').html('0');
                countStatus = false;
                result = '';
                point = true;
                return;
            }
            if ($(this).attr('id') == 'plus') {
                if (count !== '') {
                    count = count.substr(0, count.length - 1);
                    $('.count-num').html(count + '+');
                    count = count + '+';
                } else {
                    $('.count-num').html(count + result + '+');
                    count = count + result + '+';
                }
                $('.result-num').html('0');
                countStatus = false;
                result = '';
                point = true;
                return;
            }
            if ($(this).attr('id') == 'minus') {
                if (count !== '') {
                    count = count.substr(0, count.length - 1);
                    $('.count-num').html(count + '-');
                    count = count + '-';
                } else {
                    $('.count-num').html(count + result + '-');
                    count = count + result + '-';
                }
                $('.result-num').html('0');
                countStatus = false;
                result = '';
                point = true;
                return;
            }
        } else {
            alert('按下運算結果後，請先輸入數字在點擊運算符號重新運算！');
        }
        if (zero == true) {
            $('.result-num').html('0');
            result = '';
            point = true;
            return;
        }
    }
});

//運算式

function operation(num, num2, sign) {
    if (sign == "x") {
        return num * num2;
    } else if (sign == "÷") {
        return num / num2;
    } else if (sign == "+") {
        return num + num2;
    } else if (sign == "-") {
        return num - num2;
    }
}

//按下等於時

$('.result-sign').click(function() {
    countStatus = false;
    if (equation && count && resultStatus == false) {
        equation = operation(equation, parseFloat(result), sign);
        $('.count-num').html(equation);
        $('.result-num').html(equation);
        countStatus = false;
        resultStatus = true;
        result = '';
        count = equation;
        point = false;
    }
})