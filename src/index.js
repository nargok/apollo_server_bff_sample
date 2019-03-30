import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import {RESTDataSource} from "apollo-datasource-rest";

// schemaをimport
import schema from './schema';
import resolvers from './resolvers';

// appに向かっていろいろ設定する
const app = express();

// schemaをつくる


// REST APIとの通信設定をする
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

// resolverをつくる こっちはObject


// ApolloServerの設定をする
const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    tracing: true,
    dataSources: () => ({
        dogAPI: new DogAPI()
    })
});

// Middleware設定をする graphqlをエンドポイントに付与する
server.applyMiddleware({ app, path: '/graphql' });

// サーバー起動の設定をする
app.listen({ port: 8080 }, () => {
   console.log('Apollo Server on http://localhost:8080/graphql');
});
