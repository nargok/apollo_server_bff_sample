import { UserInputError, ApolloError } from 'apollo-server';
import {users} from "../mockData";

export default {
  Query: {
    me: () => {
      return {
        username: '百獣魔団長クロコダイン'
      };
    },
    users: () => {
      return users;
    },
    usersFromExternalService: async (parent, args, { dataSources }) => {
      // TODO エラーハンドリングを入れる
      return dataSources.authAPI.getUserList();
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
    },
    obtainToken: async  (parent, { username, password}, { dataSources }) => {
      try {
        return await dataSources.authAPI.obtainJWTtoken(username, password);
      } catch (e) {
        console.log("status code: " + e.extensions.response.status);
        console.log(e.extensions.response.body);
        throw new UserInputError('Failed to get JWT with user input')
      }
    },
    verifyToken: async (parent, { token }, { dataSources }) => {
      try {
        return await dataSources.authAPI.verifyJWTtoken(token);
      } catch (e) {
        console.log("status code: " + e.extensions.response.status);
        console.log(e.extensions.response.body);
        // ApolloErrorを使うときは、第１引数にエラーメッセージ、第２引数にエラーコードを指定する。どちらもString
        throw new ApolloError("Failed to verify JWT token", "VERIFICATION_ERROR");
      }
    },
    refreshToken: async (parent, { refresh }, { dataSources }) => {
      try {
        return await dataSources.authAPI.refreshJWTtoken(refresh);
      } catch (e) {
        console.log("status code: " + e.extensions.response.status);
        console.log(e.extensions.response.body);
        throw new ApolloError("Failed to refresh JWT token", "TOKEN_REFRESH_ERROR");
      }
    }
  }
};