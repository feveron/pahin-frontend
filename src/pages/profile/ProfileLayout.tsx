import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { useCurrentUser } from "../../hooks/useCurrentUser"
import TreesIcon from "../../assets/icons/map-tree.svg"
import SettingsIcon from "../../assets/icons/settings.svg"
import LogoutIcon from "../../assets/icons/logout.svg"
import { Icon } from "../../components/Icon"
import { authApi } from "../../services/auth"

export function ProfileLayout() {
  const { user } = useCurrentUser()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await authApi.logout()
    } catch {
      // ігноруємо помилку — все одно виходимо
    }
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    navigate("/login")
  }
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors
     ${
       isActive
         ? "bg-green text-white"
         : "text-text-info dark:text-gray-400 hover:bg-surface-offset dark:hover:bg-dark"
     }`
  const initials = user?.name?.charAt(0).toUpperCase() ?? "?"
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8 pt-16">
      {/* Сайдбар */}
      <aside className="lg:w-[220px] shrink-0 pt-6">
        <div className="bg-cream-comment dark:bg-dark-comment rounded-2xl p-4 flex flex-col gap-3">
          {/* Аватар + ім'я */}
          <div className="flex flex-col items-center gap-1 text-center pt-2 pb-3 border-b border-black/5">
            <div className="w-14 h-14 rounded-full bg-green flex items-center justify-center mb-1">
              <span className="text-xl font-semibold text-white">
                {initials}
              </span>
            </div>
            <p className="font-semibold text-dark-footer dark:text-white text-xl">
              {user?.name ?? "—"}
            </p>
            <p className="text-xs text-text-info dark:text-gray-400">
              ОХОРОНЕЦЬ ЗЕМЛІ
            </p>
          </div>

          {/* Навігація */}
          <nav className="flex flex-col gap-4">
            <NavLink to="." end className={navLinkClass}>
              {({ isActive }) => (
                <>
                  <Icon
                    src={TreesIcon}
                    size={16}
                    className={isActive ? "brightness-0 invert" : ""}
                  />
                  Мої дерева
                </>
              )}
            </NavLink>
            <NavLink to="settings" className={navLinkClass}>
              {({ isActive }) => (
                <>
                  <Icon
                    src={SettingsIcon}
                    size={16}
                    className={isActive ? "brightness-0 invert" : ""}
                  />
                  Налаштування
                </>
              )}
            </NavLink>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-brown hover:bg-green-light transition-colors"
            >
              <Icon src={LogoutIcon} size={16} />
              Вихід
            </button>
          </nav>
        </div>
      </aside>

      {/* Контент */}
      <div className="flex-1 min-w-0">
        <Outlet />
      </div>
    </div>
  )
}
