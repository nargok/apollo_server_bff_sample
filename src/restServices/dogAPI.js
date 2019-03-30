import {RESTDataSource} from "apollo-datasource-rest";

class DogAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://dog.ceo/api/";
  }

  async getRandomDog() {
    const res = await this.get("breeds/image/random");
    return {
      image: res.message,
      status: res.status
    }
  }

  async getAllHusky() {
    const res = await this.get('breed/husky/images');
    return {
      images: res.message,
      status: res.status
    }
  }
}

export default DogAPI;