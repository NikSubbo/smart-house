import React, { useState } from 'react';
import { Button } from 'components';
import './styles.scss';

const Item = ({ appliance, itemHandlers }) => {
  const [edit, setEdit] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [inputError, setInputError] = useState('');
  const [error, setError] = useState(null);

  const { name, status, _id } = appliance;
  const { deleteHandler, updateHandler } = itemHandlers;
  const switchColor = status ? 'switch green' : 'switch red';
  const switchText = status ? 'ON' : 'OFF';

  const toggleEditOption = () => {
    setEdit(!edit);
    setInputError(false);
  }

  const handleChange = (e) => {
    setInputVal(e.target.value)
  }

  const handleClick = (e) => {
    e.preventDefault();
    const { name } = e.target;

    if (name === 'switch') {
      fetch(`/api/appliance/${_id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: !status })
      })
        .then(res => res.json())
        .then(result => {
          updateHandler(result);
        },
          (error) => {
            setError(error);
          });
    }

    if (name === 'edit') {
      if (!inputVal) {
        setInputError('Please fill out this field')
      } else {
        fetch(`/api/appliance/${_id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: inputVal })
        })
          .then(res => res.json())
          .then(result => {
            updateHandler(result);
            toggleEditOption();
            setInputVal('');
          },
            (error) => {
              setError(error);
            });
      }
    }

    if (name === 'delete') {
      fetch(`/api/appliance/${_id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      })
        .then(res => res.text())
        .then(result => {
          if (result === "OK") {
            deleteHandler(_id);
          } else {
            throw new Error('Something went wrong');
          }
        },
          (error) => {
            setError(error);
          })
    }
  }

  return (
    <>
      { error ? <div>Error: {error.message} </div> :
        <div className="Item">
          {!edit ? (
            <>
              <div className="name">{name}</div>
              <div className="btnsWrapper">
                <Button clickHandler={toggleEditOption} text="Edit"/>
                <Button name="switch" clickHandler={handleClick} text={switchText} className={switchColor}/>
                <Button name="delete" clickHandler={handleClick} text="Delete"/>
              </div>
            </>
          ) : (
              <>
                {inputError ? <div className="inputError">{inputError}</div> : (
                  <>
                    <input value={inputVal} onChange={handleChange} className="editField" />
                    <Button name="edit" clickHandler={handleClick} text="Submit"/>
                  </>)}
                <Button clickHandler={toggleEditOption} text="Return" className="return" />
              </>
            )}
        </div>
      }
    </>
  )
}

export default Item;
