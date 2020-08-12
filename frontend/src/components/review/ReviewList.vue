<template>
  <section>
    <ul class="table-list">
      <li
        class="table-list-item"
        v-for="(review, index) in reviewList"
        :key="index"
      >
        <ReviewListItem :review="review" />
      </li>
    </ul>
  </section>
</template>

<script>
import ReviewListItem from "@/components/review/ReviewListItem.vue";

export default {
  name: "ReviewList",
  components: {
    ReviewListItem,
  },
  props: {
    reviewList: {
      type: Array,
      required: true,
    },
  },
};
</script>
<style lang="scss"></style>
