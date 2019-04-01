import { RESTDataSource } from "apollo-datasource-rest";

class JsonPlaceHolderAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://jsonplaceholder.typicode.com/";
  }

  async postName(postName, postAge) {
    const res = await this.post("posts", {
      name: postName,
      age: postAge
    });
    return {
      id: res.id,
      name: res.name,
      age: res.age
    }
  }
}

export default JsonPlaceHolderAPI;