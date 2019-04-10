import { gql } from 'apollo-server-express';

import userSchema from './users';
import dogSchema from './dogs';
import catSchema from './cats';
import jsonSchema from './jsonPlaceholder';

const linkSchema = gql`
  type Query {
    _: Boolean
    
  }
  
  type Mutation {
    _: Boolean
  }
`;

export default [linkSchema, userSchema, dogSchema, jsonSchema, catSchema];