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
    obtainToken: (parent, { username, password}, { dataSources }) => {
      return dataSources.authAPI.obtainJWTtoken(username, password);
    }
  }
};