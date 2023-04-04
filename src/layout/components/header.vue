<template>
  <div class="nav_header">
    <div class="headr_d1">
      <!-- 展开按钮 -->
      <div @click="ckdevelop"><svg-icon icon-class="zhankai"></svg-icon></div>

      <!-- 面包屑导航 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="(item, index) in breadList" :key="index">
          {{ item.meta.title }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="headr_d2">
      <ul>
        <!-- 全屏功能 -->
        <li class="domFullScreen" @click="toggleFull">
          <svg-icon icon-class="quanping"></svg-icon>
        </li>
        <!-- 用户信息展示，退出登陆，修改密码 -->
        <li class="domPersonal">
          <el-dropdown @command="handleCommand" placement="bottom-end">
            <div class="el-dropdown-link">
              <span>{{ name }}</span>
              <img src="@/assets/framework/logo.png" alt="用户头像" />
            </div>

            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="1">修改密码</el-dropdown-item>
              <el-dropdown-item command="login/logOut" divided
                >退出登陆</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </li>
      </ul>
    </div>
    <el-dialog
      title="收货地址"
      :visible.sync="dialogFormVisible"
      @close="handleClose"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="原密码" prop="oldPass">
          <el-input v-model="ruleForm.oldPass"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPass">
          <el-input v-model="ruleForm.newPass"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="passTwo">
          <el-input v-model="ruleForm.passTwo"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="doSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import screenfull from "screenfull";
import cookie from "js-cookie";

export default {
  data() {
    return {
      name: cookie.get("ms_name"),
      dialogFormVisible: false,
      breadList: [],
      opened: false,
      ruleForm: {
        oldPass: "",
        newPass: "",
        passTwo: "",
      },
      rules: {
        oldPass: [
          { required: true, message: "原密码", trigger: "blur" },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        newPass: [{ required: true, message: "新密码", trigger: "blur" }],
        passTwo: [{ required: true, message: "确认密码", trigger: "blur" }],
      },
    };
  },
  watch: {
    $route: {
      handler(route) {
        let allList = route.matched.filter((item) => {
          if (item.meta.title) {
            return true;
          }
        });
        this.breadList = allList;
      },
      immediate: true,
    },
  },
  methods: {
    ckdevelop() {
      this.$store.commit("app/SET_OPENED");
    },
    toggleFull() {
      screenfull.toggle();
    },
    handleCommand(command) {
      switch (command) {
        case "1":
          this.dialogFormVisible = true;
          break;
        default:
          this.$store.dispatch(command);
      }
    },
    doSubmit() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          this.ruleForm.name = window.localStorage.getItem("name");
          let { passTwo, ...all } = this.ruleForm;
          console.log(passTwo);
          this.$store.dispatch("login/czCode", all);
          this.dialogFormVisible = false;
        }
      });
    },
    handleClose() {
      this.$refs.ruleForm.resetFields();
    },
  },
};
</script>
<style lang="scss">
#nav {
  padding: 30px;

  a {
    color: #2c3e50;
    font-weight: bold;
    background-color: #fff;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.nav_header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: calc(100% - 240px);
  height: 50px;
  margin-left: 200px;
  padding: 0 20px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.05), 0 1px 0 rgba(0, 0, 0, 0.05%);

  .svg-icon {
    margin: 1px 10px 0 0;
    cursor: pointer;
  }

  .headr_d1 {
    display: flex;
  }

  .el-breadcrumb {
    line-height: initial;
  }

  .headr_d2 {
    img {
      width: 38px;
      height: 38px;
      border-radius: 50%;
    }

    ul {
      display: flex;
      align-items: center;
    }

    .domPersonal {
      display: flex;
      align-items: center;
      height: 50px;
      padding: 0 10px;
      font-size: 14px;
      cursor: pointer;

      &:hover {
        background-color: #f6f6f6;
      }

      span::after {
        width: 0;
        height: 0;
        margin: 0 5px;
        font-size: 0;
        border-top: solid 6px #606266;
        border-right: solid 6px transparent;
        border-bottom: solid 6px transparent;
        border-left: solid 6px transparent;
        content: "";
      }
    }

    .domFullScreen {
      line-height: normal;
    }

    .el-dropdown-link {
      display: flex;
      align-items: center;
    }
  }
}
</style>
