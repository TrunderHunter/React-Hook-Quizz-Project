import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from "react-router-dom";
import "./header.scss";

const Header = () => {
  const navigate = useNavigate();

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
            <NavDropdown title="Option" id="basic-nav-dropdown">
              <Nav.Link>Login</Nav.Link>
              <Nav.Link>Register</Nav.Link>
              <Nav.Link>Logout</Nav.Link>
              <Nav.Link>Profile</Nav.Link>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
