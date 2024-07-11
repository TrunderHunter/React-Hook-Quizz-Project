import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from "react-router-dom";
import "./header.scss";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user.isAuth);
  const account = useSelector((state) => state.user.account);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
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
              Home
            </NavLink>
            <NavLink to="/users" className="nav-link">
              User
            </NavLink>
            <NavLink to="/admins" className="nav-link">
              Admin
            </NavLink>
          </Nav>
          <Nav>
            {isAuth ? (
              <NavDropdown title="Option" id="basic-nav-dropdown">
                <Nav.Link
                  onClick={() => {
                    dispatch(logout());
                    navigate("/");
                  }}
                >
                  Logout
                </Nav.Link>
                <Nav.Link>Profile</Nav.Link>
              </NavDropdown>
            ) : (
              <>
                <button
                  className="btn btn-primary btn-login"
                  onClick={() => handleLogin()}
                >
                  Log in
                </button>
                <button
                  className="btn btn-primary btn-sign-up"
                  onClick={() => handleRegister()}
                >
                  Sign up
                </button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
