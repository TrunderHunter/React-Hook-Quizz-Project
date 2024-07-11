import React from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const handleSignUp = () => {
    navigate("/register");
  };

  return (
    <>
      <div className="login-container">
        <div className="header">
          <span>Don't have an account?</span>
          <button onClick={() => handleSignUp()}>Sign up</button>
          <a href="#">Contact us</a>
        </div>
        <div className="head">
          <span>TypeForm</span>
        </div>
        <div className="content-form col-4 mx-auto">
          <form>
            <div className="title-form">Hello, who's this?</div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div className="wrap-forgot-password">
              <a href="#">Forgot password?</a>
            </div>
            <button type="submit" className="btn btn-primary">
              Log in
            </button>
          </form>
        </div>
        <div className="primary-auth-container col-4 mx-auto">
          <div className="auth-divider">
            <span>or</span>
          </div>
          {/* Go to Home Page */}
          <button
            className="btn btn-primary mt-3"
            onClick={() => navigate("/")}
          >
            Go back to Home
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
