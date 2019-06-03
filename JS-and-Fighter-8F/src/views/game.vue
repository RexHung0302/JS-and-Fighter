<template>
  <div class="game text-center justify-content-center">
    <header>
      <div class="marker-box row">
        <div class="cross-title-box">
          Ｘ
        </div>
        <div class="cross-score-box">
          {{Xscore}}
        </div>
        <div class="vs-box">
          vs
        </div>
        <div class="circle-score-box">
          {{Oscore}}
        </div>
        <div class="circle-title-box">
          Ｏ
        </div>
      </div>
      <div class="turn-box">
        <span v-if="step % 2 === 0" class="turn-text cross-turn">YOUR TURN!</span>
        <span v-if="step % 2 !== 0" class="turn-text circle-turn">YOUR TURN!</span>
      </div>
    </header>
    <main>
      <div class="play-area d-flex flex-wrap" v-if="play_area">
        <div class="grids row justify-content-center" v-for="(grid,id) in grids" :key="id" @click="set(id)">
            <transition name="text-show"><font-awesome-icon v-if="grid === 1" :icon="CrossIcon" style="color:white;"/></transition>
            <transition name="text-show"><font-awesome-icon v-if="grid === -1" :icon="CircleIcon"/></transition>
        </div>     
      </div>
      <transition name="text-show">
          <div class="cross-winner-box" v-if="Xwin">
            <span>WINNER!</span>
          </div>
      </transition>  
      <transition name="text-show">
        <div class="circle-winner-box" v-if="Owin">
          <span>WINNER!</span>
        </div>
      </transition>
      <transition name="text-show">
        <div class="draw-box" v-if="draw">
          <div class="draw-text">DRAW!</div>
          <div class="draw-text">DRAW!</div>
          <div class="draw-text">DRAW!</div>
          <div class="bg-circle"></div>
          <div class="bg-cross"></div>
        </div>
      </transition>
    </main>
    <footer>
      <div class="restart-box">
        <router-link :to="{name:'star'}">
          <div>RESTART</div>  
        </router-link> 
      </div>
    </footer>
  </div>
</template>

<script>

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { faCircle } from '@fortawesome/free-regular-svg-icons'


export default {
  name: 'game',
  data(){
    return{
      //判斷局數
      step: 0,
      //Ｘ是player1,Ｏ是player2
      player: 1,
      //判斷每一個格子
      grids: [0,0,0,0,0,0,0,0,0],
      //判斷贏的陣列
      Lines: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ],
      //分數 ＆ 平手次數
      Xscore: 0,
      Oscore: 0,
      drawtimes: 0,
      //玩OOXX的畫面
      play_area: true,
      //Ｘ贏的畫面
      Xwin: false,
      //Ｏ贏的畫面
      Owin: false,
      //平手的畫面
      draw: false,
    }
  },
  created() {
    this.Xscore = localStorage.getItem("Xwin") ? localStorage.getItem("Xwin") : 0;
    this.Oscore = localStorage.getItem("Owin") ? localStorage.getItem("Owin") : 0;
    this.drawtimes = localStorage.getItem("DRAW!!") ? localStorage.getItem("DRAW!!") : 0;
  },
  methods:{
    set(id){
      //判斷如果格子是否被點過 ＆ 判斷局數是否在九局內
      if(this.grids[id] !== 0 || this.step > 9)return;
      //局數增加
      this.step ++;
      //如果是除2是於0代表X下手，反之Ｏ下手
      this.step % 2 !== 0 ? (this.player = 1) : (this.player = -1);
      //替換掉grids內的數值
      this.$set(this.grids,id,this.player);
    },
    checkwinner(){
      //檢查八種贏法
      for(let i = 0; i < 8 ; i++){
        const [a, b, c] = this.Lines[i];
        const sum = this.grids[a] + this.grids[b] + this.grids[c];
        if(sum === 3){
          this.Xscore ++;
          localStorage.setItem("Xwin", this.Xscore);
          this.play_area = false;
          this.Xwin = true;
        }
        if(sum === -3){
          this.Oscore ++;    
          localStorage.setItem("Owin", this.Oscore);
          this.play_area = false;
          this.Owin = true;
        }
      }
    },
    checkdraw(){
      //第九步直接判斷為平手
      localStorage.setItem("DRAW!!", this.drawtimes);
      this.drawtimes ++;
      this.play_area = false;
      this.draw = true;
    },
    restart(){
      this.player = 1;
      this.grids = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
  },
  computed:{
    //叉叉的Icon
    CrossIcon(){
      return faTimes
    },
    //圈圈的Icon
    CircleIcon(){
      return faCircle
    },
  },
  components: {
    FontAwesomeIcon
  },
  //第二步開始檢查
  watch:{
    step(){
      if(this.step >= 2 && this.step < 9){
        this.checkwinner();
      }
      //第九步直接判斷為平手
      if(this.step === 9){
        this.checkdraw();
      }
    }
  }
}
</script>

<style src="../assets/game.css" scoped></style>