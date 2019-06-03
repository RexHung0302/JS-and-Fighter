// lightBox
const lightBox = document.querySelector('.lightBox');
// 首頁的圖片
const index_img = document.querySelectorAll('.list__imgBox');
// 幻燈片頁的圖片
const lightBox_img = document.querySelector('.lightBox__img');
// lightBox 的按鈕
const lightBoxModal = document.querySelectorAll('.js-lightBoxModal');
// lightBox Close btn
const js_closeBtn = document.querySelector('.js-closeBtn');
// 現在是第幾張的 span
const lightBox__markTitle = document.querySelector('.lightBox__markTitle');
// 現在的圖片是第幾張
let now_imgIndex = null;
// 放圖片的陣列
let imgDate = [];

// 點選圖片
index_img.forEach(img => {
    // 把所有圖片丟進陣列
    imgDate.push(img.children[0].src);
    img.addEventListener('click', js_openLightbox);
})

function js_openLightbox(e) {
    // 取消事件(不會影響接下來)
    e.preventDefault();
    // 抓取 Class 的名稱來判斷是第幾個
    var imgClass_Name = e.target.className.split(" ");
    now_imgIndex = parseInt(imgClass_Name[2].split("-")[2]);
    // 圖片網址
    src = e.target.src;
    // 換圖片
    changImg(src);
    // 顯示幻燈片
    lightBox.style.cssText = "display:block;"
    lightBox.classList.add("animated", "fadeIn");
    setTimeout(() => {
        lightBox.classList.remove("animated", "fadeIn");
    }, 800)
}

// 更換圖片
function changImg(src) {
    // 更新現在頁面數字 
    lightBox__markTitle.innerHTML = now_imgIndex + 1;
    setTimeout(() => {
        lightBox_img.classList.remove("animated", "fadeOut");
        lightBox_img.classList.add("animated", "fadeIn");
        lightBox_img.src = src;
    }, 50)

}

// lightBox 的按鈕們
lightBoxModal.forEach(Btn => (
    Btn.addEventListener('click', lightBoxModal_switchCase)
));

function lightBoxModal_switchCase(e) {
    switch (e.target.className) {
        case 'transitionStyle fas fa-times-circle js-lightBoxModal':
            // 按下關閉按鈕
            // 加上動畫
            lightBox.classList.add("animated", "fadeOut");
            setTimeout(() => {
                lightBox.style.cssText = "display:none;"
                lightBox.classList.remove("animated", "fadeOut");
            }, 800)
            break;
        case 'transitionStyle fas fa-chevron-left js-lightBoxModal':
            //  加上動畫
            lightBox_img.classList.add("animated", "fadeOut");
            // 上一張
            now_imgIndex -= 1;
            if (now_imgIndex < 0) {
                now_imgIndex = imgDate.length - 1;
            }
            changImg(imgDate[now_imgIndex]);
            break;
        case 'transitionStyle fas fa-chevron-right js-lightBoxModal':
            //  加上動畫
            lightBox_img.classList.add("animated", "fadeOut");
            // 下一張
            now_imgIndex += 1;
            if (now_imgIndex > imgDate.length - 1) {
                now_imgIndex = 0;
            }
            changImg(imgDate[now_imgIndex]);
            break;
        default:
            break;
    }
}