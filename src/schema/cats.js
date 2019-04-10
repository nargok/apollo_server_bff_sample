import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    """
    ランダムな猫の画像を返す
    """
    randomCat: Cat
    favorites:  CatList

  }
  
  type Cat {
    id: String
    image: String
  }
  
  type CatList {
    edges: [Cat]
  }
  
  
  
  
`;
