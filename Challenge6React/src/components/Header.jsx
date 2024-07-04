import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import authService from "../services/auth.service";
import logo from "./images/Card Logo.jpg";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

const Header = ({ currentUser, setCurrentUser, showAdminContent }) => {
  const loggedIn = Boolean(currentUser);
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/Login");
  };

  const logOut = () => {
    authService.logout();
    setCurrentUser(undefined);
    navigate("/");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <img
            src={logo}
            alt="Logo"
            style={{ width: "75px", height: "75px" }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/ViewDecks">My Decks</Nav.Link>
            <Nav.Link href="/ViewCards">All Cards</Nav.Link>
            {showAdminContent && <Nav.Link href="/AddCard">Add Card</Nav.Link>}
          </Nav>
          <Nav>
            {loggedIn ? (
              <Button variant="light" onClick={logOut}>
                Log Out
              </Button>
            ) : (
              <Button variant="light" onClick={navigateToLogin}>
                Login
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

Header.propTypes = {
  currentUser: PropTypes.object,
  setCurrentUser: PropTypes.func.isRequired,
  showAdminContent: PropTypes.bool.isRequired,
};

export default Header;
