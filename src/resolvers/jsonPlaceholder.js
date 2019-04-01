export default  {
  Mutation: {
    createJsonUser: (parent, {name, age}, { dataSources }) => {
      return dataSources.jsonPlaceholderAPI.postName(name, age);
    }
  }
}