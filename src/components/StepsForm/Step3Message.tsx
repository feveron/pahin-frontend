import type { PlantTreeValues } from "../../types/tree"
import type { FormikProps } from "formik"

export function Step3Message({
  formik,
}: {
  formik: FormikProps<PlantTreeValues>
}) {
  const { values, setFieldValue, errors } = formik
  const count = values.message.length

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4 text-dark-footer dark:text-cream-footer">
        <span className="w-7 h-7 rounded-full bg-green  text-white text-sm items-center justify-center inline-flex mr-2">
          3
        </span>
        Крок 3: Додайте особисте повідомлення
      </h2>
      <div className="relative">
        <textarea
          className="w-full border rounded-xl px-4 py-3 text-sm resize-none bg-cream-input dark:bg-dark-input  border-green dark:border-black focus:outline-none
                   focus:ring-2 focus:ring-green-light text-dark-footer dark:text-gray-300"
          rows={5}
          maxLength={200}
          placeholder="Ваше повідомлення..."
          value={values.message}
          onChange={(e) => setFieldValue("message", e.target.value)}
        />
        {/* Лічильник */}
        <span
          className={`absolute bottom-3 right-4 text-xs ${count > 180 ? "text-red-400" : "text-gray-400"}`}
        >
          {count}/200
        </span>
      </div>
      {errors.message && (
        <p className="text-red-500 text-sm mt-1">{errors.message as string}</p>
      )}
    </div>
  )
}
