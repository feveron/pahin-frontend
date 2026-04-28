import { BottomNavBar } from "./BottomNavBar"
import { Header } from "./Header"
import { Footer } from "../components/Footer"
import { Outlet } from "react-router-dom"

interface LayoutProps {
  noFooter?: boolean
}

export function Layout({ noFooter = false }: LayoutProps) {
  return (
    <div className="justify-center items-center flex flex-col ">
      <Header />
      <main className="flex-grow w-full">
        <Outlet />
      </main>
      {!noFooter && <Footer />}
      <BottomNavBar />
    </div>
  )
}
