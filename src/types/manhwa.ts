export interface Manhwa {
  mal_id: number
  url: string
  images: {
    jpg: {
      image_url: string | null
      small_image_url: string | null
      large_image_url: string | null
    }
    webp: {
      image_url: string | null
      small_image_url: string | null
      large_image_url: string | null
    }
  }
  approved: boolean | null
  title: string
  title_english: string | null
  title_japanese: string | null
  title_synonyms: string[]
  type: string | null
  chapters: number | null
  volumes: number | null
  status: string | null
  publishing: boolean
  published: {
    from: string | null
    to: string | null
    prop: {
      from: { day: number | null; month: number | null; year: number | null }
      to: { day: number | null; month: number | null; year: number | null }
      string: string | null
    }
    string: string | null
  }
  score: number | null
  scored_by: number | null
  rank: number | null
  popularity: number | null
  members: number | null
  favorites: number | null
  synopsis: string | null
  background: string | null
  authors: Array<{ mal_id: number; type: string; name: string; url: string }>
  serializations: Array<{ mal_id: number; type: string; name: string; url: string }>
  genres: Array<{ mal_id: number; type: string; name: string; url: string }>
  explicit_genres: Array<{ mal_id: number; type: string; name: string; url: string }>
  themes: Array<{ mal_id: number; type: string; name: string; url: string }>
  demographics: Array<{ mal_id: number; type: string; name: string; url: string }>
}

export interface ManhwaFull extends Manhwa {
  relations: Array<{
    relation: string
    entry: Array<{ mal_id: number; type: string; name: string; url: string }>
  }>
  external: Array<{ name: string; url: string }>
  theme: {
    openings: string[]
    endings: string[]
  }
}

export interface ManhwaSearchParams {
  q?: string
  page?: number
  limit?: number
  status?: string
  order_by?: string
  sort?: 'asc' | 'desc' | string
  min_score?: number
}

export interface ManhwaPagination {
  last_visible_page: number
  has_next_page: boolean
  current_page: number
  items: {
    count: number
    total: number
    per_page: number
  }
}

export interface ManhwaListResponse {
  data: Manhwa[]
  pagination: ManhwaPagination
}

export interface ManhwaResponse<T> {
  data: T
}
