import PlaceholderImage from "../../assets/images/card-placeholder.jpg"
import { useState } from "react"

type MiniCardProps = {
    image: string
    title: string
    subtitle?: string
    className?: string
    active?: boolean
    onClick?: () => void
}

export function MiniCard({
    image,
    title,
    subtitle,
    className,
    active = false,
    onClick,
}: MiniCardProps) {
    const [hide, setHide] = useState(true)

    return (
        <div onClick={onClick}
            className={`cursor-pointer
        w-full max-w-[220px] max-h-[280px] aspect-[3/4] rounded-2xl bg-cream-footer dark:bg-dark overflow-hidden flex flex-col justify-center group ${className} ${active ? 'ring-2 ring-green dark:ring-green-light' : 'hover:ring-2 hover:ring-green-hover'}      `}
        >
            {/* IMAGE */}
            <div className="w-full p-4">
                <div className="relative aspect-square w-full overflow-hidden rounded-xl">
                    {!hide ? (
                        <img
                            src={image}
                            alt={title}
                            className="absolute z-10 inset-0 h-full w-full object-cover"
                            onError={() => setHide(true)}
                            onLoad={() => setHide(false)}
                        />
                    ) : (
                        <img
                            src={PlaceholderImage}
                            alt="Placeholder"
                            className="absolute z-1 inset-0 h-full w-full object-cover"
                        />
                    )}
                </div>
            </div>

            {/* CONTENT */}
            <div className="flex px-4 pb-4 justify-start flex-col gap-1">
                <h3 title={title} className="text-[16px] w-[calc(100%-2rem)] truncate font-bold text-green dark:text-green-light">
                    {title}
                </h3>
                {subtitle && (
                    <p className="text-[12px] text-brown dark:text-gray-400 font-regular">
                        {subtitle}
                    </p>
                )}
            </div>
        </div>
    )
}