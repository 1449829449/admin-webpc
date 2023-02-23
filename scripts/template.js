module.exports = {
  vueTemplate: (compoenntName) => {
    return `<template>
  <div class="${compoenntName}">
    ${compoenntName}组件
  </div>
</template>
<script>
export default {
  name: '${compoenntName}',
  props: {},
  data () {
    return {
      name: '${compoenntName}'
    }
  },
  mounted () {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.${compoenntName} {

}
</style>
`
  },
}
