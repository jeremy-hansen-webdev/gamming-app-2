import { Games } from "./GameApiClient"

export interface Genres {
    id: number
    name: string
    slug: string
    image_background: string
}

class GameGenres {
    genres: Genres[] = []
    
    async setGameGenres() {
        const gameGenres = new Games('genres')
        this.genres = (await gameGenres.AllData).results
    }

    get gameGenresData(): Genres[]{
        return this.genres.map(genres => ({id: genres.id, name: genres.name, slug: genres.slug, image_background: genres.image_background}))
    }
}

const genres = new GameGenres()
await genres.setGameGenres()

export const genresData = genres.gameGenresData
