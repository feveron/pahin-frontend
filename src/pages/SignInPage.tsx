import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Input } from "../components/Input"
import { Button } from "../components/Button/Button"
import { authApi } from "../services/auth"
import Baner from "../assets/images/SignInBaner.png"
import EmailIcon from "../assets/icons/email.svg"
import PasswordIcon from "../assets/icons/password.svg"
import { PublicFooter } from "../components/PublicFooter"

export function SignInPage() {
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit: React.ComponentProps<"form">["onSubmit"] = async (e) => {
        e.preventDefault()
        setError("")

        const payload = {
            email: email.trim(),
            password,
        }

        if (!payload.email || !payload.password.trim()) {
            setError("Заповніть усі поля")
            return
        }

        try {
            setIsLoading(true)

            const data = await authApi.login(payload)

            if (data.token) {
                localStorage.setItem("token", data.token)
            }

            navigate("/", { replace: true })
        } catch (err) {
            const message =
                err && typeof err === "object" && "message" in err
                    ? String(err.message)
                    : "Помилка входу. Перевірте пошту та пароль"

            setError(message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <div className="flex min-h-screen w-full items-center justify-center bg-cream dark:bg-dark p-[52px]">
                <div className="flex md:h-[680px] dark:bg-dark-input max-w-[1200px] flex-col md:flex-row items-center justify-center bg-white rounded-3xl">
                    <div className="flex-1 md:w-[50%] h-full flex items-start justify-start">
                        <img src={Baner} alt="banner" className="h-full object-contain object-left-top rounded-tl-3xl" />
                    </div>

                    <div className="md:w-[50%] flex flex-col rounded-r-3xl items-start h-full bg-white dark:bg-neutral-600 gap-10 p-[96px]">
                        <div className="flex flex-col items-start gap-2">
                            <h2 className="text-[24px] dark:text-white font-bold text-center">
                                З поверненням
                            </h2>

                            <p className="text-start text-[14px] dark:text-white/70 text-footer text-dark-footer justify-between">
                                Будь ласка, введіть свої дані, щоб увійти у свій
                                акаунт.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-6">
                            <Input
                                icon={EmailIcon}
                                placeholder="Електронна пошта"
                                label="Електронна пошта"
                                value={email}
                                onChange={setEmail}
                            />

                            <Input
                                icon={PasswordIcon}
                                placeholder="Пароль"
                                label="Пароль"
                                type="password"
                                value={password}
                                onChange={setPassword}
                            />

                            {error && (
                                <p className="text-sm font-medium text-red-500">
                                    {error}
                                </p>
                            )}

                            <Button
                                type="submit"
                                label={isLoading ? "Вхід..." : "Увійти"}
                                variant="delta"
                            />
                        </form>

                        <p className="text-center text-dark-footer mt-4">
                            Немає акаунту?{" "}
                            <span className="text-green font-bold cursor-pointer" onClick={() => navigate("/sign-up")}>
                                Зареєструватися
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <PublicFooter />
        </>
    )
}