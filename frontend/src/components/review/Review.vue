<template>
  <div v-if="review" :class="reviewPreview ? 'review-preview' : 'full-review'">
    <Nav v-if="!reviewPreview" />
    <section class="review">
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

        <p class="review-score">
          Score: <span class="score-tag">{{ review.score }}</span>
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

export default {
  name: "Review",
  components: {
    Nav,
    Avatar,
  },
  props: {
    reviewPreview: {
      type: Object,
    },
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
  },
  beforeRouteEnter(to, from, next) {
    console.log("before route enter Review.vue");
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
