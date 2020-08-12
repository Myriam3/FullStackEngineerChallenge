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
                console.log('fetch profile', response.data);
                commit('SET_CURRENT_EMPLOYEE', response.data);
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    }
}