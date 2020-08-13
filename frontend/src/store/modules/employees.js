import api from "@/services/api.js";

function handleEmailError() {

}

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
        return api
            .deleteEmployee(id)
            .then((response) => {
                console.log('success', response.data)
                commit('CLEAR_CURRENT_EMPLOYEE');
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    }
}