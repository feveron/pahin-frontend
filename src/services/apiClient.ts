import { api } from "./api"

export const apiClient = {
  get: async <T>(url: string): Promise<T> => {
    const res = await api.get<T>(url)
    return res.data
  },

  post: async <T>(url: string, data?: unknown): Promise<T> => {
    const res = await api.post<T>(url, data)
    return res.data
  },

  delete: async <T>(url: string): Promise<T> => {
    const res = await api.delete<T>(url)
    return res.data
  },
}