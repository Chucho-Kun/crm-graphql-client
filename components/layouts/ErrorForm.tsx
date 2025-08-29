type ErrorFormProps = {
    msn: string | undefined
}

export default function ErrorForm({ msn } : ErrorFormProps ) {
  return (
    <>
      { msn && <div className={`px-3 py-1 mt-2 text-xs text-white mb-3 ${ msn === 'Acceso Correcto' ? 'bg-green-500' : 'bg-red-800' }`}>{ msn }</div> }
    </>
  )
}
