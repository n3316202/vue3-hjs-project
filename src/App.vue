<template>
  <div id="game">
    <main-header></main-header>
    <router-view />
    <main-footer></main-footer>
  </div>
</template>

<script>
import MainFooter from '@/components/main/MainFooter.vue'
import MainHeader from '@/components/main/MainHeader.vue'

export default {
  name: 'App',
  components: {
    MainFooter,
    MainHeader
  }
}
</script>

<style scoped>
#game {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
