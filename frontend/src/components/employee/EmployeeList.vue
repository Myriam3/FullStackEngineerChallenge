<template>
  <div>
    <Nav />
    <section>
      <h2 class="h2">Employee List</h2>
      <ul class="table-list">
        <EmployeeListItem
          class="table-list-item"
          v-for="(employee, index) in employeeList"
          :key="index"
          :employee="employee"
        />
      </ul>
    </section>
  </div>
</template>

<script>
import store from "@/store";
import Nav from "@/components/Nav.vue";
import EmployeeListItem from "@/components/employee/EmployeeListItem.vue";

export default {
  name: "EmployeeList",
  components: {
    Nav,
    EmployeeListItem,
  },
  computed: {
    employeeList() {
      return store.state.employees.employees;
    },
  },
  created() {
    store.dispatch("employees/fetchAll");
  },
};
</script>
<style lang="scss"></style>
