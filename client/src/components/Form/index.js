import React, { useState } from 'react';
import { Button } from 'components';
import './styles.scss';

const Form = ({ addAppliance }) => {
  const [error, setError] = useState(null);

  const formHandler = async (e) => {
    e.preventDefault();
    let { value } = e.target.name;
    const appliance = { name: value, status: false };
    fetch('/api/appliance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ appliance })
    })
      .then(res => res.json())
      .then(result => {
        addAppliance(result);
        e.target.name.value = '';
      },
        (error) => {
          setError(error);
        })
  }

  return (
    <form className="Form" onSubmit={formHandler}>
      <h3>Add new appliance</h3>
      <input name="name" type="text" placeholder="Appliance name" required />
      <Button type="submit" text="Add"/>
      {error && <div>Error: {error.message} </div>}
    </form>
  )
}

export default Form;
