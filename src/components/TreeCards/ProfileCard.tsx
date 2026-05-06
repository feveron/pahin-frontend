import Location from "../../assets/icons/location.svg"
import Calendar from "../../assets/icons/calendar.svg"
import PlaceholderImage from "../../assets/images/card-placeholder.jpg"
import { GrowthProgress } from "./GrowProgress"
import { Icon } from "../Icon"
import { formatDateUA } from "../../utils/FormatDate"

type Props = {
  image: string
  title: string
  subtitle?: string
  location: string
  planted: Date
}

export function ProfileCard({
  image,
  title,
  subtitle,
  location,
  planted,
}: Props) {
  return (
    <div className="w-full bg-cream-footer dark:bg-neutral-900 rounded-3xl overflow-hidden shadow-md flex flex-row">
      {/* IMAGE */}
      <div className="relative h-full w-[364px] shrink-0 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.onerror = null
            e.currentTarget.src = PlaceholderImage
          }}
        />
      </div>

      {/* CONTENT */}
      <div className="p-8 flex flex-1 flex-col justify-between gap-3">
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl font-semibold text-black dark:text-white">
            {title}
          </h3>
          {subtitle && (
            <p className="text-sm text-brown dark:text-gray-400 font-medium">
              {subtitle}
            </p>
          )}
          <div className="flex items-center gap-2">
            <Icon
              src={Calendar}
              size={14}
              className="text-text-info dark:text-gray-400"
            />
            <span className="text-sm text-text-info dark:text-gray-400">
              Посаджено {formatDateUA(planted)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Icon
              src={Location}
              size={14}
              className="text-text-info dark:text-gray-400"
            />
            <span className="text-sm text-text-info dark:text-gray-400">
              {location}
            </span>
          </div>
        </div>

        <GrowthProgress plantedDate={planted} />
      </div>
    </div>
  )
}
