// hooks/useCurrentUser.ts
import { useState, useEffect } from "react"
import type { AuthResponse } from "../types/auth"

type StoredUser = AuthResponse["user"]

export function useCurrentUser() {
  const [user, setUser] = useState<StoredUser | null>(() => {
    const stored = localStorage.getItem("user")
    return stored ? JSON.parse(stored) : null
  })

  useEffect(() => {
    const handleStorage = () => {
      const stored = localStorage.getItem("user")
      setUser(stored ? JSON.parse(stored) : null)
    }
    window.addEventListener("storage", handleStorage)
    return () => window.removeEventListener("storage", handleStorage)
  }, [])

  return { user }
}
