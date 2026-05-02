import type { AuthResponse, SignInPayload, SignUpPayload } from "../types/auth"
import { apiClient } from "./apiClient"

export const authApi = {
    register: (data: SignUpPayload) => {
        return apiClient.post<AuthResponse>("/auth/register", data)
    },

    login: (data: SignInPayload) => {
        return apiClient.post<AuthResponse>("/auth/login", data)
    },

    logout: () => {
        return apiClient.post<void>("/auth/logout")
    },
}