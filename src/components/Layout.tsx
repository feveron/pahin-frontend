import { Link } from "react-router-dom"
import { Footer } from "../components/Footer"

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="justify-center items-center flex flex-col ">
      <nav>
        <Link to="/">Home</Link> | <Link to="/map">Map</Link> |{" "}
        <Link to="/catalog">Catalog</Link> | <Link to="/profile">Profile</Link>
      </nav>

      <main>{children}</main>
      <Footer />
    </div>
  )
}
