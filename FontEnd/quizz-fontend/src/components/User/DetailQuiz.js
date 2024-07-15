import { React, useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getQuestionByQuizId } from "../../services/apiService";
import _ from "lodash";
import "./DetailQuiz.scss";
import Question from "./Question";

const DetailQuiz = () => {
  const { id } = useParams();
  const [questionList, setQuestionList] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
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
              return item.answers;
            }),
          };
        })
        .value();
      // console.log(data);
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
                className="btn btn-primary ms-3"
                onClick={handleNext}
                disabled={
                  currentQuestion === questionList.length - 1 ? true : false
                }
              >
                Next
              </button>
            </div>
          </div>
          <div className="right-content col-4 col-md-4 "></div>
        </div>
      </div>
    </>
  );
};

export default DetailQuiz;
