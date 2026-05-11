import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import { Input } from "../../components/Input"

describe("Input component", () => {
    it("renders placeholder", () => {
        render(
            <Input
                value=""
                onChange={() => { }}
                placeholder="Введіть текст"
            />
        )

        expect(
            screen.getByPlaceholderText("Введіть текст")
        ).toBeInTheDocument()
    })

    it("renders label", () => {
        render(
            <Input
                value=""
                onChange={() => { }}
                label="Email"
            />
        )

        expect(
            screen.getByText("Email")
        ).toBeInTheDocument()
    })

    it("calls onChange handler", () => {
        const handleChange = vi.fn()

        render(
            <Input
                value=""
                onChange={handleChange}
                placeholder="Input"
            />
        )

        const input = screen.getByPlaceholderText("Input")

        fireEvent.change(input, {
            target: { value: "hello" },
        })

        expect(handleChange).toHaveBeenCalledWith("hello")
    })

    it("renders error message", () => {
        render(
            <Input
                value=""
                onChange={() => { }}
                error="Обов'язкове поле"
            />
        )

        expect(
            screen.getByText("Обов'язкове поле")
        ).toBeInTheDocument()
    })

    it("renders input with correct type", () => {
        render(
            <Input
                value=""
                onChange={() => { }}
                type="password"
                placeholder="Password"
            />
        )

        const input = screen.getByPlaceholderText("Password")

        expect(input).toHaveAttribute("type", "password")
    })
})