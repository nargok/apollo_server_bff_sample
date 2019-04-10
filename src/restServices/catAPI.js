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
            edges.push({id: item.image_id, image: item.image.url})
        );
        return {
            edges
        }
    }

    async saveFavorites(image_id, sub_id) {
        const res = await this.post("favourites", {
            image_id: image_id,
            sub_id: sub_id
        });
        console.log(res.message);
        if (res.message === 'SUCCESS') {
            return true
        } else {
            return false
        }
    }
}



export default CatAPI;