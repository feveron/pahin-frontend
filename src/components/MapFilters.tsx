import { useState } from "react"
import { SlidersHorizontal, ChevronDown } from "lucide-react"
import { Button } from "./Button/Button"
const TREE_TYPES = [
  "Всі види",
  "хвойні", // ← точно як в беці
  "листяні",
  "плодові",
  "квітучі",
  "швидкоростучі",
]
const REGIONS = [
  "Всі області",
  "Вінницька",
  "Волинська",
  "Дніпропетровська",
  "Донецька",
  "Житомирська",
  "Закарпатська",
  "Запорізька",
  "Івано-Франківська",
  "Київська",
  "Кіровоградська",
  "Луганська",
  "Львівська",
  "Миколаївська",
  "Одеська",
  "Полтавська",
  "Рівненська",
  "Сумська",
  "Тернопільська",
  "Харківська",
  "Херсонська",
  "Хмельницька",
  "Черкаська",
  "Чернівецька",
  "Чернігівська",
  "Автономна Республіка Крим",
]
type DateFilter = "30days" | "all"
interface Props {
  treeCount: number
  onClose?: () => void
  onChange: (filters: {
    species?: string
    region?: string
    dateFrom?: string
  }) => void
}

export default function MapFilters({ onClose, onChange }: Props) {
  const [treeType, setTreeType] = useState("")
  const [region, setRegion] = useState("Всі області")
  const [dateFilter, setDateFilter] = useState<DateFilter>("30days")

  const buildFilters = (type: string, reg: string, date: DateFilter) => {
    const dateFrom =
      date === "30days"
        ? new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0]
        : undefined
    onChange({
      species: type.trim() === "" ? undefined : type.trim(),
      region: reg === "Всі області" ? undefined : reg,
      dateFrom,
    })
  }

  const handleApply = () => {
    buildFilters(treeType, region, dateFilter)
    onClose?.()
  }

  const handleReset = () => {
    setTreeType("")
    setRegion("Всі області")
    setDateFilter("30days")
    onChange({})
  }

  return (
    <div className="bg-cream dark:bg-dark rounded-2xl shadow-xl overflow-hidden max-md:rounded-t-2xl max-md:rounded-b-none">
      {/* Заголовок */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-2 text-green dark:text-green-light font-semibold text-sm">
          <SlidersHorizontal size={16} className="text-brown" />
          Фільтри
        </div>
      </div>

      {/* Тіло */}
      <div className="px-5 py-5 flex flex-col gap-4">
        {/* Вид дерева */}
        <div className="flex flex-col gap-1.5 ">
          <label className="text-[11px] font-semibold tracking-widest text-green dark:text-green-light uppercase">
            Вид дерева
          </label>
          <input
            type="text"
            value={treeType}
            onChange={(e) => setTreeType(e.target.value)}
            placeholder="Наприклад: Сосна, Верба..."
            className="w-full px-3.5 py-2.5 border border-black/10 rounded-xl text-sm text-green dark:text-green-light bg-cream-input dark:bg-dark-input focus:outline-none focus:border-green transition-colors placeholder:text-gray-500"
          />
        </div>
        {/* Дата посадки */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold tracking-widest text-green dark:text-green-light uppercase">
            Дата посадки
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => setDateFilter("30days")}
              className={`w-full text-[12px] rounded-xl px-[11px] py-2 transition-colors font-body
        ${
          dateFilter === "30days"
            ? "bg-cream-active dark:bg-dark-input text-green dark:text-green-light font-semibold"
            : "bg-cream-input dark:bg-dark-footer text-brown dark:text-white/70"
        }`}
            >
              Останні 30 днів
            </button>
            <button
              onClick={() => setDateFilter("all")}
              className={`w-full text-[12px] rounded-xl px-[11px] py-2 transition-colors font-body
        ${
          dateFilter === "all"
            ? "bg-cream-active dark:bg-dark-input text-green dark:text-green-light font-semibold"
            : "bg-cream-input dark:bg-dark-footer text-brown dark:text-white/70"
        }`}
            >
              За весь час
            </button>
          </div>
        </div>

        {/* Область */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold tracking-widest text-green dark:text-green-light uppercase">
            Область
          </label>
          <div className="relative">
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-black/10 rounded-xl text-sm text-green dark:text-green-light bg-cream-input dark:bg-dark-input appearance-none cursor-pointer focus:outline-none focus:border-green transition-colors pr-8"
            >
              {REGIONS.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </div>
        </div>

        {/* Кнопки */}
        <Button
          label="Застосувати фільтри"
          onClick={handleApply}
          variant="delta"
        />

        {/* Скинути */}
        <button
          onClick={handleReset}
          className="w-full py-2 text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
        >
          Скинути фільтри
        </button>
      </div>
    </div>
  )
}
