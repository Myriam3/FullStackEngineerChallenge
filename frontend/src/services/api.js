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
    }
}