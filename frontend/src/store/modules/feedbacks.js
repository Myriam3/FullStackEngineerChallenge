import api from "@/services/api.js";
export const namespaced = true;

export const state = {

};

export const mutations = {

};

export const actions = {
    addNew({
    }, feedback) {
        return api
            .addNewFeedback(feedback)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error)
            });
    }
}