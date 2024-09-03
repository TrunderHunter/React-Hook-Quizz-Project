import { React, useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getQuestionByQuizId, postSumitQuiz } from "../../services/apiService";
import _ from "lodash";
import "./DetailQuiz.scss";
import Question from "./Question";
import ModalResult from "./ModalResult";
import RightContent from "./RightContent";

const DetailQuiz = () => {
  const { id } = useParams();
  const [questionList, setQuestionList] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showModalResult, setShowModalResult] = useState(false);
  const [dataModal, setDataModal] = useState({});
  const location = useLocation();

  const fetchQuestion = async () => {
    const res = await getQuestionByQuizId(id);
    if (res && res.EC === 0) {
      let raw = res.DT;
      let data = _.chain(raw)
        .groupBy("id")
        .map((value, key) => {
          return {
            questionId: key,
            description: value[0]?.description,
            image: value[0]?.image,
            answers: value?.map((item) => {
              return {
                id: item.answers.id,
                description: item.answers.description,
                isSelected: false,
              };
            }),
          };
        })
        .value();
      setQuestionList(data);
    }
  };

  const handleNext = () => {
    if (questionList && currentQuestion < questionList.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleBack = () => {
    if (questionList && currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleCheckBox = (answerId, questionId) => {
    let temp = _.cloneDeep(questionList);
    let question = temp.find((item) => +item.questionId === +questionId);
    if (question && question.answers) {
      let answer = question.answers.find((item) => +item.id === +answerId);
      if (answer) {
        answer.isSelected = !answer.isSelected;
        setQuestionList(temp);
      }
    }
  };

  const handleFinish = async () => {
    if (questionList && questionList.length > 0) {
      // {
      //   "quizId": 1,
      //  "answers": [
      //      {
      //          "questionId": 1,
      //          "userAnswerId": [1, 2 ]
      //      },
      //      {
      //          "questionId": 2,
      //          "userAnswerId": [3]}
      //      ]
      // }
      let result = {
        quizId: id,
        answers: questionList.map((item) => {
          return {
            questionId: +item.questionId,
            userAnswerId: item.answers
              .filter((answer) => answer.isSelected)
              .map((answer) => +answer.id),
          };
        }),
      };
      const res = await postSumitQuiz(result);
      if (res && res.EC === 0) {
        setDataModal(res.DT);
        setShowModalResult(true);
      }
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  return (
    <>
      <div className="container detailQuiz-container ">
        <div className="row gx-3 mt-5">
          <div className="left-content col-8 col-md-8 ">
            <div className="title">
              Quiz {id}: {location?.state?.quiz.description}
            </div>
            <hr />
            <Question
              question={
                questionList &&
                questionList.length > 0 &&
                questionList[currentQuestion]
              }
              currentQuestion={currentQuestion}
              handleCheckBox={handleCheckBox}
            />

            <div className="footer text-center">
              <button
                className="btn btn-secondary"
                onClick={handleBack}
                disabled={currentQuestion === 0 ? true : false}
              >
                Back
              </button>
              <button
                className="btn btn-primary mx-3"
                onClick={handleNext}
                disabled={
                  currentQuestion === questionList.length - 1 ? true : false
                }
              >
                Next
              </button>
              <button className="btn btn-success" onClick={handleFinish}>
                Finish
              </button>
            </div>
          </div>
          <div className="right-content col-4 col-md-4 ">
            <RightContent
              handleFinish={handleFinish}
              questionList={questionList}
            />
          </div>
        </div>
        <ModalResult
          show={showModalResult}
          setShow={setShowModalResult}
          dataModal={dataModal}
        />
      </div>
    </>
  );
};

export default DetailQuiz;
