export default {
  data() {
    return {
      // 总条目数
      total: 0,
    };
  },
  methods: {
    // 序号
    indexMethod(index) {
      index =
        index + 1 + (this.formInline.pageNo - 1) * this.formInline.pageSize;
      return index;
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
      if (formName === "ruleForm") {
        this.getList();
      }
    },
    // 表格查询
    onSubmit() {
      this.getList();
    },
    // 分页事件
    handleSizeChange(val) {
      this.formInline.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.formInline.pageNo = val;
      this.getList();
    },
  },
};
