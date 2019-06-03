// let rubbish_talking_arr = []; // 幹話陣列

// let localStorage_talking_arr = []; // localStorage 的幹話陣列

// let new_array = []; // 用來裝 localStorage 拿回來的陣列

// $(document).ready(init);

// 初始化
// function init() {
//     if (typeof(Storage) !== "undefined") {

//         console.warn('%c此瀏覽器支援localStorage！', 'color:yellow;background-color:red;');

//         // 用 new_array 來裝拿回來的陣列
//         new_array = JSON.parse(localStorage.getItem(localStorage.key('rubbish')));

//         // 判斷是不是沒有幹話 沒有就塞兩則
//         if (new_array === null) {

//             // 預設兩則幹話
//             localStorage_talking_arr[0] = '努力不一定會成功，不努力一定很輕鬆。';
//             localStorage_talking_arr[1] = '蹲的越久，站起來越容易頭暈。。';

//             localStorage.setItem('rubbish', JSON.stringify(localStorage_talking_arr));

//             // 用 new_array 來裝拿回來的陣列
//             new_array = JSON.parse(localStorage.getItem(localStorage.key('rubbish')));
//         }

//         // 取出幹話
//         $.each(new_array, function(idx, value) {
//             $('.rubbish-area ul').append('<li>' +
//                 '<span>' +
//                 value +
//                 '</span>' +
//                 '<span class="i-btn">' +
//                 '<i class="fas fa-edit">' +
//                 '</i>' +
//                 '<i class="fas fa-trash-alt">' +
//                 '</i>' +
//                 '</span>' +
//                 '</li>')

//             // 放進本地陣列
//             rubbish_talking_arr.push(value);
//         })

//     } else {
//         alert("此瀏覽器不支援localStorage");
//         console.error('%c此瀏覽器不支援localStorage！', 'color:red;background-color:yellow;');
//     }
// }

// 按下滑動鈕
// $('#myonoffswitch').click(function() {
// 如果是日間模式下
// if ($('#myonoffswitch').hasClass('light-mode')) {
//     // 移除 input 上辨識的 Class
//     $('#myonoffswitch').removeClass('light-mode');
//     // 改變 body 的背景顏色 & 文字顏色
//     $('body').removeClass('body-light-mode');
//     $('body').addClass('body-night-mode');
//     // 改變 button 的背景顏色 & 文字顏色
//     $('#add_rubbish_talking_btn').removeClass('body-night-mode');
//     $('#add_rubbish_talking_btn').addClass('body-light-mode');
//     // 替新增語錄的 input 文字改變顏色
//     $('#add_rubbish_talking_input').css('color', 'white');
//     // 改變 li 的 border-bottom 顏色
//     $('.rubbish-area ul li').css('border-color', 'white');
//     // 改變日間模式或夜間模式的提示字
//     $('.d-mode').addClass('d-none');
//     $('.n-mode').removeClass('d-none');
//     // 替 input 加上辨識的 Class
//     $('#myonoffswitch').addClass('night-mode');
// }
// // 如果是夜間模式下
// else if ($('#myonoffswitch').hasClass('night-mode')) {
//     // 移除 input 上辨識的 Class
//     $('#myonoffswitch').addClass('light-mode');
//     // 改變 body 的背景顏色 & 文字顏色
//     $('body').removeClass('body-night-mode');
//     $('body').addClass('body-light-mode');
//     // 改變 button 的背景顏色 & 文字顏色
//     $('#add_rubbish_talking_btn').removeClass('body-light-mode');
//     $('#add_rubbish_talking_btn').addClass('body-night-mode');
//     // 替新增語錄的 input 文字改變顏色
//     $('#add_rubbish_talking_input').css('color', 'black');
//     // 改變 li 的 border-bottom 顏色
//     $('.rubbish-area ul li').css('border-color', 'black');
//     // 改變日間模式或夜間模式的提示字
//     $('.d-mode').removeClass('d-none');
//     $('.n-mode').addClass('d-none');
//     // 替 input 加上辨識的 Class
//     $('#myonoffswitch').addClass('light-mode');
// }

// });

// 按下新增語錄鈕
$('#add_rubbish_talking_btn').click(function() {
    $('.add-rubbish-btn-area').addClass('d-none');
    $('.add-rubbish-input-area').removeClass('d-none');
    $('.add-rubbish-input-area').addClass('s-now');
})

