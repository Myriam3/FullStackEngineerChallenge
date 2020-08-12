<template>
  <div v-if="employee">
    <Nav />
    <!-- Employee card -->
    <section>
      <EmployeeCard :employee="employee" />
    </section>
    <!-- Employee's reviews -->
    <section>
      <h2 class="h2">
        Reviews
      </h2>
      <template v-if="this.employee.reviews.length">
        <div class="last-reviews">
          <h3 class="h3">Last review</h3>
          <Review :reviewPreview="lastReview" />
        </div>
        <div v-if="this.employee.reviews.length > 1" class="review-history">
          <section>
            <h3 class="h3">Review History</h3>
            <ReviewList :reviewList="this.employee.reviews" />
          </section>
        </div>
      </template>
      <p v-else>The employee has no review.</p>
    </section>
    <section v-if="isAdmin($store) || isOwnProfile($store, employee._id)">
      <h2 class="h2">Assignments</h2>
      <template v-if="employee.assignments.length">
        <ReviewList :reviewList="this.employee.assignments" />
      </template>
      <p v-else>
        The employee has no feedback assignment.
      </p>
    </section>
  </div>
</template>
<script>
import store from "@/store";
import mixins from "@/mixins/index.js";
import Nav from "@/components/Nav.vue";
import EmployeeCard from "@/components/employee/EmployeeCard.vue";
import Review from "@/components/review/Review.vue";
import ReviewList from "@/components/review/ReviewList.vue";

export default {
  name: "EmployeeProfile",
  components: {
    Nav,
    EmployeeCard,
    Review,
    ReviewList,
  },
  computed: {
    employee() {
      return store.state.employees.currentEmployee;
    },
    lastReview() {
      return this.employee.reviews[this.employee.reviews.length - 1];
    },
  },
  beforeRouteEnter(to, from, next) {
    let id = "";
    if (to.params.id) id = to.params.id;
    else id = store.state.user; // Display current user

    store
      .dispatch("employees/fetchById", id)
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
