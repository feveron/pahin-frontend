import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { useState } from "react"
import { useCurrentUser } from "../../hooks/useCurrentUser"
import { apiClient } from "../../services/apiClient"
import { Eye, EyeOff, Lock } from "lucide-react"

const profileSchema = Yup.object({
  name: Yup.string().min(2, "Мінімум 2 символи").required("Введіть ім'я"),
})

const passwordSchema = Yup.object({
  currentPassword: Yup.string().required("Введіть поточний пароль"),
  newPassword: Yup.string()
    .min(6, "Мінімум 6 символів")
    .required("Введіть новий пароль"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Паролі не збігаються")
    .required("Підтвердіть пароль"),
})

export default function ProfileSettingsPage() {
  const { user } = useCurrentUser()
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [profileSuccess, setProfileSuccess] = useState(false)
  const [passwordSuccess, setPasswordSuccess] = useState(false)

  return (
    <div className="w-full rounded-3xl bg-cream-comment dark:bg-dark-footer mx-auto px-4 mt-6 py-8 flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-dark-footer dark:text-cream-footer">
        Налаштування профілю
      </h1>

      {/* ОСОБИСТА ІНФОРМАЦІЯ */}
      <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 flex flex-col gap-5">
        <h2 className="text-lg font-semibold text-dark-footer dark:text-white">
          Особиста інформація
        </h2>

        <Formik
          initialValues={{ name: user?.name ?? "" }}
          validationSchema={profileSchema}
          enableReinitialize
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await apiClient.patch("/users/me", {
                name: values.name,
              })
              // оновлюємо localStorage
              const stored = localStorage.getItem("user")
              if (stored) {
                const parsed = JSON.parse(stored)
                localStorage.setItem(
                  "user",
                  JSON.stringify({ ...parsed, name: values.name })
                )
              }
              setProfileSuccess(true)
              setTimeout(() => setProfileSuccess(false), 3000)
            } catch {
              // handle error
            } finally {
              setSubmitting(false)
            }
          }}
        >
          {({ isSubmitting, dirty }) => (
            <Form className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* ІМ'Я — редагується */}
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] uppercase font-semibold tracking-wide text-input-text dark:text-gray-400">
                    Повне ім'я
                  </label>
                  <Field
                    name="name"
                    type="text"
                    className="w-full rounded-xl bg-cream dark:bg-neutral-800 px-4 py-3 text-sm text-dark-footer dark:text-white outline-none focus:ring-2 focus:ring-green transition"
                  />
                  <ErrorMessage
                    name="name"
                    component="p"
                    className="text-xs text-red-500"
                  />
                </div>

                {/* EMAIL — заблокований */}
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] uppercase font-semibold tracking-wide text-input-text dark:text-gray-400">
                    Електронна пошта
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={user?.email ?? ""}
                      disabled
                      className="w-full rounded-xl bg-cream dark:bg-neutral-800 px-4 py-3 text-sm text-gray-400 dark:text-gray-500 outline-none cursor-not-allowed opacity-70"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 dark:text-gray-600 text-xs">
                      <Lock />
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                {profileSuccess && (
                  <p className="text-sm text-green font-medium">Збережено</p>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting || !dirty}
                  className="px-6 py-2.5 bg-green text-white rounded-full text-sm font-medium disabled:opacity-50 transition hover:bg-green/90"
                >
                  {isSubmitting ? "Збереження..." : "Зберегти зміни"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {/* БЕЗПЕКА */}
      <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 flex flex-col gap-5">
        <h2 className="text-lg font-semibold text-dark-footer dark:text-white">
          Безпека
        </h2>

        <Formik
          initialValues={{
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          }}
          validationSchema={passwordSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              await apiClient.patch("/users/me", {
                currentPassword: values.currentPassword,
                password: values.newPassword,
              })
              setPasswordSuccess(true)
              setTimeout(() => setPasswordSuccess(false), 3000)
              resetForm()
            } catch {
              // handle error
            } finally {
              setSubmitting(false)
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-4">
              {/* ПОТОЧНИЙ ПАРОЛЬ */}
              <div className="flex flex-col gap-1">
                <label className="text-[11px] uppercase font-semibold tracking-wide text-input-text dark:text-gray-400">
                  Поточний пароль
                </label>
                <div className="relative">
                  <Field
                    name="currentPassword"
                    type={showCurrent ? "text" : "password"}
                    className="w-full rounded-xl bg-cream dark:bg-neutral-800 px-4 py-3 text-sm text-dark-footer dark:text-white outline-none focus:ring-2 focus:ring-green transition pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrent((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-green hover:text-green-hover"
                  >
                    {showCurrent ? <Eye /> : <EyeOff />}
                  </button>
                </div>
                <ErrorMessage
                  name="currentPassword"
                  component="p"
                  className="text-xs text-red-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* НОВИЙ ПАРОЛЬ */}
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] uppercase font-semibold tracking-wide text-input-text dark:text-gray-400">
                    Новий пароль
                  </label>
                  <div className="relative">
                    <Field
                      name="newPassword"
                      type={showNew ? "text" : "password"}
                      className="w-full rounded-xl bg-cream dark:bg-neutral-800 px-4 py-3 text-sm text-dark-footer dark:text-white outline-none focus:ring-2 focus:ring-green transition pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNew((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-green hover:text-green-hover"
                    >
                      {showNew ? <Eye /> : <EyeOff />}
                    </button>
                  </div>
                  <ErrorMessage
                    name="newPassword"
                    component="p"
                    className="text-xs text-red-500"
                  />
                </div>

                {/* ПІДТВЕРДЖЕННЯ */}
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] uppercase font-semibold tracking-wide text-input-text dark:text-gray-400">
                    Підтвердження
                  </label>
                  <div className="relative">
                    <Field
                      name="confirmPassword"
                      type={showConfirm ? "text" : "password"}
                      className="w-full rounded-xl bg-cream dark:bg-neutral-800 px-4 py-3 text-sm text-dark-footer dark:text-white outline-none focus:ring-2 focus:ring-green transition pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-green hover:text-grenn-hover"
                    >
                      {showConfirm ? <Eye /> : <EyeOff />}
                    </button>
                  </div>
                  <ErrorMessage
                    name="confirmPassword"
                    component="p"
                    className="text-xs text-red-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                {passwordSuccess && (
                  <p className="text-sm text-green font-medium">
                    Пароль змінено
                  </p>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-green text-white rounded-full text-sm font-medium disabled:opacity-50 transition hover:bg-green/90"
                >
                  {isSubmitting ? "Збереження..." : "Змінити пароль"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
