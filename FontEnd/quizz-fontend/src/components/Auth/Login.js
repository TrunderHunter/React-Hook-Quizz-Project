import { React, useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../services/apiService";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../redux/userSlice";
import { SiSpinrilla } from "react-icons/si";
import "nprogress/nprogress.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="wrap-forgot-password">
              <a href="#">Forgot password?</a>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={(e) => handleLogin(e)}
              disabled={loading}
            >
              {loading ? (
                <>
                  {/* <div className="spinner-border text-light" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div> */}
                  <SiSpinrilla className="icon-spinrilla" />
                  <span>Loading...</span>
                </>
              ) : (
                <span>Log in</span>
              )}
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
