import { BottomNavBar } from "./BottomNavBar"
import { Header } from "./Header"
import { Footer } from "../components/Footer"

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="justify-center pt-16 flex flex-col ">
      <Header />
      <main>{children}</main>
      <Footer />
      <BottomNavBar />
    </div>
  )
}
