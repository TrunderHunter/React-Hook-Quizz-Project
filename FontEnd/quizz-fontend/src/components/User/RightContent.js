import React from "react";
import "./RightContent.scss";

const RightContent = (props) => {
  const { questionList } = props;
  return (
    <>
      <div className="main-timer">
        <div className="timer">
          <span>00:00</span>
        </div>
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
