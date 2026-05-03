type InputProps = {
    label: string
    icon?: string | undefined
    placeholder?: string
    className?: string
    type?: React.HTMLInputTypeAttribute | undefined
    value: string
    onChange: (value: string) => void
    error?: string
}

export function Input({ icon, className, label, placeholder, type = "text", value, onChange, error }: InputProps) {

    return (
        <div className="flex w-full flex-col justify-center font-bold text-[12px] text-black/80 items-start gap-[6px]">
            {label && <label className="uppercase font-body text-sm text-gray-700 dark:text-gray-300">{label}</label>}
            <div className={`flex flex-row items-center justify-start gap-4 bg-cream-comment border-none w-full px-4 py-[14px] text-[16px] font-bold text-input-text dark:bg-dark-input dark:text-white rounded-xl placeholder:text-input-text ${className}`}>
                {icon && <img src={icon} alt="input icon" className="h-4 text-input-text dark:invert" />}
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className={`flex-1 bg-cream-comment border-none w-full text-[16px] font-bold text-input-text dark:text-white dark:bg-dark-input placeholder:text-input-text dark:placeholder:text-neutral-400 placeholder:font-normal outline-none ${className}`}
                />
            </div>
            {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
        </div>
    )
}