import { Games, type Filters } from "./GameApiClient"
import type { Platforms } from "./usePlatforms"
import type { Genres } from "./useGenre"


export interface GamesDataProps {
    id: number
    name: string
    slug: string
    background_image: string
    rating: number
    platforms: Platforms[]
    genres: Genres[]
    
}

export class GamesData {
    private games: GamesDataProps[] = []

    constructor(private gameFilters?: Filters | null){}
    
    async setGameData() {
        const gameData = new Games('games', this.gameFilters ?? undefined)
        this.games = (await gameData.AllData).results
    }

    get gameData(): GamesDataProps[]{
        return this.games.map(game => ({
            id: game.id,
            name: game.name,
            slug: game.slug,
            background_image: game.background_image,
            rating: game.rating,
            platforms: game.platforms,
            genres: game.genres
        }))
    }
}

const getGamesData = new GamesData({genres: 2, platform: 5})
await getGamesData.setGameData()

export const gamesData = getGamesData.gameData




