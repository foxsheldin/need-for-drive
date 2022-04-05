import React from "react";
import { useParams } from "react-router-dom";
import AsideMenu from "../common/AsideMenu/AsideMenu";
import TopMenu from "../common/TopMenu/TopMenu";
import Breadcrumbs from "./Breadcrumbs/Breadcrumbs";
import PointSelectionContainer from "./PointSelection/PointSelectionContainer";
import "./styles.scss";

const OrderPage = () => {
  const { stepOrder } = useParams();

  const getCurrentStepContent = () => {
    switch (stepOrder) {
      case "point":
        return <PointSelectionContainer />;
      default:
        return null;
    }
  };

  return (
    <div className="order-page">
      <AsideMenu />
      <div className="order-content">
        <div className="order-content__top-menu order-container">
          <TopMenu />
        </div>
        <div className="breadcrumbs">
          <div className="order-container">
            <Breadcrumbs />
          </div>
        </div>
        <div className="order-container">
          <div className="order-container__content content main-wrapper">
            <div className="content__left-side">{getCurrentStepContent()}</div>
            <div className="content__vertical-line" />
            <div className="content__right-side"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
