<template>
  <div class="employee-item" v-if="employee">
    <span class="col name"
      >{{ employee.firstName }} {{ employee.lastName }}
    </span>
    <span class="col role">{{ employee.role }}</span>
    <span class="col email">{{ employee.email }}</span>
    <span class="col year">Since {{ employee.year }}</span>
    <router-link :to="{ path: './employees/profile/' + employee._id }"
      >Profile</router-link
    >
  </div>
</template>
<script>
export default {
  name: "EmployeeListItem",
  props: {
    employee: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style lang="scss"></style>
