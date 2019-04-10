import express from 'express';
import { ApolloServer } from 'apollo-server-express';

// schema, resolver, restServiceをimport
import schema from './schema';
import resolvers from './resolvers';
import DogAPI from './restServices/dogAPI';
import JsonPlaceHolderAPI from './restServices/jsonPlaceholderAPI';
import CatAPI from "./restServices/catAPI";

// appに向かっていろいろ設定する
const app = express();

// schemaをつくる

// REST APIとの通信設定をする

// resolverをつくる こっちはObject


// ApolloServerの設定をする
const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    tracing: true,
    dataSources: () => ({
        dogAPI: new DogAPI(),
        jsonPlaceholderAPI: new JsonPlaceHolderAPI(),
        catAPI: new CatAPI(),
    })
});

// Middleware設定をする graphqlをエンドポイントに付与する
server.applyMiddleware({ app, path: '/graphql' });

// サーバー起動の設定をする
app.listen({ port: 8080 }, () => {
   console.log('Apollo Server on http://localhost:8080/graphql');
});
