import { useNavigate, Link } from "react-router-dom";
import PropTypes from "prop-types";
import authService from "../services/auth.service";

const Header = ({ currentUser, setCurrentUser, showAdminContent }) => {
  const loggedIn = Boolean(currentUser);
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/Login");
  };

  const logOut = () => {
    console.log("current user", currentUser);
    authService.logout();
    setCurrentUser(undefined);
    navigate("/");
  };

  return (
    <div>
      <header
        className="d-flex justify-content-between align-items-center p-3 text-white"
        style={{ backgroundColor: "#001450", color: "white" }}
      >
        <div className="d-flex align-items-center">
          <img
            src=""
            alt="Logo"
            className="me-5"
            style={{ width: "75px", height: "75px" }}
          />
          <Link to="/" className="me-5">
            Home
          </Link>
          <Link to="/ViewDecks" className="me-5">
            My Decks
          </Link>
          <Link to="/ViewCards" className="me-5">
            All Cards
          </Link>
          {showAdminContent && (
            <div>
              <Link to="/AddCard">Add Card</Link>
            </div>
          )}
        </div>
        {loggedIn && (
          <div>
            <button type="button" className="btn btn-light" onClick={logOut}>
              Log Out
            </button>
          </div>
        )}
        {!loggedIn && (
          <div>
            <button
              type="button"
              className="btn btn-light"
              onClick={navigateToLogin}
            >
              Login
            </button>
          </div>
        )}
      </header>
    </div>
  );
};

Header.propTypes = {
  currentUser: PropTypes.object,
  setCurrentUser: PropTypes.func.isRequired,
  showAdminContent: PropTypes.bool.isRequired,
};

export default Header;
