import React from "react";
import "./styles.scss";
import TopMenu from "../../common/TopMenu/TopMenu";
import SliderContent from "./Slider/SliderContent";

const Content = () => {
  return (
    <>
      <main className="main-container">
        <div className="main-container__left-side_main-page">
          <TopMenu />
          <h1 className="visually-hidden">Каршеринг Need for drive</h1>
          <div className="main-container__slogan slogan main-wrapper">
            <p className="slogan__about-company ">
              Каршеринг
              <br />
              <span className="main-accent">Need for drive</span>
            </p>
            <p className="slogan__intro">
              Поминутная аренда авто твоего города
            </p>
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
        </div>
        <div className="main-container__right-side_main-page slider-container">
          <SliderContent />
        </div>
      </main>
    </>
  );
};

export default Content;
