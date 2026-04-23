import { useState, useEffect, createContext, useContext } from "react"

// Context
export const ThemeContext = createContext<{
  theme: "light" | "dark"
  toggleTheme: () => void
} | null>(null)

// Hook
export function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null
    if (saved) return saved

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
  })

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
    localStorage.setItem("theme", theme)
  }, [theme])

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"))

  return { theme, toggleTheme }
}

// useThemeContext
export function useThemeContext() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useThemeContext must be used within ThemeProvider")
  return ctx
}
