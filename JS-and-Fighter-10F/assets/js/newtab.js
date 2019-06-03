// 按下漢堡鈕後
$('.fa-hamburger').click(function() {
    if ($('#contents').hasClass('active') != true) {
        // 新增 class active 讓 css 能吃到
        $('#contents').addClass('active');
        // 隱藏漢堡鈕
        $('.fa-hamburger').addClass('d-none');
        // 隱藏開關鈕
        $('.main-area .onoff-switch-area').addClass('d-none');
        // 顯示新增語錄
        $('.add-rubbish-box').removeClass('d-none');
    }
})

$('.fa-arrow-right').click(function() {
    if ($('#contents').hasClass('active') == true) {
        // 去除 class active 讓 css 吃不到
        $('#contents').removeClass('active');
        // 取消漢堡鈕隱藏
        $('.fa-hamburger').removeClass('d-none');
        // 取消開關鈕隱藏
        $('.main-area .onoff-switch-area').removeClass('d-none');
        // 隱藏新增語錄
        $('.add-rubbish-box').addClass('d-none');
    }
})