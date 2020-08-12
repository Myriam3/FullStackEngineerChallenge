<template>
  <nav class="nav">
    <ul>
      <li>
        <router-link :to="{ name: 'my-profile' }">My profile</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'employees' }">See employees</router-link>
      </li>
      <li v-if="isAdmin">
        <router-link :to="{ name: 'admin-add-employee' }"
          >New employee</router-link
        >
      </li>
      <li v-if="isAdmin">
        <router-link :to="{ name: 'admin-add-review' }">New review</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import store from "@/store";

export default {
  computed: {
    isAdmin() {
      return store.state.admin;
    },
  },
};
</script>
<style lang="scss">
@import "@/scss/components/Nav.scss";
</style>
