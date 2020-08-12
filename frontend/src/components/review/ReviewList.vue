<template>
  
    <ul class="table-list">
      <ReviewListItem
        v-for="(review, index) in reviewList"
        :key="index"
        class="table-list-item"
        :review="review"
      />
    </ul>
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
