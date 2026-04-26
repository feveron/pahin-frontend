import { NavLink } from "react-router-dom"
import { Home, Map, Trees, User } from "lucide-react"

export function BottomNavBar() {
  const navLinks = [
    { label: "Головна", to: "/", icon: Home, end: true },
    { label: "Мапа", to: "/map", icon: Map, end: false },
    { label: "Посадити", to: "/catalog", icon: Trees, end: false },
    { label: "Профіль", to: "/profile", icon: User, end: false },
  ]

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-cream dark:bg-dark border-t border-cream-300 dark:border-dark-input">
      <div className="flex items-center justify-around h-16 px-2">
        {navLinks.map(({ label, to, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 w-full h-full text-xs font-medium transition-colors duration-200 ${isActive
                ? "text-green dark:text-green-700"
                : "text-brown hover:text-green dark:text-cream-footer dark:hover:text-green-light"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 ${isActive ? "scale-110" : ""
                    }`}
                />
                <span
                  className={` transition-transform duration-200 ${isActive ? "scale-110 font-bold" : ""
                    }`}
                >
                  {label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
