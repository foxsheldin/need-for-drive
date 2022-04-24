import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { setStartDateRate, setEndDateRate } from "../../../../redux/orderSlice";
import Datepicker from "../../../common/Datepicker/Datepicker";
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
        <Datepicker
          id={"dateFrom"}
          textLabel={"С"}
          selected={dateFrom}
          onChange={(date) =>
            dispatch(setStartDateRate(date?.getTime() ?? null))
          }
          minDate={new Date()}
          maxDate={dateTo}
          filterTime={filterPassedStartTime}
        />
        <Datepicker
          id={"dateTo"}
          textLabel={"По"}
          selected={dateTo}
          onChange={(date) => dispatch(setEndDateRate(date?.getTime() ?? null))}
          minDate={dateFrom ?? new Date()}
          filterTime={filterPassedEndTime}
        />
      </div>
    </div>
  );
};

export default Rental;
