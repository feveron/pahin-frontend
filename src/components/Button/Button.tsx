import { buttonVariants, type Variant } from "./styles"

type ButtonProps = {
    label: string
    onClick?: () => void
    variant?: Variant
    className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export function Button({ label, onClick, variant = "alpha", className, ...rest }: ButtonProps) {
    const styles = buttonVariants[variant]

    return (
        <div className="flex items-center gap-4">
            <button className={`${styles} ${className}`} onClick={onClick} {...rest}>
                {label}
            </button>
        </div>
    )
}