<template>
  <div>
    <h3 class="title">Add feeback</h3>
    <form @submit.prevent="addFeedback" class="form">
      <div
        class="field textarea"
        :class="{ error: $v.feedback.comment.$error }"
      >
        <label>Comment *</label>
        <textarea
          v-model="feedback.comment"
          @blur="$v.feedback.comment.$touch"
        ></textarea>
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
        value="Add feedback"
      />
    </form>
  </div>
</template>

<script>
import store from "@/store";
import { required } from "vuelidate/lib/validators";
import mixins from "@/mixins/index.js";
import Input from "@/components/form/Input.vue";
import Avatar from "@/components/employee/Avatar.vue";

export default {
  name: "AddReview",
  components: {
    Input,
    Avatar,
  },
  data() {
    return {
      feedback: this.feedbackObj(),
      responseError: {
        display: false,
        text: "",
        type: "",
      },
    };
  },
  validations: {
    feedback: {
      comment: { required },
    },
  },
  computed: {
    userId() {
      return store.state.userId;
    },
    reviewId() {
      return store.state.reviews.currentReview._id;
    },
  },
  methods: {
    feedbackObj() {
      return {
        review: "",
        author: "",
        date: new Date(),
        comment: "",
      };
    },
    addFeedback() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        // Set review id
        this.feedback.review = this.reviewId;
        // Set author id
        this.feedback.author = this.userId;
        store
          //Add new feedback
          .dispatch("feedbacks/addNew", this.feedback)
          .then((data) => {
            store
              // Delete assignment
              .dispatch("employees/removeAssignment", {
                employee: store.state.user,
                reviewId: this.reviewId,
              })
              .then(() => {})
              .catch((error) => {
                this.displayResponseError(error);
              });
            // Sucess message
            this.$emit("update-success", "Feedback added!");
            // Update the current review;
            store.dispatch("reviews/fetchById", this.reviewId);
          })
          .catch((error) => {
            this.displayResponseError(error);
          });
      }
    },
    displayResponseError(message) {
      this.responseError = {
        display: true,
        text: message.message,
        type: message.type,
      };
    },
  },
  mixins: [mixins],
};
</script>
<style lang="scss" scoped>
.title {
  text-align: center;
  color: map_get($colors, secondary);
}
</style>
