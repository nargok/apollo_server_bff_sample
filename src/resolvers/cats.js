export default {
    Query: {
        randomCat: async (parent, args, { dataSources }) => {
            return dataSources.catAPI.getCatImages();
        },
    },
};