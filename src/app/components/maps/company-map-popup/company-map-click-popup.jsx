
import React from 'react'
import CompanyMapClickPopupHeaderRow from './company-map-click-popup-header-row';
import CompanyMapClickPopupRow from './company-map-click-popup-row';
import { useSelector } from 'react-redux';

const CompanyMapClickPopup = ({}) => {
 
   //clickObjects
  const claimObj = useSelector(
    (state) => state.companyMapReducer.clickclaimObject
  );
  const fpropObj = useSelector(
    (state) => state.companyMapReducer.clickfPropertyObject
  );
  const assetObj = useSelector(
    (state) => state.companyMapReducer.clickassetObject
  );
  const syncPropObj = useSelector(
    (state) => state.companyMapReducer.clicksyncPropertyObject
  );


  return (

    


    <div className='flex-col max-h-unit-7xl overflow-auto m-2'>
      
      {syncPropObj && <div>
      <CompanyMapClickPopupHeaderRow label="Property Info" />
       <div className="[&>*:nth-child(odd)]:bg-gray-200 [&>*:nth-child(even)]:bg-gray-300">
      <CompanyMapClickPopupRow label={"Name"} value={syncPropObj.prop_name}/>
      <CompanyMapClickPopupRow label={"Owners"} value={syncPropObj.owners}/>
      <CompanyMapClickPopupRow label={"Area"} value={syncPropObj.area}/>
      <CompanyMapClickPopupRow label={"State/Prov"} value={syncPropObj.state_prov}/>
        <CompanyMapClickPopupRow label={"Country"} value={syncPropObj.country} />
        </div>
        </div>
      }
        {fpropObj  && <div >
        <CompanyMapClickPopupHeaderRow label="Featured Property Info" />
         <div className="[&>*:nth-child(odd)]:bg-gray-200 [&>*:nth-child(even)]:bg-gray-300">
        <CompanyMapClickPopupRow label={"Property Name"} value={fpropObj.prop_name}/>
      <CompanyMapClickPopupRow label={"Sponsored owners"} value={fpropObj.sponsoredowners}/>
      <CompanyMapClickPopupRow label={"commo_ref"} value={fpropObj.commo_ref}/>
      <CompanyMapClickPopupRow label={"assets"} value={fpropObj.assets}/>
      <CompanyMapClickPopupRow label={"resources"} value={fpropObj.resources}/>
        <CompanyMapClickPopupRow label={"sale_name"} value={fpropObj.sale_name} />
        </div> 
         </div>
      }
      {assetObj  && <div>
        <CompanyMapClickPopupHeaderRow label="Asset Info" />
         <div className="[&>*:nth-child(odd)]:bg-gray-200 [&>*:nth-child(even)]:bg-gray-300">
        <CompanyMapClickPopupRow label={"asset_name"} value={assetObj.asset_name} />
        <CompanyMapClickPopupRow label={"Alias"} value={assetObj.assetalias} />
        <CompanyMapClickPopupRow label={"asset_type"} value={assetObj.asset_type} />
        <CompanyMapClickPopupRow label={"commodities"} value={assetObj.commodities} />
        <CompanyMapClickPopupRow label={"region"} value={assetObj.region} />
        </div>
      </div>}
       {claimObj  && <div>
        <CompanyMapClickPopupHeaderRow label="Claim Info" />
         <div className="[&>*:nth-child(odd)]:bg-gray-200 [&>*:nth-child(even)]:bg-gray-300">
        <CompanyMapClickPopupRow label={"ownerref"} value={claimObj.ownerref} />
        <CompanyMapClickPopupRow label={"Claimno"} value={claimObj.claimno} />
         </div>
      </div>}
    </div>
  )
}

export default CompanyMapClickPopup