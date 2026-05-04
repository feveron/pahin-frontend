import { useRef, useState } from "react"
import { SlidersHorizontal, Plus, Minus } from "lucide-react"
import MapFilters from "../components/MapFilters"
import { UkraineMask } from "../components/UkraineMask"
import { MapButton } from "../components/MapButton"
import { TreePopup } from "../components/TreePopUp"
import { Map, Marker, type MapRef } from "react-map-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { useThemeContext } from "../hooks/useTheme"
import { CATEGORY_ICONS } from "../assets/categoryIcons"
import type { Tree, TreeFilters } from "../types/tree"
import { useTrees } from "../hooks/useTrees"

export default function MapPage() {
  const [filters, setFilters] = useState<TreeFilters>({ limit: 100 })
  const { trees, total, loading } = useTrees(filters)
  const { theme } = useThemeContext()
  const [selectedTree, setSelectedTree] = useState<Tree | null>(null)
  const [hoverPos, setHoverPos] = useState<{ x: number; y: number } | null>(
    null
  )
  const [isTouch, setIsTouch] = useState(false)

  const [filtersOpen, setFiltersOpen] = useState(false) // ← було відсутнє
  const mapRef = useRef<MapRef>(null)

  const LIGHT_STYLE = "mapbox://styles/garniikk/cmonev9j4000p01sk74vm0hac"
  const DARK_STYLE = "mapbox://styles/garniikk/cmonf5unj004001r433hub6qp"

  const isTouchDevice = () => window.matchMedia("(hover: none)").matches

  const handleTreeClick = (tree: Tree) => {
    mapRef.current?.flyTo({
      center: [tree.longitude, tree.latitude],
      zoom: 16,
      duration: 1000,
    })
    if (isTouchDevice()) {
      setIsTouch(true)
      setSelectedTree(tree)
      setHoverPos(null)
    }
  }

  return (
    <div className="relative w-full overflow-hidden h-[calc(100vh-64px)] md:h-screen">
      {/* Фільтри */}
      <aside
        className={`
        z-[1001] w-[280px] transition-transform duration-300 ease-out
        md:absolute md:top-[calc(64px+1.5rem)] md:left-6 md:translate-y-0
        max-md:fixed max-md:bottom-0 max-md:left-0 max-md:right-0 max-md:w-full
        ${filtersOpen ? "max-md:translate-y-0" : "max-md:translate-y-full"}
      `}
      >
        <MapFilters
          treeCount={total}
          onClose={() => setFiltersOpen(false)}
          onChange={(f) => setFilters({ limit: 100, ...f })}
        />
      </aside>

      <Map
        ref={mapRef}
        initialViewState={{ longitude: 31.28, latitude: 49.5, zoom: 5 }}
        minZoom={5}
        maxZoom={18}
        maxBounds={[
          [21.5, 44.0],
          [39.5, 53.5],
        ]}
        style={{ width: "100%", height: "100%" }}
        mapStyle={theme === "dark" ? DARK_STYLE : LIGHT_STYLE}
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
      >
        <UkraineMask color={theme === "dark" ? "#19190D" : "#FEFAE8"} />
        {trees.map((tree) => (
          <Marker
            key={tree.id}
            longitude={tree.longitude}
            latitude={tree.latitude}
            anchor="bottom"
          >
            <MapButton
              icon={
                CATEGORY_ICONS[tree.speciesCategory] ?? CATEGORY_ICONS["дефолт"]
              }
              onClick={() => handleTreeClick(tree)}
              onMouseEnter={(e) => {
                if (!isTouchDevice()) {
                  setIsTouch(false)
                  setSelectedTree(tree)
                  setHoverPos({ x: e.clientX, y: e.clientY })
                }
              }}
              onMouseLeave={() => {
                if (!isTouchDevice()) {
                  setSelectedTree(null)
                  setHoverPos(null)
                }
              }}
            />
          </Marker>
        ))}
      </Map>

      {/* Попап */}
      {selectedTree && (
        <>
          {isTouch ? (
            // Мобілка: попап знизу, над фільтрами, не перекриває їх
            <div className="md:hidden fixed bottom-20 left-4 right-4 z-[998]">
              <TreePopup
                tree={selectedTree}
                onClose={() => setSelectedTree(null)}
              />
            </div>
          ) : (
            // Десктоп: попап біля курсора з clamp щоб не виходив за межі
            hoverPos && (
              <div
                style={{
                  position: "fixed",
                  left: `clamp(8px, ${hoverPos.x + 12}px, calc(100vw - 280px))`,
                  top: `clamp(8px, ${hoverPos.y - 10}px, calc(100vh - 200px))`,
                  zIndex: 1000,
                  pointerEvents: "none",
                }}
              >
                <TreePopup
                  tree={selectedTree}
                  onClose={() => setSelectedTree(null)}
                />
              </div>
            )
          )}
        </>
      )}

      {/* Лоадер */}
      {loading && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] bg-white dark:bg-dark px-4 py-2 rounded-full text-sm shadow">
          Завантаження...
        </div>
      )}

      {/* Кнопки зуму — ховаються коли фільтри відкриті */}
      {!filtersOpen && (
        <div className="absolute bottom-6 right-4 z-[1000] flex flex-col gap-1">
          <button
            onClick={() => mapRef.current?.zoomIn({ duration: 300 })}
            className="w-10 h-10 rounded-xl bg-cream dark:bg-dark border border-black/10 dark:border-white/10 shadow-md flex items-center justify-center text-green dark:text-green-light hover:bg-neutral-50 dark:hover:bg-black transition-colors"
            aria-label="Збільшити"
          >
            <Plus size={18} />
          </button>
          <button
            onClick={() => mapRef.current?.zoomOut({ duration: 300 })}
            className="w-10 h-10 rounded-xl bg-cream dark:bg-dark border border-black/10 dark:border-white/10 shadow-md flex items-center justify-center text-green dark:text-green-light hover:bg-neutral-50 dark:hover:bg-black transition-colors"
            aria-label="Зменшити"
          >
            <Minus size={18} />
          </button>
        </div>
      )}

      {/* Кнопка фільтрів — ← !filtersOpen, не filtersOpen */}
      {!filtersOpen && (
        <button
          onClick={() => setFiltersOpen(true)}
          className="md:hidden absolute bottom-6 left-1/2 -translate-x-1/2 z-[1000] flex items-center gap-2 bg-green text-white px-6 py-3 rounded-full text-sm font-medium shadow-lg"
        >
          <SlidersHorizontal size={16} />
          Фільтри
        </button>
      )}

      {/* Overlay */}
      {filtersOpen && (
        <div
          onClick={() => setFiltersOpen(false)}
          className="md:hidden fixed inset-0 bg-black/40 z-[999]"
        />
      )}
    </div>
  )
}
