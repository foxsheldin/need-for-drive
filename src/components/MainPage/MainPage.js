import React from "react";
import "./styles.scss";
import AsideMenu from "../common/AsideMenu/AsideMenu";
import Content from "./Content/Content";

const MainPage = (props) => {
  return (
    <div className="main-page">
      <AsideMenu />
      <Content />
    </div>
  );
};

export default MainPage;
