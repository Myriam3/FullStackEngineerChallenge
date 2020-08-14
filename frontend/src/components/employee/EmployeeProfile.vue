<template>
  <div v-if="employee">
    <Nav />
    <!-- Employee card -->
    <section>
      <EmployeeCard :employee="employee" />
      <div v-if="isAdmin($store)" class="modify-employee">
        <p v-if="this.success" class="success-msg">{{ this.success }}</p>
        <button
          v-if="!this.modifyMode"
          class="btn secondary modify-btn"
          @click="switchModifyMode"
        >
          Modify
        </button>
        <button
          v-if="!this.modifyMode && !this.isCurrentUser"
          class="btn delete-btn"
          @click="deleteEmployee"
        >
          Delete
        </button>
        <EditEmployee
          v-if="this.modifyMode"
          :modify="true"
          :modifyEmployee="employee"
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
    </section>
    <!-- Employee's reviews -->
    <section v-if="!modifyMode">
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
      <router-link
        v-if="isAdmin($store) && !this.isCurrentUser"
        :to="{
          name: 'admin-add-review',
          params: { employeeId: this.employee._id },
        }"
        class="btn new-btn"
        >New review</router-link
      >
    </section>
    <!--Employee assignments-->
    <section
      v-if="
        !this.modifyMode &&
          (isAdmin($store) || isOwnProfile($store, employee._id))
      "
    >
      <h2 class="h2">Assignments</h2>
      <template v-if="employee.assignments.length">
        <ReviewList :reviewList="this.employee.assignments" />
      </template>
      <p v-else>
        The employee has no feedback assignment.
      </p>
      <!--Assign feedback-->
      <div
        class="assign-feedback"
        v-if="isAdmin($store) && !this.isCurrentUser"
      >
        <p v-if="this.success" class="success-msg">{{ this.success }}</p>
        <button
          v-if="!this.assigningReview"
          class="btn new-btn"
          @click="switchModifyMode('assign')"
        >
          Assign feedback
        </button>
        <AssignFeedack
          v-if="this.assigningReview"
          :passedAssignee="employee"
          @update-success="switchModifyMode('assign')"
        />
        <button
          v-if="this.assigningReview"
          class="btn link cancel-btn"
          @click="switchModifyMode('assign')"
        >
          Cancel
        </button>
      </div>
    </section>
  </div>
</template>
<script>
import store from "@/store";
import mixins from "@/mixins/index.js";
import Nav from "@/components/Nav.vue";
import EmployeeCard from "@/components/employee/EmployeeCard.vue";
import EditEmployee from "@/components/employee/EditEmployee";
import Review from "@/components/review/Review.vue";
import ReviewList from "@/components/review/ReviewList.vue";
import AssignFeedack from "@/components/feedback/AssignFeedack.vue";

export default {
  name: "EmployeeProfile",
  components: {
    Nav,
    EmployeeCard,
    Review,
    ReviewList,
    EditEmployee,
    AssignFeedack,
  },
  data() {
    return {
      modifyMode: false,
      success: false,
      assigningReview: false,
    };
  },
  computed: {
    employee() {
      return store.state.employees.currentEmployee;
    },
    lastReview() {
      return this.employee.reviews[this.employee.reviews.length - 1];
    },
    isCurrentUser() {
      return this.employee._id === store.state.userId;
    },
  },
  methods: {
    switchModifyMode(option) {
      if (option === "assign") {
        this.assigningReview = !this.assigningReview;
      } else this.modifyMode = !this.modifyMode;
    },
    deleteEmployee() {
      if (confirm("Do you really want to delete the employee?")) {
        store
          .dispatch("employees/delete", this.employee._id)
          .then((data) => {
            this.$router.push({
              name: "employees",
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    handleModification(message, option) {
      this.switchModifyMode();
      this.success = message;
      window.setTimeout(() => {
        this.success = false;
      }, 4000);
    },
  },
  beforeRouteEnter(to, from, next) {
    let id = "";
    if (to.params.id) id = to.params.id;
    else id = store.state.userId; // Display current user

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
<style lang="scss" scoped>
.modify-employee {
  position: relative;
  .success-msg {
    text-align: center;
  }
  .modify-btn,
  .delete-btn {
    margin-top: 1rem;
  }
  @media screen and (min-width: map_get($breakpoints, md)) {
    .modify-btn,
    .delete-btn {
      position: absolute;
      bottom: -1rem;
      right: 1rem;
      margin-top: 0;
    }
    .modify-btn {
      right: 8rem;
    }
  }
}

.new-btn {
  margin: 1rem 0;
  display: inline-block;
}
.cancel-btn {
  display: block;
  margin: 0 auto;
}
</style>
