export default {
  Query: {
    randomDog: async (parent, args, { dataSources }) => {
      return dataSources.dogAPI.getRandomDog();
    },
    huskyCrazy: async (parent, args, { dataSources }) => {
      return dataSources.dogAPI.getAllHusky();
    }
  },
};