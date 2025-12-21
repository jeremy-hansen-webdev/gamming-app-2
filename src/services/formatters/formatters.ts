import type {
  Platform,
  RawGameNode,
  RawGenreNode,
  RawPlatformNode,
} from './Types';

export const formatters = {
  games(reqData: RawGameNode[]) {
    return reqData.map((data) => ({
      id: data.id,
      databaseId: data.databaseId,
      title: data.title,
      slug: data.slug,
      image: data.gameFields.image,
      rating: data.gameFields.rating,
      genre: data.genres.nodes.map((g) => ({
        id: g.id,
        databaseId: g.databaseId,
        name: g.name,
        slug: g.slug,
        image: g.genreFields.image,
      })),
      platform: data.platforms.nodes.map((p) => ({
        id: p.id,
        databaseId: p.databaseId,
        name: p.name,
        slug: p.slug,
        platformIcon: p.platformFields.platformIcon?.node.sourceUrl || '',
      })),
    }));
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
