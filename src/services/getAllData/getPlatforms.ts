// PlatformQueries.ts
import { formatters } from '../formatters/formatters.ts';
import { wpGraphqlClient } from '../GameApiGraphQl.ts';
import type { Platform, RawPlatformNode } from '../formatters/Types.ts';

export class PlatformQueries {
  async getPlatforms(): Promise<Platform[]> {
    const res = await wpGraphqlClient.post('', {
      query: /* GraphQL */ `
        query Platforms {
          platforms {
            nodes {
              id
              databaseId
              name
              slug
              platformFields {
                platformIcon {
                  node {
                    sourceUrl
                  }
                }
              }
            }
          }
        }
      `,
    });

    // ✅ correct path
    const reqData: RawPlatformNode[] = res.data?.data?.platforms?.nodes ?? [];

    return formatters.platforms(reqData);
  }
}

// quick local test
(async () => {
  const platformQueries = new PlatformQueries();
  const platformData = await platformQueries.getPlatforms();
  console.log(platformData);
})();
