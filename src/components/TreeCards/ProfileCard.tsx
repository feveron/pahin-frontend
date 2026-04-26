import Location from "../../assets/icons/location.svg"
import Calendar from "../../assets/icons/calendar.svg"
import PlaceholderImage from "../../assets/images/card-placeholder.jpg"
import { GrowthProgress } from "./GrowProgress"
import { Icon } from "../Icon"
import { formatDateUA } from "../../utils/FormatDate"

type ProfileCardProps = {
  image: string
  title: string
  subtitle?: string
  className?: string
  location: string
  planted: Date
}

export function ProfileCard({
  image,
  title,
  subtitle,
  className,
  location,
  planted,
}: ProfileCardProps) {
  return (
    <div
      className={`
         h-[537px] h-[537px] min-[390px]:h-[364px] w-full bg-cream dark:bg-neutral-900 rounded-3xl overflow-hidden min-[390px]:bg-cream-footer min-[390px]:dark:bg-neutral-900 sm:shadow-md flex flex-col sm:flex-row ${className}
      `}
    >
      {/* IMAGE */}
      <div className="relative h-[427px] min-[390px]:h-[65%] sm:h-full w-full sm:w-[364px] shrink-0 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full rounded-3xl min-[390px]:rounded-none object-cover"
          onError={(e) => {
            const target = e.currentTarget
            target.onerror = null
            target.src = PlaceholderImage
          }}
        />

        <h3 className="absolute bottom-3 left-4 hidden w-[calc(100%_-_2rem)] truncate text-[16px] font-semibold uppercase text-white min-[390px]:block sm:hidden">
          {title}
        </h3>
      </div>

      {/* CONTENT */}
      <div className="p-6 sm:p-8 flex flex-1 justify-center sm:justify-between flex-col gap-3">
        {/* INFO BLOCK */}
        <div className="flex w-full flex-col items-start gap-y-1 min-[390px]:gap-y-3">
          <div className="block flex w-full justify-between flex-row min-[390px]:flex-col min-[390px]:hidden sm:block">
            <h3 className="text-[20px] min-[390px]:text-[24px] break-words font-semibold text-black dark:text-white">
              {title}
            </h3>
            <span className="truncate block min-[390px]:hidden flex flex-row gap-1 text-text-info dark:text-gray-400 text-[12px] sm:text-[14px] font-medium sm:font-Regular">{formatDateUA(planted)}</span>
            {subtitle && (
              <p className="hidden min-[390px]:block truncate text-[14px] text-brown dark:text-gray-400 font-medium">
                {subtitle}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 min-w-0">
            <Icon
              src={Calendar}
              size={14}
              className="hidden sm:block text-text-info dark:text-gray-400"
            />
            <span className="truncate hidden min-[390px]:block flex flex-row gap-1 text-text-info dark:text-gray-400 text-[12px] sm:text-[14px] font-medium sm:font-Regular"><span className="hidden sm:block">Посаджено</span>{formatDateUA(planted)}</span>
          </div>

          <div className="flex items-center gap-2 min-w-0">
            <Icon
              src={Location}
              size={14}
              className="sm:text-text-info sm:dark:text-gray-400 text-text-info dark:text-gray-400 min-[390px]:text-green min-[390px]:dark:text-green-light"
            />
            <span className="min-w-0 break-words text-text-info dark:text-gray-400 min-[390px]:text-green min-[390px]:dark:text-white sm:text-text-info sm:dark:text-gray-400 text-[14px] font-semibold sm:font-Regular">{location}</span>
          </div>
        </div>

        {/*Growth Progress */}
        <GrowthProgress className="hidden sm:block" plantedDate={planted} />
      </div>
    </div>
  )
}