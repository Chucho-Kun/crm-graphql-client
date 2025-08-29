import { ReactNode } from "react";
import Sidebar from "../Sidebar";

export default function UserLayout({ children } : Readonly<{ children : ReactNode }> ) {
  return (
    <div className="bg-gray-200 min-h-screen" >
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="sm:w-2/3 xl:w-4/5 sm:min-h-screen p-5">
          {children}
        </main>
      </div>
    </div>
  )
}
