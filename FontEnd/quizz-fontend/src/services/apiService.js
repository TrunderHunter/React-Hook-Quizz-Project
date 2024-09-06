import { SiResurrectionremixos } from "react-icons/si";
import axios from "../utils/axiosCustomize";

const postCreateNewUser = async (email, password, username, role, img) => {
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", img);
  return await axios.post("api/v1/participant", data);
};

const getParticipants = async () => {
  return await axios.get("api/v1/participant/all");
};

const putUpdateUser = async (id, username, role, img) => {
  const data = new FormData();
  data.append("id", id);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", img);
  return await axios.put("api/v1/participant", data);
};

const deleteParticipant = async (id) => {
  return await axios.delete("api/v1/participant", { data: { id } });
};

const getParticipantsWithPaginate = async (page, limit) => {
  return await axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
};

const register = async (email, password, username) => {
  return await axios.post("api/v1/register", { email, password, username });
};

const postLogin = async (email, password) => {
  return await axios.post("api/v1/login", { email, password, delay: 1500 });
};

const getAllQuiz = async () => {
  return await axios.get("api/v1/quiz-by-participant");
};

const getQuestionByQuizId = async (quizId) => {
  return await axios.get(`api/v1/questions-by-quiz?quizId=${quizId}`);
};

const postSumitQuiz = async (data) => {
  return await axios.post("api/v1/quiz-submit", data);
};

const deleteQuizById = async (id) => {
  return await axios.delete(`api/v1/quiz/${id}`);
};

const postCreateNewQuiz = async (name, description, difficulty, image) => {
  const data = new FormData();
  data.append("name", name);
  data.append("description", description);
  data.append("difficulty", difficulty);
  data.append("quizImage", image);
  return await axios.post("api/v1/quiz", data);
};

const getQuizList = async () => {
  return await axios.get("api/v1/quiz/all");
};

const putUpdateQuiz = async (id, name, description, difficulty, image) => {
  const data = new FormData();
  data.append("id", id);
  data.append("name", name);
  data.append("description", description);
  data.append("difficulty", difficulty.value);
  data.append("quizImage", image);
  return await axios.put("api/v1/quiz", data);
};

const postCreateNewQuestionForQuiz = async (
  quiz_id,
  description,
  questionImage
) => {
  const data = new FormData();
  data.append("quiz_id", quiz_id);
  data.append("description", description);
  data.append("questionImage", questionImage);
  return await axios.post("api/v1/question", data);
};

const postCreateNewAnswerForQuestion = async (
  question_id,
  description,
  correct_answer
) => {
  return await axios.post("api/v1/answer", {
    question_id,
    description,
    correct_answer,
  });
};

const postAssignQuiz = (quizId, userId) => {
  return axios.post("api/v1/quiz-assign-to-user", { quizId, userId });
};

const getQuizWithQA = (quizId) => {
  return axios.get(`api/v1/quiz-with-qa/${quizId}`);
};

const postUpsertQA = (data) => {
  return axios.post("api/v1/quiz-upsert-qa", { ...data });
};

const doLogout = (email, refresh_token) => {
  return axios.post("api/v1/logout", { email, refresh_token });
};

export {
  postCreateNewUser,
  doLogout,
  postAssignQuiz,
  postUpsertQA,
  getQuizWithQA,
  postCreateNewQuestionForQuiz,
  postCreateNewAnswerForQuestion,
  putUpdateQuiz,
  deleteQuizById,
  getQuizList,
  postCreateNewQuiz,
  getParticipants,
  putUpdateUser,
  deleteParticipant,
  getParticipantsWithPaginate,
  register,
  postLogin,
  getAllQuiz,
  getQuestionByQuizId,
  postSumitQuiz,
};
