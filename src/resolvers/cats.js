export default {
    Query: {
        randomCat: async (parent, args, { dataSources }) => {
            return dataSources.catAPI.getCatImages();
        },
        favorites: async (parent, args, { dataSources }) => {
            return dataSources.catAPI.getFavorites();
        },
    },
    Mutation: {
        saveFavorites: async (parent, { image_id, sub_id }, { dataSources }) => {
            return dataSources.catAPI.saveFavorites(image_id, sub_id);
        },
    }
};