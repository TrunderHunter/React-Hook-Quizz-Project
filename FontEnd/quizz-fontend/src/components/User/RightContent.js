import React, { useState } from "react";
import "./RightContent.scss";
import CountdownTimer from "./CountdownTimer";

const RightContent = (props) => {
  const { questionList, handleFinish, setCurrentQuestion, currentQuestion } =
    props;

  const getClassSelected = (index, question) => {
    let className = "question";
    if (question && question.answers && question.answers.length > 0) {
      let answer = question.answers.find((item) => item.isSelected);
      if (answer) {
        className += " selected";
      }
    }
    if (currentQuestion === index) {
      className += " active";
    }
    return className;
  };
  return (
    <>
      <div className="main-timer">
        <CountdownTimer initialMinutes={5} handleFinish={handleFinish} />
      </div>
      <div className="main-question">
        {questionList &&
          questionList.length > 0 &&
          questionList.map((item, index) => {
            return (
              <div
                className={getClassSelected(index, item)}
                key={index}
                onClick={() => setCurrentQuestion(index)}
              >
                <h5>{index + 1}</h5>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default RightContent;
