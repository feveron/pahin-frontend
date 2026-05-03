// Step4Payment.tsx
import { BadgeCheck } from "lucide-react"
import { Button } from "../Button/Button"

type Props = {
  onSubmit: () => void
  isLoading?: boolean
}

export function Step4Payment({ onSubmit, isLoading }: Props) {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4  text-dark-footer dark:text-cream-footer ">
        <span className="w-7 h-7 rounded-full bg-green text-white text-sm  items-center justify-center inline-flex mr-2">
          4
        </span>
        Крок 4: Перегляд та підтвердження
      </h2>

      <div className="bg-cream-footer dark:bg-dark-footer rounded-2xl p-6 flex flex-col gap-4">
        <div className="flex items-center gap-6 p-4  rounded-xl">
          <BadgeCheck className="w-16 h-16 text-green " />
          <div>
            <p className="font-bold text-dark-footer dark:text-green-hover">
              Майже готово!
            </p>
            <p className="text-sm text-dark-input dark:text-gray-400">
              Перегляньте деталі реєстрації вашого дерева на картці праворуч.
              Після подання ваша заявка буде очікувати підтвердження командою.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between py-4 border-t border-black/10 dark:border-white/10">
          <p className="text-m text-dark-footer dark:text-green-hover font-semibold">
            Вартість посадки:
          </p>
          <p className="text-xl font-bold text-green">
            80 грн <span className="text-sm text-gray-500">($2)</span>
          </p>
        </div>

        <Button
          label={isLoading ? "Зберігаємо..." : "🌳 Посадити моє дерево"}
          onClick={onSubmit}
          variant="alpha"
          disabled={isLoading}
          className="w-full"
          type="button"
        />
      </div>
    </div>
  )
}
