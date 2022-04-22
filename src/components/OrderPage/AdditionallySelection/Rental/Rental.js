import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { setStartDateRate, setEndDateRate } from "../../../../redux/orderSlice";
import "./styles.scss";

const Rental = () => {
  const dispatch = useDispatch();
  const { startDateRate, endDateRate } = useSelector((state) => state.order);
  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(null);
  const currentDate = new Date();

  useEffect(() => {
    setDateFrom(startDateRate ? new Date(startDateRate) : null);
    setDateTo(endDateRate ? new Date(endDateRate) : null);
  }, [startDateRate, endDateRate]);

  const filterPassedStartTime = (time) => {
    const selectedDate = new Date(time);
    if (dateTo) {
      return (
        currentDate.getTime() < selectedDate.getTime() &&
        selectedDate.getTime() < dateTo.getTime()
      );
    }
    return currentDate.getTime() < selectedDate.getTime();
  };

  const filterPassedEndTime = (time) => {
    const selectedDate = new Date(time);
    if (dateFrom) {
      return (
        dateFrom.getTime() < selectedDate.getTime() &&
        selectedDate.getTime() > dateFrom.getTime()
      );
    }
    return currentDate.getTime() < selectedDate.getTime();
  };

  return (
    <div className="rental">
      <label className="label">Дата аренды</label>
      <div className="rental__dates">
        <div className="rental__date-from">
          <label htmlFor="dateFrom" className="label">
            С
          </label>
          <DatePicker
            сlassName={"datepicker"}
            selected={dateFrom}
            onChange={(date) =>
              dispatch(setStartDateRate(date?.getTime() ?? null))
            }
            placeholderText="Введите дату и время"
            dateFormat="dd.MM.yyyy HH:mm"
            minDate={new Date()}
            maxDate={dateTo}
            timeFormat="HH:mm"
            filterTime={filterPassedStartTime}
            showTimeSelect
            timeIntervals={1}
            isClearable
          />
        </div>
        <div className="rental__date-to">
          <label htmlFor="dateTo" className="label">
            По
          </label>
          <DatePicker
            сlassName={"datepicker"}
            selected={dateTo}
            onChange={(date) =>
              dispatch(setEndDateRate(date?.getTime() ?? null))
            }
            placeholderText="Введите дату и время"
            dateFormat="dd.MM.yyyy HH:mm"
            minDate={dateFrom ?? new Date()}
            timeFormat="HH:mm"
            filterTime={filterPassedEndTime}
            showTimeSelect
            timeIntervals={1}
            isClearable
          />
        </div>
      </div>
    </div>
  );
};

export default Rental;
