import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import NotFound from '../components/NotFound'
import Admin from '../views/admin/Admin.vue'
import EditEmployee from '../components/employee/EditEmployee.vue'
import EmployeeList from '../components/employee/EmployeeList.vue'
import EmployeeProfile from '../components/employee/EmployeeProfile.vue'
import Review from '../components/review/Review.vue'
import EditReview from '../components/review/EditReview.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: Home,
  },
  // Employee list
  {
    path: '/employees',
    name: 'employees',
    component: EmployeeList
  },
  // Employee profile
  {
    path: '/employees/profile/:id',
    name: 'employee-profile',
    component: EmployeeProfile
  },
  // Reviews
  {
    path: '/reviews/:id',
    name: 'review-view',
    component: Review
  },
  // User
  {
    path: '/dashboard',
    name: 'my-profile',
    component: EmployeeProfile,
  },
  {
    path: '/reviews/:id/new-feedback',
    name: 'add-feedback',
    component: Home
  },
  // Admin
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    children: [{
        path: 'employees/add',
        name: 'admin-add-employee',
        component: EditEmployee
      },
      {
        path: 'employees/:employeeId/new-review',
        name: 'admin-add-review',
        component: EditReview
      },
      {
        path: 'reviews/:id/assign',
        name: 'admin-assign-review',
        component: Admin
      }
    ]
  },
  // 404
  {
    path: '*',
    name: 'not-found',
    component: NotFound
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // Check if the user is "connected"
  if (to.path !== '/') {
    if (window.localStorage.getItem("connected") === "connected") {
      next()
    } else {
      next({
        path: '/'
      });
    }
  } else {
    next();
  }
})

export default router