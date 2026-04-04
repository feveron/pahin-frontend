import { Link, Outlet } from "react-router-dom"

export function ProfileLayout() {
  return (
    <div className="text-green-700 justify-center items-center flex flex-col gap-4">
      <h2>Profile</h2>

      <nav>
        <Link to=".">Trees</Link> |{" "}
        <Link to="settings">Settings</Link> |{" "}
        <Link to="certificates">Certificates</Link>
      </nav>

      <Outlet />
    </div>
  )
}