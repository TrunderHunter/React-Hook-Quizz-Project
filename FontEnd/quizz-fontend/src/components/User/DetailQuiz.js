import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getQuestionByQuizId } from "../../services/apiService";

const DetailQuiz = () => {
  const { id } = useParams();
  const [questionList, setQuestionList] = useState([]);

  const fetchQuestion = async () => {
    const response = await getQuestionByQuizId(id);
    console.log("Check response", response);
    setQuestionList(response.DT);
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  return <>DetailQuiz</>;
};

export default DetailQuiz;
