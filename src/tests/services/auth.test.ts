import {
    describe,
    it,
    expect,
    vi,
    beforeEach,
} from "vitest"
import { authApi } from "../../services/auth"
import { apiClient } from "../../services/apiClient"

vi.mock("../../services/apiClient", () => ({
    apiClient: {
        post: vi.fn(),
    },
}))

describe("authApi", () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it("calls register endpoint", async () => {
        const payload = {
            name: "Veronika",
            email: "test@test.com",
            password: "123456",
        }

        const mockResponse = {
            token: "token",
            user: {
                id: "1",
                name: "Veronika",
                email: "test@test.com",
            },
        }

        vi.mocked(apiClient.post).mockResolvedValue(
            mockResponse
        )

        const result = await authApi.register(
            payload
        )

        expect(apiClient.post).toHaveBeenCalledWith(
            "/auth/register",
            payload
        )

        expect(result).toEqual(mockResponse)
    })

    it("calls login endpoint", async () => {
        const payload = {
            email: "test@test.com",
            password: "123456",
        }

        const mockResponse = {
            token: "token",
            user: {
                id: "1",
                name: "Veronika",
                email: "test@test.com",
            },
        }

        vi.mocked(apiClient.post).mockResolvedValue(
            mockResponse
        )

        const result = await authApi.login(payload)

        expect(apiClient.post).toHaveBeenCalledWith(
            "/auth/login",
            payload
        )

        expect(result).toEqual(mockResponse)
    })

    it("calls logout endpoint", async () => {
        vi.mocked(apiClient.post).mockResolvedValue(
            undefined
        )

        await authApi.logout()

        expect(apiClient.post).toHaveBeenCalledWith(
            "/auth/logout"
        )
    })
})