import React from "react";
import AsideMenu from "../common/AsideMenu/AsideMenu";
import TopMenu from "../common/TopMenu/TopMenu";
import "./styles.scss";

const OrderPage = () => {
  return (
    <div className="order-page">
      <AsideMenu />
      <div className="order-content">
        <div className="order-content__top-menu order-container">
          <TopMenu />
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
