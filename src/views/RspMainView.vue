<template>
  <div class="prj">
    <RspHeader></RspHeader>
    <RspMain></RspMain>
    <rsp-footer></rsp-footer>
  </div>
</template>

<script>
import RspHeader from '../components/main/MainHeader.vue'
import RspMain from '@/components/rsp/RspMain.vue'
import RspFooter from '../components/main/MainFooter.vue'

export default {
  components: {
    RspHeader,
    RspMain,
    RspFooter
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
