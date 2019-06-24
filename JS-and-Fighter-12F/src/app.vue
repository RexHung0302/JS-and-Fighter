<template lang="pug">
  main
    .blurBox
    transition(name="fade")
      .puzzleShow.text-center(v-if="!isPlay")
        .puzzleShow__box
          .puzzleShow__content.text-center
            .puzzleShow__showTitle
              h1.animated.infinite.bounce {{ beforePlayTitle }}
            button.btn.puzzleShow__startBtn(@click="startGame") 開始遊戲
    .puzzleGame.text-center(v-show="isPlay")
      .puzzleGame__box
        .puzzleGame__content
          .puzzleGame__showTitle
            p {{ gameTitle }}
          .puzzleGame__playArea
            .puzzleGame__dropPlace
              table.puzzleGame__table
                tbody
                  -for(var i = 0; i < 3;i++)
                    tr
                      -for(var j = 1; j < 4;j++)
                        td.puzzleGame__td(@dragover="over($event)" @dragleave="leave($event)"  @drop="drop($event)")
            transition(name="fade")
              .puzzleGame__puzzles(v-if="!isDown")
                ul
                  -for (let puzzleImg = 1; puzzleImg <= 9; puzzleImg++)
                    li(id="puzzleLi_"+puzzleImg)
                      img(class="puzzleGame__puzzle puzzleImg-"+puzzleImg id="puzzleImg_"+puzzleImg draggable="true" @dragstart="drag($event)" @dragend="end($event)" src="./img/Puzzle-"+ puzzleImg +".png" alt="puzzleImg__" + puzzleImg)
            transition(name="fade")          
              .puzzleGame__infoBox(v-if="isDown")
                h2.mb-4 {{ puzzleTitle }}
                p {{ puzzleAuthor }}
                p.mb-5 {{ puzzleYear }}
                p {{ puzzleDescription1 }}
                p.mb-5 {{ puzzleDescription2 }}
                button.btn.puzzleGame__playAgain(@click="playAgain()") 再玩一次
      transition(name="fade")          
        .puzzleGame__footer(v-if="!isDown")
          button.btn.puzzleGame__reBtn(@click="init()") 重新排列
