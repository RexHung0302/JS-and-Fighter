let rubbish_talking_arr = []; // 幹話陣列
let localStorage_talking_arr = []; // localStorage 的幹話陣列
let new_array = []; // 用來裝 chrome.storage 拿回來的陣列
let SwitchBtn = document.querySelector('#myonoffswitch'); // 滑動鈕
let addRubbish_talking_confirm_btn = document.querySelector('#add_rubbish_talking_confirm_btn'); // 新增按鈕
let rubbish_span_text = ''; // 用來裝分頁上語錄的文字
let input_text = ''; // 用來裝改變前的語錄
let editing_num = 0; // 用來裝現在改變的語錄順序
let now_delete_li = 0; //用來裝被刪除 li 的順序
let show_num = 0; // 用來裝從陣列裡隨機抽取的數字


chrome.storage.sync.get(null, data => {

    init(data);

    // 如果 chrome.storage 上幹話不為空
    if (data.localStorage_talking_arr != null) {

        // 更新本地幹話陣列
        rubbish_talking_arr = data.localStorage_talking_arr

        // 隨機取一個數
        show_num = Math.floor(Math.random() * rubbish_talking_arr.length);
        $('.tag').html(rubbish_talking_arr[show_num])
    }

    // 避免剛開始沒有值 如果沒有就賦值給 value
    if (data.onoffswitch == null) {
        data.onoffswitch = 1;
    }

    // 1是日間模式 0是夜間模式 
    let value = data.onoffswitch;

    //先判斷之前是夜間還是日間模式 & 如果是夜間模式就加上 css
    if (data.onoffswitch == 0) {
        // 改變 body 的背景顏色 & 文字顏色
        $('body').addClass('body-night-mode');
        // 改變 button 的背景顏色 & 文字顏色
        $('#add_rubbish_talking_btn').addClass('body-light-mode');
        // 替新增語錄的 input 文字改變顏色
        $('#add_rubbish_talking_input').css('color', 'white');
        // 改變 li 的 border-bottom 顏色
        $('.rubbish-area ul li').css('border-color', 'white');
        // 改變日間模式或夜間模式的提示字
        $('.d-mode').addClass('d-none');
        $('.n-mode').removeClass('d-none');
        // 讓按鈕是 checked
        $('.onoffswitch-checkbox').attr('checked', 'checked');

        /*********************   分頁的html  ***********************/

        // 顯示的語錄改變文字顏色 & 背景顏色
        $('.rubbish-box span').addClass('rubbish-font-night-mode');
        // 顯示語錄的 before 加上 class 覆蓋它
        $('.rubbish-box span').addClass('tag');
        // 背景圖片變黑
        $('.main-area').addClass('bg-filter');
        // 更改漢堡鈕顏色
        $('.fa-hamburger').addClass('night-btn');
        // 更改新增語錄的顏色
        $('.add-rubbish-box input').css('color', 'black');
        // 更改新增語錄底線顏色
        $('.add-rubbish-box').css('border-bottom', '1px solid black');
        // 修改 class 來修改新增語錄的顏色
        $('.add-rubbish-box').removeClass('light-before-text');
        $('.add-rubbish-box').addClass('night-before-text');
        // 更改新增語錄的按鈕顏色
        $('.add-rubbish-box .fa-plus-circle').css('color', 'black')

    }

    // 按下滑動鈕
    SwitchBtn.addEventListener('click', () => {
        chrome.storage.sync.set({ onoffswitch: value }, function() {

            // 如果是日間模式下
            if (value == 1) {
                chrome.storage.sync.set({ onoffswitch: 0 });
                return;
            }
            // 如果是夜間模式下
            else if (value == 0) {
                chrome.storage.sync.set({ onoffswitch: 1 });
                return;
            }
        });
    });

    //按下新增鈕
    add_rubbish_talking_confirm_btn.addEventListener('click', () => {
        // 判斷 input 內容是不是空的
        if ($('#add_rubbish_talking_input').val() === '') {
            $('#add_rubbish_talking_input').focus();
        }
        // 如果 input 內容不是空
        else {
            // 輸入的內容
            let input_content = $('#add_rubbish_talking_input').val();

            // // 新增使用者的語錄
            // $('.rubbish-area ul').append('<li>' +
            //     '<span>' +
            //     input_content +
            //     '</span>' +
            //     '<span class="i-btn">' +
            //     '<i class="fas fa-edit">' +
            //     '</i>' +
            //     '<i class="fas fa-trash-alt">' +
            //     '</i>' +
            //     '</span>' +
            //     '</li>')


            // 放進本地陣列
            rubbish_talking_arr.push(input_content);

            // 覆蓋 chrome.storage 的陣列
            chrome.storage.sync.set({ localStorage_talking_arr: rubbish_talking_arr });

            // 用 new_array 來裝拿回來的陣列
            new_array = data.localStorage_talking_arr;

            // 隱藏新增語錄的區塊 & 顯示新增語錄按鈕
            $('.add-rubbish-input-area').removeClass('s-now');
            $('.add-rubbish-input-area').addClass('d-none');
            $('.add-rubbish-btn-area').removeClass('d-none');

            // 清空新增語錄 input 內容
            $('#add_rubbish_talking_input').val('');

            // 取消掉禁止鼠標樣式
            $('.fa-trash-alt').removeClass('not-allowed')

        }
    });

    // 按下刪除鈕
    $(document).on('click', '.fa-trash-alt', function() {

        // 現在在 ul 內的順序（排第幾個）
        let now_arr_index = 0;

        // that = 現在選中的 li
        let that = $(this).parents()[1];

        // 設定一個變數裝現在選中 li 的順序
        now_arr_index = $("ul li").index(that);

        // 用來裝現在選中的那個 li
        now_delete_li = now_arr_index

        // 剩最後一則語錄時不能刪除
        if ($(this).parents().eq(2).children().length === 1) {

            // 如果剩最後一個語錄，鼠標改為禁止按鈕
            $('.fa-trash-alt').addClass('not-allowed')

            return;

        } else {

            // 刪除本地陣列裡的語錄
            rubbish_talking_arr.splice(now_arr_index, 1);

            // 覆蓋 chrome.storage 的陣列
            chrome.storage.sync.set({ localStorage_talking_arr: rubbish_talking_arr });

            // 用 new_array 來裝拿回來的陣列
            new_array = data.localStorage_talking_arr;
        }

    });

    // 按下編輯鈕 & 判斷是不是在編輯中
    $(document).on('click', '.fa-edit', function() {

        // that = 現在選中的 li
        let that = $(this).parents()[1];

        // 設定一個變數裝現在選中 li 的順序
        editing_num = $("ul li").index(that);

        // 如果在編輯
        if ($(this).hasClass('editing')) {

            // 放一個變數來裝改變前的東西
            let input_text = $(this).parents().eq(1).children().eq(0).val();

            // 改變 element
            $(this).parents().eq(1).children().eq(0).replaceWith("<span>" + input_text + "</span>");

            // 拿掉辨識的 Class 
            $(this).removeClass('editing');

            // 更改本地陣列裡的語錄
            rubbish_talking_arr.splice(editing_num, 1, input_text);

            // 再覆蓋 chrome.storage 的陣列
            chrome.storage.sync.set({ localStorage_talking_arr: rubbish_talking_arr });

            // 用 new_array 來裝拿回來的陣列
            new_array = data.localStorage_talking_arr;
        }
        // 如果沒有在編輯中
        else {

            // 新增一個 class 可以判斷
            $(this).addClass('editing');

            // 設定一個變數來裝更改前的文字
            let span_text = $(this).parents().eq(1).children().eq(0).text();

            // 改成 input
            $(this).parents().eq(1).children().eq(0).replaceWith("<input type='text' value=" + span_text + ">")
        }

    });

    // 按下分頁上的語錄
    $(document).on('click', '.tag', function() {
        // 判斷是不是在編輯中
        if ($(this).hasClass('editing') != true) {

            // 設定一個變數來裝更改前的文字
            rubbish_span_text = $(this).text();

            // 改成 input
            $(this).replaceWith("<input class='editing tag' type='text' value=" + rubbish_span_text + ">");

            // 顯示按鈕
            $('.save-cancel-btn').removeClass('d-none');

        }
    });

    // 按下分頁上的語錄下面的取消
    $(document).on('click', '.cancel-btn', function() {

        // 替換掉 input 改為 span
        $('.tag').replaceWith('<span class="tag" id="tag">' + rubbish_span_text + '</span>');

        // 隱藏按鈕
        $('.save-cancel-btn').addClass('d-none');
    });

    // 按下分頁上的語錄下面的儲存
    $(document).on('click', '.save-btn', function() {
        // 判斷 input 是否為空
        if ($('.tag').val() != '') {

            rubbish_span_text = $('.editing.tag').val();

            // 替換掉 input 改為 span
            $('.tag').replaceWith('<span class="tag" id="tag">' + rubbish_span_text + '</span>');

            // 更改本地陣列裡的語錄
            rubbish_talking_arr.splice(show_num, 1, rubbish_span_text);

            // 再覆蓋 chrome.storage 的陣列
            chrome.storage.sync.set({ localStorage_talking_arr: rubbish_talking_arr });

            // 用 new_array 來裝拿回來的陣列
            new_array = data.localStorage_talking_arr;

            // 隱藏按鈕
            $('.save-cancel-btn').addClass('d-none');
        }
    });

    // 用來監聽如果有更動 就做什麼事情
    chrome.storage.onChanged.addListener(changes => {
        // 如果開關變動
        if (changes.hasOwnProperty('onoffswitch')) {
            // 用來監聽變動後的變數
            value = changes.onoffswitch.newValue;
            // 如果變成 0 (變成夜間模式)
            if (value == 0) {
                // 改變 body 的背景顏色 & 文字顏色
                $('body').removeClass('body-light-mode');
                $('body').addClass('body-night-mode');
                // 改變 button 的背景顏色 & 文字顏色
                $('#add_rubbish_talking_btn').removeClass('body-night-mode');
                $('#add_rubbish_talking_btn').addClass('body-light-mode');
                // 替新增語錄的 input 文字改變顏色
                $('#add_rubbish_talking_input').css('color', 'white');
                // 改變 li 的 border-bottom 顏色
                $('.rubbish-area ul li').css('border-color', 'white');
                // 改變日間模式或夜間模式的提示字
                $('.d-mode').addClass('d-none');
                $('.n-mode').removeClass('d-none');
                // 讓按鈕是 checked
                $('.onoffswitch-checkbox').attr('checked', true);

                /*********************   分頁的html  ***********************/

                // 顯示語錄改變文字顏色 & 背景顏色
                $('.rubbish-box span').removeClass('rubbish-font-light-mode');
                $('.rubbish-box span').addClass('rubbish-font-night-mode');
                // 顯示語錄的 before 加上 class 覆蓋它
                $('.rubbish-box span').addClass('tag');
                // 背景圖片變黑
                $('.main-area').addClass('bg-filter');
                // 更改漢堡鈕顏色
                // $('.fa-hamburger').css('color', 'black');
                $('.fa-hamburger').addClass('night-btn');
                // 更改新增語錄底線顏色
                $('.add-rubbish-box').css('border-bottom', '1px solid black');
                // 更改新增語錄的顏色
                $('.add-rubbish-box input').css('color', 'black');
                // 更改新增語錄的按鈕顏色
                $('.add-rubbish-box .fa-plus-circle').css('color', 'black');
                // 修改 class 來修改新增語錄的顏色
                $('.add-rubbish-box').removeClass('light-before-text');
                $('.add-rubbish-box').addClass('night-before-text');
            }
            // 如果變成 1 (變成日間模式)
            else if (value == 1) {
                // 改變 body 的背景顏色 & 文字顏色
                $('body').removeClass('body-night-mode');
                $('body').addClass('body-light-mode');
                // 改變 button 的背景顏色 & 文字顏色
                $('#add_rubbish_talking_btn').removeClass('body-light-mode');
                $('#add_rubbish_talking_btn').addClass('body-night-mode');
                // 替新增語錄的 input 文字改變顏色
                $('#add_rubbish_talking_input').css('color', 'black');
                // 改變 li 的 border-bottom 顏色
                $('.rubbish-area ul li').css('border-color', 'black');
                // 改變日間模式或夜間模式的提示字
                $('.d-mode').removeClass('d-none');
                $('.n-mode').addClass('d-none');
                // 讓按鈕是 checked
                $('.onoffswitch-checkbox').attr('checked', false);

                /*********************   分頁的html  ***********************/

                // 顯示的語錄改變文字顏色 & 背景顏色
                $('.rubbish-box span').removeClass('rubbish-font-night-mode');
                $('.rubbish-box span').addClass('rubbish-font-light-mode');
                // 顯示語錄的 before 加上 class 覆蓋它
                $('.rubbish-box span').removeClass('tag');
                // 背景圖片變白
                $('.main-area').removeClass('bg-filter');
                // 更改漢堡鈕顏色
                // $('.fa-hamburger').css('color', 'white');
                $('.fa-hamburger').removeClass('night-btn');
                // 更改新增語錄底線顏色
                $('.add-rubbish-box').css('border-bottom', '1px solid white');
                // 更改新增語錄的顏色
                $('.add-rubbish-box input').css('color', 'white');
                // 更改新增語錄的按鈕顏色
                $('.add-rubbish-box .fa-plus-circle').css('color', 'white');
                // 修改 class 來修改新增語錄的顏色
                $('.add-rubbish-box').removeClass('night-before-text');
                $('.add-rubbish-box').addClass('light-before-text');
            }
        }
        // 如果語錄陣列變動
        if (changes.hasOwnProperty('localStorage_talking_arr')) {

            // 用來監聽變動後的變數
            value = changes.localStorage_talking_arr.newValue;
            // 用 new_array 來裝拿回來的陣列
            new_array = value;
            // 蓋掉本地陣列
            rubbish_talking_arr = value

            // 如果新的值減舊的等於 1 就是新增
            if (changes.localStorage_talking_arr.newValue.length - changes.localStorage_talking_arr.oldValue.length == 1) {
                let input_content_copy = value[value.length - 1]

                $('.rubbish-area ul').append('<li>' +
                    '<span>' +
                    input_content_copy +
                    '</span>' +
                    '<span class="i-btn">' +
                    '<i class="fas fa-edit">' +
                    '</i>' +
                    '<i class="fas fa-trash-alt">' +
                    '</i>' +
                    '</span>' +
                    '</li>')
            }
            // 如果新的值減舊的值等於 -1 就是刪除
            else if (changes.localStorage_talking_arr.newValue.length - changes.localStorage_talking_arr.oldValue.length == -1) {

                // 移除掉整個 li
                $('.rubbish-area ul>li').remove();

                // 重新取出幹話
                $.each(new_array, function(idx, value) {
                    $('.rubbish-area ul').append('<li>' +
                        '<span>' +
                        value +
                        '</span>' +
                        '<span class="i-btn">' +
                        '<i class="fas fa-edit">' +
                        '</i>' +
                        '<i class="fas fa-trash-alt">' +
                        '</i>' +
                        '</span>' +
                        '</li>')
                })
            }
            // 用 changes.localStorage 的長度跟本地陣列的長度相比 相同就是修改過
            else if (changes.localStorage_talking_arr.newValue.length == rubbish_talking_arr.length) {

                // 移除掉整個 li
                $('.rubbish-area ul>li').remove();

                // 重新取出幹話
                $.each(new_array, function(idx, value) {
                    $('.rubbish-area ul').append('<li>' +
                        '<span>' +
                        value +
                        '</span>' +
                        '<span class="i-btn">' +
                        '<i class="fas fa-edit">' +
                        '</i>' +
                        '<i class="fas fa-trash-alt">' +
                        '</i>' +
                        '</span>' +
                        '</li>')
                })
            }
            // 只要有變動就更改顯示的語錄
            let show_num = Math.floor(Math.random() * rubbish_talking_arr.length);
            $('.tag').html(rubbish_talking_arr[show_num])
        };
    });
});


