import { wpGraphqlClient } from './GameApiGraphQl';
import type { Platform } from './Types';

class PlatformQueries {
  async getPlatforms(): Promise<Platform[]> {
    const res = await wpGraphqlClient.post('', {
      query: /* GraphQL */ `
        query Platforms {
          platforms {
            nodes {
              title
              slug
            }
          }
        }
      `,
    });

    return res.data?.data?.platforms?.nodes;
  }
}

(async () => {
  const plateformQueries = new PlatformQueries();

  const plateformData = await plateformQueries.getPlatforms();
  

  console.log(plateformData);
})();
