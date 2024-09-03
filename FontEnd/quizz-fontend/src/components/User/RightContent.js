import React from "react";
import "./RightContent.scss";
import CountdownTimer from "./CountdownTimer";

const RightContent = (props) => {
  const { questionList, handleFinish } = props;
  return (
    <>
      <div className="main-timer">
        <CountdownTimer initialMinutes={1} handleFinish={handleFinish} />
      </div>
      <div className="main-question">
        {questionList &&
          questionList.length > 0 &&
          questionList.map((item, index) => {
            return (
              <div className="question" key={index}>
                <h5>{index + 1}</h5>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default RightContent;
