<template>
  <div class="rolemanage">
    <!-- 搜索查询 -->
    <el-form ref="ruleForm" :inline="true" :model="formInline" :rules="rules" class="demo-form-inline">
      <el-form-item label="账号"  prop="phone">
        <el-input v-model="formInline.phone" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="primary" @click="resetForm('ruleForm')">重置</el-button>
        <el-button type="primary" @click="adduser">新增用户</el-button>
      </el-form-item>
    </el-form>
    <!-- table -->
    <el-table :data="tableData" border >
      <el-table-column align="center" type="index" :index="indexMethod" label="序号" width="60px" > </el-table-column>
      <el-table-column align="center" prop="name" label="账号"></el-table-column>
      <el-table-column align="center" prop="realName" label="姓名"></el-table-column>
      <el-table-column align="center" prop="roleName" label="角色"></el-table-column>
      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          {{scope.row.status==1?'正常':'禁用'}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="createTime" label="创建时间"></el-table-column>
      <el-table-column align="center" prop="roleName" label="操作" >
        <template slot-scope="scope" >
          <el-button type="text" size="small" @click="toEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
        background
        class="paginWrap"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="formInline.pageNo"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
      <!-- 弹框 -->
      
      <el-drawer
        class="addCont"
        size="50%"
        style="padding:0 10px;"
        :wrapper-closable="false"
        :title="stateVal==='0' ? '修改' : '添加'"
        @close="resetForm('drawerform')"
        :visible.sync="dialogFormVisible"
      >
      <div class="drewWrap">
        <!-- 弹框内容 -->
        <el-form class="drawer_form" ref="drawerform" :rules="drawerrules" :model="form" label-width="80px">
          <el-form-item label="账号" prop="name">
            <el-input v-model="form.name" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item v-if="stateVal==='1'" label="密码" prop="password">
            <el-input v-model="form.password" placeholder="请输入用户密码"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="realName">
            <el-input v-model="form.realName" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="角色" prop="roleId" class="addleft">
            <el-select class="width" v-model="form.roleId" multiple  placeholder="请选择角色">
              <el-option v-for="item in selectData" :key="item.id" :label="item.name" :value="item.id"  />
            </el-select>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="form.status">
              <el-radio label="1">正常</el-radio>
              <el-radio label="0">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- <el-form-item>
            <el-button type="primary" @click="add">保存</el-button>
            <el-button @click="back">取消</el-button>
          </el-form-item> -->
        </el-form>
      </div>
      <!-- 操作按钮 -->
      <div class="drawer_but">
        <el-button type="primary" @click="submitFn">保存</el-button>
        <el-button @click="closeFn">取消</el-button>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import { stemUser, roleList, uploadUser, addUser } from '@/api/systemrun'
import { Objectbemixed } from '@/utils/tools' // 工具函数库
import tables from '@/mixins/table'

export default {
  name: 'rolemanage',
  mixins: [tables],
  props: {},
  data() {
    return {
      //table查询属性 
      formInline: {
        phone: '',
        pageNo: 1,
        pageSize: 10,
      },
      tableData: [],
      rules: {},
      // 弹框属性
      dialogFormVisible: false,
      form:{
        phone:'',
        name:'',
        password:'',
        roleId: [],
        status:'',
        id:'',
        realName:''
      },
      drawerrules: {
          phone: [
            { required: true, message: '请输入活动名称', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请选择活动区域', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          roleId: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ],
          status:[
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ],
          realName:[
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
      },
      selectData: [],
      stateVal: 0,
    }
  },
  async mounted(){
    window.localStorage.setItem('initialdata',JSON.stringify(this.form))
    await this.getList()
    const { data } = await roleList()
    this.selectData = data
  },
  methods: {
    async getList(){
      const { data } = await stemUser(this.formInline)
      this.tableData = data.records
      this.total = data.total
    },
    submitFn(){
      this.$refs.drawerform.validate(async(valid) => {
        if (valid) {
          this.form.roleId = this.form.roleId.join(',')
          if (this.stateVal==='0') {
            await uploadUser(this.form)
          } else {
            await addUser(this.form)
          }
          this.dialogFormVisible = false
          this.getList()
        }
      });
    },
    adduser(){
      this.stateVal = '1'
      this.dialogFormVisible = true
      this.form = JSON.parse(window.localStorage.getItem('initialdata'))
    },
    closeFn(){
      this.dialogFormVisible = false
    },
    toEdit(scope){
      this.stateVal = '0'
      this.dialogFormVisible = true
      this.form = Objectbemixed(this.form,scope)
      this.form.roleId = this.form.roleId.split(',')
    },
  }
}
</script>
<style lang="scss" scoped>
.rolemanage {
  background: #fff;
  border-radius: 2px;
  padding: 20px;
}
.el-select,.el-cascader{
  width: 100%;
}
.el-select-dropdown__item{
  padding-left: 20px;
}
.drawer_form{
  padding: 20px 30px 20px 20px;
  background-color: #fff;
  .el-form-item{
    padding: 10px 0;
  }
}
</style>
