import { useEffect, useState } from "react"
import type { Tree, TreeFilters, MapTreesResponse } from "../types/tree"
import { apiClient } from "../services/apiClient"

export function useTrees(filters: TreeFilters) {
  const [trees, setTrees] = useState<Tree[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const params = new URLSearchParams()

    if (filters.species) params.set("species", filters.species)
    if (filters.region) params.set("region", filters.region)
    if (filters.dateFrom) params.set("dateFrom", filters.dateFrom)
    if (filters.dateTo) params.set("dateTo", filters.dateTo)
    if (filters.page) params.set("page", String(filters.page))
    if (filters.limit) params.set("limit", String(filters.limit))

    const fetchTrees = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await apiClient.get<MapTreesResponse>(`/trees?${params.toString()}`)
        setTrees(res.data ?? []) // ← res.data замість json
        setTotal(res.total ?? res.data?.length ?? 0)
      } catch {
        setError("Не вдалось завантажити дерева")
      } finally {
        setLoading(false)
      }
    }

    fetchTrees()
  }, [
    filters.species,
    filters.region,
    filters.dateFrom,
    filters.dateTo,
    filters.page,
    filters.limit,
  ])

  return { trees, total, loading, error }
}
