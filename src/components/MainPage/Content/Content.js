import React from "react";
import "./styles.scss";
import TopMenuContainer from "../../common/TopMenu/TopMenuContainer";
import SliderContent from "./Slider/SliderContent";

const Content = (props) => {
  return (
    <>
      <main className="main-container">
        <TopMenuContainer />
        <h1 className="visually-hidden">Каршеринг Need for drive</h1>
        <div className="main-container__slogan">
          <div className="main-wrapper">
            <p className="slogan__about-company">
              Каршеринг
              <br />
              <span className="main-accent">Need for drive</span>
            </p>
            <p className="slogan__intro">
              Поминутная аренда авто твоего города
            </p>
          </div>
          <button className="button slogan__action">Забронировать</button>
        </div>
        <div className="main-container__footer">
          <div className="main-wrapper">
            <p className="footer__contact">
              <a href="tel: +74952342244">8 (495) 234-22-44</a>
            </p>
            <p className="footer__copyright">© 2016-2019 «Need for drive»</p>
          </div>
        </div>
      </main>
      <SliderContent />
    </>
  );
};

export default Content;
