import { MiniCard } from "../TreeCards/miniCard"
import type { FormikProps } from "formik"
import type { PlantTreeValues, Species } from "../../types/tree"
import { useSpecies } from "../../hooks/useSpecies" // хук для отримання видів з беку
import { useEffect, useRef } from "react"

interface Props {
  formik: FormikProps<PlantTreeValues>
}

export function Step1TreeSelect({ formik }: Props) {
  const { setFieldValue, values } = formik
  const { species, loading } = useSpecies()
  const selectedRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!loading && values.speciesId && selectedRef.current) {
      selectedRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      })
    }
  }, [loading])

  return (
    <div className="relative w-full">
      <h2 className="text-xl font-bold mb-4 text-dark-footer dark:text-cream-footer">
        <span className="w-7 h-7 rounded-full bg-green  text-white text-sm items-center justify-center inline-flex mr-2">
          1
        </span>
        Крок 1: Оберіть вид дерева
      </h2>

      {/* Сітка карток */}
      <div
        className="flex gap-4 overflow-x-auto py-2  snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="flex-none w-1 shrink-0" />
        {species.map((s: Species) => (
          <div
            key={s.id}
            className="flex-none w-[200px] snap-start ref={values.speciesId === s.id ? selectedRef : null}"
          >
            <MiniCard
              key={s.id}
              image={s.imageUrl}
              title={s.name}
              subtitle={s.category}
              active={values.speciesId === s.id}
              onClick={() => {
                // ← записуємо тільки потрібні поля в PlantTreeValues
                setFieldValue("speciesId", s.id)
                setFieldValue("speciesName", s.name)
                setFieldValue("speciesCategory", s.category)
                setFieldValue("speciesImage", s.imageUrl)
              }}
            />
          </div>
        ))}
      </div>

      {/* Помилка валідації */}
      {formik.errors.speciesId && formik.submitCount > 0 && (
        <p className="text-red-500 text-sm mt-3">{formik.errors.speciesId}</p>
      )}
    </div>
  )
}
