  import { wpGraphqlClient } from "./GameApiGraphQl";
  
  export class GenreData{
  async getGenres() {
    const res = await wpGraphqlClient.post('', {
      query: /* GraphQL */ `
        query Genres {
          genres {
            nodes {
              slug
              genreFields {
                name
                image
              }
            }
          }
        }
      `,
    });
    const resData = res.data?.data?.genres?.nodes;
    return resData;
  }
}