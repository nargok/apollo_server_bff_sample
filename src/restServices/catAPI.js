import {RESTDataSource} from "apollo-datasource-rest";

class CatAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = "https://api.thecatapi.com/v1/";
    }

    async getCatImages() {
        const res = await this.get("images/search");
        const item = res[0];
        console.log(item);
        return {
            id: item.id,
            image: item.url
        }
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

export default CatAPI;