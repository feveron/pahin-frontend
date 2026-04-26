import { NavLink, useNavigate } from "react-router-dom"
import { useThemeContext } from "../hooks/useTheme"
import Logo from "../assets/icons/logo.svg"
import Sun from "../assets/icons/sun.svg"
import Moon from "../assets/icons/moon.svg"
import { CircleUserRound } from "lucide-react"
import { Icon } from "./Icon"

const navLinks = [
  { label: "Головна", to: "/" },
  { label: "Мапа", to: "/map" },
  { label: "Дерева", to: "/catalog" },
]

export function Header() {
  const { theme, toggleTheme } = useThemeContext()
  const navigate = useNavigate()

  // TODO: замінити на реальний стан авторизації
  const isLoggedIn = false

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `font-body text-sm font-medium transition-colors ${isActive
      ? "text-green border-b-2 border-green dark:text-green-light dark:border-green-light"
      : "text-brown hover:text-green dark:text-cream-footer dark:hover:text-green-light"
    }`

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-cream/75 dark:bg-dark/75 border-b border-cream-300 dark:border-dark-input shadow-sm">
      <div className=" mx-auto px-4 h-16 flex items-center justify-between">
        {/* Логотип */}
        <NavLink
          to="/"
          className="font-heading text-xl font-bold text-green dark:text-green-light group flex items-center gap-2 transition-transform duration-200 hover:scale-105"
        >
          <Icon src={Logo} size={24} className="transition-transform duration-200 group-hover:scale-125 text-green dark:text-green-light" />
          <span>Pahin</span>
        </NavLink>

        {/* Навігація — десктоп */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map(({ label, to }) => (
            <NavLink key={to} to={to} end={to === "/"} className={linkClass}>
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Права частина */}
        <div className="flex items-center gap-3">
          {/* Посадити дерево */}
          <button
            onClick={() => navigate("/plant")}
            className="px-4 py-1.5 rounded-lg bg-green hover:bg-green-dark text-white font-body text-sm font-medium transition-colors"
          >
            Посадити дерево
          </button>

          {/* Перемикач теми */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 flex items-center justify-center rounded-lg transition-colors, transition-transform duration-200 hover:-rotate-12 hover:scale-105"
          >
            {theme === "dark" ? (
              <Icon src={Sun} size={24} className="text-green dark:text-cream-footer" />
            ) : (
              <Icon src={Moon} size={22} className="text-green dark:text-cream-footer" />
            )}
          </button>

          {/* Акаунт */}
          <button
            onClick={() => navigate(isLoggedIn ? "/profile" : "/login")}
            className="hidden md:flex w-9 h-9 items-center justify-center rounded-lg transition-transform duration-200 hover:scale-105"
            aria-label="Профіль"
          >
            <CircleUserRound className="w-6 h-6 text-green dark:text-cream-footer" />
          </button>
        </div>
      </div>
    </header>
  )
}
