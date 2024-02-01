
import React from 'react'
import AreaMapClickPopupHeaderRow from './area-map-click-popup-header-row';
import AreaMapClickPopupRow from './area-map-click-popup-row';
import { useSelector } from 'react-redux';

import { Arimo } from "next/font/google";

const arimo = Arimo({
  subsets: ['latin'],
  display: 'swap',
})

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
    <div
      className={`flex-col max-h-unit-9xl overflow-auto m-2  ${arimo.className}`}
    >
      {syncPropObj && (
        <div>
          <AreaMapClickPopupHeaderRow label="Property Info" />
          <div className="[&>*:nth-child(odd)]:bg-gray-200 [&>*:nth-child(even)]:bg-gray-300">
            <AreaMapClickPopupRow
              label={"Name:"}
              value={syncPropObj.prop_name}
            />
            <AreaMapClickPopupRow
              label={"Owners:"}
              value={syncPropObj.owners}
            />
            <AreaMapClickPopupRow label={"Area:"} value={syncPropObj.area} />
            <AreaMapClickPopupRow
              label={"State/Prov:"}
              value={syncPropObj.state_prov}
            />
            <AreaMapClickPopupRow
              label={"Country:"}
              value={syncPropObj.country}
            />
          </div>
        </div>
      )}
      {fpropObj && (
        <div>
          <AreaMapClickPopupHeaderRow label="Featured Property Info" />
          <div className="[&>*:nth-child(odd)]:bg-gray-200 [&>*:nth-child(even)]:bg-gray-300">
            <AreaMapClickPopupRow
              label={"Sponsored owners:"}
              value={fpropObj.sponsoredowners}
              url={fpropObj.profile}
            />
            <AreaMapClickPopupRow
              label={"Property Name:"}
              value={fpropObj.prop_name}
            />
            <AreaMapClickPopupRow
              label={"Commodity:"}
              value={fpropObj.commo_ref}
            />
            <AreaMapClickPopupRow
              label={"Asset List:"}
              value={fpropObj.assets}
            />
            <AreaMapClickPopupRow
              label={"Resources"}
              value={fpropObj.resources}
            />
            <AreaMapClickPopupRow
              label={"Map Area:"}
              value={fpropObj.map_area}
            />
            <AreaMapClickPopupRow
              label={"Map Event:"}
              value={fpropObj.sale_name}
            />
            <AreaMapClickPopupRow
              label={"Ownership:"}
              value={fpropObj.owners}
            />
            <AreaMapClickPopupRow
              label={"External Property Page:"}
              value={"Open Url"}
              url={fpropObj.prop_exturl}
              
            />
          </div>
        </div>
      )}
      {assetObj && (
        <div>
          <AreaMapClickPopupHeaderRow label="Asset Info" />
          <div className="[&>*:nth-child(odd)]:bg-gray-200 [&>*:nth-child(even)]:bg-gray-300">
            <AreaMapClickPopupRow
              label={"Asset Name:"}
              value={assetObj.asset_name}
            />
            <AreaMapClickPopupRow
              label={"Alias:"}
              value={assetObj.assetalias}
            />
            <AreaMapClickPopupRow label={"Type:"} value={assetObj.asset_type} />
            <AreaMapClickPopupRow
              label={"Commodities:"}
              value={assetObj.commodities}
            />
            <AreaMapClickPopupRow label={"Region:"} value={assetObj.region} />
          </div>
        </div>
      )}
      {claimObj && (
        <div>
          <AreaMapClickPopupHeaderRow label="Claim Info" />
          <div className="[&>*:nth-child(odd)]:bg-gray-200 [&>*:nth-child(even)]:bg-gray-300">
            <AreaMapClickPopupRow label={"Owner:"} value={claimObj.ownerref} />
            <AreaMapClickPopupRow
              label={"Claim no:"}
              value={claimObj.claimno}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default AreaMapClickPopup