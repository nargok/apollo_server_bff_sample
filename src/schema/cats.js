import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    """
    ランダムな猫の画像を返す
    """
    randomCat: Cat    
  }
  
  type Cat {
    id: String
    image: String
  }
  
  
`;
