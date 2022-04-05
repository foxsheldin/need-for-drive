import React from "react";
import { NavLink } from "react-router-dom";
import "./styles.scss";

const Breadcrumbs = () => {
  const className = "breadcrumbs__item";
  const isActiveBreadcrumbs = ({ isActive }) =>
    isActive ? className + " breadcrumbs__item_active" : className;

  const stepsBreadcrumbs = [
    { name: "Местоположение", linkTo: "/order/point" },
    { name: "Модель", linkTo: "/order/model" },
    { name: "Дополнительно", linkTo: "/order/additionally" },
    { name: "Итого", linkTo: "/order/total" },
  ];

  return (
    <div className="breadcrumbs__list main-wrapper">
      {stepsBreadcrumbs.map((step, index) => (
        <NavLink to={step.linkTo} className={isActiveBreadcrumbs} key={index}>
          {step.name}
        </NavLink>
      ))}
    </div>
  );
};

export default Breadcrumbs;
