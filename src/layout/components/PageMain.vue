<template>
  <section class="app_main">
    <transition name="fade-transform" mode="out-in">
      <router-view></router-view>
    </transition>
  </section>
</template>
<style lang="scss" scoped>
.app_main{
  padding: 15px;
  width: calc(100% - 230px);
  background-color: #f0f3f4;
  min-height: calc(100vh - 90px);
  margin-left: 200px;
  text-align: left;
}
</style>