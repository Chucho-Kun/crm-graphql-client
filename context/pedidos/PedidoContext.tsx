import { ClienteProps, InputProducto, NuevoProductoType, ProductoInput } from "@/types";
import { createContext } from "react";

type Pedido = {
  id: string;
  cliente: string;
  productos: string[];
};

type PedidoContextType = {
  productos: ProductoInput[]
  agregarCliente:(cliente : ClienteProps ) => void
  agregarProducto:(productos : InputProducto[]) => void
  cantidadProductos:( nuevoProducto : NuevoProductoType ) => void
};

export const PedidoContext = createContext<PedidoContextType | null>(null)




// export default function PedidoContext() {
//   return (
//     <div>
      
//     </div>
//   )
// }

