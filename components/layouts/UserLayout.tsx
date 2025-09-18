import { ReactNode } from "react";
import Sidebar from "../Sidebar";
import Header from "./Header";

export default function UserLayout({ children }: Readonly<{ children: ReactNode }>) {



  return (
    <>
      <div className="bg-gray-200 min-h-screen" >
        <div className="sm:flex min-h-screen">
          <Sidebar />
          <main className="sm:w-2/3 xl:w-4/5 sm:min-h-screen p-5">
            <Header />
            {children}
          </main>
        </div>
      </div>

      <footer className="bg-black p-4 text-center">
        <p className="text-white text-xs">CRM - Next Todos los derechos reservados 2025</p>
      </footer>
    </>
  )
}
