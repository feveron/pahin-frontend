import { Tag } from "./Tag"
import Location from "../../assets/icons/location.svg"
import PlaceholderImage from "../../assets/images/card-placeholder.jpg"
import { Icon } from "../Icon"
import { useState } from "react"
import { formatDateUA } from "../../utils/FormatDate"
import Comment from "../../assets/icons/comment.svg"

type FormCardProps = {
    image: string
    title: string
    username: string
    className?: string
    location: string
    price: number
    onChange?: (comment: string) => void
}

export function FormCard({
    image,
    title,
    username,
    className,
    location,
    price = 0,
    onChange,
}: FormCardProps) {
    const [hide, setHide] = useState(true)
    const date = formatDateUA(new Date())
    const [comment, setComment] = useState("")

    return (
        <div
            className={`
        w-full min-h-[680px] max-w-[420px] aspect-[3/4] overflow-hidden bg-cream-footer bg-white dark:bg-neutral-900 rounded-3xl flex flex-col
        ${className}
      `}
        >
            {/* IMAGE */}
            <div className="relative w-full h-[33%]">
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
                <Tag text='·   Попередній огляд' />
                <div className="absolute flex flex-col bottom-3 w-full left-4 flex items-start">
                    <p className="text-[12px] ml-2 font-semibold uppercase text-white">
                        Вид
                    </p>
                    <h3 className="w-[calc(100%-2rem)] truncate text-[30px] font-bold text-white">
                        {title}
                    </h3>
                </div>
            </div>

            {/* CONTENT */}
            <div className="p-8 flex gap-8 flex-col">
                <div className="flex flex-col w-full">
                    <div className="flex items-center justify-between">
                        <h3 className="text-[12px] uppercase break-words font-semibold text-input-text dark:text-black-700">
                            ким посаджено
                        </h3>
                        <h3 className="text-[12px] uppercase break-words font-semibold text-input-text dark:text-black-700">
                            Дата
                        </h3>
                    </div>
                    <div className="flex items-center justify-between">
                        <h3 className="text-[18px] uppercase break-words font-bold text-green dark:text-green-light">
                            {username}
                        </h3>
                        <h3 className="text-[16px] uppercase break-words font-medium text-dark-footer dark:text-white/70">
                            {date}
                        </h3>
                    </div>
                </div>
                <div className="py-[18px] items-center justify-between flex border-1 border-t border-cream-footer dark:border-cream/30 border-b flex-row gap-4">
                    <p className="text-[12px] uppercase break-words font-medium text-dark-footer dark:text-white/70">
                        вартість
                    </p>
                    <p className="text-[18px] uppercase break-words font-bold text-green dark:text-green-light">
                        {price} грн
                    </p>
                </div>
                {/*COMMENT SECTION*/}
                <div className="flex min-h-[150px] flex-col gap-2 rounded-xl bg-cream p-6 dark:bg-neutral-800">
                    <Icon
                        src={Comment}
                        size={20}
                        className="text-brown dark:text-white/70"
                    />
                    <div className="relative flex-1">
                        {comment && (
                            <>
                                <span className="absolute left-0 top-0 text-[30px] text-black/80 dark:text-white italic">
                                    “
                                </span>

                                <span className="absolute bottom-0 right-0 text-black/80 dark:text-white text-[30px] italic">
                                    ”
                                </span>
                            </>
                        )}
                        <textarea
                            placeholder="Тут Ви можете залишити коментар, який можуть бачити інші користувачі"
                            onChange={(e) => {
                                setComment(e.target.value)
                                onChange?.(e.target.value)
                            }}
                            className={`
                                h-full w-full resize-none bg-transparent text-sm
                                text-black/80 dark:text-white
                                placeholder:text-black/50 dark:placeholder:text-white/50
                                focus:outline-none overflow-y-auto scrollbar-hidden
                                ${comment ? "pr-4 pl-6" : ""}
                            `}
                        />
                    </div>
                </div>
                <div className="flex w-full py-4 border-t border-cream-footer dark:border-cream/30 items-center justify-start flex-row">
                    <Icon src={Location} size={20} className="text-green dark:text-green-light" />
                    <p className="text-[12px] text-black break-words dark:text-white font-bold ml-2">
                        {location}
                    </p>
                </div>
            </div>
        </div>
    )
}