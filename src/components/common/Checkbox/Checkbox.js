import React from "react";

const Checkbox = ({ id, onChange, checked, textLabel }) => {
  return (
    <li className="checkbox-list__item">
      <input
        type="checkbox"
        className="visually-hidden checkbutton"
        id={id}
        onChange={onChange}
        checked={checked}
      />
      <label htmlFor={id} className="label">
        {textLabel}
      </label>
    </li>
  );
};

export default Checkbox;
