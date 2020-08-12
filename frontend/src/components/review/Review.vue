<template>
  <div v-if="review" :class="reviewPreview ? 'review-preview' : 'full-review'">
    <Nav v-if="!reviewPreview" />
    <section class="review">
      <p v-if="reviewPreview" class="review-title">
        <router-link
          :to="{
            name: 'review-view',
            params: { id: review._id },
            props: true,
          }"
        >
          {{ review.title }}
        </router-link>
      </p>
      <h2 v-else class="review-title">{{ review.title }}</h2>
      <div class="review-info">
        <p v-if="!reviewPreview" class="review-employee">
          Employee: {{ review.employee.firstName }}
          {{ review.reviewer.lastName }}
          - {{ review.employee.role }}
        </p>

        <p class="review-reviewer">
          Reviewer: {{ review.reviewer.firstName }}
          {{ review.reviewer.lastName }}
          - {{ review.reviewer.role }}
        </p>

        <p class="review-period">Period: {{ review.reviewPeriod }}</p>
        <p class="review-date">Date: {{ review.date }}</p>

        <p v-if="reviewPreview">
          <router-link
            :to="{
              name: 'review-view',
              params: { id: review._id },
              props: true,
            }"
          >
            See Details
          </router-link>
        </p>

        <p v-if="!reviewPreview">
          <a href="#" />{{ review.feedbacks.length }} feedback(s)
        </p>
      </div>
      <div class="review-content">
        <p class="review-score">Score: {{ review.score }}</p>
        <div class="technical-review" v-if="review.technicalReview">
          <h3>Technical Review</h3>
          {{ review.technicalReview }}
        </div>
        <div class="general-review">
          <h3>General Review</h3>
          {{ review.generalReview }}
        </div>
      </div>
    </section>
    <section v-if="!reviewPreview" class="review-feedbacks">
      <h2 id="feedbacks">Feedbacks</h2>
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
import Nav from "@/components/Nav.vue";

export default {
  name: "Review",
  components: {
    Nav,
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
};
</script>
<style lang="scss"></style>
