import React from "react";
import { ReactComponent as TelegramIcon } from "../../../assets/images/telegram.svg";
import { ReactComponent as FacebookIcon } from "../../../assets/images/facebook.svg";
import { ReactComponent as InstagramIcon } from "../../../assets/images/instagram.svg";

const AsideMenu = ({ isOpen, onNavToggleClick, language, onLanguageClick }) => {
  return (
    <>
      <header className="main-header">
        <div className="main-nav main-nav_closed">
          <button
            type="button"
            className="main-nav__toggle"
            onClick={onNavToggleClick}
          >
            <span className="visually-hidden">Открыть меню</span>
          </button>
          <button
            type="button"
            className="main-nav__language-toggle"
            onClick={onLanguageClick}
          >
            {language}
          </button>
        </div>
      </header>
      {isOpen ? (
        <div className="opened-menu main-nav_opened">
          <div className="opened-menu__bg">
            <button className="main-nav__toggle" onClick={onNavToggleClick}>
              <span className="visually-hidden">Закрыть меню</span>
            </button>
            <nav className="main-nav__list">
              <div className="main-wrapper">
                <a href="#" className="nav-link">
                  Парковка
                </a>
                <a href="#" className="nav-link">
                  Страховка
                </a>
                <a href="#" className="nav-link">
                  Бензин
                </a>
                <a href="#" className="nav-link">
                  Обслуживание
                </a>
                <div className="social-list">
                  <a href="#" className="nav-link">
                    <TelegramIcon className="img-link" />
                  </a>
                  <a href="#" className="nav-link">
                    <FacebookIcon className="img-link" />
                  </a>
                  <a href="#" className="nav-link">
                    <InstagramIcon className="img-link" />
                  </a>
                </div>
              </div>
              <button
                type="button"
                className="main-nav__language-toggle_mobile"
                onClick={onLanguageClick}
              >
                {language}
              </button>
            </nav>
          </div>
          <div className="opened-menu__slider-blur"></div>
        </div>
      ) : null}
    </>
  );
};

export default AsideMenu;
