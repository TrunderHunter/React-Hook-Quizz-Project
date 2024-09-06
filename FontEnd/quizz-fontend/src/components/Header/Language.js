import React from "react";
import { NavDropdown, Nav } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const Language = () => {
  const { i18n } = useTranslation();

  const handleChangeLanguage = (language) => {
    i18n.changeLanguage(language);
  };
  return (
    <>
      <NavDropdown
        title={i18n.language === "en" ? "English" : "Tiếng Việt"}
        id="basic-nav-dropdown"
        className="language"
      >
        <Nav.Link onClick={() => handleChangeLanguage("en")}>English</Nav.Link>
        <Nav.Link onClick={() => handleChangeLanguage("vi")}>
          Tiếng Việt
        </Nav.Link>
      </NavDropdown>
    </>
  );
};

export default Language;
