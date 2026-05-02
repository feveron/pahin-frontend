import { Icon } from "./Icon"

type ButtonProps = {
  icon: string
  onClick: () => void
  onMouseEnter?: (e: React.MouseEvent) => void
  onMouseLeave?: () => void
  className?: string
}

export function MapButton({
  icon,
  onClick,
  onMouseEnter,
  onMouseLeave,
  className,
}: ButtonProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      <button
        className={`rounded-full h-10 w-10 flex items-center justify-center bg-green border-[3px] border-white dark:border-black dark:bg-green-light hover:bg-green-hover dark:hover:bg-green dark:hover:text-white transition-colors disabled:opacity-50 shadow-xl ${className}`}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <Icon src={icon} size={20} className="text-white dark:text-dark" />
      </button>
      <div className="rounded-full bg-green dark:bg-green-light w-2 h-2" />
    </div>
  )
}
