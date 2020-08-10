module.exports = {
    css: {
        loaderOptions: {
            scss: {
                prependData: `@import "@/scss/base/_variables.scss";`,
            },
        },
    },
};