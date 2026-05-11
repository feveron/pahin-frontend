import { renderHook, act } from "@testing-library/react"
import { describe, it, expect, beforeEach } from "vitest"
import { useCurrentUser } from "../../hooks/useCurrentUser"

describe("useCurrentUser hook", () => {
    beforeEach(() => {
        localStorage.clear()
    })

    it("returns null when no user exists", () => {
        const { result } = renderHook(() => useCurrentUser())

        expect(result.current.user).toBeNull()
    })

    it("returns stored user from localStorage", () => {
        const mockUser = {
            id: "1",
            name: "Veronika",
            email: "test@test.com",
            role: "user",
        }

        localStorage.setItem(
            "user",
            JSON.stringify(mockUser)
        )

        const { result } = renderHook(() => useCurrentUser())

        expect(result.current.user).toEqual(mockUser)
    })

    it("updates user on storage event", () => {
        const { result } = renderHook(() => useCurrentUser())

        const updatedUser = {
            id: "2",
            name: "Updated User",
            email: "updated@test.com",
            role: "admin",
        }

        act(() => {
            localStorage.setItem(
                "user",
                JSON.stringify(updatedUser)
            )

            window.dispatchEvent(new Event("storage"))
        })

        expect(result.current.user).toEqual(updatedUser)
    })

    it("sets user to null after removing localStorage", () => {
        localStorage.setItem(
            "user",
            JSON.stringify({
                id: "1",
                name: "Test",
            })
        )

        const { result } = renderHook(() => useCurrentUser())

        act(() => {
            localStorage.removeItem("user")
            window.dispatchEvent(new Event("storage"))
        })

        expect(result.current.user).toBeNull()
    })
})