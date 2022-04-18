import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./styles.scss";

const Breadcrumbs = () => {
  const { selectedCity, selectedPoint, selectedCar } = useSelector(
    (state) => state.order
  );
  const className = "breadcrumbs__item";
  const isActiveBreadcrumbs = ({ isActive }) =>
    isActive ? className + " breadcrumbs__item_active" : className;

  const [stepsBreadcrumbs, setStepsBreadcrumbs] = useState([
    {
      name: "Местоположение",
      linkTo: "/order/point",
      disabled: false,
    },
    { name: "Модель", linkTo: "/order/model", disabled: true },
    {
      name: "Дополнительно",
      linkTo: "/order/additionally",
      disabled: true,
    },
    { name: "Итого", linkTo: "/order/total", disabled: true },
  ]);

  const setStepData = (index, argsBool) => {
    let newStepData = stepsBreadcrumbs;
    newStepData[index].disabled = !argsBool;
    setStepsBreadcrumbs([...newStepData]);
  };

  useEffect(() => {
    setStepData(1, selectedCity && selectedPoint ? true : false);
  }, [selectedCity, selectedPoint]);

  useEffect(() => {
    setStepData(2, selectedCar ? true : false);
  }, [selectedCar]);

  return (
    <div className="breadcrumbs__list main-wrapper">
      {stepsBreadcrumbs.map((step, index) => {
        const stepClassName = step.disabled
          ? className + " breadcrumbs__item_disabled"
          : isActiveBreadcrumbs;
        return (
          <NavLink
            to={step.linkTo}
            className={stepClassName}
            key={"step-" + (index + 1)}
          >
            {step.name}
          </NavLink>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
