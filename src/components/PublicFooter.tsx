import { Globe, Mail, Share2 } from "lucide-react"
import Logo from "../assets/icons/logo.svg"
import { Icon } from "./Icon"

export function PublicFooter() {
  return (
    <footer className="w-full bg-cream-footer dark:bg-dark-footer px-[48px] py-[60px]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col min-[450px]:flex-row items-center justify-between gap-4 min-[450px]:gap-2">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Icon src={Logo} size={24} className="text-green dark:text-green-hover" />
            <span className="font-bold text-lg text-green dark:text-green-hover">
              Pahin
            </span>
          </div>
          <p className="text-xs text-brown dark:text-gray-400">
            © 2026 Pahin. Cultivating a greener future together.
          </p>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <span className="text-xs text-brown dark:text-gray-400 hover:text-green-hover dark:hover:text-green-light transition-colors duration-200">
            Політика конфіденційності
          </span>

          <span className="text-xs text-brown dark:text-gray-400 hover:text-green-hover dark:hover:text-green-light transition-colors duration-200">
            Умови використання
          </span>
        </div>
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
    </footer>
  )
}
