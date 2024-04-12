interface Schedule {
  time: string
  days: string[]
}

interface Rating {
  average: number
}

interface Network {
  id: number
  name: string
  country: {
    name: string
    code: string
    timezone: string
  }
  officialSite: string
}

interface Externals {
  tvrage: number
  thetvdb: number
  imdb: string
}

interface Image {
  medium: string
  original: string
}

export interface Show {
  id: number
  url: string
  name: string
  type: string
  language: string
  genres: string[]
  status: string
  runtime: number
  averageRuntime: number
  premiered: string | null
  ended?: string | null
  officialSite: string
  schedule: Schedule
  rating: Rating
  weight: number
  network: Network | null
  webChannel: string | null
  dvdCountry: string | null
  externals: Externals
  image: Image
  summary: string
  updated: number
  _links: {
    self: {
      href: string
    }
    previousepisode: {
      href: string
      name: string
    }
  }
}

export interface ShowResult {
  score: number
  show: Show
}