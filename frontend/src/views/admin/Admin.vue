<!-- Admin dashboard -->
<template>
  <div class="admin-theme">
    <h1>Admin dashboard</h1>
    <Nav />
    <router-view />
  </div>
</template>

<script>
import Nav from "@/components/Nav.vue";

export default {
  components: {
    Nav,
  },
};
</script>

<style lang="scss"></style>
