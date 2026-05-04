import { useRef } from "react"
import { Map, Marker } from "react-map-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { useThemeContext } from "../../hooks/useTheme"
import type { FormikProps } from "formik"
import type { PlantTreeValues } from "../../types/tree"
import type { MapMouseEvent } from "mapbox-gl"
import { MapPin } from "lucide-react"
import { MapButton } from "../MapButton"
import TreeIcon from "../../assets/icons/map-tree.svg"

const LIGHT_STYLE = "mapbox://styles/garniikk/cmonev9j4000p01sk74vm0hac"
const DARK_STYLE = "mapbox://styles/garniikk/cmonf5unj004001r433hub6qp"

export function Step2Location({
  formik,
}: {
  formik: FormikProps<PlantTreeValues>
}) {
  const { values, setFieldValue, errors } = formik
  const { theme } = useThemeContext()
  const mapRef = useRef(null)

  const handleMapClick = async (e: MapMouseEvent) => {
    const { lng, lat } = e.lngLat
    setFieldValue("latitude", lat)
    setFieldValue("longitude", lng)

    // Reverse geocoding — отримуємо назву місця і область
    try {
      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json` +
          `?language=uk&types=address,place,locality,region` +
          `&access_token=${import.meta.env.VITE_MAPBOX_TOKEN}`
      )
      const data = await res.json()
      const features = data.features ?? []

      const address = features.find((f: { place_type: string[] }) =>
        f.place_type.includes("address")
      )
      const place = features.find(
        (f: { place_type: string[] }) =>
          f.place_type.includes("place") || f.place_type.includes("locality")
      )
      const region = features.find((f: { place_type: string[] }) =>
        f.place_type.includes("region")
      )

      // "вул. Шевченка, Львів, Львівська область"
      const locationName = [address?.text, place?.text, region?.text]
        .filter(Boolean)
        .join(", ")

      setFieldValue("locationName", locationName)
    } catch {
      // геокодинг не критичний — лишаємо поля порожніми
    }
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4 text-dark-footer dark:text-cream-footer">
        <span className="w-7 h-7 rounded-full bg-green  text-white text-sm items-center justify-center inline-flex mr-2">
          2
        </span>
        Крок 2: Оберіть локацію
      </h2>
      <p className="text-sm text-gray-500 mb-4">
        Клікніть на карті щоб вказати місце посадки
      </p>

      <div className="rounded-2xl overflow-hidden" style={{ height: 400 }}>
        <Map
          ref={mapRef}
          initialViewState={{ longitude: 31.28, latitude: 49.5, zoom: 6 }}
          style={{ width: "100%", height: "100%" }}
          mapStyle={theme === "dark" ? DARK_STYLE : LIGHT_STYLE}
          mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
          onClick={handleMapClick}
          cursor="crosshair"
          maxBounds={[
            [20.08, 40.13],
            [44.23, 52.23],
          ]}
          minZoom={5}
        >
          {values.latitude && values.longitude && (
            <Marker
              longitude={values.longitude}
              latitude={values.latitude}
              anchor="bottom"
            >
              {" "}
              <MapButton
                icon={TreeIcon}
                onClick={() => {}} // порожній бо клік вже на карті
              />
            </Marker>
          )}
        </Map>
      </div>

      {/* Координати */}
      {values.latitude ? (
        <div className="flex items-center gap-1 mt-2 text-xs text-gray-700 dark:text-brown ">
          <MapPin className="w-3.5 h-3 mt-0.5" />
          <p className=" mt-1">
            {Number(values.latitude).toFixed(5)},{" "}
            {Number(values.longitude).toFixed(5)}
          </p>
        </div>
      ) : (
        <p className="text-xs text-gray-700 dark:text-brown mt-2">
          Місце ще не вибрано
        </p>
      )}

      {errors.latitude && (
        <p className="text-red-500 text-sm mt-1">{errors.latitude as string}</p>
      )}

      {/* Назва місця — автозаповнюється після кліку, можна редагувати вручну */}
      <input
        className="mt-4 w-full border border-green dark:border-black rounded-xl
                   px-4 py-3 text-sm bg-cream-input dark:bg-dark-input focus:outline-none
                   focus:ring-2 focus:ring-green-light text-dark-footer dark:text-gray-300"
        placeholder="Назва місця — заповниться автоматично після кліку"
        value={values.locationName}
        onChange={(e) => setFieldValue("locationName", e.target.value)}
      />
    </div>
  )
}
