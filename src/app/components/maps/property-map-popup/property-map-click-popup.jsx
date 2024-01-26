
import React from 'react'
import PropertyMapClickPopupHeaderRow from './property-map-click-popup-header-row';
import PropertyMapClickPopupRow from './property-map-click-popup-row';
import { useSelector } from 'react-redux';

const PropertyMapClickPopup = ({}) => {
 
   //clickObjects
  const claimObj = useSelector(
    (state) => state.propertiesMapReducer.clickclaimObject
  );
  const fpropObj = useSelector(
    (state) => state.propertiesMapReducer.clickfPropertyObject
  );
  const assetObj = useSelector(
    (state) => state.propertiesMapReducer.clickassetObject
  );
  const syncPropObj = useSelector(
    (state) => state.propertiesMapReducer.clicksyncPropertyObject
  );


  return (

    


    <div className='flex-col max-h-unit-7xl overflow-scroll'>
      
      {syncPropObj && <div>
      <PropertyMapClickPopupHeaderRow label="Property Info" />
      <PropertyMapClickPopupRow label={"Name"} value={syncPropObj.prop_name}/>
      <PropertyMapClickPopupRow label={"Owners"} value={syncPropObj.owners}/>
      <PropertyMapClickPopupRow label={"Area"} value={syncPropObj.area}/>
      <PropertyMapClickPopupRow label={"State/Prov"} value={syncPropObj.state_prov}/>
      <PropertyMapClickPopupRow label={"Country"} value={syncPropObj.country} />
        </div>
      }
        {fpropObj  && <div >
      <PropertyMapClickPopupHeaderRow label="Featured Property Info" />
      <PropertyMapClickPopupRow label={"Property Name"} value={fpropObj.prop_name}/>
      <PropertyMapClickPopupRow label={"Sponsored owners"} value={fpropObj.sponsoredowners}/>
      <PropertyMapClickPopupRow label={"commo_ref"} value={fpropObj.commo_ref}/>
      <PropertyMapClickPopupRow label={"assets"} value={fpropObj.assets}/>
      <PropertyMapClickPopupRow label={"resources"} value={fpropObj.resources}/>
      <PropertyMapClickPopupRow label={"sale_name"} value={fpropObj.sale_name} /> 
         </div>
      }
      {assetObj  && <div>
        <PropertyMapClickPopupHeaderRow label="Asset Info" />
        <PropertyMapClickPopupRow label={"asset_name"} value={assetObj.asset_name} />
        <PropertyMapClickPopupRow label={"Alias"} value={assetObj.assetalias} />
        <PropertyMapClickPopupRow label={"asset_type"} value={assetObj.asset_type} />
        <PropertyMapClickPopupRow label={"commodities"} value={assetObj.commodities} />
        <PropertyMapClickPopupRow label={"region"} value={assetObj.region} />
      </div>}
       {claimObj  && <div>
        <PropertyMapClickPopupHeaderRow label="Claim Info" />
        <PropertyMapClickPopupRow label={"ownerref"} value={claimObj.ownerref} />
        <PropertyMapClickPopupRow label={"Claimno"} value={claimObj.claimno} />
         
      </div>}
    </div>
  )
}

export default PropertyMapClickPopup