<template>
  <div>
    <h2 class="h2">{{ this.formTitle }}</h2>
    <Avatar v-if="!modify" />
    <form
      v-if="!this.responseSuccess.display"
      @submit.prevent="editEmployee"
      class="form"
    >
      <Input
        type="text"
        label="First name *"
        v-model="employee.firstName"
        class="field"
        :class="{ error: $v.employee.firstName.$error }"
        @blur="$v.employee.firstName.$touch"
      />
      <Input
        type="text"
        label="Last name *"
        v-model="employee.lastName"
        class="field"
        :class="{ error: $v.employee.lastName.$error }"
        @blur="$v.employee.lastName.$touch"
      />
      <Input
        type="text"
        label="Email *"
        v-model="employee.email"
        class="field"
        :class="{
          error: $v.employee.email.$error,
        }"
        @blur="$v.employee.email.$touch"
      />
      <p v-if="$v.employee.email.$error" class="error-msg">
        Please add a valid and unique email address.
      </p>
      <Input
        type="text"
        label="Role *"
        v-model="employee.role"
        class="field"
        :class="{
          error: $v.employee.role.$error,
        }"
        @blur="$v.employee.role.$touch"
      />
      <Input
        type="text"
        label="Joining year *"
        v-model="employee.year"
        class="field"
        :class="{ error: $v.employee.year.$error }"
        @blur="$v.employee.year.$touch"
      />
      <p v-if="$v.employee.year.$error" class="error-msg">
        The year must be between 2000 and {{ new Date().getFullYear() }}
      </p>
      <div class="field checkbox">
        <input
          type="checkbox"
          v-model="employee.reviewerRight"
          id="adminRight"
          value="adminRight"
        />
        <label for="adminRight">Check if the employee is an admin.</label>
      </div>
      <div class="field checkbox">
        <input
          type="checkbox"
          v-model="employee.active"
          id="active"
          value="active"
          checked
        />
        <label for="active"
          >Check if the employee is currently active (appears in the
          list).</label
        >
      </div>
      <!--<div class="field textarea">
        <label>Technical review</label>
        <textarea rows="10">
              Your review
          </textarea
        >
      </div>-->
      <p v-if="$v.$anyError" class="error-msg">
        Please fill all the required field(s)
      </p>
      <p v-if="this.responseError.display" class="error-msg">
        {{ this.responseError.text }}
      </p>
      <input
        :disabled="$v.$anyError"
        class="btn submit"
        type="submit"
        :value="this.formTitle"
      />
    </form>
    <p v-if="this.responseSuccess.display" class="success-msg">
      {{ this.responseSuccess.text }}
    </p>
  </div>
</template>

<script>
import store from "@/store";
import { required, email, between } from "vuelidate/lib/validators";
import Avatar from "@/components/employee/Avatar.vue";
import Input from "@/components/form/Input.vue";
import Select from "@/components/form/Select.vue";

export default {
  name: "EditEmployee",
  components: {
    Avatar,
    Input,
    Select,
  },
  props: {
    modify: {
      type: Boolean,
      default: false,
    },
    modifyEmployee: {
      type: Object,
    },
  },
  data() {
    return {
      employee: this.employeeObj(),
      responseError: {
        display: false,
        text: "",
        type: "",
      },
      responseSuccess: {
        display: false,
        text: "",
      },
    };
  },
  validations: {
    employee: {
      firstName: { required },
      lastName: { required },
      role: { required },
      email: { required, email },
      year: { required, between: between(2000, new Date().getFullYear()) },
    },
  },
  computed: {
    formTitle() {
      return this.modify ? "Modify employee" : "Add new employee";
    },
  },
  methods: {
    employeeObj() {
      const modify = this.modify && this.modifyEmployee;
      return {
        firstName: modify ? this.modifyEmployee.firstName : "",
        lastName: modify ? this.modifyEmployee.lastName : "",
        role: modify ? this.modifyEmployee.role : "",
        email: modify ? this.modifyEmployee.email : "",
        year: modify ? this.modifyEmployee.year : "",
        active: modify ? this.modifyEmployee.active : true,
        reviewerRight: modify ? this.modifyEmployee.reviewerRight : false,
      };
    },
    editEmployee() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        // Modify Employee
        if (this.modify) {
          const id = this.modifyEmployee._id;
          const employee = this.employee;

          store
            .dispatch("employees/update", { id, employee })
            .then((data) => {
              this.$emit("update-success", "The employee has been modified!");
            })
            .catch((error) => {
              this.displayResponseError(error);
            });
        }
        // Add new Employee
        else {
          store
            .dispatch("employees/addNew", this.employee)
            .then((data) => {
              this.displayResponseSuccess(data.message);
              window.setTimeout(() => {
                this.$router.push({
                  name: "employee-profile",
                  params: {
                    id: data.objId,
                  },
                });
              }, 2000);
            })
            .catch((error) => {
              this.displayResponseError(error);
            });
        }
      }
    },
    displayResponseError(message) {
      if (message.type === "email") {
        this.employee.email = "";
      }
      this.responseError = {
        display: true,
        text: message.message,
        type: message.type,
      };
    },
    displayResponseSuccess(message) {
      this.responseSuccess = {
        display: true,
        text: message,
      };
    },
  },
};
</script>
<style lang="scss" scoped>
.h2 {
  color: map_get($colors, secondary);
}
.avatar {
  margin: 1rem auto;
}
.success-msg {
  text-align: center;
  font-size: 1.1rem;
}
</style>