</template>
<script>
import { setTimeout } from "timers";
import { constants } from "crypto";
export default {
  data() {
    return {
      isPlay: false,
      beforePlayTitle: "玩拼圖學歷史",
      gameTitle: "請完成這幅《清明上河圖》",
      puzzleTitle: "清院本清明上河圖",
      puzzleAuthor: "陳枚、孫祜、金昆、戴洪、程志道",
      puzzleYear: "清高宗乾隆元年（1736）",
      puzzleDescription1:
        "宋張澤端（活動於西元十二世紀前期）「清明上河圖」是畫史中寫實風俗畫的一件傑作，歷代臨仿者甚多，在故宮即藏有七種不同的本子，其中就屬清院本「清明上河圖」最為有名。",
      puzzleDescription2:
        "此卷為乾隆元年（一七三六）由宮廷畫院畫師陳枚、孫祜、金昆、戴洪、程志道等五人合繪。 此卷設色鮮麗，用筆圓熟，界畫橋樑、屋宇及人物皆十分細膩嚴謹，是院畫中之極精者。所畫事物甚多，雖失去了宋代古制，但也足以代表明清之際北京風物。",
      winW: null,
      winH: null,
      drag_id: null,
      drop_id: null,
      target_className: null,
      td_className: null,
      puzzleInfo: null,
      puzzles_num: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      isDown: false
    };
  },
  mounted() {
    // 初始化
    return this.init();
  },
  methods: {
    init() {
      // 更新畫面寬高
      this.winW = window.innerWidth;
      this.winH = window.innerHeight;
      this.drag_id = null;
      this.drop_id = null;
      this.target_className = null;
      this.td_className = null;
      this.puzzleInfo = null;
      this.puzzles_num = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      // 幫 td 加上 class
      for (
        var i = 0;
        i <
        $(".puzzleGame__table")
          .children()
          .children()
          .children().length;
        i++
      ) {
        $(".puzzleGame__table")
          .children()
          .children()
          .children()
          .eq(i)
          .addClass("puzzleGame__td__" + (i + 1));
      }
      // 砍掉已經在上面的拼圖
      $(".puzzleGame__table")
        .children()
        .children()
        .children()
        .children()
        .remove();
      this.breakPuzzle();
    },
    startGame() {
      this.isPlay = true;
      // 打亂拼圖
      this.init();
    },
    breakPuzzle() {
      for (var i = 1; i <= 9; i++) {
        $("#puzzleLi_" + i).css("right", Math.floor(Math.random() * 600) + 1);
        $("#puzzleLi_" + i).css("top", Math.floor(Math.random() * 400) + 1);
        // console.log(Math.floor(Math.random() * 4) + 1);
        var direction = Math.floor(Math.random() * 4) + 1;
        if (direction == 1) {
          direction = "Up";
        } else if (direction == 2) {
          direction = "Left";
        } else if (direction == 3) {
          direction = "Right";
        } else if (direction == 4) {
          direction = "Down";
        }
        $("#puzzleImg_" + i).addClass("animated slideIn" + direction);
      }
    },
    drag(e) {
      this.drag_id = e.target.id.split("_", 2)[1];
      // console.log(e);
      this.target_className = e.target.className;
      // 需要加上 setTimeout 才不會馬上消失
      setTimeout(() => (e.target.className += " invisible"), 0);
      this.puzzleInfo = e.target;
    },
    end(e) {
      $(".puzzleGame__puzzle").removeClass("invisible");
    },
    // 滑鼠進入目標區域
    over(e) {
      e.preventDefault();
      e.target.classList.add("hovered");
    },
    // 滑鼠離開目標區域
    leave(e) {
      e.target.classList.remove("hovered");
    },
    drop(e) {
      e.target.classList.remove("hovered");
      // 如果放下去父標籤不是 tr 而且子標籤超過 0 代表有東西了
      if (
        e.target.parentElement.tagName != "TR" ||
        e.target.children.length != 0
      )
        return;
      this.drop_id = e.target.className.split("__")[3];
      // 插入 Img
      // e.target.append(this.puzzleInfo);
      e.target.appendChild(this.puzzleInfo);
      if (this.drag_id === this.drop_id) {
        console.log("123");
        // 如果放對位子取消 draggable 並加上發光特效
        $("#puzzleImg_" + this.drop_id).attr("draggable", false);
        // 特效
        e.target.classList.add("puzzle_finish");
        setTimeout(() => e.target.classList.remove("puzzle_finish"), 850);
        // 把用來判斷是否拼完的陣列裡的數字拿掉 拿光代表已經贏了
        // 先放一個變數來放找到的順序
        var arr_numDelete = this.puzzles_num.indexOf(parseInt(this.drag_id));
        this.puzzles_num.splice(arr_numDelete, 1);
        console.log(this.puzzles_num);
        if (this.puzzles_num.length === 0) {
          console.log("贏了");
          $(".puzzleGame__table").addClass("puzzle_finish");
          setTimeout(
            () => $(".puzzleGame__table").removeClass("puzzle_finish"),
            900
          );
          $(".puzzleGame__dropPlace").css("left", "120px");
          this.isDown = true;
        }
      }
    },
    playAgain() {
      // 砍掉已經在上面的拼圖
      $(".puzzleGame__table")
        .children()
        .children()
        .children()
        .children()
        .remove();
      $(".puzzleGame__dropPlace").css("left", "0");
      this.isPlay = false;
      this.isDown = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.puzzle_finish {
  transition: all 0.8s ease;
  box-shadow: 0px 0px 12px 10px #ffff;
}

.hovered {
  transition: all 0.8s ease;
  background-color: #ffffff6e;
}

// 拼圖數量
$puzzles: 9 !default;

// 動畫
.puzzleShow__showTitle .animated {
  animation-duration: 2s;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

// 毛玻璃
.blurBox {
  position: absolute;
  display: flex;
  width: 100%;
  height: 100vh;
  background: inherit;
  filter: blur(2px);
}
// 開始遊玩前
.puzzleShow {
  width: 100%;
  height: 100vh;
  .puzzleShow__box {
    position: absolute;
    width: 400px;
    height: 400px;
    margin: 0 auto;
    top: 50%;
    left: 50%;
    margin-top: -150px;
    margin-left: -200px;
    .puzzleShow__content {
      position: relative;
      width: 100%;
      height: 100%;
    }
  }
  .puzzleShow__startBtn {
    position: absolute;
    bottom: 40px;
    width: 350px;
    height: 67px;
    margin-left: -175px;
    background-color: #ffffff00;
    border: 2px solid white;
    color: white;
    font-size: 24px;
    cursor: pointer;
    transition: all 0.5s ease;
    &:hover {
      background-color: #ffffff80;
      color: black;
    }
  }
  .puzzleShow__showTitle {
    color: white;
    font-size: 32px;
  }
}
// 開始遊玩時
.puzzleGame {
  position: relative;
  width: 100%;
  height: 100vh;
  padding: 40px;
  .puzzleGame__box {
    position: relative;
    .puzzleGame__showTitle {
      color: white;
      font-size: 36px;
    }
    .puzzleGame__playArea {
      position: relative;
      display: flex;
      .puzzleGame__dropPlace {
        position: relative;
        flex: 0 0 60%;
        transition: all 0.8s ease;
        .puzzleGame__table {
          position: relative;
          width: 540px;
          height: 540px;
          &:after {
            content: "";
            position: absolute;
            background-image: url("./img/FullPuzzle.png");
            background-position: -50px -50px;
            top: 1px;
            left: 0;
            width: 540px;
            height: 540px;
            opacity: 0.3;
            transition: all 0.8s ease;
            z-index: -1;
          }
        }
        .puzzleGame__td {
          position: relative;
          border: 2px solid white;
          width: 180px;
          height: 180px;
          img {
            position: absolute;
            top: 0;
            left: 0;
          }
          #puzzleImg_2 {
            left: -27px;
          }
          #puzzleImg_5 {
            top: -27px;
          }
          #puzzleImg_6 {
            left: -29px;
          }
          #puzzleImg_7 {
            top: -27px;
          }
          #puzzleImg_8 {
            left: -28px;
            top: -1px;
          }
          #puzzleImg_9 {
            top: -28px;
            left: -2px;
          }
        }
      }
      .puzzleGame__puzzles {
        flex: 0 0 40%;
        li {
          position: relative;
          top: 0;
          right: 0;
          list-style: none;
        }
        .puzzleGame__puzzle {
          position: absolute;
          cursor: pointer;
        }
      }
      .puzzleGame__infoBox {
        color: #ffff;
        width: 350px;
        .puzzleGame__playAgain {
          width: 350px;
          height: 67px;
          background-color: #ffffff00;
          border: 2px solid white;
          color: white;
          font-size: 24px;
          cursor: pointer;
          transition: all 0.5s ease;
          &:hover {
            background-color: #ffffff80;
            color: black;
          }
        }
      }
    }
  }
  .puzzleGame__footer {
    position: relative;
    top: 50px;
    .puzzleGame__reBtn {
      width: 350px;
      height: 67px;
      background-color: #ffffff00;
      border: 2px solid white;
      color: white;
      font-size: 24px;
      cursor: pointer;
      transition: all 0.5s ease;
      &:hover {
        background-color: #ffffff80;
        color: black;
      }
    }
  }
}

// 遊玩時的毛玻璃
.playBlur {
  background: rgba(0, 0, 0, 0.3);
  filter: blur(0);
}

.invisible {
  display: none;
}
</style>
