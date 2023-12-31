

const CompanyMapClickPopupRow = ({label, value}) => {
  return (
      <div className='flex bg-slate-200'>
        <span className='w-48 bg-slate-400 p-1'>{label}</span>  
        <span className='w-64 p-1'>{value}</span>  

      </div>
  )
}

export default CompanyMapClickPopupRow