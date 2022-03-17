import React from "react";
import "./styles.scss";
import AsideMenuContainer from "../common/AsideMenu/AsideMenuContainer";
import Content from "./Content/Content";

const MainPage = (props) => {
  return (
    <div className="main-page">
      <AsideMenuContainer />
      <Content />
    </div>
  );
};

export default MainPage;
