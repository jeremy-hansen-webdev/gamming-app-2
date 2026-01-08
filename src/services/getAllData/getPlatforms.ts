// PlatformQueries.ts
import { formatters } from '../formatters/formatters.ts';
import { wpGraphqlClient } from '../GameApiGraphQl.ts';
import type { RawPlatformNode } from '../../entities/Platform.ts';
import type { Platform } from '../../entities/Platform.ts';

export async function getPlatforms(): Promise<Platform[]> {
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
