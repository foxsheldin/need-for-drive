import React, { useState } from "react";
import AsideMenu from "./AsideMenu";
import "./styles.scss";

const AsideMenuContainer = (props) => {
  const [isOpen, setOpen] = useState(false);
  const [language, setLanguage] = useState("Eng");

  const onNavToggleClick = () => {
    setOpen(!isOpen);
  };

  const onLanguageClick = () => {
    if (language === "Eng") setLanguage("Рус");
    else setLanguage("Eng");
  };

  return (
    <AsideMenu
      isOpen={isOpen}
      language={language}
      onNavToggleClick={onNavToggleClick}
      onLanguageClick={onLanguageClick}
    />
  );
};

export default AsideMenuContainer;
