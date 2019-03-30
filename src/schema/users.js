import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    """
    ログイン中のユーザ情報を返す
    """
    me: User
  
    """
    ユーザの一覧を返す
    """
    users: [User]
  }
  
  extend type Mutation {
    """
    ユーザを追加する
    """
    createUser(username: String!): User
  }
  
  type User {
    username: String!
  }
`;
