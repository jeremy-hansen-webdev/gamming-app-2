export interface Games {
    id: number
    title: string
    slug: string
    image: string
    rating: number
    genre: Genre[]
    platform: Platform[]
}

export interface Genre {
    id: number
    title: string
    slug: string
    image: string
}

export interface Platform {
    id: number
    title: string
    slug: string
}

export interface RawGameNode {
    databaseId: number
    title: string
    slug: string
    gameFields: {
        image: string
        rating: number
        genres: {
            nodes: RawGenreNode[]
        }
        platform: {
            nodes: Platform[]
        }
    }
}

// Raw GraphQL response types
export interface RawGenreNode {
    databaseId: number
    title: string
    slug: string
    genreFields: {
        image: string
    }
}
