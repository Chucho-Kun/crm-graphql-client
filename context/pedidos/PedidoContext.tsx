import { ClienteProps, InputProducto, NuevoProductoType, ProductoInput } from "@/types";
import { createContext } from "react";

type PedidoContextType = {
  productos: NuevoProductoType[]
  agregarCliente:(cliente : ClienteProps ) => void
  agregarProducto:(productos : InputProducto[]) => void
  cantidadProductos:( nuevoProducto : NuevoProductoType ) => void
  actualizaTotal: () => void
  total: number
  cliente: ClienteProps[]
  id: string
};

export const PedidoContext = createContext<PedidoContextType | null>(null)


// export default function PedidoContext() {
//   return (
//     <div>
      
//     </div>
//   )
// }

