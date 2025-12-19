export interface Games {
    id: string,
    databaseId: number
    title: string
    slug: string
    image: string
    rating: number
    genre: Genre[]
    platform: Platform[]
}
// Raw GraphQL response types for ACF
export interface RawGameNode {
    id: string,
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

export interface Genre {
    id: string
    databaseId: number
    title: string
    slug: string
    image: string
}

// Raw GraphQL response types for ACF
export interface RawGenreNode {
    id: string
    databaseId: number
    title: string
    slug: string
    genreFields: {
        image: string
    }
}

export interface Platform {
    id: string
    databaseId: number
    title: string
    slug: string
}


