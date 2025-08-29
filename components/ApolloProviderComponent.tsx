"use client"
import client from "@/config/apollo"
import { ApolloProvider } from "@apollo/client/react"

export default function ApolloProviderComponent({ children }: { children : React.ReactNode}) {
  return (
    <ApolloProvider client={ client }>
        { children }
    </ApolloProvider>
  )
}
