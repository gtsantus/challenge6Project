import { useNavigate } from "react-router-dom";

const Header = (loggedIn) => {
  loggedIn = loggedIn.loggedIn;
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/Login");
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
          <a href="/" className="me-5">
            Home
          </a>
          <a href="/ViewDecks" className="me-5">
            My Decks
          </a>
          <a href="/ViewCards">All Cards</a>
        </div>
        {loggedIn && (
          <div>
            <button type="button" className="btn btn-light">
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

export default Header;
