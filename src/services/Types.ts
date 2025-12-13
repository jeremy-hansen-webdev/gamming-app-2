export interface Games {
    title: string
    slug: string
    image: string
    rating: number
    genre: Genre[]
    platform: Platform[]
}

export interface Genre {
    name: string
    slug: string
    image: string
}

export interface Platform {
    name: string
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
            nodes: RawPlatformNode[]
        }
    }
}

// Raw GraphQL response types
export interface RawGenreNode {
    slug: string
    genreFields: {
        name: string
        image: string
    }
}

export interface RawPlatformNode {
    slug: string
    platformFields: {
        name: string
    }
}