<!-- Admin dashboard -->
<template>
  <div class="admin-theme">
    <Nav />
    <h1>Admin dashboard</h1>
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

<style lang="scss" scoped>
h1 {
  text-align: center;
}
</style>
