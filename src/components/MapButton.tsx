
type ButtonProps = {
    icon: string | undefined
    onClick: () => void
    className?: string
}

export function MapButton({ icon, onClick, className }: ButtonProps) {
    
    return (
        <div className="flex flex-col items-center gap-1">
            <button className={`rounded-full h-10 w-10 flex items-center justify-center bg-green border-[3px] border-white dark:border-black dark:bg-green-light hover:bg-green-hover dark:hover:bg-green dark:hover:text-white transition-colors disabled:opacity-50 shadow-xl ${className}`} onClick={onClick}>
                <img
                    src={icon}
                    alt="map button"
                    className="h-5 dark:invert"
                />
            </button>
            <div className="rounded-full bg-green dark:bg-green-light w-2 h-2"/>
        </div>
    )
}