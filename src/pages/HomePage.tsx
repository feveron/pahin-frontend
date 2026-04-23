// src/pages/HomePage/index.tsx
import { useNavigate } from "react-router-dom"
import { Leaf, MapPin, FileText } from "lucide-react"
import { Button } from "../components/Button/Button"
import plantImage from "../assets/images/plantMainPage.jpg"
import { useEffect, useRef, useState } from "react"
import bannerImage from "../assets/images/forestBanner.jpg"

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return
    let startTime: number | null = null
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [start, target, duration])

  return count
}

function StatCounter({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const numericValue = parseInt(value.replace(/,/g, ""), 10)
  const count = useCountUp(numericValue, 2000, visible)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  const formatted = count.toLocaleString("uk-UA")
  return (
    <div ref={ref} className="flex flex-col gap-2">
      <span className="text-3xl md:text-5xl font-bold text-white">
        {formatted}
      </span>
      <span className="text-xs md:text-sm text-white/70 uppercase tracking-wide">
        {label}
      </span>
    </div>
  )
}

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
  { value: "12,000", label: "Дерев посаджено" },
  { value: "1,276", label: "Активних волонтерів" },
  { value: "56", label: "Міст охоплено" },
]

export function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col bg-cream dark:bg-dark ">
      {/* ── Hero ── */}
      <section
        className="max-w-7xl mx-auto  relative w-full min-h-[600px] pt-16 md:min-h-[600px] flex items-end md:items-center bg-cover bg-center "
        style={{ backgroundImage: `url(${plantImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cream/70 dark:from-dark/90 via-cream/30 dark:via-dark/30 to-transparent  " />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-16 md:py-24">
          <h1 className="text-4xl md:text-6xl font-bold text-green dark:text-green-light leading-tight max-w-lg mb-4">
            Посади дерево.
            <br />
            Залиш слід.
          </h1>
          <p className="text-gray-700 dark:text-gray-400 text-base md:text-lg max-w-sm mb-8">
            Приєднуйтесь до тисяч волонтерів, які роблять Україну зеленішою,
            дерево за деревом.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              label="Посадити дерево"
              variant="beta"
              onClick={() => navigate("/plant")}
              className="!w-auto"
            />
            <Button
              label="Дослідити мапу"
              variant="gamma"
              onClick={() => navigate("/map")}
              className="!w-auto !text-[18px]"
            />
          </div>
        </div>
      </section>

      {/* ── Як це працює ── */}
      <section className="w-full bg-cream dark:bg-dark py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm font-semibold text-brown dark:text-gray-400 uppercase tracking-widest mb-2">
            Шлях до змін
          </p>
          <h2 className="text-center text-3xl md:text-3xl font-bold text-dark-footer dark:text-cream-footer mb-12">
            Як це працює
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
            {steps.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="bg-white dark:bg-dark-input rounded-2xl p-6 flex flex-col items-center text-center gap-3 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-200"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-green-light dark:bg-green">
                  <Icon className="w-5 h-5 text-green dark:text-green-light" />
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
      <section className="w-full bg-green-hover dark:bg-dark py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-3 gap-6 text-center">
            {stats.map(({ value, label }) => (
              <StatCounter key={label} value={value} label={label} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Банер внизу ── */}
      <section className="w-full bg-cream dark:bg-dark py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div
            className="relative rounded-2xl overflow-hidden py-16 px-8 bg-cover bg-center"
            style={{ backgroundImage: `url(${bannerImage})` }}
          >
            <div className="absolute inset-0 bg-cream/70 dark:bg-dark/80" />

            <div className="relative z-10 flex flex-col items-center text-center gap-6">
              <h2 className="text-2xl md:text-6xl font-bold text-dark-footer dark:text-cream leading-snug">
                Кожне дерево має історію.
                <br />
                Якою буде твоя?
              </h2>
              <Button
                label="Створити свою спадщину"
                variant="beta"
                onClick={() => navigate("/catalog")}
                className="!w-auto "
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
