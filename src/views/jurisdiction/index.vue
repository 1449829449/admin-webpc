<template>
  <div class="jurisdiction">
    <el-button
      class="addtop"
      type="primary"
      icon="el-icon-plus"
      @click="addFirst"
      >新增</el-button
    >
    <el-table
      :data="tableData"
      row-key="id"
      border
      size="mini"
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="name" align="left" label="名称"> </el-table-column>
      <el-table-column label="操作" align="center" width="300px">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            icon="el-icon-plus"
            @click="addTwo(scope.row)"
            >添加</el-button
          >
          <el-button
            type="text"
            size="small"
            icon="el-icon-edit"
            @click="edit(scope)"
            >编辑</el-button
          >
          <el-button
            type="text"
            size="small"
            icon="el-icon-delete"
            @click="del(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹框 -->
    <el-drawer
      class="addCont"
      size="50%"
      style="padding: 0 10px"
      :wrapper-closable="false"
      :title="stateVal + '菜单'"
      @close="resetForm('drawerform')"
      :visible.sync="dialogFormVisible"
    >
      <div class="drewWrap">
        <!-- 弹框内容 -->
        <el-form
          class="drawer_form"
          ref="drawerform"
          :rules="drawerrules"
          :model="form"
          label-width="120px"
        >
          <el-form-item
            v-if="stateVal !== '添加'"
            label="是否有子菜单"
            prop="PId"
          >
            <el-radio-group v-model="form.PId">
              <el-radio label="0">是</el-radio>
              <el-radio label="1">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="菜单类型" prop="type">
            <el-radio-group v-model="form.type">
              <el-radio label="M">菜单</el-radio>
              <el-radio label="F">功能</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="菜单名称" prop="name">
            <el-input
              v-model="form.name"
              placeholder="请输入菜单名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="菜单图标">
            <el-input
              v-model="form.icon"
              placeholder="请输入菜单图标"
            ></el-input>
          </el-form-item>
          <el-form-item label="路由地址" prop="url">
            <el-input
              v-model="form.url"
              placeholder="请输入路由地址"
            ></el-input>
          </el-form-item>
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
import { userTree, addTree, delTree } from "@/api/systemrun";
import { Objectbemixed } from "@/utils/tools"; // 工具函数库
export default {
  name: "jurisdiction",
  props: {},
  data() {
    return {
      tableData: [],
      // 弹框属性
      dialogFormVisible: false,
      form: {
        id: "",
        PId: "1",
        type: "M",
        name: "",
        icon: "",
        url: "",
      },
      drawerrules: {
        name: [{ required: true, message: "请输入菜单名称", trigger: "blur" }],
        url: [{ required: true, message: "请输入路由地址", trigger: "blur" }],
      },
      selectData: [],
      stateVal: "",
    };
  },
  mounted() {
    window.localStorage.setItem("initialdata", JSON.stringify(this.form));
    this.getList();
  },
  methods: {
    async getList() {
      const { data } = await userTree();
      this.tableData = data.children;
      console.log(data.children);
    },
    addFirst() {
      this.stateVal = "新增";
      this.form = JSON.parse(window.localStorage.getItem("initialdata"));
      this.dialogFormVisible = true;
    },
    addTwo(scope) {
      this.stateVal = "添加";
      this.form = JSON.parse(window.localStorage.getItem("initialdata"));
      this.form.PId = scope.id;
      this.dialogFormVisible = true;
    },
    edit(scope) {
      this.stateVal = "编辑";
      this.form = Objectbemixed(this.form, scope.row);
      this.dialogFormVisible = true;
    },
    submitFn() {
      let a = Math.floor(Math.random() * (10000 - 1) + 1).toString();
      this.$refs.drawerform.validate(async (valid) => {
        if (valid) {
          Object.assign(this.form, {
            applicationCode: a,
            code: a,
            level: a,
          });
          let name = this.form.id ? "update" : "add";
          console.log(name, "]]]]]]]]]]]]]]]]]]]]");
          await addTree(name, this.form);
          this.dialogFormVisible = false;
          this.getList();
        }
      });
    },
    del(row) {
      this.$confirm("确定要删除该菜单吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delTree({ id: row.id }).then((res) => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.getList();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 关闭弹框
    closeFn() {
      this.dialogFormVisible = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.jurisdiction {
  background: #fff;
  border-radius: 2px;
  padding: 20px;
}

.drawer_form {
  padding: 20px 30px 20px 20px;
  background-color: #fff;

  .el-form-item {
    padding: 10px 0;
  }
}
</style>
