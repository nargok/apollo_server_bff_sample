import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import { users } from './mockData';
import {RESTDataSource} from "apollo-datasource-rest";

// schemaをimport
import schema from './schema';

// appに向かっていろいろ設定する
const app = express();


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
const resolvers = {
    Query: {
        me: () => {
            return {
                username: '百獣魔団長クロコダイン'
            };
        },
        users: () => {
            return users;
        },
        randomDog: async (parent, args, { dataSources }) => {
            return dataSources.dogAPI.getRandomDog();
        },
        huskyCrazy: async (parent, args, { dataSources }) => {
            return dataSources.dogAPI.getAllHusky();
        }
    },

    Mutation: {
        // 画面入力項目は第2引数にする
        createUser: (parent, {username}) => {
            const user = {
                username: username
            };

            // user情報に入力したuser情報を追加する
            users.push(user);

            return user;
        }
    }
};

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
