import React from 'react';
import './styles.scss';

const Button = ({ type, text, name, clickHandler, className }) => {
  let updatedClassName = "Button";
  if (className !== undefined) updatedClassName = `Button ${className}`;

  return (
    <button className={updatedClassName} type={type} name={name} onClick={clickHandler}>
      {text}
    </button >
  )
}

export default Button;
