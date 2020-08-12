<template>
  <div class="employee-card">
    <h2 class="name h2">{{ getFullName(employee) }} Profile</h2>
    <div class="picture">
      <Avatar />
    </div>
    <div class="infos">
      <p class="role">{{ employee.role }}</p>
      <p class="year">Since {{ employee.year }}</p>
      <p class="email">{{ employee.email }}</p>
    </div>
    <div class="links">
      <a class="link" href="#">{{ employee.reviews.length }} reviews</a>
      <a
        v-if="isAdmin($store) || isOwnProfile($store, employee.id)"
        class="link"
        href="#"
        >{{ employee.assignments.length }} assignments</a
      >
    </div>
  </div>
</template>
<script>
import store from "@/store";
import mixins from "@/mixins/index.js";
import Avatar from "@/components/employee/Avatar.vue";

export default {
  name: "EmployeeCard",
  components: {
    Avatar,
  },
  props: {
    employee: {
      type: Object,
      required: true,
    },
  },
  mixins: [mixins],
};
</script>
<style lang="scss">
@import "@/scss/components/employee/employeeCard.scss";
</style>
