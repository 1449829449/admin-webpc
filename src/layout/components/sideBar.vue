<template>
  <div class="sideBar" id="domSideBar">
    <div class="header_l">
      <img src="@/assets/framework/logo.png" /> <span>基础架构</span>
    </div>
    <el-scrollbar>
      <el-menu
        default-active="2"
        :collapse="opened"
        :collapse-transition="false"
        background-color="#3a3f51"
        text-color="#fff"
        router
        active-text-color="#ffd04b"
      >
        <div v-for="item in list" :key="item.path">
          <!-- 没有子路由的情况下 -->
          <el-menu-item v-if="!item.children" :index="item.path">
            <i class="el-icon-menu"></i>
            <span slot="title">{{ item.meta.title }}</span>
          </el-menu-item>
          <!-- 只有一个子路由的情况下 -->
          <el-menu-item
            v-else-if="item.children.length === 1"
            :index="ckpath(item.path, item.children[0].path)"
          >
            <i class="el-icon-menu"></i>
            <span slot="title">{{ item.children[0].meta.title }}</span>
          </el-menu-item>

          <!-- 多个子路由 -->
          <el-submenu v-else>
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ item.meta.title }}</span>
            </template>
            <el-menu-item
              v-for="child in item.children"
              :key="child.path"
              :index="ckpath(item.path, child.path)"
              >{{ child.meta.title }}</el-menu-item
            >
          </el-submenu>
        </div>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import asyncRoutes from '@/router/modules/asyncRoutes'

export default {
  data() {
    return {
      isCollapse: false,
      list: {},
    }
  },
  computed: {
    ...mapState('app', ['opened']),
  },
  mounted() {
    this.list = this.deepFilter(asyncRoutes)
    console.log(this.list)
  },
  methods: {
    ckpath(a, b) {
      return `${a}/${b}`
    },
    deepFilter(list) {
      // 使用filter 过滤当前层的数组
      return list.filter(item => {
          // filter其实也是遍历
          // 把当前遍历的节点的children 也调用一次 deepFilter 函数，返回过滤后的数组重新赋值
          if(item.children){
            item.children = this.deepFilter(item.children)
          }
          // 最后判断当前节点是否符合过滤要求
          return !item.hidden
      })
    }
  },
}


</script>
<style lang="scss" scoped>
.sideBar {
  width: 200px;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  background-color: #3a3f51;
  overflow: hidden;
  .el-scrollbar {
    height: calc(100% - 55px);
  }
  .el-menu {
    border: none;
    text-align: left;
  }
  .header_l {
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
