<template>
  <div id="app" class="container">
    <div id="nav" class="top-nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/dashboard">User dashboard</router-link> |
      <router-link to="/admin">Admin</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
@import "@/scss/global.scss";
</style>
