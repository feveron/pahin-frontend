import { renderHook, waitFor } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import { useTrees } from "../../hooks/useTrees"
import { apiClient } from "../../services/apiClient"

vi.mock("../../services/apiClient", () => ({
    apiClient: {
        get: vi.fn(),
    },
}))

describe("useTrees hook", () => {
    const mockedGet = vi.mocked(apiClient.get)

    beforeEach(() => {
        vi.clearAllMocks()
    })

    it("fetches approved trees successfully", async () => {
        const mockResponse = {
            data: [
                {
                    id: "1",
                    userId: "u1",
                    userName: "Veronika",
                    speciesName: "Сосна",
                    speciesCategory: "хвойні",
                    speciesImage: "image.jpg",
                    latitude: 49.0,
                    longitude: 24.0,
                    locationName: "Львів",
                    message: "Test",
                    createdAt: "2025-01-01",
                    status: "approved",
                },
                {
                    id: "2",
                    userId: "u2",
                    userName: "User",
                    speciesName: "Дуб",
                    speciesCategory: "листяні",
                    speciesImage: "image2.jpg",
                    latitude: 50.0,
                    longitude: 25.0,
                    locationName: "Київ",
                    message: "Pending tree",
                    createdAt: "2025-01-02",
                    status: "pending",
                },
            ],
            total: 2,
            page: 1,
            totalPages: 1,
            status: "success",
        }

        mockedGet.mockResolvedValue(mockResponse)

        const { result } = renderHook(() =>
            useTrees({})
        )

        await waitFor(() => {
            expect(result.current.loading).toBe(false)
        })

        expect(result.current.trees).toHaveLength(1)

        expect(result.current.trees[0].status).toBe(
            "approved"
        )

        expect(result.current.total).toBe(2)
    })

    it("sets error on failed request", async () => {
        mockedGet.mockRejectedValue(
            new Error("API Error")
        )

        const { result } = renderHook(() =>
            useTrees({})
        )

        await waitFor(() => {
            expect(result.current.loading).toBe(false)
        })

        expect(result.current.error).toBe(
            "Не вдалось завантажити дерева"
        )

        expect(result.current.trees).toEqual([])
    })

    it("passes filters to api request", async () => {
        mockedGet.mockResolvedValue({
            data: [],
            total: 0,
            page: 1,
            totalPages: 1,
            status: "success",
        })

        renderHook(() =>
            useTrees({
                species: "Сосна",
                region: "Львів",
                page: 2,
                limit: 10,
            })
        )

        await waitFor(() => {
            expect(mockedGet).toHaveBeenCalled()
        })

        expect(mockedGet).toHaveBeenCalledWith(
            "/trees?species=%D0%A1%D0%BE%D1%81%D0%BD%D0%B0&region=%D0%9B%D1%8C%D0%B2%D1%96%D0%B2&page=2&limit=10"
        )
    })
})