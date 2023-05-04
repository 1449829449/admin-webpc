<template>
  <div class="home">
    <el-button>默认按钮</el-button>
    <el-button type="primary">主要按钮</el-button>
    <el-button type="success">成功按钮</el-button>
    <el-button type="info">信息按钮</el-button>
    <el-button type="warning">警告按钮</el-button>
    <el-button type="danger">危险按钮1</el-button>
    <svg-icon icon-class="jinxingzhong"></svg-icon>
    <div class="login-btn" v-permission="true">6666</div>
    <HelloWorld msg="Welcome to Your Vue.js App" />
    {{ 100 | gold }}
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { login } from "../api/login";

export default {
  name: "Home",
  // components: {
  //   HelloWorld
  // }
  async mounted() {
    console.log(this.$store.state.modulA.name);
    try {
      let a = await login();
      console.log(a);
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
