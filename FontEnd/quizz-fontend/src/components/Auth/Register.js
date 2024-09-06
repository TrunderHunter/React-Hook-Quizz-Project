import { React, useState } from "react";
import "./Register.scss";
import { toast } from "react-toastify";
import { register } from "../../services/apiService";
import { useNavigate } from "react-router-dom";
import Language from "../Header/Language";
import { useTranslation } from "react-i18next";
const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 3;
  };

  const validateUsername = (username) => {
    // if username is empty, username = email
    if (username === "") {
      setUsername(email);
    }
    return username.length >= 6;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      toast.error("Invalid email format");
      return;
    }
    if (!validatePassword(password)) {
      toast.error("Password must be at least 3 characters");
      return;
    }
    if (!validateUsername(username)) {
      toast.error("Username must be at least 6 characters");
      return;
    }
    // Call API to register
    // If success, redirect to login page
    // If fail, show error message
    let response = await register(email, password, username);
    console.log(response);
    if (response.EC === 0) {
      toast.success(response.EM);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      toast.error(response.EM);
    }
  };
  return (
    <>
      <div className="register-container">
        <div className="header">
          <span>{t("Register.header.span")}</span>
          <button
            onClick={() => {
              navigate("/login");
            }}
          >
            {t("Register.header.signIn")}
          </button>
          <a href="#">{t("Register.header.forgot")}</a>
          <Language />
        </div>
        <div className="head">
          <span>{t("Register.head.title")}</span>
        </div>
        <div className="content-form col-4 mx-auto">
          <form>
            <div className="title-form">{t("Register.content-form.title")}</div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail" className="form-label">
                {t("Register.content-form.email")}
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail"
                aria-describedby="emailHelp"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputUsername" className="form-label">
                {t("Register.content-form.username")}
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputUsername"
                aria-describedby="emailHelp"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                {t("Register.content-form.password")}
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="btn mt-3"
              onClick={(e) => handleRegister(e)}
            >
              {t("Register.content-form.btnRegister")}
            </button>
          </form>
        </div>
        <div className="primary-auth-container col-4 mx-auto">
          <div className="auth-divider">
            <span>{t("Register.primary-auth-container.or")}</span>
          </div>
          <button
            className="btn mt-3"
            onClick={() => {
              navigate("/login");
            }}
          >
            {t("Register.primary-auth-container.btnGoBackLogin")}
          </button>
        </div>
      </div>
    </>
  );
};

export default Register;
