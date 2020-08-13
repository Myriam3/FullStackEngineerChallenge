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
          Employee: <Avatar /> {{ getFullName(review.employee) }} -
          {{ review.employee.role }}
        </p>

        <p class="review-period">
          {{ review.reviewPeriod }}
        </p>
        <p class="review-date">
          <span class="date-tag">Date: {{ formatDate(review.date) }}</span>
        </p>
        <p class="review-reviewer">
          Reviewer: <Avatar /> {{ getFullName(review.reviewer) }} -
          {{ review.reviewer.role }}
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
          <a href="#" class="link">{{ review.feedbacks.length }} feedback(s)</a>
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
    <div
      v-if="isAdmin($store) && !reviewPreview && this.isReviewer"
      class="modify-review"
    >
      <p v-if="this.success" class="success-msg">{{ this.success }}</p>
      <button
        v-if="!this.modifyMode"
        class="btn secondary modify-btn"
        @click="switchModifyMode"
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

    <section v-if="!reviewPreview" class="feedbacks">
      <h2 class="h2" id="feedbacks">Feedbacks</h2>
      <template v-if="review.feedbacks.length">
        Feedbacks: {{ review.feedbacks }}
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

export default {
  name: "Review",
  components: {
    Nav,
    Avatar,
    EditReview,
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
      return this.review.reviewer._id === store.state.user;
    },
  },
  methods: {
    switchModifyMode() {
      if (this.isAdmin(store)) this.modifyMode = !this.modifyMode;
    },
    handleModification(message) {
      this.switchModifyMode();
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
</style>
