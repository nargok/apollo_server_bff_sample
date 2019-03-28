import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

import { users } from './mockData';

// appに向かっていろいろ設定する
const app = express();

// schemaをつくる
const schema = gql`
  type Query {
    me: User,
    users: [User],
  }
  
  type User {
    username: String!
  }
`;

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
        }
    },
};

// ApolloServerの設定をする
const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
})

// Middleware設定をする graphqlをエンドポイントに付与する
server.applyMiddleware({ app, path: '/graphql' });

// サーバー起動の設定をする
app.listen({ port: 8080 }, () => {
   console.log('Apollo Server on http://localhost:8080/graphql');
});
