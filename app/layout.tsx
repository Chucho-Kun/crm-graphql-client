import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MainLayout from "@/components/MainLayout";
import ApolloProviderComponent from "@/components/ApolloProviderComponent";
import PedidoState from "@/context/pedidos/PedidoState";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CRM GraphQL",
  description: "Developed by Jesus Peralta",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-MX">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg" />
      </head>
      <body className={`${inter.className}`}>
        <ApolloProviderComponent>
          <PedidoState>
            <MainLayout>{children}</MainLayout>
          </PedidoState>
        </ApolloProviderComponent>
      </body>
    </html>
  );
}
