<template>
  <div class="home">
    <div @click="fakeAuthAdmin" class="col connect-btn admin card" tabindex="0">
      <Avatar />
      <span> Connect to the <strong>Admin Dashboard</strong> </span>
    </div>
    <div @click="fakeAuthUser" class="col connect-btn user card" tabindex="0">
      <Avatar />
      <span> Connect to the <strong>User Dashboard</strong></span>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import Avatar from "@/components/employee/Avatar.vue";

export default {
  name: "Home",
  components: {
    Avatar,
  },
  methods: {
    fakeAuthAdmin() {
      const userId = "5f33569ef693110590d24f4c";
      store
        .dispatch("connectUser", { id: userId, isAdmin: "admin" })
        .then((data) => {
          this.$router.push({
            name: "admin",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    fakeAuthUser() {
      const userId = "5f2fcaaf5bbb5505145a07b6";
      store
        .dispatch("connectUser", { id: userId })
        .then((data) => {
          this.$router.push({
            name: "my-profile",
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
.home {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin: 2rem 0;
  .connect-btn {
    cursor: pointer;
    width: 300px;
    height: 300px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    margin: 1rem 0;
    &:hover,
    &:focus {
      background: darken(map_get($colors, grey-x-light), 5%);
    }
  }
  .avatar {
    margin-bottom: 1rem;
  }
}
</style>
