import React, { useEffect } from 'react';
import { Item } from 'components';

const List = ({ appliances, fetchAppliancesData, itemHandlers }) => {

  useEffect(() => {
    fetchAppliancesData();
  }, []);

  return (
    <div className="List">
      {appliances && appliances.map((appliance) => {
        return (
          <Item
            key={appliance._id}
            appliance={appliance}
            itemHandlers={itemHandlers}
          />
        )
      })}
    </div >
  )
}

export default List;
