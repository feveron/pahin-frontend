// src/components/Footer/index.tsx
import { Globe, Mail, Share2 } from "lucide-react"

import Logo from "../assets/icons/logo.svg"
import { Icon } from "./Icon"

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
    <footer className="w-full bg-cream-footer dark:bg-dark-footer border-t border-cream-300 dark:border-dark-input mb-16 md:mb-0">
      {/* Верхня частина */}
      <div className="max-w-7xl mx-auto px-5 py-8 grid grid-cols-1 md:grid-cols-3 gap-10 ">
        {/* Лого + опис */}
        <div className="flex  flex-col items-center md:items-start gap-4">
          <div className="flex items-center gap-2">
            <Icon src={Logo} size={24} className="text-green dark:text-green-hover" />
            <span className="font-bold text-lg text-green dark:text-green-hover">
              Pahin
            </span>
          </div>
          <p className="hidden md:block text-sm text-brown dark:text-gray-400 leading-relaxed max-w-xs">
            Всеукраїнська ініціатива, присвячена відновленню природної краси
            України через спільне лісовідновлення.
          </p>

          <div className="flex md:hidden items-center gap-5">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green dark:text-green-hover hover:text-green-hover dark:hover:text-green-light transition-colors duration-200"
              aria-label="Вебсайт"
            >
              <Globe className="w-5 h-5" />
            </a>
            <a
              href="https://www.google.com.ua/gmail/about/for-work/"
              className="text-green dark:text-green-hover hover:text-green-hover dark:hover:text-green-light transition-colors duration-200"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
            <button
              onClick={() =>
                navigator.share?.({ title: "Pahin", url: window.location.href })
              }
              className="text-green dark:text-green-hover hover:text-green-hover dark:hover:text-green-light transition-colors duration-200"
              aria-label="Поділитись"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Ресурси */}
        <div className="hidden md:flex flex-col gap-4">
          <h4 className="font-semibold text-green dark:text-green-hover text-sm">
            Ресурси
          </h4>
          <ul className="flex flex-col gap-2">
            {resources.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-brown dark:text-gray-400 hover:text-green dark:hover:text-green-light transition-colors duration-200"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Зв'язок */}
        <div className="hidden md:flex flex-col gap-4">
          <h4 className="font-semibold text-green dark:text-green-hover text-sm">
            Зв'язок
          </h4>
          <div className="flex items-center gap-4 ">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green dark:text-green-hover hover:text-green-hover dark:hover:text-green-light transition-colors duration-200"
              aria-label="Вебсайт"
            >
              <Globe className="w-5 h-5" />
            </a>
            <a
              href="https://www.google.com.ua/gmail/about/for-work/"
              className="text-green dark:text-green-hover hover:text-green-hover dark:hover:text-green-light transition-colors duration-200"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
            <button
              onClick={() =>
                navigator.share?.({ title: "Pahin", url: window.location.href })
              }
              className="text-green dark:text-green-hover hover:text-green-hover dark:hover:text-green-light transition-colors duration-200"
              aria-label="Поділитись"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Нижня частина */}
      <div className="border-t border-cream-300 dark:border-dark-input">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-2 ">
          <p className="text-xs text-brown dark:text-gray-400">
            © 2026 Pahin. Cultivating a greener future together.
          </p>
          <div className="hidden md:flex items-center gap-6">
            <span className="text-xs text-brown dark:text-gray-400 hover:text-green-hover dark:hover:text-green-light transition-colors duration-200">
              Політика конфіденційності
            </span>

            <span className="text-xs text-brown dark:text-gray-400 hover:text-green-hover dark:hover:text-green-light transition-colors duration-200">
              Умови використання
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
