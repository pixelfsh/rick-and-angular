export interface Location {
  created: string,
  dimension: string,
  id: number,
  name: string,
  residents: string[],
  type: string,
  url: string
}

export interface Character {
  created: string,
  episode: string[],
  gender: string,
  id: number,
  image: string,
  location: { name: string, url: string },
  name: string,
  origin: { name: string, url: string },
  species: string,
  status: string,
  type: string,
  url: string
}

export interface Episode {
  id: number,
  name: string,
  air_date: string,
  episode: string,
  characters: Character[],
  url: string,
  created: string
}