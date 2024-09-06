import { React, useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../services/apiService";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../redux/userSlice";
import { SiSpinrilla } from "react-icons/si";
import "nprogress/nprogress.css";
import Language from "../Header/Language";
import { useTranslation } from "react-i18next";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleSignUp = () => {
    navigate("/register");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const re = /\S+@\S+\.\S+/;
    if (!re.test(email)) {
      toast.error("Invalid email format");
      return;
    }
    if (password === "") {
      toast.error("Password is required");
      return;
    }
    setLoading(true);
    let response = await postLogin(email, password);
    if (response.EC === 0) {
      dispatch(login(response.DT));
      toast.success(response.EM);
      setLoading(false);
      navigate("/");
    } else {
      setLoading(false);
      toast.error(response.EM);
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="header">
          <span>{t("Login.header.span")}</span>
          <button onClick={() => handleSignUp()}>
            {t("Login.header.signUp")}
          </button>
          <a href="#">{t("Login.header.forgot")}</a>
          <Language />
        </div>
        <div className="head">
          <span>TypeForm</span>
        </div>
        <div className="content-form col-4 mx-auto">
          <form>
            <div className="title-form">{t("Login.content-form.title")}</div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                {t("Login.content-form.email")}
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                {t("Login.content-form.password")}
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="wrap-forgot-password">
              <a href="#">{t("Login.content-form.forgot")}</a>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={(e) => handleLogin(e)}
              disabled={loading}
            >
              {loading ? (
                <>
                  <SiSpinrilla className="icon-spinrilla" />
                  <span>
                    Loading...
                    {t("Login.content-form.loading")}
                  </span>
                </>
              ) : (
                <span>{t("Login.content-form.btnLogin")}</span>
              )}
            </button>
          </form>
        </div>
        <div className="primary-auth-container col-4 mx-auto">
          <div className="auth-divider">
            <span>{t("Login.primary-auth-container.or")}</span>
          </div>
          {/* Go to Home Page */}
          <button
            className="btn btn-primary mt-3"
            onClick={() => navigate("/")}
          >
            {t("Login.primary-auth-container.btnGoBackHome")}
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
