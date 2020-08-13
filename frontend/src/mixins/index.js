export default {
    methods: {
        getFullName(obj) {
            return obj.firstName + ' ' + obj.lastName;
        },
        formatDate(dateStr) {
            return new Date(dateStr).toLocaleDateString()
        },
        isAdmin(_store) {
            return _store.state.admin
        },
        isOwnProfile(_store, id) {
            return id === _store.state.user;
        }
    }
};