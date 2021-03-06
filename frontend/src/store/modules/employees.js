import api from "@/services/api.js";

export const namespaced = true;

export const state = {
    employees: [],
    currentEmployee: null
};

export const mutations = {
    SET_EMPLOYEES(state, employees) {
        state.employees = employees;
    },
    SET_CURRENT_EMPLOYEE(state, employee) {
        state.currentEmployee = employee;
    },
    CLEAR_CURRENT_EMPLOYEE(state) {
        state.currentEmployee = null;
    }
};

export const actions = {
    fetchAll({
        commit
    }) {
        return api
            .getEmployees()
            .then((response) => {
                commit('SET_EMPLOYEES', response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    },
    fetchById({
            commit
        },
        id) {
        return api
            .getEmployeeProfile(id)
            .then((response) => {
                commit('SET_CURRENT_EMPLOYEE', response.data);
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    },
    getById({},
        id) {
        return api
            .getEmployee(id)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    },
    addNew({}, employee) {
        return api
            .addNewEmployee(employee)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                const errorRes = error.response.data.error;
                let message = {
                    message: 'Error: The employee could not be added',
                    type: ''
                }
                if (errorRes.name === 'MongoError' && errorRes.code === 11000 && errorRes.keyValue.email) {
                    message = {
                        message: 'The email must be unique',
                        type: 'email'
                    }
                }
                throw message;
            });
    },
    update({
        dispatch
    }, {
        id,
        employee
    }) {
        return api
            .updateEmployee(id, employee)
            .then((response) => {
                dispatch('fetchById', id);
                return response.data;
            })
            .catch((error) => {
                const errorRes = error.response.data.error;
                let message = {
                    message: 'Error: The employee could not be added',
                    type: ''
                }
                if (errorRes.name === 'MongoError' && errorRes.code === 11000 && errorRes.keyValue.email) {
                    message = {
                        message: 'The email must be unique',
                        type: 'email'
                    }
                }
                throw message;
            });
    },
    delete({
        commit
    }, id) {
        if (id === '5f33569ef693110590d24f4c' || id === '5f2fcaaf5bbb5505145a07b6') return; // These employees are needed for connected (instead of a real authentification)
        return api
            .deleteEmployee(id)
            .then((response) => {
                commit('CLEAR_CURRENT_EMPLOYEE');
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    },
    addAssignment({
        dispatch
    }, {
        employeeId,
        reviewId
    }) {
        return dispatch('getById', employeeId)
            .then((employee) => {
                const alreadyAssigned = employee.assignments.find(review => review === reviewId);
                if (!alreadyAssigned) {
                    employee.assignments.push(reviewId);
                    const id = employee._id;
                    dispatch('update', {
                        id,
                        employee
                    })
                } else {
                    return {
                        error: true,
                        message: 'This review is already assigned to this employee.'
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            });
    },
    removeAssignment({
        dispatch
    }, {
        employee,
        reviewId
    }) {
        employee.assignments = employee.assignments.filter(function (review) {
            return review._id !== reviewId;
        });
        const id = employee._id;
        dispatch('update', {
            id,
            employee
        })
    }
}