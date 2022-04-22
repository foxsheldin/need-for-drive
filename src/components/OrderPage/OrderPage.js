import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getOrder, resetOrder } from "../../redux/orderSlice";
import AsideMenu from "../common/AsideMenu/AsideMenu";
import TopMenu from "../common/TopMenu/TopMenu";
import AdditionallySelection from "./AdditionallySelection/AdditionallySelection";
import Breadcrumbs from "./Breadcrumbs/Breadcrumbs";
import ModelSelection from "./ModelSelection/ModelSelection";
import OrderDetails from "./OrderDetails/OrderDetails";
import PointSelection from "./PointSelection/PointSelection";
import "./styles.scss";
import TotalSelection from "./TotalSelection/TotalSelection";

const OrderPage = () => {
  const { stepOrder, order } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orderId, stateError } = useSelector((state) => state.order);
  const [currentStep, setCurrentStep] = useState(stepOrder);
  const regexOrderConfirm = new RegExp("order/confirm", "g");

  useEffect(() => {
    setCurrentStep(stepOrder);
  }, [stepOrder]);

  useEffect(() => {
    if (order) {
      dispatch(getOrder(order));
    } else if (orderId) {
      dispatch(resetOrder());
      navigate("/order/point");
    }
  }, [order, orderId]);

  const getCurrentStepContent = () => {
    switch (currentStep) {
      case "point":
        return <PointSelection />;
      case "model":
        return <ModelSelection />;
      case "additionally":
        return <AdditionallySelection />;
      case "total":
        return <TotalSelection />;
      default:
        if (location.pathname.match(regexOrderConfirm))
          return <TotalSelection />;
        else return null;
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
