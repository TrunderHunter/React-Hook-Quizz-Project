import React, { useState } from "react";
import Select from "react-select";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { LuImagePlus } from "react-icons/lu";
import "./Questions.scss";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import Lightbox from "react-awesome-lightbox";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const Questions = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [questions, setQuestions] = useState([
    {
      id: uuidv4(),
      description: "",
      image: "",
      imageName: "",
      answers: [
        { id: uuidv4(), description: "", isCorrect: false },
        { id: uuidv4(), description: "", isCorrect: false },
        { id: uuidv4(), description: "", isCorrect: false },
        { id: uuidv4(), description: "", isCorrect: false },
      ],
    },
  ]);
  const [showLightBox, setShowLightBox] = useState(false);
  const [imageLightBox, setImageLightBox] = useState({});

  const handleAddOrRemoveQuestion = (type, questionID) => {
    let questionsClone = _.cloneDeep(questions);
    if (type === "ADD") {
      let newQuestion = {
        id: uuidv4(),
        description: "",
        image: "",
        imageName: "",
        answers: [{ id: uuidv4(), description: "", isCorrect: false }],
      };
      questionsClone.push(newQuestion);
    } else {
      questionsClone = questionsClone.filter(
        (question) => question.id !== questionID
      );
    }
    setQuestions(questionsClone);
  };

  const handleAddOrRemoveAnswer = (type, questionID, answerID) => {
    let questionsClone = _.cloneDeep(questions);
    let questionIndex = questionsClone.findIndex(
      (question) => question.id === questionID
    );
    if (type === "ADD") {
      let newAnswer = { id: uuidv4(), description: "", isCorrect: false };
      questionsClone[questionIndex].answers.push(newAnswer);
    } else {
      let answers = questionsClone[questionIndex].answers.filter(
        (answer) => answer.id !== answerID
      );
      questionsClone[questionIndex].answers = answers;
    }
    setQuestions(questionsClone);
  };

  const handleSaveQuestions = () => {
    console.log(questions);
  };

  const handleOnChangeQuestion = (type, value, questionID) => {
    let questionsClone = _.cloneDeep(questions);
    let questionIndex = questionsClone.findIndex(
      (question) => question.id === questionID
    );
    if (type === "DESCRIPTION QUESTION") {
      questionsClone[questionIndex].description = value;
    } else if (type === "IMAGE") {
      questionsClone[questionIndex].image = value;
      questionsClone[questionIndex].imageName = value.name;
    }
    setQuestions(questionsClone);
  };

  const handleOnChangeQuestionAnswer = (e, questionID, answerID, type) => {
    let questionsClone = _.cloneDeep(questions);
    let questionIndex = questionsClone.findIndex(
      (question) => question.id === questionID
    );
    let answerIndex = questionsClone[questionIndex].answers.findIndex(
      (answer) => answer.id === answerID
    );
    if (type === "DESCRIPTION") {
      questionsClone[questionIndex].answers[answerIndex].description =
        e.target.value;
    } else if (type === "IS_CORRECT") {
      questionsClone[questionIndex].answers[answerIndex].isCorrect =
        e.target.checked;
    }
    setQuestions(questionsClone);
  };

  const handlePreviewImage = (image) => {
    if (image) {
      setImageLightBox({
        image: URL.createObjectURL(image),
        imageName: image.name,
      });
      setShowLightBox(true);
    }
  };

  return (
    <>
      <div className="question-container">
        <div className="question-header my-3">
          <h3>Manage Questions</h3>
        </div>
        <hr />
        <div className="row">
          <div className="col-5">
            <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
            />
          </div>
        </div>
        {questions &&
          questions.map((question, index) => (
            <div key={index}>
              <div className="mt-3 add-new-question">
                <div className="form-floating mb-3 col-5">
                  <input
                    value={question.description}
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    placeholder="e"
                    onChange={(e) =>
                      handleOnChangeQuestion(
                        "DESCRIPTION QUESTION",
                        e.target.value,
                        question.id
                      )
                    }
                  />
                  <label htmlFor="floatingInput">Question {index + 1}</label>
                </div>
                <div className="col-6 mx-3 wrap-input-img">
                  <div className="label-upload-img me-2">
                    <label htmlFor={`${question.id}`} className="label-upload">
                      <LuImagePlus className="icon-upload-img" />
                    </label>
                  </div>
                  <input
                    id={`${question.id}`}
                    type="file"
                    hidden
                    onChange={(e) =>
                      handleOnChangeQuestion(
                        "IMAGE",
                        e.target.files[0],
                        question.id
                      )
                    }
                  />
                  <label className="">
                    {question.imageName ? (
                      <span
                        style={{ cursor: "pointer" }}
                        className="text-info"
                        onClick={() => handlePreviewImage(question.image)}
                      >
                        {question.imageName}
                      </span>
                    ) : (
                      " 0 file is uploaded"
                    )}
                  </label>
                </div>
                <div className="col-1 wrap-action-question">
                  <span
                    onClick={() => handleAddOrRemoveQuestion("ADD")}
                    className="me-1 text-primary plus-icon-question"
                  >
                    <CiSquarePlus />
                  </span>
                  {questions.length > 1 && (
                    <span
                      onClick={() =>
                        handleAddOrRemoveQuestion("REMOVE", question.id)
                      }
                      className="text-danger minus-icon-question"
                    >
                      <CiSquareMinus />
                    </span>
                  )}
                </div>
              </div>
              {question.answers &&
                question.answers.map((answer, index) => (
                  <div key={index}>
                    <div className="mt-1 add-new-answer">
                      <div className="col-5">
                        <div className="input-group mb-3">
                          <div className="input-group-text">
                            <input
                              className="form-check-input mt-0"
                              type="checkbox"
                              {...(answer.isCorrect && { checked: true })}
                              aria-label="Checkbox for following text input"
                              onChange={(e) =>
                                handleOnChangeQuestionAnswer(
                                  e,
                                  question.id,
                                  answer.id,
                                  "IS_CORRECT"
                                )
                              }
                            />
                          </div>
                          <input
                            value={answer.description}
                            type="text"
                            className="form-control"
                            aria-label="Text input with checkbox"
                            placeholder={`Answer ${index + 1}`}
                            onChange={(e) =>
                              handleOnChangeQuestionAnswer(
                                e,
                                question.id,
                                answer.id,
                                "DESCRIPTION"
                              )
                            }
                          />
                        </div>
                      </div>
                      <div className="col-3 ms-2 wrap-action-answer">
                        <span
                          onClick={() =>
                            handleAddOrRemoveAnswer(
                              "ADD",
                              question.id,
                              answer.id
                            )
                          }
                          className="me-1 text-primary plus-icon-answer"
                        >
                          <CiCirclePlus />
                        </span>
                        {question.answers.length > 1 && (
                          <span
                            onClick={() =>
                              handleAddOrRemoveAnswer(
                                "REMOVE",
                                question.id,
                                answer.id
                              )
                            }
                            className="text-danger minus-icon-answer"
                          >
                            <CiCircleMinus />
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ))}
        {questions && questions.length > 0 && (
          <button
            className="btn btn-primary"
            onClick={() => handleSaveQuestions()}
          >
            Save Questions
          </button>
        )}
      </div>
      {showLightBox && (
        <Lightbox
          image={imageLightBox.image}
          title={imageLightBox.imageName}
          onClose={() => setShowLightBox(false)}
        />
      )}
    </>
  );
};

export default Questions;
