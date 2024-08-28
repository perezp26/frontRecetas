

export const TitleModulos = ({ texto, subTexto = '' }) => {
  return (
    <div>
         <p className=' font-extralight text-2xl m-2'>{ texto }</p>
         <p className=' font-extralight text-xs  mx-2'>{ subTexto }</p>
         <hr/>
    </div>
  )
}
