import React from "react";
import videoHomepage from "../../assets/video-homepage.mp4";
import "./homePage.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const HomePage = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <div className="homepage-container">
        <video autoPlay muted loop className="video-homepage">
          <source src={videoHomepage} type="video/mp4" />
        </video>
        <div className="homepage-content">
          <div className="title">{t("HomePage.title")}</div>
          <div className="description">{t("HomePage.description")}</div>
          {isAuth ? (
            <button className="start-button" onClick={() => navigate("/users")}>
              {t("HomePage.btnLoggedIn")}
            </button>
          ) : (
            <button className="start-button" onClick={() => navigate("/login")}>
              {t("HomePage.btnNotLoggedIn")}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
