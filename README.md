# Full Stack Developer Challenge

Challenge original [requirements](https://github.com/Pay-Baymax/FullStackEngineerChallenge)

# Technologies

### Back-end

Server & API

- [MongoDB](https://docs.mongodb.com/) database(cloud)
- [Node.js](https://nodejs.org/en/docs/)
- [Express.js](https://expressjs.com/fr/)
- [Mongoose.js](https://mongoosejs.com/docs/guide.html)

### Front-end

- [Vue.js](https://vuejs.org/) framework (with Vue CLI)
- [Vue](https://router.vuejs.org/) Router
- [Vuex](https://vuex.vuejs.org/) (State management)
- [Axios](https://github.com/axios/axios) (HTTP client)
- [Vuelidate](https://vuelidate.js.org/) (form validation)
- [SASS](https://sass-lang.com/documentation) (SCSS)
- [Normalize.css](https://necolas.github.io/normalize.css/)

Credits:

- SVG illustration: https://undraw.co/
- Font: Noto Sans https://fonts.google.com/specimen/Noto+Sans

# Project setup

Prerequisite: Node.js

```bash
# 1. Clone project
```

### Back-end setup

```bash
# 2.1 Go to the ./backend/ folder

# 2.2 Install dependencies
npm install

# 2.3 Start the server (http://localhost:3000/)
node server
```

### Front-end setup

```bash
# 3.1 Go to the ./frontend/ folder
# 3.2 Install dependencies
npm install
# 3.3 Serve (http://localhost:8080/)
npm run serve
```

Navigate to http://localhost:8080/

# Structure & Design

## Models

Model are represented width mongoose Schemas in _./backend/models/_

##### Employee model

- Employee Name, role and joining year
- `active` field can be used for deleted employee to store them (not implemented)
- `email` can be used for password authentification with another password field (not implementeted)
- `assignments` array for storing the assigned Review (id) waiting for a feeback
- Virtual property `reviews` (non-persistant). Employee's Reviews populated with queries

##### Review model

- `employee` : id of reviewed Employee
- `reviewer` : id of reviewer Employee
- Review content, score (1 to 5) and aditional information
- Virtual property `feedbacks` (non-persistant). Review's Feedback populated with queries

##### Feedback model

- `review` : id of the Review
- `author` : id of Employee who added the feedback
- Content and date

## API

The routes are in _./backend/routes/index.js_

#### Employees

(CRUD)
endpoint: http://localhost:3000/api/employees

- **Create one employee:** POST _api/employees_
- **Read all employees:** GET _api/employees_
- **Read one employee:** GET _api/employees:id_
- **Update one employee:** PUT _api/employees:id_
- **Delete one employee:** DELETE _api/employees:id_
-

A special query is used by linking documents accross collections at _/employees/profile/:id_. Populates the `reviews` virtual property with the corresponding assigned Reviews and for each the reviewer Employee. And `assignements` field (array of ids) with the corresponding Review object including the reviewee Employee.

It is used mainly for the Employee profile page.

#### Reviews

(CRUD)
endpoint: http://localhost:3000/api/reviews

- **Create one review:** POST _api/reviews_
- **Read all reviews:** GET _api/reviews_
- **Read one review:** GET _api/reviews:id_
- **Update one review:** PUT _api/reviews:id_
- **Delete one review:** DELETE _api/reviews:id_

A special query is used by linking documents accross collections at _/reviews/view/:id_. Populates the `employee` and `reviewer` fields (id) with the corresponding Employee object and `feedbacks` virtual property with the Review's Feedbacks including the Feedback author Employee.

It is used mainly for the Review view page.

#### Feedbacks

(CRUD)
endpoint: http://localhost:3000/api/feedbacks

- **Create one feedback:** POST _api/feedbacks_
- **Read all feedbacks:** GET _api/feedbacks_
- **Read one feedbacks:** GET _api/feedbacks:id_
- **Update one feedback:** PUT _api/feedbacks:id_
- **Delete one feedback:** DELETE _api/feedbacks:id_

# Front-end App

The Front-end app is based on Vue.js components and Router.

## Connection, Admin and User

There are two modes Admin and User.
There is no user authentification (not implemented).
Instead there is a **choice between 2 users for testing the 2 views** (Admin and User) that are automatically connected (as the current user). The LocalStorage is used to check if the user is logged in (in _/frontend/src/router/_). The logged out button reset the current user.

## Client Router

The routing in the client is managed by Vue Router in ./frontend/src/router/index.js

- _'/'_: root (can be the authentification page)
- _/employees_: display the **employees list**. Used by the Admin view and the User view.
- _/employees/profile:id_: display the **employee profile**. Used by the Admin view and the User view.
- _/reviews/:id_: display the **review page**. Used by the Admin view and the User view.
- _/Dashboard_: display **the current user profile** page. Use by the User view
- _/reviews/_:id/new-feedback: Add a new Feedback for the Review. Used by the User view only
- _/admin_: Admin homepage (not very useful yet)
- _/admin/employees/add_: Add a new employee (Admin only)
- _/admin/employees/:employeeid/new-review_: Add or Modify a Review (Admin only)
- All other routes are 404

## State

Vuex is used to manage the state in _./frontend/src/store/_.
The state is separated into 3 modules (employees, reviews, feedbacks). Each one triggers the API calls for its own model. The general _index.js_ file handles the user connection and switching between Admin and User mode.

## API calls

The API calls are made with Axios in _./frontend/src/services/api.js_. The call are made by the State actions. Once the data is fetched, the actions commit a mutation to mutate the state.

## Components

The components are located in _./frontend/src/views/_ and _./frontend/src/components/_.

The main components are:

#### Employee profile (EmployeeProfile.vue)

**Admin and User view**

- Display the Employee information
- Display the Employee's Review (last review and review list)
- Display the Employee's assigned Review (own profile only)
- Navigates to the reviews's full view

**Admin view**

- Edit the employee
- Delete the employee
- Add a new review
- Assign a review feedback to the Employee

* Display the Employee's assigned Review

The component can display the employee:

- with route parameter
- or current employee (_/'dashboard'_)

#### Review (Review.vue)

**Admin and User view**

- Display the Review content
- Display the Review's Feedbacks
- Add a feedback (if the connected User is assigned this Reviews)
-

**Admin view**

- Modify a review (if the connected User is the reviewer)
- Add a new review
- Assign the review to an Employee for feedback

The component is used:

- as the Last Review preview in the Employee Profile (passed a prop). All the options are not available.
- as the full page Review with route param

#### Forms

_EditReview.vue_ and _EditEmployee.vue_ are used for adding (with route) or modifying (called by a parent component).
_AddFeedback.vue_ is used only for adding (modifying feedback not implemented).

# Assumptions

- The employee (User) can add a feedback to only an assigned review.
- The employee (User) can see other employees profile and reviews.
- The feedback is not anonymous.
- Feedback can be added only by a User not by an Admin.
- A Feedback is linked to one review, it appears only in its Review page (Improvement: given feedbacks history in the Employee profile)
- A user (admin) cannot delete oneself
- Admin user cannot give feedback

# Not implemented / Improvements

- User authentification (token or password)
- Deleting/Modifying feedback
- Deleting Review
- More error handling and form validation
- Prevent assigning a review for feedback to the reviewee (currently can give a feedback to oneself)
- Search reviews, employees
- Handle employee deletion (what to do with the former feedbacks and reviews)
- ...
