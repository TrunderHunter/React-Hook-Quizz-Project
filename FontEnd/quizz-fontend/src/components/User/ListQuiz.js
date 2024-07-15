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
      <div class="row row-cols-1 row-cols-md-5 g-4 py-5 px-4">
        {quizList && quizList.length > 0 ? (
          quizList.map((quiz, index) => (
            <>
              <div class="col">
                <div class="card h-100 ">
                  <img
                    src={`data:image/png;base64,${quiz.image}`}
                    class="card-img-top"
                    alt="..."
                  />
                  <div class="card-body ">
                    <h5 class="card-title">{quiz.title}</h5>
                    <p class="card-text">{quiz.description}</p>
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
            </>
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
