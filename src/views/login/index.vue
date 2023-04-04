<template>
  <div class="login">
    <header class="header">
      <img src="@/assets/framework/logo.png" alt="基础架构" />慢病网络服务中心
    </header>
    <div class="login_center">
      <img src="@/assets/framework/login.png" />
      <div class="login_form">
        <h3>登录</h3>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          class="login-ruleForm"
        >
          <el-form-item prop="name">
            <el-input v-model="ruleForm.name">
              <template slot="prepend">账号</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="ruleForm.password">
              <template slot="prepend">密码</template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="login_but" @click="loginsubmit" type="primary"
              >提交</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
    <footer class="footer">Copyright © 2022</footer>
  </div>
</template>
<script>
export default {
  name: "login",
  props: {},
  data() {
    return {
      ruleForm: {
        name: "",
        password: "",
      },
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  mounted() {},
  methods: {
    loginsubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$store
            .dispatch("login/toLogin", this.ruleForm)
            .then(() => {
              this.$router.push(this.$route.query.redirect || "home");
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: left;
  width: 100%;
  height: 90px;
  color: #3880e7;
  font-weight: 500;
  font-size: 36px;
  background-color: #f5f5f5;

  img {
    width: 60px;
    height: 60px;
    margin: 0 10px 0 90px;
  }
}

.login_center {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: calc(100vh - 190px);
  background-color: #1264d9;

  img {
    height: 60%;
  }

  .login_form {
    width: 380px;
    background-color: #fff;
    border-radius: 6px;
    box-shadow: 0 0 40px 0 rgba(0, 0, 0, 0.1);

    h3 {
      width: 100%;
      color: #333;
      font-size: 18px;
      line-height: 50px;
      text-align: center;
      border-bottom: solid 1px #ddd;
    }
  }

  .login-ruleForm {
    margin: 30px;

    .el-form-item {
      margin-bottom: 20px;
    }
  }

  .login_but {
    width: 100%;
  }
}

.footer {
  width: 100%;
  height: 100px;
  color: #626262;
  font-size: 16px;
  line-height: 100px;
}
</style>
