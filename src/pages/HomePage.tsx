import { useThemeContext } from "../hooks/useTheme"

export function HomePage() {
  const { theme, toggleTheme } = useThemeContext()
  return (
    <div className="min-h-screen bg-cream dark:bg-dark p-8 space-y-10 transition-colors duration-300">
      {/* Типографіка */}
      <section className="space-y-2">
        <h2 className="font-heading text-2xl font-bold text-green dark:text-green-hover">
          Шрифти
        </h2>
        <p className="font-heading text-lg font-semibold text-dark-footer dark:text-cream-footer">
          Inter — заголовок
        </p>
        <p className="font-body text-base">Manrope — основний текст</p>
        <p className="font-body text-sm text-gray dark:text-cream">
          Manrope small — допоміжний текст
        </p>
        <button onClick={toggleTheme}>{theme === "dark" ? "☀️" : "🌙"}</button>
      </section>

      {/* Кольори */}
      <section className="space-y-3">
        <h2 className="font-heading text-2xl font-bold text-green dark:text-green-hover">
          Кольори
        </h2>
        <div className="flex flex-wrap gap-3">
          {[
            { bg: "bg-green", label: "green", hex: "#105339" },
            { bg: "bg-green-hover", label: "green-hover", hex: "#2D6A4F" },
            { bg: "bg-green-light", label: "green-light", hex: "#B0F1CC" },
            { bg: "bg-cream dark:bg-dark", label: "cream", hex: "#FEFAE8" },
            {
              bg: "bg-cream-input dark:bg-dark-input",
              label: "cream-input",
              hex: "#F2EEDD",
            },
            {
              bg: "bg-cream-comment dark:bg-dark-comment",
              label: "cream-comment",
              hex: "#ECE8D8",
            },
            {
              bg: "bg-cream-footer dark:bg-dark-footer",
              label: "cream-footer",
              hex: "#F8F4E3",
            },
            { bg: "bg-brown", label: "brown", hex: "#683C2A" },
          ].map(({ bg, label, hex }) => (
            <div key={label} className="space-y-1 w-20">
              <div className={`h-14 rounded-lg border border-black/10 ${bg}`} />
              <p className="font-body text-xs text-center leading-tight">
                {hex}
                <br />
                <span className="text-gray-500">{label}</span>
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Кнопки */}
      <section className="space-y-3">
        <h2 className="font-heading text-2xl font-bold text-green-dark dark:text-green-light">
          Кнопки
        </h2>
        <div className="flex flex-wrap gap-3">
          <button className="px-5 py-2 rounded-lg bg-green hover:bg-green-dark text-white font-body font-medium transition-colors">
            Primary
          </button>
          <button className="px-5 py-2 rounded-lg bg-green-light text-green-dark font-body font-medium transition-colors hover:bg-green hover:text-white">
            Secondary
          </button>
          <button className="px-5 py-2 rounded-lg border-2 border-green text-green font-body font-medium hover:bg-green hover:text-white transition-colors dark:border-green-light dark:text-green-light">
            Outline
          </button>
          <button className="px-5 py-2 rounded-lg bg-brown text-white font-body font-medium hover:opacity-80 transition-opacity">
            Accent
          </button>
        </div>
      </section>
    </div>
  )
}
