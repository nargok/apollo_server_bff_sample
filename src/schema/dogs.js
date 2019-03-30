import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    """
    ランダムな犬の画像を返す
    """
    randomDog: Dog
    
    """
    ハスキー画像の一覧を返す
    """
    huskyCrazy: HuskyList
  }
  
  type Dog {
    image: String
    status: String!
  }
  
  type HuskyList {
    images: [String]
    status: String!
  }
`;
