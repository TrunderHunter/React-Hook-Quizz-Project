import React from "react";
import _ from "lodash";

const Question = (props) => {
  const { question, currentQuestion } = props;
  const answers = question.answers;

  console.log("Check question", question);
  if (_.isEmpty(question)) {
    return <></>;
  }
  return (
    <>
      <div className="q-content">
        <div className="wrap-img text-center">
          <img src={`data:image/png;base64,${question.image}`} alt="" />
        </div>
        <div className="q-title">
          <span>Question {currentQuestion + 1}. </span>
          {question.description}
        </div>
        <div className="q-answer">
          {answers &&
            answers.map((answer, index) => (
              <div className="form-check" key={index}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="flexRadioDefault"
                  id={`flexRadioDefault${index}`}
                />
                <label
                  className="form-check-label"
                  htmlFor={`flexRadioDefault${index}`}
                >
                  {answer.description}
                </label>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Question;
