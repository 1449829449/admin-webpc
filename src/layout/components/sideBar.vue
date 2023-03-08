<template>
  <div class="sideBar" id="domSideBar">
    <div class="header_l">
      <img src="@/assets/framework/logo.png" /> <span>基础架构</span>
    </div>
  <el-scrollbar>
    <el-menu
      default-active="2"
      @open="handleOpen"
      @close="handleClose"
      :collapse="opened"
      background-color="#3a3f51"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
        <el-menu-item index="1-3">选项3</el-menu-item>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
    </el-menu>
  </el-scrollbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data(){
    return{
      isCollapse: false
    }
  },
  computed:{
    ...mapState('app', ['opened'])
  },
  methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
  }
}
</script>
<style lang="scss" scoped>
.sideBar{
  width: 200px;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  background-color: #3a3f51;
  overflow: hidden;
  .el-scrollbar{
    height: calc(100% - 55px);
  }
  .el-menu{
    border: none;
    text-align: left;
  }
  .header_l{
    display: flex;
    align-items: center;
    color: #fff;
    height: 50px;
    padding-left: 15px;
    font-size: 14px;
    font-weight: bold;
    border-bottom: 1px solid #454b61;
    img {
      width: 30px;
      height: 30px;
      margin-right: 8px;
    }
  }
}
</style>