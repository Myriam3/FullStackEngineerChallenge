<template>
  <div id="app" class="container" :class="isAdmin ? 'admin-theme' : ''">
    <div id="nav" class="top-nav">
      <button
        v-if="this.isConnected"
        @click="logOut"
        class="btn secondary logout-btn"
      >
        Log out
      </button>
      <div class="title">
        <strong>
          {{
            $store.state.user
              ? "Hello " + $store.state.user.firstName + "! "
              : ""
          }}
        </strong>
        {{
          isConnected
            ? isAdmin
              ? "Welcome to the Admin dashboad!"
              : "Welcolme to your dashboard!"
            : "Welcome! Choose your user"
        }}
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
import store from "@/store";

export default {
  computed: {
    isAdmin() {
      return store.state.admin;
    },
    isConnected() {
      return store.state.userId;
    },
  },
  methods: {
    logOut() {
      store
        .dispatch("logOut")
        .then((data) => {
          this.$router.push({
            name: "home",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss">
@import "@/scss/global.scss";
</style>