// // 按下確定新增語錄的+字號按鈕
// $('#add_rubbish_talking_confirm_btn').click(function() {

//     // 判斷 input 內容是不是空的
//     if ($('#add_rubbish_talking_input').val() === '') {
//         $('#add_rubbish_talking_input').focus();
//     }
//     // 如果 input 內容不是空
//     else {

//         // 輸入的內容
//         let input_content = $('#add_rubbish_talking_input').val();

//         // 新增使用者的語錄
//         $('.rubbish-area ul').append('<li>' +
//             '<span>' +
//             input_content +
//             '</span>' +
//             '<span class="i-btn">' +
//             '<i class="fas fa-edit">' +
//             '</i>' +
//             '<i class="fas fa-trash-alt">' +
//             '</i>' +
//             '</span>' +
//             '</li>')


//         // 放進本地陣列
//         rubbish_talking_arr.push(input_content);

//         // 覆蓋 localStorage 的陣列
//         localStorage.setItem('rubbish', JSON.stringify(rubbish_talking_arr));

//         // 用 new_array 來裝拿回來的陣列(更新陣列)
//         new_array = JSON.parse(localStorage.getItem(localStorage.key('rubbish')));

//         // 隱藏新增語錄的區塊 & 顯示新增語錄按鈕
//         $('.add-rubbish-input-area').removeClass('s-now');
//         $('.add-rubbish-input-area').addClass('d-none');
//         $('.add-rubbish-btn-area').removeClass('d-none');

//         // 清空新增語錄 input 內容
//         $('#add_rubbish_talking_input').val('');

//         // 取消掉禁止鼠標樣式
//         $('.fa-trash-alt').removeClass('not-allowed')

//     }
// });

// // 按下刪除鈕
// $(document).on('click', '.fa-trash-alt', function() {

//     // 現在在 ul 內的順序（排第幾個）
//     let now_arr_index = 0;
//     // that = 現在選中的 li
//     let that = $(this).parents()[1];
//     // 設定一個變數裝現在選中 li 的順序
//     now_arr_index = $("ul li").index(that);

//     // 剩最後一則語錄時不能刪除
//     if ($(this).parents().eq(2).children().length === 1) {
//         return
//     } else {

//         // 如果剩最後一個語錄，鼠標改為禁止按鈕
//         if ($(this).parents().eq(2).children().length === 2) {
//             $('.fa-trash-alt').addClass('not-allowed')
//         };
//         // 刪除語錄
//         $(this).parents().eq(1).remove();
//         // 刪除本地陣列裡的語錄
//         rubbish_talking_arr.splice(now_arr_index, 1);
//         // 覆蓋掉 localStorage 裡的資料
//         localStorage.setItem('rubbish', JSON.stringify(rubbish_talking_arr));
//         // 用 new_array 來裝拿回來的陣列(更新陣列)
//         new_array = JSON.parse(localStorage.getItem(localStorage.key('rubbish')));
//     }
// });

// // 按下編輯鈕 & 判斷是不是在編輯中
// $(document).on('click', '.fa-edit', function() {

//     // that = 現在選中的 li
//     let that = $(this).parents()[1]

//     // 設定一個變數裝現在選中 li 的順序
//     now_arr_index = $("ul li").index(that)

//     // 如果在編輯
//     if ($(this).hasClass('editing')) {
//         // 放一個變數來裝改變前的東西
//         let input_text = $(this).parents().eq(1).children().eq(0).val();
//         // 改變 element
//         $(this).parents().eq(1).children().eq(0).replaceWith("<span>" + input_text + "</span>");
//         // 拿掉辨識的 Class 
//         $(this).removeClass('editing');
//         rubbish_talking_arr.splice(now_arr_index, 1, input_text);
//         // 覆蓋掉 localStorage 裡的資料
//         localStorage.setItem('rubbish', JSON.stringify(rubbish_talking_arr));
//         // 用 new_array 來裝拿回來的陣列(更新陣列)
//         new_array = JSON.parse(localStorage.getItem(localStorage.key('rubbish')))
//     }
//     // 如果沒有在編輯中
//     else {
//         // 新增一個 class 可以判斷
//         $(this).addClass('editing');
//         let span_text = $(this).parents().eq(1).children().eq(0).text();
//         // 改成 input
//         $(this).parents().eq(1).children().eq(0).replaceWith("<input type='text' value=" + span_text + ">")
//     }

// });