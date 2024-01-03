import {Listbox, ListboxItem, cn} from "@nextui-org/react";
import {ListboxWrapper} from "./ListboxWrapper";
import { useMemo, useState } from "react";
 

 
//propno, prop_name, prop_alias,area, state_prov, country, region, propertyid
const PropertyFilterItemBrowser = ({properties}) => {

     const [selectedKeys, setSelectedKeys] = useState(new Set(["text"]));

  const selectedValue =  useMemo(
    () => Array.from(selectedKeys).join(", "),
    [selectedKeys]
    );
    
    return (

         <ListboxWrapper>
            <Listbox variant="flat" aria-label="Listbox menu with descriptions"
            disallowEmptySelection
          selectionMode="multiple"
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
            >
       {properties.map(p=> {
        let alias = p.prop_alias ? "Alias:" + p.prop_alias + "," :"";

        return (<ListboxItem
          key={p.propertyid}
          description= {`${alias} ${p.country},${p.state_prov},${p.area} `}
        >
         {p.prop_name}
        </ListboxItem>)}) }
            </Listbox>    
    </ListboxWrapper>
    //   <div>
    //     <div className="flex gap-4"> <span> Property id </span><span> Property Name </span> </div>
    //         {properties.map(p => (<div key={p.propertyid} className="flex gap-4"><span>{p.propertyid}</span><span>{p.prop_name}</span></div>))} 
    //     </div>
  )
}

export default PropertyFilterItemBrowser