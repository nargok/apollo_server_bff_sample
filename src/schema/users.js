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
    
    """
    外部サービスからのユーザ一覧を返す
    """
    usersFromExternalService: [User]
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
    verifyToken(token: String!): Boolean
    
    """
    トークンをリフレッシュする
    """
    refreshToken(token: String!): Token
    
  }
  
  type User {
    username: String!
  }
  
  type Token {
    access: String!
    refresh: String!
  }
  
`;
