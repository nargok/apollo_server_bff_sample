import { gql } from 'apollo-server-express';

export default gql`
  extend type Mutation {
    """
    外部サービス(JSONPlaceholder)にユーザ情報をPOSTする
    """
    createJsonUser(name: String!, age: Int!): JsonUser
  }
  
  type JsonUser {
    id: ID
    name: String
    age: Int
  }
`;