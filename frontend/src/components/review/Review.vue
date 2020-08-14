<template>
  <div v-if="review" :class="reviewPreview ? 'review-preview' : 'full-review'">
    <Nav v-if="!reviewPreview" />
    <section class="review card">
      <p v-if="reviewPreview" class="review-title">
        <router-link
          class="link"
          :to="{
            name: 'review-view',
            params: { id: review._id },
            props: true,
          }"
        >
          {{ review.title }}
        </router-link>
      </p>
      <h2 v-else class="review-title h2">{{ review.title }}</h2>
      <div class="review-info">
        <p v-if="!reviewPreview" class="review-employee">
          Employee: <Avatar />
          <span v-if="review.employee"
            >{{ getFullName(review.employee) }} -
            {{ review.employee.role }}
          </span>
          <span v-else>This employee has been deleted.</span>
        </p>

        <p class="review-period">Period: {{ review.reviewPeriod }}</p>
        <p class="review-date">
          <span class="date-tag">Date: {{ formatDate(review.date) }}</span>
        </p>
        <p class="review-reviewer">
          Reviewer: <Avatar />
          <span v-if="review.reviewer"
            >{{ getFullName(review.reviewer) }} -
            {{ review.reviewer.role }}</span
          >
          <span v-else>This employee has been deleted</span>
        </p>

        <p class="review-score">
          Score: <span class="score-tag">{{ review.score }}</span>
        </p>
        <p v-if="reviewPreview">
          <router-link
            class="link"
            :to="{
              name: 'review-view',
              params: { id: review._id },
              props: true,
            }"
          >
            See Details
          </router-link>
        </p>
        <p v-if="!reviewPreview" class="review-feedback-count">
          <span class="stats">{{ review.feedbacks.length }} feedback(s)</span>
        </p>
      </div>
      <div class="review-content">
        <div
          v-if="!reviewPreview && review.technicalReview"
          class="technical-review"
        >
          <h3 class="title">Technical Review</h3>
          {{ review.technicalReview }}
        </div>
        <div class="general-review">
          <h4 class="title" v-if="reviewPreview">General Review</h4>
          <h3 class="title" v-else>General Review</h3>
          {{ review.generalReview }}
        </div>
      </div>
    </section>
    <!-- If the admin user is the reviewer, can modify the review-->
    <div
      v-if="isAdmin($store) && !reviewPreview && this.isReviewer"
      class="modify-review"
    >
      <p v-if="this.success" class="success-msg">{{ this.success }}</p>
      <button
        v-if="!this.modifyMode"
        class="btn secondary modify-btn"
        @click="switchModifyMode"
        aria-label="Modify Review"
      >
        Modify
      </button>
      <EditReview
        v-if="this.modifyMode"
        :modify="true"
        :modifyReview="review"
        @update-success="this.handleModification"
      />
      <button
        v-if="this.modifyMode"
        class="btn link cancel-btn"
        @click="switchModifyMode"
      >
        Cancel
      </button>
    </div>
    <!-- Review feedbacks-->
    <section v-if="!reviewPreview" class="feedbacks">
      <h2 class="h2" id="feedbacks">Feedbacks</h2>
      <!--If the review is assigned to the user, display feedback button-->
      <div
        class="add-feedback"
        v-if="!isAdmin($store) && !reviewPreview && this.isReviewAssigned"
      >
        <p v-if="this.success" class="success-msg">{{ this.success }}</p>
        <button
          v-if="!this.modifyMode"
          class="btn new-btn"
          @click="switchModifyMode"
        >
          New feedback
        </button>
        <AddFeedback
          v-if="this.modifyMode"
          @update-success="this.handleModification"
        />
        <button
          v-if="this.modifyMode"
          class="btn link cancel-btn"
          @click="switchModifyMode"
        >
          Cancel
        </button>
      </div>
      <!--Assign feedback-->
      <div class="assign-feedback" v-if="isAdmin($store)">
        <button
          v-if="!this.assigningReview"
          class="btn new-btn"
          @click="switchModifyMode('assign')"
        >
          Assign feedback
        </button>
        <AssignFeedack
          v-if="this.assigningReview"
          :passedReview="review"
          @update-success="handleAssignment"
        />
        <button
          v-if="this.assigningReview"
          class="btn link cancel-btn"
          @click="switchModifyMode('assign')"
        >
          Cancel
        </button>
      </div>
      <template v-if="review.feedbacks.length">
        <FeedbackList :feedbackList="review.feedbacks" />
      </template>
      <p v-else>
        This review has no feedback.
      </p>
    </section>
  </div>
</template>

<script>
import store from "@/store";
import mixins from "@/mixins/index.js";
import Nav from "@/components/Nav.vue";
import Avatar from "@/components/employee/Avatar.vue";
import EditReview from "@/components/review/EditReview.vue";
import AddFeedback from "@/components/feedback/AddFeedback.vue";
import AssignFeedack from "@/components/feedback/AssignFeedack.vue";
import FeedbackList from "@/components/feedback/FeedbackList.vue";

export default {
  name: "Review",
  components: {
    Nav,
    Avatar,
    EditReview,
    AddFeedback,
    AssignFeedack,
    FeedbackList,
  },
  props: {
    reviewPreview: {
      type: Object,
    },
  },
  data() {
    return {
      modifyMode: false,
      success: false,
      assigningReview: false,
    };
  },
  computed: {
    review() {
      if (this.reviewPreview) {
        // Use review obj passed as a prop
        return this.reviewPreview;
      } else {
        // Use fetched review obj (Full review page)
        return store.state.reviews.currentReview;
      }
    },
    isReviewer() {
      return (
        this.review.reviewer && this.review.reviewer._id === store.state.userId
      );
    },
    isEmployee() {
      return (
        this.review.employee && this.review.employee._id === store.state.userId
      );
    },
    isReviewAssigned() {
      if (store.state.user && store.state.user.assignments) {
        return store.state.user.assignments.find(
          (item) => item._id === this.review._id
        );
      }
    },
  },
  methods: {
    switchModifyMode(option) {
      if (option === "assign") {
        this.assigningReview = !this.assigningReview;
      } else this.modifyMode = !this.modifyMode;
    },
    handleModification(message) {
      this.switchModifyMode();
      this.success = message;
      window.setTimeout(() => {
        this.success = false;
      }, 4000);
    },
    handleAssignment(message) {
      //TODO:refactor
      this.assigningReview = false;
      this.success = message;
      window.setTimeout(() => {
        this.success = false;
      }, 4000);
    },
  },
  beforeRouteEnter(to, from, next) {
    store
      .dispatch("reviews/fetchById", to.params.id)
      .then((data) => {
        if (data) next();
        else next("/404");
      })
      .catch((error) => {
        console.log(error);
      });
  },
  mixins: [mixins],
};
</script>
<style lang="scss">
@import "@/scss/components/review/Review.scss";
.add-feedback,
.assign-feedback {
  .new-btn {
    margin: 1rem auto;
    display: block;
  }
  .cancel-btn {
    margin: 0 auto;
    display: block;
  }
  .success-msg {
    text-align: center;
  }
}
</style>
