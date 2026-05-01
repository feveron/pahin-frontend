import { useState } from "react"
import "leaflet/dist/leaflet.css"
import { SlidersHorizontal } from "lucide-react"
import MapFilters from "../components/MapFilters"
import { UkraineMask } from "../components/UkraineMask"
import Map from "react-map-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { useThemeContext } from "../hooks/useTheme"

export default function MapPage() {
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [treeCount] = useState(0)
  const { theme } = useThemeContext()
  const LIGHT_STYLE = "mapbox://styles/garniikk/cmonev9j4000p01sk74vm0hac"
  const DARK_STYLE = "mapbox://styles/garniikk/cmonf5unj004001r433hub6qp"

  return (
    <div className="relative w-full overflow-hidden h-[calc(100vh-64px)] md:h-screen">
      {/* Панель фільтрів */}
      <aside
        className={`
        z-[1000] w-[280px] transition-transform duration-300 ease-out
        md:absolute md:top-6 md:left-6
        max-md:fixed max-md:bottom-0 max-md:left-0 max-md:right-0 max-md:w-full
        ${filtersOpen ? "max-md:translate-y-0" : "max-md:translate-y-full"}
      `}
      >
        <MapFilters
          treeCount={treeCount}
          onClose={() => setFiltersOpen(false)}
        />
      </aside>

      <Map
        initialViewState={{
          longitude: 32.036,
          latitude: 49.4,
          zoom: 6,
        }}
        minZoom={4}
        maxZoom={18}
        maxBounds={[
          [18.5, 44.0],
          [43.5, 53.5],
        ]}
        style={{ width: "100%", height: "100%" }}
        mapStyle={theme === "dark" ? DARK_STYLE : LIGHT_STYLE}
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
      >
        <UkraineMask color={theme === "dark" ? "#19190D" : "#FEFAE8"} />
      </Map>

      {/* Кнопка фільтрів — тільки мобайл */}
      <button
        onClick={() => setFiltersOpen(true)}
        className="md:hidden absolute bottom-6 left-1/2 -translate-x-1/2 z-[1000] flex items-center gap-2 bg-green-800 text-white px-6 py-3 rounded-full text-sm font-medium shadow-lg"
      >
        <SlidersHorizontal size={16} />
        Фільтри
      </button>

      {/* Overlay — мобайл */}
      {filtersOpen && (
        <div
          onClick={() => setFiltersOpen(false)}
          className="md:hidden fixed inset-0 bg-black/40 z-[999]"
        />
      )}
    </div>
  )
}
