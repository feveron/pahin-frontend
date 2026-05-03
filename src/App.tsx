import { Route, Routes, Navigate, Outlet } from "react-router-dom"
import { HomePage } from "./pages/HomePage"
import { ProfileSettingsPage } from "./pages/profile/ProfileSettingsPage"
import { CatalogPage } from "./pages/CatalogPage"
import { ProfileLayout } from "./pages/profile/ProfileLayout"
import { MyTreesPage } from "./pages/profile/MyTreesPage"
import { MyCertificatesPage } from "./pages/profile/MyCertificatesPage"
import { Layout } from "./components/Layout"
import MapPage from "./pages/MapPage"
import { SignInPage } from "./pages/SignInPage"
import { SignUpPage } from "./pages/SignUpPage"

function App() {
  return (
    <Routes>
      {/* auth routes */}
      <Route element={<PublicRoute />}>
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Route>

      {/* guest + user routes */}
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
      </Route>

      <Route element={<Layout noFooter />}>
        <Route path="/map" element={<MapPage />} />
      </Route>

      {/* only authorized routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/catalog" element={<CatalogPage />} />

          <Route path="/profile" element={<ProfileLayout />}>
            <Route index element={<MyTreesPage />} />
            <Route path="certificates" element={<MyCertificatesPage />} />
            <Route path="settings" element={<ProfileSettingsPage />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export function PublicRoute() {
  const token = localStorage.getItem("token")

  if (token) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export function ProtectedRoute() {
  const token = localStorage.getItem("token")

  if (!token) {
    return <Navigate to="/sign-in" replace />
  }

  return <Outlet />
}

export default App