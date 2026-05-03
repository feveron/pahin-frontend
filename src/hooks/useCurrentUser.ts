// hooks/useCurrentUser.ts
import type { AuthResponse } from "../types/auth"

type StoredUser = AuthResponse["user"]

export function useCurrentUser() {
  const stored = localStorage.getItem("user")
  const user: StoredUser | null = stored ? JSON.parse(stored) : null
  return { user }
}
