<template>
  <div>
    <h2 class="h2">{{ this.formTitle }}</h2>
    <p v-if="!this.modify" class="review-employee">
      Employee: <Avatar />{{ getFullName(this.employee) }}
    </p>
    <form
      v-if="!this.responseSuccess.display"
      @submit.prevent="editReview"
      class="form"
    >
      <Input
        type="text"
        label="Review period *"
        v-model="review.reviewPeriod"
        class="field"
        :class="{ error: $v.review.title.$error }"
        @blur="$v.review.reviewPeriod.$touch"
      />
      <Input
        type="text"
        label="Title *"
        v-model="review.title"
        class="field"
        :class="{ error: $v.review.title.$error }"
        @blur="$v.review.title.$touch"
      />
      <div class="field textarea">
        <label>Technical Review</label>
        <textarea v-model="review.technicalReview"></textarea>
      </div>
      <div
        class="field textarea"
        :class="{ error: $v.review.generalReview.$error }"
      >
        <label>General Review *</label>
        <textarea
          v-model="review.generalReview"
          @blur="$v.review.generalReview.$touch"
        ></textarea>
      </div>
      <Select
        label="Overall Score (from 1 to 5)"
        :options="[1, 2, 3, 4, 5]"
        :class="{ error: $v.review.score.$error }"
        class="field"
        v-model="review.score"
      />

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
import { required } from "vuelidate/lib/validators";
import mixins from "@/mixins/index.js";
import Input from "@/components/form/Input.vue";
import Select from "@/components/form/Select.vue";
import Avatar from "@/components/employee/Avatar.vue";

export default {
  name: "EditReview",
  components: {
    Input,
    Select,
    Avatar,
  },
  props: {
    modify: {
      type: Boolean,
      default: false,
    },
    modifyReview: {
      type: Object,
    },
  },
  data() {
    return {
      review: this.reviewObj(),
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
    review: {
      reviewPeriod: { required },
      title: { required },
      generalReview: { required },
      score: { required },
    },
  },
  computed: {
    employee() {
      return store.state.employees.currentEmployee;
    },
    reviewerId() {
      return store.state.userId;
    },
    formTitle() {
      return this.modify ? "Modify review" : "Add new review";
    },
  },
  methods: {
    reviewObj() {
      const modify = this.modify && this.modifyReview;
      return {
        employee: modify ? this.modifyReview.employee : "",
        reviewer: modify ? this.modifyReview.reviewer : "",
        date: modify ? this.modifyReview.date : new Date(),
        reviewPeriod: modify ? this.modifyReview.reviewPeriod : "",
        title: modify ? this.modifyReview.title : "",
        technicalReview: modify ? this.modifyReview.technicalReview : "",
        generalReview: modify ? this.modifyReview.generalReview : "",
        score: modify ? this.modifyReview.score : "",
      };
    },
    editReview() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        // Modify Employee
        if (this.modify) {
          const id = this.modifyReview._id;
          const review = this.review;
          store
            .dispatch("reviews/update", { id, review })
            .then((data) => {
              this.$emit("update-success", "The review has been modified!");
            })
            .catch((error) => {
              this.displayResponseError(error);
            });
        }
        // Add new Employee
        else {
          // Set employee id
          this.review.employee = this.employee._id;
          // Set reviewer id
          this.review.reviewer = this.reviewerId;
          store
            .dispatch("reviews/addNew", this.review)
            .then((data) => {
              this.displayResponseSuccess(data.message);
              window.setTimeout(() => {
                this.$router.push({
                  name: "review-view",
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
  beforeRouteEnter(to, from, next) {
    const id = to.params.employeeId;
    store
      .dispatch("employees/fetchById", id)
      .then((data) => {
        if (data) {
          next();
        } else next("/404");
      })
      .catch((error) => {
        console.log(error);
      });
  },
  mixins: [mixins],
};
</script>
<style lang="scss" scoped>
.review-employee {
  .avatar {
    max-width: 30px;
    display: inline-block;
    vertical-align: text-bottom;
    margin: 0 0.5rem;
  }
}

.h2 {
  color: map_get($colors, secondary);
}

.success-msg {
  text-align: center;
  font-size: 1.1rem;
}
</style>
