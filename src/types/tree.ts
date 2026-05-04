export type TreeCategory =
  | "швидкоростучі"
  | "хвойні"
  | "квітучі"
  | "листяні"
  | "плодові"
  | "дефолт"

export interface Tree {
  id: string
  userId: string
  userName: string
  speciesName: string
  speciesCategory: TreeCategory
  latitude: number
  longitude: number
  locationName: string
  message: string
  createdAt: string
}

export interface TreeFilters {
  species?: string
  region?: string
  dateFrom?: string
  dateTo?: string
  page?: number
  limit?: number
}

export type MapTreesResponse = {
  status: string
  data: Tree[]
  total: number
  page: number
  totalPages: number
}
export interface PlantTreeValues {
  speciesId: string
  speciesName: string
  speciesCategory: string
  speciesImage: string
  latitude: number | null
  longitude: number | null
  locationName: string
  message: string
}
export interface Species {
  id: string
  name: string
  latinName: string
  category: string
  description: string
  suitableFor: string
  imageUrl: string
}
