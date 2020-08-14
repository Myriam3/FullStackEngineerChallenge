<template>
  <div>
    <form @submit.prevent="assignReview" class="form">
      <!-- Employee select -->
      <div
        class="field select"
        :class="{ error: $v.assignment.assigneeId.$error }"
      >
        <label>Select the employee who should give a feedback</label>
        <select v-model="assignment.assigneeId">
          <template v-if="this.passedAssignee">
            <option :value="this.passedAssignee._id" selected
              >{{ getFullName(this.passedAssignee) }} -
              {{ this.passedAssignee.role }}</option
            >
          </template>
          <template v-else>
            <option
              v-for="(employee, index) in this.employees"
              :key="index"
              :value="employee._id"
            >
              {{ getFullName(employee) }} - {{ employee.role }}
            </option>
          </template>
        </select>
      </div>
      <!-- Review select -->
      <div
        class="field select"
        :class="{ error: $v.assignment.reviewId.$error }"
      >
        <label>Select the review</label>
        <select v-model="assignment.reviewId">
          <template v-if="this.passedReview">
            <option :value="this.passedReview._id" selected
              >{{ this.passedReview.title }} -
              {{ formatDate(this.passedReview.date) }}</option
            >
          </template>
          <template v-else>
            <option
              v-for="(review, index) in this.reviews"
              :key="index"
              :value="review._id"
            >
              {{ review.title }} - {{ formatDate(review.date) }}
            </option>
          </template>
        </select>
      </div>
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
        value="Assign review feedback to this employee"
      />
    </form>
  </div>
</template>
<script>
import store from "@/store";
import { required } from "vuelidate/lib/validators";
import mixins from "@/mixins/index.js";
import Select from "@/components/form/Select.vue";

export default {
  name: "AssignFeedack",
  components: {
    Select,
  },
  props: {
    passedReview: {
      type: Object,
    },
    passedAssignee: {
      type: Object,
    },
  },
  data() {
    return {
      assignment: {
        assigneeId: "",
        reviewId: "",
      },
      responseError: {
        display: false,
        text: "",
      },
    };
  },
  validations: {
    assignment: {
      assigneeId: { required },
      reviewId: { required },
    },
  },
  computed: {
    reviews() {
      return store.state.reviews.reviews;
    },
    employees() {
      return store.state.employees.employees;
    },
  },
  methods: {
    assignReview() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        store
          .dispatch("employees/addAssignment", {
            employeeId: this.assignment.assigneeId,
            reviewId: this.assignment.reviewId,
          })
          .then((data) => {
            if (data && data.error) {
              this.displayResponseError(data.message);
            } else {
              this.$emit(
                "update-success",
                "The review has been assigned to this employee!"
              );
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    displayResponseError(message) {
      this.responseError = {
        display: true,
        text: message,
      };
      window.setTimeout(() => {
        this.responseError = {
          display: false,
          text: "",
        };
      }, 2000);
    },
  },
  created() {
    if (!this.passedAssignee) {
      store
        .dispatch("employees/fetchAll")
        .then(() => {})
        .catch((error) => {
          console.log("error", error);
        });
    }
    if (!this.passedReview) {
      store
        .dispatch("reviews/fetchAll")
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
    }
  },
  mixins: [mixins],
};
</script>
