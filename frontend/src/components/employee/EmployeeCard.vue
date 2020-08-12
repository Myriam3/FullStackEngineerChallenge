<template>
  <div class="employee-card">
    <div class="infos">
      <h2 class="name">
        {{ employee.firstName }} {{ employee.lastName }} Profile
      </h2>
      <p class="role">{{ employee.role }}</p>
      <p class="year">Since {{ employee.year }}</p>
      <p class="email">{{ employee.email }}</p>
    </div>
    <div class="links">
      <a href="#">{{ employee.reviews.length }} reviews</a>
      <a href="#">{{ employee.assignments.length }} assignments</a>
    </div>
  </div>
</template>
<script>
export default {
  name: "EmployeeCard",
  props: {
    employee: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style lang="scss"></style>
