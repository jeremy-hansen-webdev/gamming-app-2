import type { RawPlatformNode } from '../../entities/Platform';
import type { Platform } from '../../entities/Platform';
import type { RawGenreNode } from '../../entities/Genre';
import type { RawGameNodeHeader } from '../../entities/Games';
import type { RawGameNode } from '../../entities/Games';

export const formatters = {
  games(reqData: RawGameNodeHeader) {
    return {
      pageInfo: reqData.games.pageInfo,
      nodes: reqData.games.nodes.map((game: RawGameNode) => ({
        id: game.id,
        databaseId: game.databaseId,
        title: game.title,
        slug: game.slug,
        image: game.gameFields.image,
        rating: game.gameFields.rating,
        genre: game.genres.nodes.map((g: RawGenreNode) => ({
          id: g.id,
          databaseId: g.databaseId,
          name: g.name,
          slug: g.slug,
          image: g.genreFields.image,
        })),
        platform: game.platforms.nodes.map((p: RawPlatformNode) => ({
          id: p.id,
          databaseId: p.databaseId,
          name: p.name,
          slug: p.slug,
          platformIcon: p.platformFields.platformIcon?.node.sourceUrl || '',
        })),
      })),
    };
  },

  genres(resData: RawGenreNode[]) {
    return resData.map((data) => ({
      id: data.id,
      databaseId: data.databaseId,
      name: data.name,
      slug: data.slug,
      image: data.genreFields.image,
    }));
  },

  platforms(resData: RawPlatformNode[] = []): Platform[] {
    return resData.map((data) => ({
      id: data.id,
      databaseId: data.databaseId,
      name: data.name,
      slug: data.slug,
      platformIcon: data.platformFields?.platformIcon?.node?.sourceUrl ?? '',
    }));
  },
};
