import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MainLayout from "@/components/MainLayout";
import ApolloProviderComponent from "@/components/ApolloProviderComponent";

const inter = Inter({
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "CRM GraphQL",
  description: "Developed by Jesus Peralta",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="es-MX">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg" />
      </head>
      <body className={`${inter.className}`} >

        <ApolloProviderComponent>
          <MainLayout children={children} />
        </ApolloProviderComponent>

      </body>
    </html>
  );
}
