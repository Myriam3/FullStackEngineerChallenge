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
    getEmployeeProfile(id) {
        console.log('api call', id);
        return api.get('/employees/profile/' + id)
    },

    // Reviews
    getReviews() {
        return api.get('/reviews')
    },
    getFullReview(id) {
        console.log('api call', id);
        return api.get('/reviews/view/' + id)
    }
}