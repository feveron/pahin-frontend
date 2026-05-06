type GrowthProgressProps = {
  plantedDate: Date
}

export function GrowthProgress({ plantedDate }: GrowthProgressProps) {
  const planted = new Date(plantedDate)
  const today = new Date()

  const diffMs = today.getTime() - planted.getTime()
  const daysPassed = Math.max(Math.floor(diffMs / (1000 * 60 * 60 * 24)), 0)

  const level = Math.floor(daysPassed / 365)
  const daysInCurrentLevel = daysPassed % 365
  const progressPercent = (daysInCurrentLevel / 365) * 100

  return (
    <div className={`w-full `}>
      <div className="mb-3 min-w-0 flex items-center justify-between">
        <p className="text-sm font-semibold uppercase text-black dark:text-white">
          Прогрес росту
        </p>

        <p className="text-sm font-semibold uppercase text-black dark:text-white">
          Рівень {level}
        </p>
      </div>

      <div className="h-4 w-full overflow-hidden rounded-full bg-white dark:bg-neutral-700">
        <div
          className="h-full rounded-full bg-green dark:bg-green-light transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  )
}
