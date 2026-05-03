import { Formik, Form } from "formik"
import * as Yup from "yup"
import { useSearchParams } from "react-router-dom"
import { Step1TreeSelect } from "../components/StepsForm/Step1SelectTree"
import { Step2Location } from "../components/StepsForm/Step2Location"
import { Step3Message } from "../components/StepsForm/Step3Message"
import { Step4Payment } from "../components/StepsForm/Step4Payment"
import { FormCard } from "../components/TreeCards/FormCard"
import { useCurrentUser } from "../hooks/useCurrentUser"
import type { PlantTreeValues } from "../types/tree"

// Валідація єдина для всієї форми (без кроків)
const validationSchema = Yup.object({
  speciesId: Yup.string().required("Оберіть дерево"),
  latitude: Yup.number().nullable().required("Вкажіть місце на карті"),
  longitude: Yup.number().nullable().required("Вкажіть місце на карті"),
  message: Yup.string().max(200, "Максимум 200 символів"),
})

export default function PlantTreePage() {
  const { user } = useCurrentUser()
  const [searchParams] = useSearchParams()
  const preselectedId = searchParams.get("speciesId") ?? "" // ← тут, всередині компонента

  const initialValues: PlantTreeValues = {
    speciesId: preselectedId, // ← тепер preselectedId вже визначений
    speciesName: "",
    speciesCategory: "",
    speciesImage: "",
    latitude: null,
    longitude: null,
    locationName: "",
    message: "",
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnChange={false}
      onSubmit={async (values) => {
        console.log("Submit:", values)
      }}
    >
      {(formik) => (
        <Form className="min-h-screen bg-cream dark:bg-dark pt-16">
          {/* Заголовок зверху */}
          <div className="max-w-6xl mx-auto px-4 pt-8 pb-4">
            <h1 className="text-5xl font-bold mb-2 text-black dark:text-cream-footer">
              Створіть свою{" "}
              <span className="text-green italic font-serif ">спадщину</span>
            </h1>
            <p className="text-sm text-gray-600 max-w-lg">
              Приєднуйтесь до нашої спільноти свідомих українців. Кожне
              зареєстроване дерево допомагає нам досягти мети — 10 000 нових
              дерев до 2028 року.
            </p>
          </div>

          <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
            {/* Ліва частина — форма */}
            <div className="flex-1 min-w-0">
              <Step1TreeSelect formik={formik} />
              <Step2Location formik={formik} />
              <Step3Message formik={formik} />
              <Step4Payment
                onSubmit={() => formik.submitForm()}
                isLoading={formik.isSubmitting}
              />
            </div>

            {/* Права частина — live прев'ю */}
            <div className="lg:w-[420px] lg:sticky lg:top-24 lg:self-start">
              <FormCard
                image={formik.values.speciesImage}
                title={formik.values.speciesName || "Назва дерева"}
                username={user?.name ?? "Ваше ім'я"}
                location={formik.values.locationName || "Місце не вибрано"}
                price={80}
                commentValue={formik.values.message}
              />

              <div className="mt-4 bg-green rounded-2xl p-5 text-white">
                <p className="text-sm font-semibold mb-1">📈 Прогноз впливу</p>
                <p className="text-xs opacity-80 mb-3">
                  Це дерево поглинатиме приблизно 22 кг CO₂ щорічно після
                  досягнення зрілості.
                </p>
                <div className="relative h-2 bg-white/20 rounded-full">
                  <div className="absolute left-0 top-0 h-2 bg-white rounded-full w-[30%]" />
                </div>
                <div className="flex justify-between text-xs opacity-60 mt-1">
                  <span>Саджанець</span>
                  <span>Доросле дерево</span>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  )
}
