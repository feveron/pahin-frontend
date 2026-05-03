export type TreeCategory =
  | "tree"
  | "sprout"
  | "leaf"
  | "flower"
  | "pine"
  | "fruit"

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