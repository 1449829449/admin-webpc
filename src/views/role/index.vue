<template>
  <div class="rolemanage">
    <div class="wleft">
      <!-- 搜索查询 -->
      <el-form
        ref="ruleForm"
        :inline="true"
        :model="formInline"
        :rules="rules"
        class="demo-form-inline"
      >
        <el-form-item label="账号" prop="name">
          <el-input v-model="formInline.name" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="primary" @click="resetForm('ruleForm')"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
      <!-- table -->
      <el-table
        :data="tableData"
        border
        highlight-current-row
        @cell-click="handletable"
      >
        <el-table-column
          align="center"
          type="index"
          :index="indexMethod"
          label="序号"
          width="60px"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="角色名称"
        ></el-table-column>
        <el-table-column align="center" label="状态">
          <template slot-scope="scope">
            {{ scope.row.status == 1 ? "正常" : "禁用" }}
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
    </div>
    <!-- 操作区 -->
    <div class="wright">
      <el-form
        ref="formtree"
        :model="form"
        :rules="rulestree"
        label-width="80px"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.status">
            <el-radio label="1">正常</el-radio>
            <el-radio label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item class="qxlh" label="权限">
          <el-tree
            ref="tree"
            :data="data"
            show-checkbox
            node-key="id"
            default-expand-all
            :default-checked-keys="defaultCheck"
            :props="defaultProps"
            @check="change"
          >
          </el-tree>
        </el-form-item>
      </el-form>
      <div class="tree_but">
        <el-button type="primary" @click="ckadd">新增</el-button>
        <el-button type="primary" @click="ckback">修改</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { userList, userTree, addRole, uploadRole } from "@/api/systemrun";
import tables from "@/mixins/table";
import { Objectbemixed } from "@/utils/tools"; // 工具函数库

export default {
  name: "rolemanage",
  mixins: [tables],
  props: {},
  data() {
    return {
      //table查询属性
      formInline: {
        name: "",
        pageNo: 1,
        pageSize: 10,
      },
      tableData: [],
      rules: {},
      // 操作区
      form: {
        id: "",
        name: "",
        status: "1",
        permissionId: [],
      },
      rulestree: {
        name: [
          { required: true, message: "请输入角色名称", trigger: "change" },
        ],
      },
      data: [],
      defaultCheck: [],
      defaultProps: {
        children: "children",
        label: "label",
        id: "id",
      },
      currentRow: null,
    };
  },
  async mounted() {
    window.localStorage.setItem("initialdata", JSON.stringify(this.form));
    await this.getList();
    const { data } = await userTree();
    this.data = data.children;
  },
  methods: {
    async getList() {
      const { data } = await userList(this.formInline);
      this.tableData = data.records;
      this.total = data.total;
    },
    change(one, two) {
      this.form.permissionId = [...two.checkedKeys, ...two.halfCheckedKeys];
    },
    handletable(val) {
      this.$refs.tree.setCheckedKeys([]);
      this.currentRow = val;
      this.defaultCheck = val.permissionId ? val.permissionId.split(",") : [];
      this.form = Objectbemixed(this.form, val);
    },
    ckback() {
      if (!this.currentRow) {
        this.$message({ message: "请勾选修改的角色", type: "warning" });
        return false;
      }
      this.ckadd(1);
    },
    async ckadd(e) {
      this.$refs.formtree.validate(async (valid) => {
        let res = null;
        if (valid) {
          if (typeof this.form.permissionId === "object") {
            this.form.permissionId = this.form.permissionId.join(",");
          }
          if (e === 1) {
            this.form.id = this.currentRow.id;
            res = await uploadRole(this.form);
          } else {
            this.form.id = "";
            res = await addRole(this.form);
          }
          if (res.code === "200") {
            this.form = JSON.parse(window.localStorage.getItem("initialdata"));
            this.currentRow = null;
            this.$refs.tree.setCheckedKeys([]);
            this.$refs.formtree.resetFields();
            this.getList();
            this.$message(e === 1 ? "修改成功" : "添加成功");
          }
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.rolemanage {
  display: flex;
  justify-content: space-between;
}
.el-select,
.el-cascader {
  width: 100%;
}
.el-select-dropdown__item {
  padding-left: 20px;
}
.wleft {
  width: 68%;
  border-radius: 2px;
  padding: 20px;
  background-color: #fff;
}
.wright {
  width: 32%;
  border-radius: 2px;
  padding: 20px;
  margin-left: 10px;
  background-color: #fff;
  .el-form {
    height: 76vh;
    overflow-x: auto;
  }
  .el-form-item {
    padding: 5px 0;
  }
  .qxlh /deep/.el-form-item__label {
    line-height: inherit;
  }
}
.tree_but {
  padding-top: 10px;
  border-top: solid 1px #ddd;
}
</style>
