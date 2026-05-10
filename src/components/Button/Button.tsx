import { activeVariants, buttonVariants, type Variant } from "./styles"

type ButtonProps = {
    label: string
    onClick?: () => void
    variant?: Variant
    className?: string
    active?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export function Button({ label, onClick, variant = "alpha", className, active, ...rest }: ButtonProps) {
    const styles = buttonVariants[variant]
    const activeStyle = active ? activeVariants[variant as keyof typeof activeVariants] : ""

    return (
        <div className="flex items-center gap-4">
            <button className={`${styles} ${className} ${activeStyle}`} onClick={onClick} {...rest}>
                {label}
            </button>
        </div>
    )
}