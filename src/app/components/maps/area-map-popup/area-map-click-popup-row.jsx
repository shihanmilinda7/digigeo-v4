
import React from 'react'

const AreaMapClickPopupRow = ({label, value}) => {
  return (
      <div className='flex bg-slate-200'>
        <span className='w-28 bg-slate-400 p-1'>{label}</span>  
        <span className='w-96 p-1'>{value}</span>  

      </div>
  )
}

export default AreaMapClickPopupRow