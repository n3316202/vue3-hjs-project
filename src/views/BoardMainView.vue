<template>
  <div class="prj">
    <main-header></main-header>
    <BoardMain></BoardMain>
    <main-footer></main-footer>
  </div>
</template>

<script>
import MainFooter from '../components/main/MainFooter.vue'
import MainHeader from '../components/main/MainHeader.vue'
import BoardMain from '../components/board/BoardMain.vue'

export default {
  name: 'BoardMainView',
  components: {
    MainFooter,
    MainHeader,
    BoardMain
  }
}
</script>

<style scoped>
.prj {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
