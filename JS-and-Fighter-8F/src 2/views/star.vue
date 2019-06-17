<template>
  <div class="star text-center justify-content-center">
    <header>
    </header>
    <main>
      <div class="star-title-box">
        <div class="row col-12 mb-4 ml-0 pr-4 pl-0">
          <div class="col-4"><span>TIC</span></div>
          <div class="col-4"><span class="pink-color single-circle"></span></div>
          <div class="col-4"><span class="double-cross"><span class="double-cross-2"></span></span></div>
        </div>
        <div class="row col-12 mb-4 ml-0 pr-4 pl-0">
          <div class="col-4"><span class="pink-color single-cross"></span></div>
          <div class="col-4"><span>TAC</span></div>
          <div class="col-4"><span class="pink-color double-circle"></span></div>
        </div>
        <div class="row col-12 pr-3 pl-0">
          <div class="col-4"><span class="pink-color double-circle"></span></div>
          <div class="col-4"><span class="pink-color single-cross-2"></span></div>
          <div class="col-4 pl-4 pr-0"><span>TOE</span></div>
        </div>
      </div>
      <div class="star-box">
        <router-link :to="{name:'game'}">
          <div>START</div>  
        </router-link> 
      </div>
    </main>
    <footer>
    </footer>
  </div>
</template>

<script>

export default {
  name: 'star',
}
</script>

<style src="../assets/star.css" scoped></style>
