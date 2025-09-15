import { gql } from "@apollo/client";

export const OBTENER_PRODUCTOS = gql`
query ObtenerProductos {
  obtenerProductos {
    id
    nombre
    existencia
    precio
  }
}`;

export const OBTENER_PRODUCTO = gql`
query ObtenerProducto($id: ID) {
  obtenerProducto(id: $id) {
    id
    nombre
    existencia
    precio
  }
}`;

export const ACTUALIZAR_PRODUCTO = gql`
mutation ActualizaProducto($id: ID, $input: ProductoInput) {
  actualizaProducto(id: $id, input: $input) {
    id
    nombre
    existencia
    precio
  }
}`;

export const NUEVO_PRODUCTO = gql`
mutation NuevoProducto($input: ProductoInput) {
  nuevoProducto(input: $input) {
    id
    nombre
    existencia
    precio
  }
}`;

export const ELIMINAR_PRODUCTO = gql`
mutation Mutation($id: ID!) {
  eliminarProducto(id: $id)
}`;
