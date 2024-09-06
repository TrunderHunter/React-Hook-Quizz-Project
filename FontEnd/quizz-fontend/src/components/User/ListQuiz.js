import { React, useState, useEffect } from "react";
import { getAllQuiz } from "../../services/apiService";
import { useNavigate } from "react-router-dom";

const ListQuiz = () => {
  const navigate = useNavigate();
  const [quizList, setQuizList] = useState([]);

  const fetchQuiz = async () => {
    const response = await getAllQuiz();
    setQuizList(response.DT);
  };

  useEffect(() => {
    fetchQuiz();
  }, []);

  return (
    <>
      <div className="row row-cols-1 row-cols-md-5 g-4 py-5 px-4">
        {quizList && quizList.length > 0 ? (
          quizList.map((quiz, index) => (
            <div key={index} className="col">
              <div className="card h-100">
                <img
                  src={`data:image/png;base64,${quiz.image}`}
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body ">
                  <h5 className="card-title">{quiz.title}</h5>
                  <p className="card-text">{quiz.description}</p>
                </div>
                <div className="card-footer text-center">
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      navigate(`/quiz/${quiz.id}`, { state: { quiz } });
                    }}
                  >
                    Start Quiz
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <>
            <div className="">
              <h3>You don't have any quiz yet</h3>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ListQuiz;
