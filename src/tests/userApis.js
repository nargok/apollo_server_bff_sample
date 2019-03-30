import axios from 'axios';

const API_URL = 'http://localhost:8080/graphql';

export const users = async variables =>
  axios.post(API_URL, {
    query: `
      query {
        users {
          username
        }
      }
    `,
    variables
  });
