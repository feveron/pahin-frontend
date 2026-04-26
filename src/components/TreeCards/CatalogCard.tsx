import { Button } from "../Button/Button"
import { Tag } from "./Tag"
import Sun from "../../assets/icons/sun-card.svg"
import Ground from "../../assets/icons/ground.svg"
import Distance from "../../assets/icons/distance.svg"
import Location from "../../assets/icons/location.svg"
import PlaceholderImage from "../../assets/images/card-placeholder.jpg"
import { Icon } from "../Icon"
import { useState } from "react"

type CatalogCardProps = {
  image: string
  title: string
  tag?: string
  subtitle?: string
  description: string
  className?: string
  info?: {
    sun?: string
    ground?: string
    distance?: string
    location?: string
  }
}

export function CatalogCard({
  image,
  title,
  tag,
  subtitle,
  description,
  className,
  info,
}: CatalogCardProps) {
  const [hide, setHide] = useState(true)

  return (
    <div
      className={`
        w-full max-w-[420px] min-[440px]:px-0 px-4 min-[440px]:rounded-3xl overflow-hidden min-[440px]:bg-cream-footer bg-cream dark:bg-dark min-[440px]:dark:bg-neutral-900 min-[440px]:shadow-md flex flex-col
        ${className}
      `}
    >
      {/* IMAGE */}
      <div className="relative w-full h-[435px] min-[440px]:h-[240px] md:h-[260px]">
        <img
          src={image}
          alt={title}
          className="w-full rounded-3xl min-[440px]:rounded-none h-full object-cover"
          onError={() => {
            setHide(true)
          }}
          onLoad={() => {
            setHide(false)
          }}
        />
        {hide && (
          <img src={PlaceholderImage} alt="Placeholder" className="absolute inset-0 w-full rounded-3xl min-[440px]:rounded-none h-full object-cover" />
        )}
        {/* TAG */}
        {tag && <Tag text={tag} />}
      </div>

      {/* CONTENT */}
      <div className="p-8 flex flex-col gap-3">
        <div>
          <h3 className="text-[24px] break-words font-semibold text-black dark:text-white">
            {title}
          </h3>
          {subtitle && (
            <p className="text-[14px] text-brown dark:text-gray-400 font-medium">
              {subtitle}
            </p>
          )}
        </div>

        <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          {description}
        </p>

        {/* INFO BLOCK */}
        {info && (
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 bg-cream-input dark:bg-neutral-800 p-4 text-sm rounded-xl text-black/80 dark:text-white">

            {info?.ground && (
              <div className="flex items-center gap-2 min-w-0">
                <Icon src={Ground} size={14} className="text-green dark:text-green-light" />
                <span className="truncate">Ґрунт: {info.ground}</span>
              </div>
            )}

            {info?.sun && (
              <div className="flex items-center gap-2 min-w-0">
                <Icon src={Sun} size={14} className="text-green dark:text-green-light" />
                <span className="truncate">Сонце: {info.sun}</span>
              </div>
            )}

            {info?.distance && (
              <div className="flex items-center gap-2 min-w-0">
                <Icon src={Distance} size={14} className="text-green dark:text-green-light" />
                <span className="truncate">Відстань: {info.distance}</span>
              </div>
            )}

            {info?.location && (
              <div className="flex items-center gap-2 min-w-0">
                <Icon src={Location} size={14} className="text-green dark:text-green-light shrink-0" />
                <span className="break-words truncate leading-tight">
                  Область: {info.location}
                </span>
              </div>
            )}
          </div>)}

        {/* BUTTON */}
        <Button variant="delta" label="Посадити це дерево" onClick={() => { alert("Посадити це дерево") }} />
      </div>
    </div>
  )
}