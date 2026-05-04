import { useState, useEffect } from "react"
import { apiClient } from "../services/apiClient" // або де він лежить
import type { Species } from "../types/tree"

export function useSpecies() {
  const [species, setSpecies] = useState<Species[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiClient
      .get<Species[]>("/species")
      .then((data) => setSpecies(data))
      .finally(() => setLoading(false))
  }, [])

  return { species, loading }
}
