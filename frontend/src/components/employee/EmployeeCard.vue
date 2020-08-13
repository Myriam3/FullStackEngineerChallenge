<template>
  <div class="employee-card card">
    <h2 class="name h2">{{ getFullName(employee) }} Profile</h2>
    <div class="picture">
      <Avatar />
    </div>
    <div class="infos">
      <p class="role">{{ employee.role }}</p>
      <p class="year">Joined in: {{ employee.year }}</p>
      <p class="email">{{ employee.email }}</p>
    </div>
    <div class="stats">
      <span>{{ employee.reviews.length }} reviews </span>
      <span>{{ employee.assignments.length }} assignments</span>
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
@import "@/scss/components/employee/EmployeeCard.scss";
</style>
