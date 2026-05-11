import {
    describe,
    it,
    expect,
    vi,
    beforeEach,
} from "vitest"
import { apiClient } from "../../services/apiClient"
import { api } from "../../services/api"

vi.mock("../../services/api", () => ({
    api: {
        get: vi.fn(),
        post: vi.fn(),
        patch: vi.fn(),
        delete: vi.fn(),
    },
}))

describe("apiClient", () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it("returns data from GET request", async () => {
        const mockData = {
            id: 1,
            name: "Tree",
        }

        vi.mocked(api.get).mockResolvedValue({
            data: mockData,
        })

        const result = await apiClient.get("/trees")

        expect(api.get).toHaveBeenCalledWith(
            "/trees"
        )

        expect(result).toEqual(mockData)
    })

    it("returns data from POST request", async () => {
        const body = {
            name: "New Tree",
        }

        const mockResponse = {
            success: true,
        }

        vi.mocked(api.post).mockResolvedValue({
            data: mockResponse,
        })

        const result = await apiClient.post(
            "/trees",
            body
        )

        expect(api.post).toHaveBeenCalledWith(
            "/trees",
            body
        )

        expect(result).toEqual(mockResponse)
    })

    it("returns data from PATCH request", async () => {
        const body = {
            name: "Updated Tree",
        }

        const mockResponse = {
            success: true,
        }

        vi.mocked(api.patch).mockResolvedValue({
            data: mockResponse,
        })

        const result = await apiClient.patch(
            "/trees/1",
            body
        )

        expect(api.patch).toHaveBeenCalledWith(
            "/trees/1",
            body
        )

        expect(result).toEqual(mockResponse)
    })

    it("returns data from DELETE request", async () => {
        const mockResponse = {
            success: true,
        }

        vi.mocked(api.delete).mockResolvedValue({
            data: mockResponse,
        })

        const result = await apiClient.delete(
            "/trees/1"
        )

        expect(api.delete).toHaveBeenCalledWith(
            "/trees/1"
        )

        expect(result).toEqual(mockResponse)
    })
})