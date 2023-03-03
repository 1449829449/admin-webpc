<template>
  <div class="error_404">
    <div class="error_main">
      <h3><strong>404</strong>无法打开页面</h3>
      <div class="error_actions">
        <div >
          <h4>可能原因：</h4>
          <ul>
            <li>1. 网络信号差</li>
            <li>2. 找不到请求的页面</li>
            <li>3. 输入的网址不正确</li>
          </ul>
        </div>
        <div>
          <h4>您还可以：</h4>
          <el-button type="text" @click="$router.push('/home')">返回首页</el-button><br />
          <el-button type="text" @click="$router.go('-1')">返回上一页</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: '404',
  props: {},
  data () {
    return {
      name: '404'
    }
  },
  mounted () {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.error_404{
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f1f3;
}
.error_main{
  width: 520px;
  padding: 50px 50px 70px 50px;
  background-color: #f9f9f9;
  h3{
    font-size: 24px;
    text-align: left;
    border-bottom: 1px solid #d0d0d0;
    strong{
      font-size: 54px;
      margin-right: 20px;
    }
  }
  .error_actions{
    display: flex;
    justify-content: space-around;
    text-align: left;
    padding-top: 20px;
    font-size: 14px;
    > div{
      width: 46%;
    }
    h4{
      font-size: 20px;
      margin-bottom: 10px;
    }
    li{
      color: #838383;
      line-height: 30px;
    }
  }
}

</style>
