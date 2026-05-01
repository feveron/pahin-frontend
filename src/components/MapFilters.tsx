import { useState } from "react"
import { SlidersHorizontal, X } from "lucide-react"

const TREE_TYPES = [
  "Всі види",
  "Дуб",
  "Клен",
  "Береза",
  "Сосна",
  "Липа",
  "Каштан",
  "Тополя",
]
const REGIONS = [
  "Всі області",
  "Київська",
  "Львівська",
  "Харківська",
  "Дніпропетровська",
  "Одеська",
  "Запорізька",
]

interface Props {
  treeCount: number
  onClose?: () => void
}

export default function MapFilters({ treeCount, onClose }: Props) {
  const [treeType, setTreeType] = useState("Всі види")
  const [region, setRegion] = useState("Всі області")

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-md:rounded-t-2xl max-md:rounded-b-none">
      {/* Заголовок */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2 text-green-900 font-semibold text-sm">
          <SlidersHorizontal size={16} />
          Фільтри
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-md"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Тіло */}
      <div className="px-5 py-5 flex flex-col gap-4">
        {/* Вид дерева */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold tracking-widest text-gray-400 uppercase">
            Вид дерева
          </label>
          <select
            value={treeType}
            onChange={(e) => setTreeType(e.target.value)}
            className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 bg-gray-50 appearance-none cursor-pointer focus:outline-none focus:border-green-700 transition-colors"
          >
            {TREE_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Область */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold tracking-widest text-gray-400 uppercase">
            Область
          </label>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 bg-gray-50 appearance-none cursor-pointer focus:outline-none focus:border-green-700 transition-colors"
          >
            {REGIONS.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </div>

        {/* Лічильник */}
        <div className="bg-green-50 rounded-xl px-3.5 py-2.5 text-sm text-gray-500">
          Показано{" "}
          <span className="font-semibold text-green-800">{treeCount}</span>{" "}
          дерев
        </div>

        {/* Скинути */}
        <button
          onClick={() => {
            setTreeType("Всі види")
            setRegion("Всі області")
          }}
          className="w-full py-3 bg-green-800 hover:bg-green-900 text-white rounded-xl text-sm font-medium transition-colors"
        >
          Скинути
        </button>
      </div>
    </div>
  )
}
