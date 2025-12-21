import { GamesData } from './getAllData/getGames';
import type { Games } from './formatters/Types';

export class GameQueries {
  games: Games[] = [];

  constructor(
    private gameId?: number,
    private genreId?: number,
    private platformId?: number
  ) {}

  async getGames() {
    const gameService = new GamesData();
    this.games = await gameService.getGames();
    return this.games;
  }
}

const game = new GameQueries();
const gameData = await game.getGames();
console.log(gameData);
