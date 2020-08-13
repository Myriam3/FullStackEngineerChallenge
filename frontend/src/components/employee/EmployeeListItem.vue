<template>
  <li class="employee-item" v-if="employee._id !== $store.state.userId">
    <span class="col name">
      <Avatar />
      {{ getFullName(employee) }}
    </span>
    <span class="col role">{{ employee.role }}</span>
    <span class="col email">{{ employee.email }}</span>
    <router-link
      class="link"
      :to="{ path: './employees/profile/' + employee._id }"
      >Profile</router-link
    >
  </li>
</template>
<script>
import mixins from "@/mixins/index.js";
import Avatar from "@/components/employee/Avatar.vue";

export default {
  name: "EmployeeListItem",
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
<style lang="scss" scoped>
.col.name {
  display: flex;
  align-items: center;
  font-weight: bold;
}
.email {
  font-weight: 300;
}
.avatar {
  max-width: 50px;
  display: inline-block;
  margin-right: 0.5rem;
}
</style>
