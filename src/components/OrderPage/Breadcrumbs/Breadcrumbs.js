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
      id: "step1",
      name: "Местоположение",
      linkTo: "/order/point",
      disabled: false,
    },
    { id: "step2", name: "Модель", linkTo: "/order/model", disabled: true },
    {
      id: "step3",
      name: "Дополнительно",
      linkTo: "/order/additionally",
      disabled: true,
    },
    { id: "step4", name: "Итого", linkTo: "/order/total", disabled: true },
  ]);

  useEffect(() => {
    if (selectedCity && selectedPoint) {
      const newStepData = stepsBreadcrumbs.map((step) => {
        step.id === "step2" ? (step.disabled = false) : null;
        return step;
      });
      setStepsBreadcrumbs(newStepData);
    } else {
      const newStepData = stepsBreadcrumbs.map((step) => {
        step.id === "step2" ? (step.disabled = true) : null;
        return step;
      });
      setStepsBreadcrumbs(newStepData);
    }
  }, [selectedCity, selectedPoint]);

  useEffect(() => {
    if (selectedCar) {
      const newStepData = stepsBreadcrumbs.map((step) => {
        step.id === "step3" ? (step.disabled = false) : null;
        return step;
      });
      setStepsBreadcrumbs(newStepData);
    } else {
      const newStepData = stepsBreadcrumbs.map((step) => {
        step.id === "step3" ? (step.disabled = true) : null;
        return step;
      });
      setStepsBreadcrumbs(newStepData);
    }
  }, [selectedCar]);

  return (
    <div className="breadcrumbs__list main-wrapper">
      {stepsBreadcrumbs.map((step) => {
        const stepClassName = step.disabled
          ? className + " breadcrumbs__item_disabled"
          : isActiveBreadcrumbs;
        return (
          <NavLink to={step.linkTo} className={stepClassName} key={step.id}>
            {step.name}
          </NavLink>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
