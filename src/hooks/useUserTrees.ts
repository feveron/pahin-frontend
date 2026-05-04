import { useEffect, useState } from "react"
import { apiClient } from "../services/apiClient"
import type { Tree } from "../types/tree"

type ApiResponse = {
  status: string
  data: {
    trees: Tree[]
  }
}

export function useUserTrees() {
  const [trees, setTrees] = useState<Tree[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchTrees = async () => {
      setLoading(true)
      try {
        const res = await apiClient.get<ApiResponse>("/users/me/trees")
        setTrees(res.data.trees ?? []) // ← res.data.trees а не res.data
      } catch (_err) {
        // помилка завантаження
      } finally {
        setLoading(false)
      }
    }
    fetchTrees()
  }, [])

  return { trees, loading }
}
