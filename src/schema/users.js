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

    """
    認証トークンを取得する
    """
    obtainToken(username: String!, password: String!): Token

    """
    認証トークンを検証する
    """
    verifyToken(token: String!): Token
    
    
  }
  
  type User {
    username: String!
  }
  
  type Token {
    token: String!
  }
  
`;
