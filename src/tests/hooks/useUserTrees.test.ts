import { renderHook, waitFor } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import { useUserTrees } from "../../hooks/useUserTrees"
import { apiClient } from "../../services/apiClient"

vi.mock("../../services/apiClient", () => ({
    apiClient: {
        get: vi.fn(),
    },
}))

describe("useUserTrees hook", () => {
    const mockedGet = vi.mocked(apiClient.get)

    beforeEach(() => {
        vi.clearAllMocks()
    })

    it("fetches user trees successfully", async () => {
        const mockResponse = {
            status: "success",
            data: {
                trees: [
                    {
                        id: "1",
                        userId: "u1",
                        userName: "Veronika",
                        speciesName: "Сосна",
                        speciesCategory: "хвойні",
                        speciesImage: "image.jpg",
                        latitude: 49,
                        longitude: 24,
                        locationName: "Львів",
                        message: "Test tree",
                        createdAt: "2025-01-01",
                    },
                ],
            },
        }

        mockedGet.mockResolvedValue(mockResponse)

        const { result } = renderHook(() =>
            useUserTrees()
        )

        await waitFor(() => {
            expect(result.current.loading).toBe(false)
        })

        expect(result.current.trees).toHaveLength(1)

        expect(
            result.current.trees[0].speciesName
        ).toBe("Сосна")
    })

    it("returns empty array on failed request", async () => {
        mockedGet.mockRejectedValue(
            new Error("API Error")
        )

        const { result } = renderHook(() =>
            useUserTrees()
        )

        await waitFor(() => {
            expect(result.current.loading).toBe(false)
        })

        expect(result.current.trees).toEqual([])
    })

    it("sets loading state correctly", async () => {
        mockedGet.mockResolvedValue({
            status: "success",
            data: {
                trees: [],
            },
        })

        const { result } = renderHook(() =>
            useUserTrees()
        )

        expect(result.current.loading).toBe(true)

        await waitFor(() => {
            expect(result.current.loading).toBe(false)
        })
    })
})