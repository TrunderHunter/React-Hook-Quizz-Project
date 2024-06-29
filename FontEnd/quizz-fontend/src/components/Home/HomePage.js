import React from "react";
import videoHomepage from "../../assets/video-homepage.mp4";
import "./homePage.scss";

const HomePage = () => {
  return (
    <>
      <div className="homepage-container">
        <video autoPlay muted loop className="video-homepage">
          <source src={videoHomepage} type="video/mp4" />
        </video>
        <div className="homepage-content">
          <div className="title">There's a quiz for everyone</div>
          <div className="description">
            Find the perfect quiz for you or create your own quiz and challenge
            your friends to beat your score! You don't want to make a boring
            form. And your audience doesn't want to take a boring form. Make
            your forms engaging and fun with quizzes.
          </div>
          <button className="start-button">Get Started</button>
        </div>
      </div>
    </>
  );
};

export default HomePage;
