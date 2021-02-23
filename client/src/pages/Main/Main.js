import React, { useState } from 'react';
import { Form, List } from 'components';
import './styles.scss';

const Main = () => {
  const [appliances, setAppliances] = useState([]);
  const [error, setError] = useState(null);

  const addAppliance = (a) => {
    const updatedAppliances = [...appliances];
    updatedAppliances.push(a);
    setAppliances(updatedAppliances);
  };

  const itemHandlers = {
    deleteHandler: (id) => {
      const updatedAppliances = appliances.filter(el => id !== el._id);
      setAppliances(updatedAppliances);
    },
    updateHandler: (a) => {
      const applianceToUpdate = appliances.find(el => a._id === el._id);
      const updatedAppliances = [...appliances];
      updatedAppliances.splice(updatedAppliances.indexOf(applianceToUpdate), 1, a)
      setAppliances(updatedAppliances);
    },
  }

  const fetchAppliancesData = async () => {
    fetch('/api', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(result => {
        setAppliances(result);
      },
        (error) => {
          setError(error);
        })
  }

  return (
    <>
      <div className="Main">
        {error ? <div>Error: {error.message} </div> :
          <>
          <header>
            <h2>SmartHouse</h2>
          </header>
          <main>
          <Form addAppliance={addAppliance} />
            <List
              fetchAppliancesData={fetchAppliancesData}
              appliances={appliances}
              itemHandlers={itemHandlers}
            />
          </main>
          </>
        }
      </div>
    </>
  )
}

export default Main;
