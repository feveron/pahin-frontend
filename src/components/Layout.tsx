import { Link } from "react-router-dom"

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/map">Map</Link> |{" "}
        <Link to="/catalog">Catalog</Link> |{" "}
        <Link to="/profile">Profile</Link>
      </nav>

      <main>{children}</main>
    </div>
  )
}