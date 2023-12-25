



import Image from 'next/image';
import   { useEffect } from 'react'
import { useSelector } from 'react-redux';

const AreaFCompanyFProperties = ({companyid}) => {

      const featuredPropertyFeatures = useSelector(
    (state) => state.areaMapReducer.featuredPropertyFeatures
    );

    const areaName = useSelector(
    (state) => state.areaMapReducer.areaMiningArea
    );
 
    //
    
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justify: "center",
      alignItems: "center", 
      padding: "1rem",
      backgroundColor:"lightgrey"
    }}>
      <div style={{ fontWeight: 600, padding: "1rem" }}>{"Properties of Area: " + areaName}</div>
      <div style={{ display: "flex", justify: "center", alignItems: "center",  }}>
        <Image
      src="./sync-prop.svg"
      width={25}
      height={10}
      alt="prop"
    />
          {featuredPropertyFeatures && featuredPropertyFeatures.features.map(fp => {
              if (companyid == fp.properties.companyid) {
                  return (<div key={fp.properties.propertyid}> {fp.properties.prop_name}</div>)
              }
          
          })}
          <Image
      src="./navigation.svg"
      width={25}
      height={10}
      alt="prop"
    />
        </div>
          
    </div>
  )
}

export default AreaFCompanyFProperties