// 初始化
function init(data) {

    console.warn('%c此瀏覽器支援localStorage！', 'color:yellow;background-color:red;');
    console.warn('%chttps://medium.com/@zehung860486', 'color:yellow;background-color:red;');
    console.warn('%chttps://github.com/RexHung0302', 'color:yellow;background-color:red;');
    console.warn('%c歡迎看看我的菜鳥成長文章或GitHub！', 'color:yellow;background-color:red;');

    // 用來裝 chrome.storage 內的東西
    new_array = data.localStorage_talking_arr;

    // 判斷是不是沒有幹話 沒有就塞兩則
    if (data.localStorage_talking_arr == null || data.localStorage_talking_arr.length == 0) {

        // 預設兩則幹話
        localStorage_talking_arr[0] = '努力不一定會成功，不努力一定很輕鬆。';
        localStorage_talking_arr[1] = '蹲的越久，站起來越容易頭暈。';

        // 覆蓋 chrome.storage 的陣列
        chrome.storage.sync.set({ localStorage_talking_arr: rubbish_talking_arr });

        // 用 new_array 來裝拿回來的陣列
        new_array = data.localStorage_talking_arr;

    }

    // 取出幹話
    $.each(new_array, function(idx, value) {
        $('.rubbish-area ul').append('<li>' +
            '<span>' +
            value +
            '</span>' +
            '<span class="i-btn">' +
            '<i class="fas fa-edit">' +
            '</i>' +
            '<i class="fas fa-trash-alt">' +
            '</i>' +
            '</span>' +
            '</li>')

        // 放進本地陣列
        rubbish_talking_arr.push(value);
    })

}