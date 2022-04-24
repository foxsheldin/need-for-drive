import React from "react";
import ReactDatePicker from "react-datepicker";
import "./styles.scss";

const Datepicker = ({
  id,
  textLabel,
  selected,
  onChange,
  minDate,
  maxDate,
  filterTime,
}) => {
  return (
    <div className="date">
      <label htmlFor={id} className="label">
        {textLabel}
      </label>
      <ReactDatePicker
        id={id}
        сlassName={"datepicker"}
        selected={selected}
        onChange={onChange}
        placeholderText="Введите дату и время"
        dateFormat="dd.MM.yyyy HH:mm"
        minDate={minDate}
        maxDate={maxDate}
        timeFormat="HH:mm"
        filterTime={filterTime}
        showTimeSelect
        timeIntervals={1}
        isClearable
      />
    </div>
  );
};

export default Datepicker;
