import { Link, Outlet } from "react-router-dom"

export function ProfileLayout() {
  return (
    <div>
      <h2>Profile</h2>

      <nav>
        <Link to=".">Info</Link> |{" "}
        <Link to="settings">Settings</Link>
        <Link to="certificates">Certificates</Link>
      </nav>

      <Outlet />
    </div>
  )
}