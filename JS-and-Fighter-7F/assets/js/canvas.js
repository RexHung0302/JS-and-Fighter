//Canvas
const canvas = document.getElementById('drawing_board');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//畫筆的顏色粗細等等
ctx.strokeStyle = 'black';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 10;


//設定最後選擇的顏色
let last_penColor = 'red';

//判斷是不是點下滑鼠了
let isDrawing = false;
//設定滑鼠座標
let lastX = 0;
let lastY = 0;

let step = -1;
let userhistory = [];

//跑function
canvas.addEventListener('mousemove', draw);

//滑鼠點擊事件
function draw(e) {
    if (!isDrawing) return; // 沒有點擊時不回覆座標
    ctx.beginPath();
    //開始
    ctx.moveTo(lastX, lastY);
    //結束
    ctx.lineTo(e.offsetX, e.offsetY);
    //畫圖
    ctx.stroke();
    ctx.save();
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

//每次點擊滑鼠都更新滑鼠的座標
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

//放開滑鼠及放開滑鼠後都將判斷不是正在畫畫並跑push的function
canvas.addEventListener('mouseup', (e) => {
    push();
    if (step > 0) {
        $('.back-step').removeClass('disable-btn');
    }
    isDrawing = false;
});
canvas.addEventListener('mouseout', () => isDrawing = false);

window.addEventListener('load', loaded)
window.addEventListener('resize', firstpush)

function loaded() {
    firstpush();
}

function firstpush() {
    ctx.fillStyle = '#E8E8E8'; //讓第一次進來跑 function 的時候就加上背景顏色
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    push();
}

//存放步驟結束當下的陣列
function push() {
    step++;
    if (step < userhistory.length - 1) {
        userhistory.length = step + 1
    }
    userhistory.push(canvas.toDataURL()); //當前影像存成 Base64 編碼的字串並放入陣列
}

//儲存畫布的function
function download(position) {
    const dataURL = canvas.toDataURL('image/png') //把影像轉成指定格式的 URL 字串
    position.href = dataURL;
}

//上一步的function
function undo() {
    if (step > 0) {
        step--;
        let canvaspic = new Image(); //建立新的 Image
        canvaspic.src = userhistory[step]; //載入剛剛存放的影像
        canvaspic.onload = function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(canvaspic, 0, 0) //匯出影像並從座標 x:0 y:0 開始
        }
    }

    if (step < userhistory.length && step > 0) {
        $('.next-step').removeClass('disable-btn');
    }
}

//下一步的function
function redo() {
    if (step < userhistory.length - 1) {
        step++;
        const canvaspic = new Image(); //建立新的 Image
        canvaspic.src = userhistory[step] //載入剛剛存放的影像
        canvaspic.onload = function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(canvaspic, 0, 0) //匯出影像並從座標 x:0 y:0 開始
        }
        if (step === userhistory.length - 1) {
            $('.next-step').addClass('disable-btn');
        }
    }
}

function potodraw(photo) {
    let newpoto = new FileReader();
    let selectedFile = photo.files[0];
    if (selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/png') {
        newpoto.addEventListener("load", () => {
            let canvasPic = new Image()
            canvasPic.src = newpoto.result //存入圖像
            canvasPic.onload = () => {
                if (selectedFile.size < 1000000) {
                    ctx.drawImage(canvasPic,
                            (canvas.width / 2) - (canvasPic.width / 2),
                            (canvas.height / 2) - (canvasPic.height / 2) - 150)
                        //匯出影像
                } else {
                    ctx.drawImage(canvasPic, 0, 0)
                }
            }
        }, false);
        if (selectedFile) {
            newpoto.readAsDataURL(selectedFile);
        }
    } else {
        alert('錯誤檔案類型')
        return
    }
}


//////////上方功能列表部分/////////

//下載畫布
$('.save').click(function() {
    download(this);
})

//清空畫布
$('.clear-all-btn').click(function() {
    step = -1;
    userhistory = [];
    $('.back-step').addClass('disable-btn');
    $('.next-step').addClass('disable-btn');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#E8E8E8'; //清除畫布時也要讓背景重新上色
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    push();
})

//上一步
$('.back-step').click(function() {
    undo();
    if (step === 0) {
        $('.back-step').addClass('disable-btn');
    }
})

//下一步
$('.next-step').click(function() {
    redo();
    if (step > 0) {
        $('.back-step').removeClass('disable-btn');
    }
})

//////////下方功能列表部分/////////

//圖片上傳功能
$('#pen-tool-3').click(function() {
    $('#photo_up').click();
})

$('#photo_up').change(function() {
    potodraw(this);
    $('.pen-tool-box').addClass('hide-now')
});

//改變畫筆大小
$('.pen-width').keyup(function() {
    if ($('.pen-width').val() > 500) {
        alert('太貪心囉，最多只能到500px！')
    } else {
        ctx.lineWidth = $('.pen-width').val()
    }
})