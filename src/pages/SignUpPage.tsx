import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Input } from "../components/Input"
import { Button } from "../components/Button/Button"
import { Icon } from "../components/Icon"
import Logo from "../assets/icons/logo.svg"
import Leaf from "../assets/icons/login-leaf.svg"
import ProfileIcon from "../assets/icons/profile.svg"
import EmailIcon from "../assets/icons/email.svg"
import PasswordIcon from "../assets/icons/password.svg"
import { authApi } from "../services/auth"

export function SignUpPage() {
    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError("")

        if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
            setError("Заповніть усі поля")
            return
        }

        if (password !== confirmPassword) {
            setError("Паролі не збігаються")
            return
        }

        try {
            setIsLoading(true)

            const data = await authApi.register({
                name,
                email,
                password,
            })

            if (data.token) {
                localStorage.setItem("token", data.token)
            }

            navigate("/", { replace: true })
        } catch (err) {
            const message =
                err && typeof err === "object" && "message" in err
                    ? String(err.message)
                    : "Помилка реєстрації. Спробуйте ще раз"

            setError(message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen w-full items-center justify-center md:bg-cream dark:bg-dark py-[80px]">
            <div className="flex rounded-3xl min-h-[850px] w-full dark:bg-dark-input max-w-[1024px] flex-col md:flex-row items-stretch justify-center bg-cream-input">
                <div className="flex-1 md:w-[50%] flex-col flex items-start justify-between">
                    <div className="p-12 flex-col gap-6 flex items-start justify-start">
                        <div className="font-heading text-[36px] font-bold text-green dark:text-green-light group flex items-center gap-1 transition-transform duration-200 hover:scale-105 pb-4">
                            <Icon src={Logo} size={32} className="transition-transform duration-200 group-hover:scale-125 text-green dark:text-green-light" />
                            <span>Pahin</span>
                        </div>

                        <h1 className="text-[36px] text-green dark:text-green-light font-bold pr-10">
                            Почніть свій шлях
                            до <span className="text-brown dark:text-dark-brown">зеленішого світу.</span>
                        </h1>

                        <p className="text-[16px] font-medium text-dark-footer dark:text-white/70">
                            Приєднуйтесь до спільноти тисяч людей, які документують, садять та охороняють міські ліси. Навіть одне дерево має значення.
                        </p>
                    </div>

                    <Icon src={Leaf} size={200} className="text-green dark:text-green-light" />
                </div>

                <div className="md:w-[50%] rounded-b-3xl md:rounded-bl-none md:rounded-r-3xl flex flex-col items-start bg-white dark:bg-neutral-600 gap-10 p-12">
                    <div className="flex flex-col items-start gap-2">
                        <h2 className="text-[24px] dark:text-white font-bold text-center">
                            Створити акаунт
                        </h2>

                        <p className="text-start text-[14px] dark:text-white/70 text-footer text-dark-footer justify-between pr-10">
                            Введіть свої дані, щоб почати роботу та отримати
                            зелений сертифікат.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-6">
                        <Input
                            icon={ProfileIcon}
                            placeholder="Іван Банан"
                            label="Повне ім'я"
                            value={name}
                            onChange={setName}
                        />

                        <Input
                            icon={EmailIcon}
                            placeholder="hello@greenmap.com"
                            type="email"
                            label="Електронна пошта"
                            value={email}
                            onChange={setEmail}
                        />

                        <Input
                            icon={PasswordIcon}
                            type="password"
                            placeholder="Пароль"
                            label="Пароль"
                            value={password}
                            onChange={setPassword}
                        />

                        <Input
                            icon={PasswordIcon}
                            type="password"
                            placeholder="Підтвердження пароля"
                            label="Підтвердіть пароль"
                            value={confirmPassword}
                            onChange={setConfirmPassword}
                        />

                        {error && (
                            <p className="text-sm font-medium text-red-500">
                                {error}
                            </p>
                        )}

                        <Button
                            label={isLoading ? "Створення..." : "Створити акаунт"}
                            onClick={() => { }}
                            variant="delta"
                        />
                    </form>

                    <p className="text-center dark:text-white/70 w-full mt-3 text-[14px] text-dark-footer">
                        Вже маєте акаунт?{" "}
                        <span
                            className="text-green dark:text-green-light font-bold cursor-pointer"
                            onClick={() => navigate("/sign-in")}
                        >
                            Увійти
                        </span>
                    </p>

                    <p className="text-center text-[10px] text-dark-footer dark:text-white/70 mt-[-2]">
                        Натискаючи "Створити акаунт", ви погоджуєтеся з нашими <span className="underline">Умовами використання</span> та <span className="underline">Політикою конфіденційності</span>.
                    </p>
                </div>
            </div>
        </div>
    )
}