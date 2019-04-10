import {RESTDataSource} from "apollo-datasource-rest";

class CatAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = "https://api.thecatapi.com/v1/";
    }

    willSendRequest(request) {
        request.headers.set('x-api-key', this.context.catApikey);
    }

    async getCatImages() {
        const res = await this.get("images/search");
        const item = res[0];
        return {
            id: item.id,
            image: item.url
        }
    }

    async getFavorites() {
        const res = await this.get("favourites");
        console.log(res);
        const edges = []
        res.map(item =>
            edges.push({id: item.image_id, image: item.image.url })
        );
        return {
            edges
        }
    }
}

export default CatAPI;