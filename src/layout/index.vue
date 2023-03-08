<template>
  <div class="wrapper" :class="{ closeBar: opened }">
    <MHeader></MHeader>
    <PageMain></PageMain>
    <SideBar></SideBar>
  </div>
</template>
<script>
import MHeader from "@/layout/components/header.vue"
import SideBar from "@/layout/components/sideBar.vue"
import PageMain from "@/layout/components/PageMain.vue"
import { mapState } from 'vuex'

export default {
  name: 'layout',
  components:{
    MHeader,
    SideBar,
    PageMain
  },
  computed: {
    ...mapState('app', ['opened']),
  },
}

</script>
<style lang="scss">
.closeBar{
  .nav_header{
    width: calc(100% - 105px);
    margin-left: 65px;
  }
  .sideBar{
    width: 65px;
  }
  .header_l span{
    display: none;
  }
}
</style>