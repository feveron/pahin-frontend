import { Route, Routes } from "react-router-dom"
import { HomePage } from "./pages/HomePage"
import { ProfileSettingsPage } from "./pages/profile/ProfileSettingsPage"
import { CatalogPage } from "./pages/CatalogPage"
import { ProfileLayout } from "./pages/profile/ProfileLayout"
import { MyTreesPage } from "./pages/profile/MyTreesPage"
import { MyCertificatesPage } from "./pages/profile/MyCertificatesPage"
import { Layout } from "./components/Layout"
import { MapPage } from "./pages/MapPage"

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/profile" element={<ProfileLayout />}>
          <Route index element={<MyTreesPage />} />
          <Route path="certificates" element={<MyCertificatesPage />} />
          <Route path="settings" element={<ProfileSettingsPage />} />
        </Route>
      </Routes>
    </Layout>
  )
}

export default App
