import React from "react";
import locationLogo from "../../../assets/images/location.svg";

const TopMenu = (props) => {
  return (
    <div className="main-container__place">
      <div className="place__logo">Need for drive</div>
      <div className="place__location">
        <img src={locationLogo} className="location__image" />
        <span className="location__name">Ульяновск</span>
      </div>
    </div>
  );
};

export default TopMenu;
