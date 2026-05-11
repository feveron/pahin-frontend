import { renderHook, waitFor } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import { useSpecies } from "../../hooks/useSpecies"
import { apiClient } from "../../services/apiClient"

vi.mock("../../services/apiClient", () => ({
    apiClient: {
        get: vi.fn(),
    },
}))

describe("useSpecies hook", () => {
    const mockedGet = vi.mocked(apiClient.get)

    beforeEach(() => {
        vi.clearAllMocks()
    })

    it("fetches species successfully", async () => {
        const mockSpecies = [
            {
                id: "1",
                name: "Сосна",
                latinName: "Pinus",
                category: "хвойні",
                description: "Test",
                suitableFor: "all",
                imageUrl: "test.jpg",
            },
        ]

        mockedGet.mockResolvedValue(mockSpecies)

        const { result } = renderHook(() => useSpecies())

        await waitFor(() => {
            expect(result.current.loading).toBe(false)
        })

        expect(result.current.species).toEqual(mockSpecies)
    })

    it("returns empty array on failed request", async () => {
        mockedGet.mockImplementation(async () => {
            throw new Error("API Error")
        })

        const { result } = renderHook(() =>
            useSpecies()
        )

        await waitFor(() => {
            expect(result.current.loading).toBe(false)
        })

        expect(result.current.species).toEqual([])
    })
})