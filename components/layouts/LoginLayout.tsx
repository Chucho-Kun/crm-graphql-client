import { ReactNode } from 'react'

export default function LoginLayout({ children }: Readonly<{ children: ReactNode; }>) {
  return (
    <div className="bg-gray-800 min-h-screen flex flex-col justify-center" >
      {children}
    </div>
  )
}
