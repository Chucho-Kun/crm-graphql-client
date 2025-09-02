type ErrorFormProps = {
    msn: string | undefined
}

export default function ErrorForm({ msn } : ErrorFormProps ) {

  const expresiones = ['correcto','correctamente','exitosamente'];
  const correcto = expresiones.some( palabra => msn?.includes(palabra) )

  return (
    <>
      { msn && <div className={`px-3 py-1 text-xs text-white mb-3 ${ correcto ? 'bg-green-500' : 'bg-red-800' }`}>{ msn }</div> }
    </>
  )
}
