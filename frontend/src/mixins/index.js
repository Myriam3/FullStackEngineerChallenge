export default {
    methods: {
        getFullName(obj) {
            return obj.firstName + ' ' + obj.lastName;
        },
        formatDate(dateStr) {
            return new Date(dateStr).toLocaleDateString()
        },
        isAdmin(_store) {
            console.log(_store.state.admin, 'isAdmin');
            return _store.state.admin
        },
        isOwnProfile(_store, id) {
            console.log(_store.state.user, id);
            return id === _store.state.user;
        }
    }
};