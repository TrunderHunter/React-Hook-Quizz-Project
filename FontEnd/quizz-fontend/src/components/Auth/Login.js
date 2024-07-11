import React from "react";
import "./Login.scss";
const Login = () => {
  return (
    <>
      <div className="login-container">
        <div className="header">
          <span>Don't have an account?</span>
          <button>Sign up</button>
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
        <div className="primary-auth-container">
          <div className="col-4 auth-divider">
            <span>or</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
