// src/pages/HomePage/index.tsx
import { useNavigate } from "react-router-dom"
import { Leaf, MapPin, FileText } from "lucide-react"
import { Button } from "../components/Button/Button"
import plantImage from "../assets/images/plantMainPage.jpg"

const steps = [
  {
    icon: Leaf,
    title: "Оберіть своє дерево",
    description:
      "Виберіть зі списку видів, які найкраще підходять для кожного українського регіону.",
  },
  {
    icon: MapPin,
    title: "Оберіть локацію",
    description:
      "Знайдіть місце у своєму місті або у визначеній зоні лісовідновлення, що потребує нового життя.",
  },
  {
    icon: FileText,
    title: "Отримайте сертифікат",
    description:
      "Отримайте цифровий сертифікат з точними координатами та унікальним ID вашого дерева.",
  },
]

const stats = [
  { value: "124,582", label: "Дерев посаджено" },
  { value: "45,900", label: "Активних волонтерів" },
  { value: "82", label: "Міст охоплено" },
]

export function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col bg-cream">
      {/* ── Hero ── */}
      <section
        className="max-w-7xl mx-auto  relative w-full min-h-[500px] md:min-h-[600px] flex items-end md:items-center bg-cover bg-center"
        style={{ backgroundImage: `url(${plantImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-16 md:py-24">
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight max-w-lg mb-4">
            Посади дерево.
            <br />
            Залиш слід.
          </h1>
          <p className="text-white/80 text-base md:text-lg max-w-sm mb-8">
            Приєднуйтесь до тисяч волонтерів, які роблять Україну зеленішою,
            дерево за деревом.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              label="Посадити дерево"
              variant="alpha"
              onClick={() => navigate("/plant")}
              className="!w-auto"
            />
            <Button
              label="Дослідити мапи"
              variant="gamma"
              onClick={() => navigate("/map")}
              className="!w-auto !border-white !text-white hover:!bg-white hover:!text-green-900"
            />
          </div>
        </div>
      </section>

      {/* ── Як це працює ── */}
      <section className="w-full bg-cream dark:bg-dark py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm text-gray-400 uppercase tracking-widest mb-2">
            Шлях до змін
          </p>
          <h2 className="text-center text-2xl md:text-3xl font-bold text-forest dark:text-mint mb-12">
            Як це працює
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="bg-white dark:bg-dark-input rounded-2xl p-6 flex flex-col gap-3 shadow-sm"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-cream dark:bg-dark">
                  <Icon className="w-5 h-5 text-forest dark:text-mint" />
                </div>
                <h3 className="font-semibold text-base text-gray-800 dark:text-white">
                  {title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Статистика ── */}
      <section className="w-full bg-forest py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-3 gap-6 text-center">
            {stats.map(({ value, label }) => (
              <div key={label} className="flex flex-col gap-2">
                <span className="text-3xl md:text-5xl font-bold text-white">
                  {value}
                </span>
                <span className="text-xs md:text-sm text-white/70 uppercase tracking-wide">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Банер внизу ── */}
      <section className="w-full bg-cream dark:bg-dark py-16 md:py-24">
        <div className="max-w-2xl mx-auto px-6 text-center flex flex-col items-center gap-6">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800 dark:text-white leading-snug">
            Кожне дерево має історію.
            <br />
            Якою буде твоя?
          </h2>
          <Button
            label="Створити свою спадщину"
            variant="beta"
            onClick={() => navigate("/plant")}
            className="!w-auto"
          />
        </div>
      </section>
    </div>
  )
}
