import axios from 'axios';

export const wpGraphqlClient = axios.create({
  baseURL: 'https://darkgoldenrod-wren-685563.hostingersite.com/graphql',
  headers: {
    'Content-Type': 'application/json',
  },
});

