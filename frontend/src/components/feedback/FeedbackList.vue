<template>
  <ul class="table-list">
    <li
      v-for="(feedback, index) in feedbackList"
      :key="index"
      class="table-list-item"
    >
      <div class="col feedback-author">
        <Avatar /> {{ getFullName(feedback.author) }} -
        {{ feedback.author.role }}
      </div>
      <div class="col feedback-date date-tag">
        {{ formatDate(feedback.date) }}
      </div>
      <div class="col col-3 feedback-content">
        {{ feedback.comment }}
      </div>
    </li>
  </ul>
</template>

<script>
import Avatar from "@/components/employee/Avatar.vue";
import mixins from "@/mixins/index.js";

export default {
  name: "FeedbackList",
  components: {
    Avatar,
  },
  props: {
    feedbackList: {
      type: Array,
      required: true,
    },
  },
  mixins: [mixins],
};
</script>
<style lang="scss" scoped>
.avatar {
  max-width: 30px;
  display: inline-block;
  margin: 0 0.5rem;
  vertical-align: text-bottom;
}
.feedback-content {
  font-size: 0.9rem;
  font-weight: 300;
  text-align: justify;
  &::before,
  &::after {
    content: '"';
    display: inline-block;
    color: map_get($colors, secondary);
    font-weight: bold;
    font-size: 1.3rem;
  }
}
</style>
