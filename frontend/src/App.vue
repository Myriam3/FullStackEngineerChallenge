<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/dashboard">User dashboard</router-link>
      <router-link to="/admin">Admin dashboard</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
@import "@/scss/global.scss";
</style>
