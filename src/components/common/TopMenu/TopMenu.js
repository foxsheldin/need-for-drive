import React from "react";
import "./styles.scss";
import locationLogo from "../../../assets/images/location.svg";

const TopMenu = () => {
  return (
    <div className="main-container__place">
      <div className="place__logo">Need for drive</div>
      <div className="place__location">
        <span className="location__name">Ульяновск</span>
      </div>
    </div>
  );
};

export default TopMenu;
