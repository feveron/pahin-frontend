import { BottomNavBar } from "./BottomNavBar"
import { Header } from "./Header"

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="justify-center items-center flex flex-col ">
      <Header />
      <main className="pb-16">{children}</main>
      <BottomNavBar />
    </div>
  )
}
