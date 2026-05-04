import Location from "../../assets/icons/location.svg"
import Calendar from "../../assets/icons/calendar.svg"
import PlaceholderImage from "../../assets/images/card-placeholder.jpg"
import { Icon } from "../Icon"
import { formatDateUA } from "../../utils/FormatDate"

type Props = {
  image: string
  title: string
  location: string
  planted: Date
  onClick?: () => void
  isActive?: boolean
}

export function ProfileCardMini({
  image,
  title,
  location,
  planted,
  onClick,
  isActive,
}: Props) {
  return (
    <div
      onClick={onClick}
      className={`w-full bg-cream dark:bg-neutral-900 rounded-3xl overflow-hidden flex flex-col cursor-pointer transition-all
        ${isActive ? "ring-2 ring-green" : "hover:opacity-90"}`}
    >
      {/* IMAGE — велике фото зверху, назва поверх */}
      <div className="relative h-[200px] w-full shrink-0 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.onerror = null
            e.currentTarget.src = PlaceholderImage
          }}
        />
        {/* назва поверх фото внизу */}
        <h3 className="absolute bottom-3 left-4 w-[calc(100%_-_2rem)] truncate text-[16px] font-semibold uppercase text-white">
          {title}
        </h3>
      </div>

      {/* CONTENT — дата і локація */}
      <div className="p-4 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Icon
            src={Calendar}
            size={14}
            className="text-text-info dark:text-gray-400 shrink-0"
          />
          <span className="text-[12px] text-text-info dark:text-gray-400 truncate">
            {formatDateUA(planted)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Icon
            src={Location}
            size={14}
            className="text-green dark:text-green-light shrink-0"
          />
          <span className="text-[14px] font-semibold text-green dark:text-white truncate">
            {location}
          </span>
        </div>
      </div>
    </div>
  )
}
