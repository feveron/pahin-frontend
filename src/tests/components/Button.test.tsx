import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import { Button } from "../../components/Button/Button"

describe("Button component", () => {
    it("renders button label", () => {
        render(<Button label="Натисни мене" />)

        expect(
            screen.getByText("Натисни мене")
        ).toBeInTheDocument()
    })

    it("calls onClick handler", () => {
        const handleClick = vi.fn()

        render(
            <Button
                label="Кнопка"
                onClick={handleClick}
            />
        )

        fireEvent.click(screen.getByText("Кнопка"))

        expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it("applies active styles", () => {
        render(
            <Button
                label="Active button"
                active
                variant="alpha"
            />
        )

        const button = screen.getByRole("button")

        expect(button.className).not.toBe("")
    })

    it("renders disabled button", () => {
        render(
            <Button
                label="Disabled"
                disabled
            />
        )

        const button = screen.getByRole("button")

        expect(button).toBeDisabled()
    })
})