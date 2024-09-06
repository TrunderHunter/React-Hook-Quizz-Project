import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from "react-router-dom";
import "./header.scss";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";
import { doLogout } from "../../services/apiService";
import { toast } from "react-toastify";
import Language from "./Language";
import { useTranslation } from "react-i18next";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user.isAuth);
  const account = useSelector((state) => state.user.account);
  const { t } = useTranslation();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleLogout = async () => {
    let res = await doLogout(account.email, account.refreshToken);
    if (res.EC === 0) {
      toast.success("Logout successfully");
      dispatch(logout());
      navigate("/");
    } else toast.error(res.EM);
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container className="navbar-container">
        <NavLink to="/" className="navbar-brand">
          QUIZZ
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link">
              {t("Header.home")}
            </NavLink>
            <NavLink to="/users" className="nav-link">
              {t("Header.takeQuiz")}
            </NavLink>
            <NavLink to="/admins" className="nav-link">
              {t("Header.quizManagement")}
            </NavLink>
          </Nav>
          <Nav>
            {isAuth ? (
              <NavDropdown title={t("Header.option")} id="basic-nav-dropdown">
                <Nav.Link onClick={() => handleLogout()}>
                  {t("Header.logout")}
                </Nav.Link>
                <Nav.Link>{t("Header.profile")}</Nav.Link>
              </NavDropdown>
            ) : (
              <>
                <button
                  className="btn btn-primary btn-login"
                  onClick={() => handleLogin()}
                >
                  {t("Header.login")}
                </button>
                <button
                  className="btn btn-primary btn-sign-up"
                  onClick={() => handleRegister()}
                >
                  {t("Header.register")}
                </button>
              </>
            )}
            <Language />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
