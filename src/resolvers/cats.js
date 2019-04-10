export default {
    Query: {
        randomCat: async (parent, args, { dataSources }) => {
            return dataSources.catAPI.getCatImages();
        },
        favorites: async (parent, args, { dataSources }) => {
            return dataSources.catAPI.getFavorites();
        },
    },
};