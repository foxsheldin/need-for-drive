import React from "react";
import { ReactComponent as PreloaderImage } from "../../../assets/images/preloader.svg";
import "./styles.scss";

const Preloader = ({ message }) => {
  return (
    <div className="preloader">
      <PreloaderImage className="preloader__image" />
      <div className="preloader__message">{message}</div>
    </div>
  );
};

export default Preloader;
