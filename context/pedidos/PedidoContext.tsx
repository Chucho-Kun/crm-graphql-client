import { ClienteProps } from "@/types";
import { createContext } from "react";

type Pedido = {
  id: string;
  cliente: string;
  productos: string[];
};

type PedidoContextType = {
  agregarCliente:(cliente : ClienteProps ) => void;
};

export const PedidoContext = createContext<PedidoContextType | null>(null)




// export default function PedidoContext() {
//   return (
//     <div>
      
//     </div>
//   )
// }

