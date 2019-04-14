import { UserInputError } from 'apollo-server';
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
    verifyToken: (parent, { token }, { dataSources }) => {
      return dataSources.authAPI.verifyJWTtoken(token);
    },
    refreshToken: (parent, { token }, { dataSources }) => {
      return dataSources.authAPI.refreshJWTtoken(token);
    }
  }
};