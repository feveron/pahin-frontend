import { renderHook, act } from "@testing-library/react"
import { describe, it, expect, beforeEach, vi } from "vitest"
import { useTheme } from "../../hooks/useTheme"

describe("useTheme hook", () => {
    beforeEach(() => {
        localStorage.clear()

        Object.defineProperty(window, "matchMedia", {
            writable: true,
            value: vi.fn().mockImplementation(() => ({
                matches: false,
                media: "",
                onchange: null,
                addListener: vi.fn(),
                removeListener: vi.fn(),
                addEventListener: vi.fn(),
                removeEventListener: vi.fn(),
                dispatchEvent: vi.fn(),
            })),
        })

        document.documentElement.className = ""
    })

    it("uses light theme by default", () => {
        const { result } = renderHook(() => useTheme())

        expect(result.current.theme).toBe("light")
    })

    it("loads theme from localStorage", () => {
        localStorage.setItem("theme", "dark")

        const { result } = renderHook(() => useTheme())

        expect(result.current.theme).toBe("dark")
    })

    it("toggles theme", () => {
        const { result } = renderHook(() => useTheme())

        act(() => {
            result.current.toggleTheme()
        })

        expect(result.current.theme).toBe("dark")
    })

    it("adds dark class to html element", () => {
        const { result } = renderHook(() => useTheme())

        act(() => {
            result.current.toggleTheme()
        })

        expect(
            document.documentElement.classList.contains("dark")
        ).toBe(true)
    })

    it("saves theme to localStorage", () => {
        const { result } = renderHook(() => useTheme())

        act(() => {
            result.current.toggleTheme()
        })

        expect(localStorage.getItem("theme")).toBe("dark")
    })
})