import React from "react";
import { Route, Routes } from "react-router-dom";
import App from "./App";
import Admin from "./components/Admin/Admin";
import HomePage from "./components/Home/HomePage";
import DashBorad from "./components/Admin/Content/DashBorad";
import ManageUser from "./components/Admin/Content/ManageUser";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ListQuiz from "./components/User/ListQuiz";
import DetailQuiz from "./components/User/DetailQuiz";
import QuizManage from "./components/Admin/Content/Quiz/QuizManage";
import Questions from "./components/Admin/Content/Question/Questions";
const Layout = (props) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="/users" element={<ListQuiz />} />
        </Route>
        <Route path="/quiz/:id" element={<DetailQuiz />} />
        <Route path="/admins" element={<Admin />}>
          <Route index element={<DashBorad />} />
          <Route path="manage-user" element={<ManageUser />} />
          <Route path="manage-quiz" element={<QuizManage />} />
          <Route path="manage-questions" element={<Questions />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        // transition:Flip,
      ></ToastContainer>
    </>
  );
};

const NotFound = () => {
  return (
    <div
      className="
    alert alert-danger text-center
    "
      role="alert"
    >
      404 - Not Found
    </div>
  );
};

export default Layout;
