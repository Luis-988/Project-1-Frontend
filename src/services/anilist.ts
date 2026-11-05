import type {
  GraphQLResponse,
  Manhwa,
  ManhwaDetail,
  ManhwaPage,
  ManhwaSearchParams,
} from '../types/manhwa'

const API_URL = 'https://graphql.anilist.co'

export const LIST_QUERY = `
  query ($page: Int, $perPage: Int, $search: String, $status: MediaStatus, $sort: [MediaSort]) {
    Page(page: $page, perPage: $perPage) {
      pageInfo { total perPage currentPage lastPage hasNextPage }
      media(type: MANGA, countryOfOrigin: KR, isAdult: false, search: $search, status: $status, sort: $sort) {
        id title { romaji english native } coverImage { large } averageScore chapters status format
      }
    }
  }
`

export const DETAIL_QUERY = `
  query ($id: Int) {
    Media(id: $id, type: MANGA) {
      id title { romaji english native } description(asHtml: false) coverImage { large extraLarge }
      bannerImage averageScore popularity favourites chapters volumes status
      startDate { year month day } endDate { year month day }
      genres countryOfOrigin format isAdult siteUrl
    }
  }
`

function getHttpErrorMessage(status: number): string {
  if (status === 404) return 'No encontrado'
  if (status === 429) return 'Demasiadas peticiones, espera un momento'
  return `Error HTTP de AniList (${status})`
}

function getGraphQLErrorMessage(message: string): string {
  if (message === 'Not Found' || message.includes('404')) return 'No encontrado'
  return message
}

async function postGraphQL<T>(
  query: string,
  variables: Record<string, unknown>,
  signal?: AbortSignal,
): Promise<T> {
  let response: Response

  try {
    response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
      signal,
    })
  } catch (caughtError) {
    if (caughtError instanceof DOMException && caughtError.name === 'AbortError') {
      throw caughtError
    }
    console.error('Error de red al conectar con AniList:', caughtError)
    if (caughtError instanceof TypeError) {
      throw new Error('No se pudo conectar con AniList')
    }
    throw new Error('Error de red al conectar con AniList')
  }

  if (!response.ok) {
    const error = new Error(getHttpErrorMessage(response.status))
    console.error('Error HTTP de AniList:', { status: response.status, error })
    throw error
  }

  let result: GraphQLResponse<T>
  try {
    result = (await response.json()) as GraphQLResponse<T>
  } catch (caughtError) {
    console.error('Respuesta JSON inválida de AniList:', caughtError)
    throw new Error('Respuesta inválida de AniList')
  }

  if (result.errors && result.errors.length > 0) {
    const message = getGraphQLErrorMessage(result.errors[0].message)
    const error = new Error(message)
    console.error('Error GraphQL de AniList:', result.errors[0])
    throw error
  }

  if (result.data === null) {
    const error = new Error('AniList no devolvió datos')
    console.error('Respuesta GraphQL sin datos:', result)
    throw error
  }

  return result.data
}

export async function searchManhwa(
  params: ManhwaSearchParams = {},
  signal?: AbortSignal,
): Promise<ManhwaPage> {
  const search = params.search?.trim()
  const variables: Record<string, unknown> = {
    page: params.page ?? 1,
    perPage: params.perPage ?? 24,
    sort: [params.sort ?? (search ? 'SEARCH_MATCH' : 'POPULARITY_DESC')],
  }

  if (search) variables.search = search
  if (params.status) variables.status = params.status

  const data = await postGraphQL<{ Page: ManhwaPage }>(LIST_QUERY, variables, signal)
  return data.Page
}

export async function getManhwaById(id: number, signal?: AbortSignal): Promise<ManhwaDetail> {
  const data = await postGraphQL<{ Media: ManhwaDetail | null }>(
    DETAIL_QUERY,
    { id },
    signal,
  )

  if (data.Media === null) {
    throw new Error('No encontrado')
  }

  return data.Media
}

export async function getTopManhwa(limit: number, signal?: AbortSignal): Promise<Manhwa[]> {
  const data = await postGraphQL<{ Page: ManhwaPage }>(
    LIST_QUERY,
    { page: 1, perPage: limit, sort: ['SCORE_DESC'] },
    signal,
  )
  return data.Page.media
}
