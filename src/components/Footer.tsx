// src/components/Footer/index.tsx
import { Globe, Mail, Share2 } from "lucide-react"
import { Link } from "react-router-dom"

const resources = [
  {
    label: "Як правильно садити",
    href: "https://life.pravda.com.ua/society/2021/03/20/244288/",
  },
  {
    label: "Гід по видам",
    href: "https://chernigivlisgosp.com.ua/dereva-ukrayini-riznomanittya-ta-znachennya-dlya-prirodi-i-lyudej/",
  },
  {
    label: "Звіти про вплив",
    href: "https://forest.gov.ua/",
  },
]

export function Footer() {
  return (
    <footer className="w-full bg-cream dark:bg-dark border-t border-cream-300 dark:border-dark-input">
      {/* Верхня частина */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Лого + опис */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg text-forest dark:text-mint">
              Pahin
            </span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs">
            Всеукраїнська ініціатива, присвячена відновленню природної краси
            України через спільне лісовідновлення.
          </p>
        </div>

        {/* Ресурси */}
        <div className="flex flex-col gap-4">
          <h4 className="font-semibold text-forest dark:text-mint text-sm">
            Ресурси
          </h4>
          <ul className="flex flex-col gap-3">
            {resources.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-forest dark:hover:text-mint transition-colors duration-200"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Зв'язок */}
        <div className="flex flex-col gap-4">
          <h4 className="font-semibold text-forest dark:text-mint text-sm">
            Зв'язок
          </h4>
          <div className="flex items-center gap-4">
            <a
              href="https://pahin.ua"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 dark:text-gray-400 hover:text-forest dark:hover:text-mint transition-colors duration-200"
              aria-label="Вебсайт"
            >
              <Globe className="w-5 h-5" />
            </a>
            <a
              href="mailto:info@pahin.ua"
              className="text-gray-500 dark:text-gray-400 hover:text-forest dark:hover:text-mint transition-colors duration-200"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
            <button
              onClick={() =>
                navigator.share?.({ title: "Pahin", url: window.location.href })
              }
              className="text-gray-500 dark:text-gray-400 hover:text-forest dark:hover:text-mint transition-colors duration-200"
              aria-label="Поділитись"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Нижня частина */}
      <div className="border-t border-cream-300 dark:border-dark-input">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-400">
            © 2026 Pahin. Cultivating a greener future together.
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/privacy"
              className="text-xs text-gray-400 hover:text-forest dark:hover:text-mint transition-colors duration-200"
            >
              Політика конфіденційності
            </Link>
            <Link
              to="/terms"
              className="text-xs text-gray-400 hover:text-forest dark:hover:text-mint transition-colors duration-200"
            >
              Умови використання
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
