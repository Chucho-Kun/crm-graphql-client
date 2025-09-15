import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";

const httpLink = new HttpLink({
  uri: 'http://localhost:4000'
});

const authLink = new SetContextLink((prevContext, operation) => {
  if (typeof window === "undefined") return prevContext;

  const token = localStorage.getItem('token');
  return {
    headers: {
      ...prevContext.headers,
      authorization: token ? token : "",
    }
  };
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        obtenerClientesVendedor: {
          keyArgs: false,
          merge(existing = [], incoming: any[]) {
            return [...incoming];
          }
        },
        obtenerPedidosVendedor: {
          keyArgs: false, // ✅ indica que no hay argumentos que distingan esta query
          merge(existing = [], incoming: any[]) {
            return incoming; // ✅ reemplaza de forma segura sin perder normalización
          }
        },
        obtenerProductos: {
          keyArgs: false,
          merge(existing = [], incoming: any[]) {
            return incoming;
          }
        }
      }
    },
    Cliente: {
      keyFields: ['id']
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache
});

export default client;
