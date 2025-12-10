import { Games } from './GameApiClient';

export interface Platforms {
  id: number;
  name: string;
  slug: string;
}

export class GamePlatform {
  platforms: Platforms[] = [];

  async setPlatforms() {
    const gamePlatform = new Games('platforms/lists/parents');
    this.platforms = (await gamePlatform.AllData).results;
  }

  get platformsData(): Platforms[] {
    return this.platforms.map((plateform) => ({
      id: plateform.id,
      name: plateform.name,
      slug: plateform.slug,
    }));
  }
}

const plateform = new GamePlatform();
await plateform.setPlatforms();

export const platformData = plateform.platformsData;

console.log(platformData);
