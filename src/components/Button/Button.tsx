import { buttonVariants, type Variant } from "./styles"

type ButtonProps = {
    label: string
    onClick: () => void
    variant?: Variant
    className?: string
}

export function Button({ label, onClick, variant = "alpha", className }: ButtonProps) {
    const styles = buttonVariants[variant]
    
    return (
        <div className="flex items-center gap-4">
            <button className={`${styles} ${className}`} onClick={onClick}>
                {label}
            </button>
        </div>
    )
}