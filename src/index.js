import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

import { users } from './mockData';
import {RESTDataSource} from "apollo-datasource-rest";

// appに向かっていろいろ設定する
const app = express();

// schemaをつくる
const schema = gql`
  type Query {
    """
    ログイン中のユーザ情報を返す
    """
    me: User,

    """
    ユーザの一覧を返す
    """
    users: [User],
    
    """
    ランダムな犬の画像を返す
    """
    randomDog: Dog
  }
  
  type Mutation {
    """
    ユーザを追加する
    """
    createUser(username: String!): User
  }

  type User {
    username: String!
  }
  
  type Dog {
    image: String
    status: String!
  }
`;

// REST APIとの通信設定をする
class DogAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = "https://dog.ceo/api/";
    }

    // async getRandomDog() {
    //     return await this.get("breeds/image/random");
    // }
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
        randomDog: (parent, args, { dataSources }) => {
            const dog = { image: 'image', status: 'OK' };
            console.log('helo')
            return dog
            // return dataSources.DogAPI.getRandomDog();
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
