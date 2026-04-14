import { type ReactNode } from "react"
import { ThemeContext, useTheme } from "../hooks/useTheme"

export function ThemeProvider({ children }: { children: ReactNode }) {
  const value = useTheme()
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
