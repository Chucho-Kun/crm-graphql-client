export type UsuarioInput = {
    nombre: string
    apellido: string
    email: string
    password: string
}

export type NuevoUsuarioResponse = {
    nuevoUsuario: {
        id: string
        nombre: string
        apellido: string
        email: string
    }
}

export type AutenticarUsuarioInput = {
    email: string
    password: string
}

export type AutenticarUsuarioResponse = {
    autenticarUsuario: {
        token: string
    }
}

export type ClientesVendedorResponse = {
    obtenerClientesVendedor: {
        nombre: string
        apellido: string
        empresa: string
        email: string
        id: string
        vendedor: string
    }[]
}

export type ObtenerUsuarioResponse = {
    obtenerUsuario:{
        id: string
        nombre: string
        apellido: string
    }
}