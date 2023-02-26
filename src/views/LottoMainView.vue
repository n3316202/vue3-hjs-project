<template>
  <div class="prj">
    <main-header></main-header>
    <lotto-main></lotto-main>
    <main-footer></main-footer>
  </div>
</template>

<script>
import MainFooter from '../components/main/MainFooter.vue'
import MainHeader from '../components/main/MainHeader.vue'
import LottoMain from '../components/lotto/LottoMain.vue'

export default {
  name: 'MainView',
  components: {
    MainFooter,
    MainHeader,
    LottoMain
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
