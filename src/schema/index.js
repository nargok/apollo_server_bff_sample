import { gql } from 'apollo-server-express';

import userSchema from './users';
import dogSchema from './dogs';

const linkSchema = gql`
  type Query {
    _: Boolean
    
  }
  
  type Mutation {
    _: Boolean
  }
`;

export default [linkSchema, userSchema, dogSchema];