import { wpGraphqlClient } from './GameApiGraphQl';
import type { Games, RawGameNode } from './Types';

export class GameData {
  async getGames(): Promise<Games[]> {
    const res = await wpGraphqlClient.post('', {
      query: /* GraphQL */ `
        query Games {
          games {
            nodes {
              title
              slug
              gameFields {
                image
                rating
                genres {
                  nodes {
                    title
                    slug
                    genreFields {
                      image
                    }
                  }
                }
                platform {
                  nodes {
                    title
                    slug
                  }
                }
              }
            }
          }
        }
      `,
    });

    const reqData: RawGameNode[] = res.data?.data?.games?.nodes;
    const formatData = reqData.map((data) => ({
      title: data.title,
      slug: data.slug,
      image: data.gameFields.image,
      rating: data.gameFields.rating,
      genre: data.gameFields.genres.nodes.map((g) => ({
        title: g.title,
        slug: g.slug,
        image: g.genreFields.image,
      })),
      platform: data.gameFields.platform.nodes.map((p) => ({
        title: p.title,
        slug: p.slug,
      })),
    }));
    return formatData;
  }
}
