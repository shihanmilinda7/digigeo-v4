



import   { useEffect } from 'react'
import { useSelector } from 'react-redux';

const AreaFCompanyFProperties = ({companyid}) => {

      const featuredPropertyFeatures = useSelector(
    (state) => state.areaMapReducer.featuredPropertyFeatures
    );

    const areaName = useSelector(
    (state) => state.areaMapReducer.areaMiningArea
    );
 
    
    
  return (
      <div style={{display: "flex", flexDirection:"column", justify:"center", alignItems:"center", padding:"1rem"}}>
        <div style={{fontWeight:600, padding:"1rem"}}>{"Properties of Area: " + areaName}</div>
          {featuredPropertyFeatures && featuredPropertyFeatures.features.map(fp => {
              if (companyid == fp.properties.companyid) {
                  return (<div key={fp.properties.propertyid}> {fp.properties.prop_name}</div>)
              }
          
          })}
          
    </div>
  )
}

export default AreaFCompanyFProperties