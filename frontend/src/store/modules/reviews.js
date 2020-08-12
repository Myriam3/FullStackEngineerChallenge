import api from "@/services/api.js";

export const namespaced = true;

export const state = {
    reviews: [],
    currentReview: null
};

export const mutations = {
    SET_REVIEWS(state, reviews) {
        state.reviews = reviews;
    },
    SET_CURRENT_REVIEW(state, reviews) {
        state.currentReview = reviews;
    }
};

export const actions = {
    fetchAll({
        commit
    }) {
        return api
            .getReviews()
            .then((response) => {
                commit('SET_REVIEWS', response.data);
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
            .getFullReview(id)
            .then((response) => {
                console.log('fetch full review', response.data);
                commit('SET_CURRENT_REVIEW', response.data);
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    }
}