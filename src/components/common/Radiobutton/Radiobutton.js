import React from "react";

const Radiobutton = ({ name, onClick, compare, nameInput }) => {
  return (
    <li className="radio-list__item">
      <input
        type="radio"
        className="visually-hidden radiobutton"
        name={nameInput}
        value={name}
        id={name}
        onClick={onClick}
        defaultChecked={name === compare ? true : false}
      />
      <label htmlFor={name}>{name}</label>
    </li>
  );
};

export default Radiobutton;
