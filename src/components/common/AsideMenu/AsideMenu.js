import React, { useState } from "react";
import "./styles.scss";
import { linksData } from "./constants";
import { ReactComponent as TelegramIcon } from "../../../assets/images/telegram.svg";

const AsideMenu = () => {
  const [isOpen, setOpen] = useState(false);
  const [language, setLanguage] = useState("Eng");

  const onNavToggleClick = () => {
    setOpen(!isOpen);
  };

  const onLanguageClick = () => {
    if (language === "Eng") setLanguage("Рус");
    else setLanguage("Eng");
  };

  const navLinks = linksData.map((link, index) => (
    <a href={link.linkTo} className="nav-link">
      {link.name}
    </a>
  ));

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
              {navLinks}
              <div className="social-list">
                <a href="#" className="nav-link">
                  <TelegramIcon className="img-link" />
                </a>
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
          <div className="opened-menu__slider-blur" />
        </div>
      ) : null}
    </>
  );
};

export default AsideMenu;
