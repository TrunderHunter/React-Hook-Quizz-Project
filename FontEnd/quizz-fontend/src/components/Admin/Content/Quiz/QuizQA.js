import React, { useState, useEffect } from "react";
import Select from "react-select";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { LuImagePlus } from "react-icons/lu";
import "./QuizQA.scss";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import Lightbox from "react-awesome-lightbox";
import { toast } from "react-toastify";
import {
  getQuizList,
  getQuizWithQA,
  postUpsertQA,
} from "../../../../services/apiService";

const QuizQA = () => {
  const initialQuestion = {
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
  };
  const [selectedOption, setSelectedOption] = useState(null);
  const [questions, setQuestions] = useState([initialQuestion]);
  const [showLightBox, setShowLightBox] = useState(false);
  const [imageLightBox, setImageLightBox] = useState({});
  const [listQuiz, setListQuiz] = useState([]);

  const fetchData = async () => {
    let res = await getQuizList();
    if (res && res.EC === 0) {
      let listQuiz = res.DT.map((quiz) => {
        return {
          value: quiz.id,
          label: `${quiz.id} - ${quiz.name}(${quiz.difficulty})`,
        };
      });
      // sort list quiz by id
      listQuiz.sort((a, b) => a.value - b.value);
      setListQuiz(listQuiz);
    }
  };

  // return a promise that resolves with a File instance
  function urltoFile(url, filename, mimeType) {
    if (url.startsWith("data:")) {
      var arr = url.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[arr.length - 1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      var file = new File([u8arr], filename, { type: mime || mimeType });
      return Promise.resolve(file);
    }
    return fetch(url)
      .then((res) => res.arrayBuffer())
      .then((buf) => new File([buf], filename, { type: mimeType }));
  }

  const fetchQuizWithQA = async () => {
    if (selectedOption) {
      let res = await getQuizWithQA(selectedOption.value);
      if (res && res.EC === 0) {
        // convert base64 image to File object
        let questions = res.DT.qa;
        for (let question of questions) {
          let imageName = `Question-${question.id}.png`;
          if (question.imageFile) {
            let file = await urltoFile(
              `data:image/png;base64,${question.imageFile}`,
              imageName,
              "image/png"
            );
            question.image = file;
            question.imageName = file.name;
          }
        }
        setQuestions(questions);
      } else {
        toast.error(res.EM);
      }
    }
  };

  useEffect(() => {
    fetchQuizWithQA();
  }, [selectedOption]);

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddOrRemoveQuestion = (type, questionID) => {
    let questionsClone = _.cloneDeep(questions);
    if (type === "ADD") {
      questionsClone.push(initialQuestion);
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

  const toBase64 = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSaveQuestions = async () => {
    // validate questions before save
    if (_.isEmpty(selectedOption)) {
      toast.error("Please select a quiz");
      return;
    }
    let isValid = true;
    let questionsClone = _.cloneDeep(questions);
    questionsClone.forEach((question, questionIndex) => {
      if (!question.description) {
        toast.error(`Question ${questionIndex + 1} must not be empty`);
        isValid = false;
        return;
      }
      let correctAnswer = question.answers.filter((answer) => answer.isCorrect);
      if (correctAnswer.length === 0) {
        toast.error(
          `Question ${questionIndex + 1} must have at least one correct answer`
        );
        isValid = false;
        return;
      }
      if (question.answers.length < 2) {
        toast.error(
          `Question ${questionIndex + 1} must have at least two answers`
        );
        isValid = false;
        return;
      }

      question.answers.forEach((answer, answerIndex) => {
        if (!answer.description) {
          toast.error(
            `Answer ${answerIndex + 1} of question ${
              questionIndex + 1
            } must not be empty`
          );
          isValid = false;
          return;
        }
      });
    });
    if (!isValid) {
      return;
    }

    for (let question of questionsClone) {
      if (question.image) {
        question.imageFile = await toBase64(question.image);
        delete question.image;
      }
      question.answers.forEach((answer) => {
        delete answer.id;
      });
    }
    let data = {
      quizId: selectedOption.value,
      questions: questionsClone,
    };
    let res = await postUpsertQA(data);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      fetchQuizWithQA();
      fetchData();
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <>
      <div className="question-container">
        <div className="row">
          <div className="col-5">
            <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={listQuiz}
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
                        {question.answers.length > 2 && (
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

export default QuizQA;
