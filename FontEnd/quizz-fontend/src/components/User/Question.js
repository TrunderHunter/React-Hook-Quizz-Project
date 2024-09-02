import React, { useState } from "react";
import _ from "lodash";
import Lightbox from "react-awesome-lightbox";

const Question = (props) => {
  const { question, currentQuestion } = props;
  const [showLightBox, setShowLightBox] = useState(false);
  const answers = question.answers;

  if (_.isEmpty(question)) {
    return <></>;
  }

  const handleCheckBox = (e, answerId, questionId) => {
    props.handleCheckBox(answerId, questionId, e.target.checked);
  };

  return (
    <>
      <div className="q-content">
        <div className="wrap-img text-center">
          <img
            src={`data:image/png;base64,${question.image}`}
            alt=""
            onClick={() => setShowLightBox(true)}
            style={{ cursor: "pointer" }}
          />
          {showLightBox && (
            <Lightbox
              image={`data:image/png;base64,${question.image}`}
              title={question.description}
              onClose={() => setShowLightBox(false)}
            />
          )}
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
                  checked={answer.isSelected}
                  onChange={(e) =>
                    handleCheckBox(e, answer.id, question.questionId)
                  }
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
