export interface FuzzyDate {
  year: number | null;
  month: number | null;
  day: number | null;
}

export interface ManhwaTitle {
  romaji: string | null;
  english: string | null;
  native: string | null;
}

export interface ManhwaCover {
  large: string | null;
  extraLarge?: string | null;
}

// Valores de status según la documentación de AniList (verifica con una respuesta real)
export type ManhwaStatus = 'FINISHED' | 'RELEASING' | 'NOT_YET_RELEASED' | 'CANCELLED' | 'HIATUS';

// Elemento de la lista (Explorar y landing)
export interface Manhwa {
  id: number;
  title: ManhwaTitle;
  coverImage: ManhwaCover;
  averageScore: number | null;   // 0 a 100
  chapters: number | null;
  status: ManhwaStatus | null;
  format: string | null;
}

// Detalle por ID
export interface ManhwaDetail extends Manhwa {
  description: string | null;
  bannerImage: string | null;
  popularity: number | null;
  favourites: number | null;
  volumes: number | null;
  startDate: FuzzyDate | null;
  endDate: FuzzyDate | null;
  genres: string[] | null;
  countryOfOrigin: string | null;
  isAdult: boolean;
  siteUrl: string | null;
}

// Para el estado de favoritos
export type ManhwaSummary = Pick<Manhwa, 'id' | 'title' | 'coverImage' | 'averageScore' | 'chapters'>;

export interface PageInfo {
  total: number | null;
  perPage: number | null;
  currentPage: number | null;
  lastPage: number | null;
  hasNextPage: boolean | null;
}

export interface ManhwaPage {
  pageInfo: PageInfo;
  media: Manhwa[];
}

// Parámetros de búsqueda
export type ManhwaSort = 'POPULARITY_DESC' | 'SCORE_DESC' | 'TITLE_ROMAJI' | 'SEARCH_MATCH';

export interface ManhwaSearchParams {
  search?: string;
  page?: number;
  perPage?: number;
  status?: ManhwaStatus;
  genre?: string;
  sort?: ManhwaSort;
}

// Envoltorios de respuesta GraphQL
export interface GraphQLError {
  message: string;
  status?: number;
}

export interface GraphQLResponse<T> {
  data: T | null;
  errors?: GraphQLError[];
}