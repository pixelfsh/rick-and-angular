export interface Location {
  created: Date,
  dimension: string,
  id: number,
  name: string,
  residents: string[],
  type: string,
  url: string
}

export interface Character {
  created: Date,
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