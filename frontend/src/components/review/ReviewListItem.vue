<template>
  <li class="review-item" v-if="review">
    <span class="col period">{{ review.reviewPeriod }}</span>
    <span class="col col-2 title">{{ review.title }}</span>
    <span class="col score"
      ><span class="score-tag">{{ review.score }}</span></span
    >
    <span class="col date"
      ><span class="date-tag">{{ formatDate(review.date) }}</span></span
    >
    <router-link
      class="link"
      :to="{ name: 'review-view', params: { id: review._id }, props: true }"
    >
      See review
    </router-link>
  </li>
</template>
<script>
import mixins from "@/mixins/index.js";

export default {
  name: "ReviewListItem",
  props: {
    review: {
      type: Object,
      required: true,
    },
  },
  mixins: [mixins],
};
</script>
<style lang="scss" scoped>
.review-item {
  .period {
    color: map_get($colors, secondary);
  }
}
</style>
