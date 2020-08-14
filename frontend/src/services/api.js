import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    timeout: 10000
})

export default {
    // Employees
    getEmployees() {
        return api.get('/employees')
    },
    getEmployee(id) {
        return api.get('/employees/' + id)
    },
    getEmployeeProfile(id) {
        return api.get('/employees/profile/' + id)
    },
    addNewEmployee(employee) {
        return api.post('/employees', employee)
    },
    updateEmployee(id, employee) {
        return api.put('/employees/' + id, employee)
    },
    deleteEmployee(id) {
        return api.delete('/employees/' + id)
    },

    // Reviews
    getReviews() {
        return api.get('/reviews')
    },
    getFullReview(id) {
        return api.get('/reviews/view/' + id)
    },
    addNewReview(review) {
        return api.post('/reviews', review)
    },
    updateReview(id, review) {
        return api.put('/reviews/' + id, review)
    },
    deleteReview(id) {
        return api.delete('/reviews/' + id)
    },

    // Feedbacks
    addNewFeedback(feedback) {
        return api.post('/feedbacks', feedback)
    }
}