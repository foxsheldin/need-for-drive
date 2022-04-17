import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AsideMenu from "../common/AsideMenu/AsideMenu";
import TopMenu from "../common/TopMenu/TopMenu";
import Breadcrumbs from "./Breadcrumbs/Breadcrumbs";
import OrderDetails from "./OrderDetails/OrderDetails";
import PointSelection from "./PointSelection/PointSelection";
import "./styles.scss";

const OrderPage = () => {
  const { stepOrder } = useParams();
  const { stateError } = useSelector((state) => state.order);
  const [currentStep, setCurrentStep] = useState(stepOrder);

  useEffect(() => {
    setCurrentStep(stepOrder);
  }, [stepOrder]);

  const getCurrentStepContent = () => {
    switch (currentStep) {
      case "point":
        return <PointSelection />;
      default:
        return null;
    }
  };

  const сurrentStepContent = getCurrentStepContent();

  return (
    <div className="order-page">
      <AsideMenu />
      <div className="order-content">
        <div className="order-content__top-menu order-container">
          <TopMenu />
        </div>
        {!stateError ? (
          <>
            <div className="breadcrumbs">
              <div className="order-container">
                <Breadcrumbs />
              </div>
            </div>
            <div className="order-container">
              <div className="order-container__content content main-wrapper">
                <div className="content__left-side">{сurrentStepContent}</div>
                <div className="content__vertical-line" />
                <div className="content__right-side">
                  <OrderDetails />
                </div>
              </div>
            </div>
          </>
        ) : (
          <h2>{stateError}</h2>
        )}
      </div>
    </div>
  );
};

export default OrderPage;
