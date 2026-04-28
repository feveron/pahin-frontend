const BASE_URL = import.meta.env.VITE_API_URL

export const api = {
  get: (path: string) => fetch(`${BASE_URL}${path}`).then((res) => res.json()),
}
