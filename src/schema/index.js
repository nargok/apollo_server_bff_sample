import { gql } from 'apollo-server-express';

import userSchema from './users';
import dogSchema from './dogs';
import jsonSchema from './jsonPlaceholder';

const linkSchema = gql`
  type Query {
    _: Boolean
    
  }
  
  type Mutation {
    _: Boolean
  }
`;

export default [linkSchema, userSchema, dogSchema, jsonSchema];