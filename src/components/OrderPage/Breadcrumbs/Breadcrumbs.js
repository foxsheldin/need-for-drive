import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  setDisabledBreadcrumbs,
  setDisabledOrderButton,
} from "../../../redux/orderSlice";
import "./styles.scss";

const Breadcrumbs = () => {
  const dispatch = useDispatch();
  const { selectedCity, selectedPoint, selectedCar, stepsOrderBreadcrumbs } =
    useSelector((state) => state.order);
  const className = "breadcrumbs__item";
  const isActiveBreadcrumbs = ({ isActive }) =>
    isActive ? className + " breadcrumbs__item_active" : className;

  const setStepData = (index, argsBool) => {
    dispatch(setDisabledOrderButton({ index: index - 1, value: !argsBool }));
    dispatch(setDisabledBreadcrumbs({ index, value: !argsBool }));
  };

  useEffect(() => {
    setStepData(1, !!selectedCity && !!selectedPoint);
  }, [selectedCity, selectedPoint]);

  useEffect(() => {
    setStepData(2, !!selectedCar);
  }, [selectedCar]);

  return (
    <div className="breadcrumbs__list main-wrapper">
      {stepsOrderBreadcrumbs.map((step, index) => {
        const stepClassName = step?.disabledBreadcrumbs
          ? className + " breadcrumbs__item_disabled"
          : isActiveBreadcrumbs;
        return (
          <NavLink
            to={step?.linkToCurrentStep}
            className={stepClassName}
            key={"step-" + (index + 1)}
          >
            {step?.nameBreadcrumbs}
          </NavLink>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
