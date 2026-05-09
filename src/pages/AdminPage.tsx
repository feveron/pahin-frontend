import { useEffect, useState } from "react"
import { apiClient } from "../services/apiClient"

type TreeRequest = {
  id: string
  user_name: string
  user_email: string
  species_name: string
  location_name: string
  latitude: number
  longitude: number
  message: string
  planted_at: string
  status: "pending" | "approved" | "rejected"
}

export function AdminPage() {
  const [trees, setTrees] = useState<TreeRequest[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiClient
      .get<{ data: { trees: TreeRequest[] } }>("/admin/trees")
      .then((res) => setTrees(res.data.trees))
      .finally(() => setLoading(false))
  }, [])

  const handleApprove = async (id: string) => {
    await apiClient.patch(`/admin/trees/${id}/approve`)
    setTrees((prev) => prev.filter((t) => t.id !== id))
  }

  const handleReject = async (id: string) => {
    await apiClient.patch(`/admin/trees/${id}/reject`)
    setTrees((prev) => prev.filter((t) => t.id !== id))
  }

  if (loading) return <div className="p-8">Завантаження...</div>

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Заявки на посадку дерев</h1>

      {trees.length === 0 ? (
        <p className="text-gray-500">Немає нових заявок</p>
      ) : (
        <div className="flex flex-col gap-4">
          {trees.map((tree) => (
            <div
              key={tree.id}
              className="bg-white rounded-2xl p-5 flex flex-col gap-3 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <p className="font-semibold text-base">{tree.user_name}</p>
                  <p className="text-sm text-gray-500">{tree.user_email}</p>
                </div>
                <span className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-medium">
                  pending
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                <p>
                  <span className="font-medium">Вид:</span> {tree.species_name}
                </p>
                <p>
                  <span className="font-medium">Локація:</span>{" "}
                  {tree.location_name || "—"}
                </p>
                <p>
                  <span className="font-medium">Координати:</span>{" "}
                  {tree.latitude}, {tree.longitude}
                </p>
                <p>
                  <span className="font-medium">Дата:</span>{" "}
                  {new Date(tree.planted_at).toLocaleDateString("uk-UA")}
                </p>
              </div>

              {tree.message && (
                <p className="text-sm text-gray-600 italic">"{tree.message}"</p>
              )}

              <div className="flex gap-3 pt-1">
                <button
                  onClick={() => handleApprove(tree.id)}
                  className="px-5 py-2 bg-green text-white rounded-full text-sm font-medium hover:bg-green/90 transition"
                >
                  Підтвердити
                </button>
                <button
                  onClick={() => handleReject(tree.id)}
                  className="px-5 py-2 bg-red-500 text-white rounded-full text-sm font-medium hover:bg-red-600 transition"
                >
                  Відхилити
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
