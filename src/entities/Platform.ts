export interface Platform {
  id: string;
  databaseId: number;
  name: string;
  slug: string;
  platformIcon: string;
}
export interface RawPlatformNode {
  id: string;
  databaseId: number;
  name: string;
  slug: string;
  platformFields: {
    platformIcon: {
      node: {
        sourceUrl: string;
      };
    } | null;
  };
}
