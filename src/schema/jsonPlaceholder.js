import { gql } from 'apollo-server-express';

export default gql`
  extend type Mutation {
    createJsonUser(name: String!, age: Int!): JsonUser
  }
  
  type JsonUser {
    id: ID
    name: String
    age: Int
  }
`;