import {RESTDataSource} from "apollo-datasource-rest";

class CatAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = "https://api.thecatapi.com/v1/";
    }

    willSendRequest(request) {
        request.headers.set('x-api-key', this.context.catApikey);
    }

    // willSendRequest(request) {
    //     console.log(this.context.catApikey);
    //     request.headers.set('Authorization', this.context.catApikey);
    //     // request.headers.set('x-api-key', this.context.catApikey);
    // }

    async getCatImages() {
        const res = await this.get("images/search");
        const item = res[0];
        return {
            id: item.id,
            image: item.url
        }
    }
}

export default CatAPI;