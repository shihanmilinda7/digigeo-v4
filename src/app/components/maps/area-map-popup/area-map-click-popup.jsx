
import React from 'react'
import AreaMapClickPopupHeaderRow from './area-map-click-popup-header-row';
import AreaMapClickPopupRow from './area-map-click-popup-row';
import { useSelector } from 'react-redux';

const AreaMapClickPopup = ({}) => {
 
   //clickObjects
  const claimObj = useSelector(
    (state) => state.areaMapReducer.clickclaimObject
  );
  const fpropObj = useSelector(
    (state) => state.areaMapReducer.clickfPropertyObject
  );
  const assetObj = useSelector(
    (state) => state.areaMapReducer.clickassetObject
  );
  const syncPropObj = useSelector(
    (state) => state.areaMapReducer.clicksyncPropertyObject
  );


  return (

    


    <div className='flex-col max-h-unit-7xl overflow-auto m-2'>
      
      {syncPropObj && <div >
      <AreaMapClickPopupHeaderRow label="Property Info"   />
      <div className="[&>*:nth-child(odd)]:bg-gray-200 [&>*:nth-child(even)]:bg-gray-300">
      <AreaMapClickPopupRow label={"Name"} value={syncPropObj.prop_name}/>
      <AreaMapClickPopupRow label={"Owners"} value={syncPropObj.owners}/>
      <AreaMapClickPopupRow label={"Area"} value={syncPropObj.area}/>
      <AreaMapClickPopupRow label={"State/Prov"} value={syncPropObj.state_prov}/>
        <AreaMapClickPopupRow label={"Country"} value={syncPropObj.country} />
         </div>
        </div>
      }
        {fpropObj  && <div  >
        <AreaMapClickPopupHeaderRow label="Featured Property Info" />
          <div className="[&>*:nth-child(odd)]:bg-gray-200 [&>*:nth-child(even)]:bg-gray-300">
              <AreaMapClickPopupRow label={"Property Name"} value={fpropObj.prop_name}/>
              <AreaMapClickPopupRow label={"Sponsored owners"} value={fpropObj.sponsoredowners}/>
              <AreaMapClickPopupRow label={"commo_ref"} value={fpropObj.commo_ref}/>
              <AreaMapClickPopupRow label={"assets"} value={fpropObj.assets}/>
              <AreaMapClickPopupRow label={"resources"} value={fpropObj.resources}/>
              <AreaMapClickPopupRow label={"sale_name"} value={fpropObj.sale_name} /> 
          </div>
         </div>
      }
      {assetObj  && <div >
        <AreaMapClickPopupHeaderRow label="Asset Info" />
          <div className="[&>*:nth-child(odd)]:bg-gray-200 [&>*:nth-child(even)]:bg-gray-300">
              <AreaMapClickPopupRow label={"asset_name"} value={assetObj.asset_name} />
              <AreaMapClickPopupRow label={"Alias"} value={assetObj.assetalias} />
              <AreaMapClickPopupRow label={"asset_type"} value={assetObj.asset_type} />
              <AreaMapClickPopupRow label={"commodities"} value={assetObj.commodities} />
              <AreaMapClickPopupRow label={"region"} value={assetObj.region} />
          </div>
      </div>}
       {claimObj  && <div >
        <AreaMapClickPopupHeaderRow label="Claim Info" />
          <div className="[&>*:nth-child(odd)]:bg-gray-200 [&>*:nth-child(even)]:bg-gray-300">
            <AreaMapClickPopupRow label={"ownerref"} value={claimObj.ownerref} />
            <AreaMapClickPopupRow label={"Claimno"} value={claimObj.claimno} />
          </div>
      </div>}
    </div>
  )
}

export default AreaMapClickPopup