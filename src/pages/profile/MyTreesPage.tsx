import { useNavigate } from "react-router-dom"
import { ProfileCard } from "../../components/TreeCards/ProfileCard"
import { useUserTrees } from "../../hooks/useUserTrees"
import { useState, useMemo } from "react"
import { ProfileCardMini } from "../../components/TreeCards/ProfileCardMini"

export default function MyTreesPage() {
  const { trees, loading } = useUserTrees()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const navigate = useNavigate()

  // ← замість useEffect: вибираємо перше дерево через useMemo
  const selectedTree = useMemo(() => {
    if (!selectedId) return trees[0] ?? null
    return trees.find((t) => t.id === selectedId) ?? trees[0] ?? null
  }, [trees, selectedId])

  const otherTrees = trees.filter((t) => t.id !== selectedTree?.id)

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-dark-footer dark:text-cream-footer">
        Мої дерева
      </h1>

      {loading && <p className="text-sm text-gray-400">Завантаження...</p>}

      {/* Велика картка — на мобілці повна ширина */}
      {selectedTree && (
        <div className="hidden sm:block">
          <ProfileCard
            image=""
            title={selectedTree.speciesName}
            location={selectedTree.locationName}
            planted={new Date(selectedTree.createdAt)}
          />
        </div>
      )}

      {/* Сітка маленьких карток */}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* на мобілці показуємо і selectedTree теж */}
          <div className="sm:hidden">
            {selectedTree && (
              <ProfileCardMini
                image=""
                title={selectedTree.speciesName}
                location={selectedTree.locationName}
                planted={new Date(selectedTree.createdAt)}
                isActive
              />
            )}
          </div>

          {otherTrees.map((tree) => (
            <ProfileCardMini
              key={tree.id}
              image=""
              title={tree.speciesName}
              location={tree.locationName}
              planted={new Date(tree.createdAt)}
              isActive={tree.id === selectedTree?.id}
              onClick={() => setSelectedId(tree.id)}
            />
          ))}
          <div
            onClick={() => navigate("/plant")}
            className="cursor-pointer rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center gap-2 p-6 hover:border-green transition-colors min-h-[96px]"
          >
            <span className="text-3xl text-gray-300">+</span>
            <p className="text-sm text-center text-gray-400 max-w-[120px]">
              Розширюйте свій цифровий ліс
            </p>
          </div>
        </div>
      )}

      {!loading && trees.length === 0 && (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <span className="text-5xl">🌱</span>
          <p className="text-gray-400 text-sm max-w-[200px]">
            У тебе ще немає посаджених дерев
          </p>
          <button
            onClick={() => navigate("/catalog")}
            className="px-6 py-3 bg-green text-white rounded-full text-sm font-medium"
          >
            Посадити перше дерево
          </button>
        </div>
      )}
    </div>
  )
}
