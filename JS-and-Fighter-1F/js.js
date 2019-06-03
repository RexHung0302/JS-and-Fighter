let n = 9;

for (j = 2; j <= n; j++) {
    $('.row-1').append(
        '<div class="box" id="' + j + '">' + '<div class="box-2">' +
        '<span class="box-title id="box_title">' + j + '</span>' +
        '<ul class="left-part" id="left-' + j + '"></ul>' + '</div>' + '<div class="right-box" id="right-' + j + '">' + '<ul class="right-part"></ul>' +
        '</div>' + '</div>'
    )

    let left = '';
    let right = '';

    for (i = 1; i < 4; i++) {
        left += '<li class="item">' + '<span>' + j + '</span>' +
            '<span> x </span>' +
            '<span>' + i + '</span>' +
            '<span> = </span>' +
            '<span>' + j * i + '</span>' + '</li>'
    }
    for (k = 4; k < 10; k++) {
        right += '<li class="item">' + '<span>' + j + '</span>' +
            '<span> x </span>' +
            '<span>' + k + '</span>' +
            '<span> = </span>' +
            '<span>' + j * k + '</span>' + '</li>'
    }
    $('#left-' + j).append(left);
    $('#right-' + j).append(right);
}