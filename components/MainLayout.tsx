"use client";
import React from "react";
import UserLayout from "./layouts/UserLayout";
import LoginLayout from "./layouts/LoginLayout";
import { usePathname } from "next/navigation";

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const login = pathname.includes("/login");

  return (
    <>
      {login ? (
        <LoginLayout>{children}</LoginLayout>
      ) : (
        <UserLayout>{children}</UserLayout>
      )}
    </>
  );
}
