import { useEffect, useState } from "react"

type Props = {
    src: string
    size?: number
    className?: string
}

export const Icon = ({ src, size = 20, className }: Props) => {
    const [svg, setSvg] = useState("")

    useEffect(() => {
        let isMounted = true

        fetch(src)
            .then((res) => res.text())
            .then((data) => {
                if (isMounted) setSvg(data)
            })
            .catch(() => {
                if (isMounted) setSvg("")
            })

        return () => {
            isMounted = false
        }
    }, [src])

    return (
        <span
            className={`inline-flex shrink-0 ${className ?? ""}`}
            style={{ width: size, height: size }}
            dangerouslySetInnerHTML={{ __html: svg }}
        />
    )
}