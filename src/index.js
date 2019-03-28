import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

import { users } from './mockData';

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
})

// Middleware設定をする graphqlをエンドポイントに付与する
server.applyMiddleware({ app, path: '/graphql' });

// サーバー起動の設定をする
app.listen({ port: 8080 }, () => {
   console.log('Apollo Server on http://localhost:8080/graphql');
});
