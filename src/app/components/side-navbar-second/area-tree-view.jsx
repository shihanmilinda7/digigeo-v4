

import React, { useEffect, useState } from 'react'
import TreeView from '../common-comp/treeview'
import { AreaCompanyNode } from './area-company-treenode';
import AreaPropertyNode from './area-peoperty-tree-node';

const AreaTreeView = ({ syncPropFeatues }) => {

    const [treeViewData, setTreeViewData] = useState();

    useEffect(() => {
            console.log("kkk",syncPropFeatues)
            buildTreeViewData(syncPropFeatues)
  }, [syncPropFeatues]);

    const addNode = (nodes, company,prop_name,location) => {
  const companyNode = nodes.find((n) => n.label == company);
        if (companyNode) {
            companyNode.children.push({
                label:prop_name,
                location,
                childrem: [],
                nodetype:"property"
            })

    return companyNode;
  } else {
    const newcompanyNode = {
      label: company,
      nodetype: "company",
    //   id: getTreeViewNodeId(),
      children: [{
                label:prop_name,
                location,
                children:[],
                nodetype:"property"
            }],
    };
    nodes.push(newcompanyNode);
 
  }
};
   const buildTreeViewData = (syncPropFeatues)=>{
      
       const nodes = [];
       syncPropFeatues?.features?.map(f => { 
           addNode(nodes,f.properties.name,f.properties.prop_name,f.properties.coordinates,)
            
       })

  //     const treeData = [
  //   {
  //     label: "Node 1",
  //     children: [
  //       {
  //         label: "Node 1.1",
  //         children: [
  //           {
  //             label: "Node 1.1.1",
  //             children: [
  //               {
  //                 label: "Node 1.1.1.1",
  //                 children: [],
  //               },
  //             ],
  //           },
  //           {
  //             label: "Node 1.1.2",
  //             children: [],
  //           },
  //         ],
  //       },
  //       {
  //         label: "Node 1.2",
  //         children: [],
  //       },
  //     ],
  //   },
  //   {
  //     label: "Node 2",
  //     children: [
  //       {
  //         label: "Node 2.1",
  //         children: [],
  //       },
  //     ],
  //   },
  // ];
    setTreeViewData(nodes)
    
  }
  return (
      // <TreeView data={treeViewData} />
      
       <div>
          {treeViewData?.map((node) => (
          
            <AreaCompanyNode key={node.label}  comapanyName={node.label}   propertyNodes={node.children} />  
      ))}
    </div>
  )
}

export default AreaTreeView