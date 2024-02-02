
 "use client"

const AreaMapClickPopupRowMultiValue = ({label, value   }) => {
  return (
      <div className='flex '>
        <span className='w-48 p-1 block'>{label}</span> 
      <div  className='flex-col ' >
        { value.map(v=> ( v && <span key="v" className='w-64 block pl-1'>{v}</span>))}  
      </div>
      </div>
  )
}

export default AreaMapClickPopupRowMultiValue