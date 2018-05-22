<template>
  <div id="home">
      <h1>项目：</h1>
      <router-link to="/home/calpage">货币计算器</router-link>
      <router-link to="/home/chkdriverloc">司机系统</router-link>
      <router-view></router-view>
  </div>
</template>

<script>

export default {
  
}
</script>

<style>
  h1 {
    padding: 0 12px;
  }
</style>
