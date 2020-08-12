<template>
  <div class="review-item" v-if="review">
    <span class="col period">{{ review.reviewPeriod }}</span>
    <span class="col title">{{ review.title }}</span>
    <span class="col score">{{ review.score }}</span>
    <span class="col date">{{ review.date }}</span>
    <router-link
      :to="{ name: 'review-view', params: { id: review._id }, props: true }"
    >
      See review
    </router-link>
  </div>
</template>
<script>
export default {
  name: "ReviewListItem",
  props: {
    review: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style lang="scss"></style>
