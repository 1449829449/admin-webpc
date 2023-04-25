<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  color: #2c3e50;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#nav {
  width: auto;
  padding: 30px;

  a {
    color: #2c3e50;
    font-weight: bold;
    background-color: #f6f6f6;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
