export interface Games {
    title: string
    slug: string
    image: string
    rating: number
    genre: Genre[]
    platform: Platform[]
}

export interface Genre {
    title: string
    slug: string
    image: string
}

export interface Platform {
    title: string
    slug: string
}



export interface RawGameNode {
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
    title: string
    slug: string
    genreFields: {
        image: string
    }
}
