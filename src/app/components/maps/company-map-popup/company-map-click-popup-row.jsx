

const CompanyMapClickPopupRow = ({label, value}) => {
  return (
      <div className='flex '>
        <span className='w-48   p-1'>{label}</span>  
        <span className='w-64 p-1'>{value}</span>  

      </div>
  )
}

export default CompanyMapClickPopupRow