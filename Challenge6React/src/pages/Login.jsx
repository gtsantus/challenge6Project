import { useState } from "react";
import authService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const LoginScreen = ({ setCurrentUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [invalidDetails, setInvalidDetails] = useState(false);
  const navigate = useNavigate();

  async function formSubmit(e) {
    e.preventDefault();
    await loginAttempt();
  }

  const loginAttempt = async () => {
    if (authService.validatePassword(password)) {
      await authService.login(username, password);
      setInvalidDetails(false);
      if (authService.getCurrentUser()) {
        setCurrentUser(authService.getCurrentUser());
        navigate("/");
      } else {
        setInvalidDetails(true);
        console.log("Invalid Username or Password");
      }
    } else {
      setInvalidDetails(true);
      console.log("Invalid Username or Password");
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center">
      <div className="card text-center">
        <div className="card-body d-flex flex-column justify-content-center">
          <p className="card-title">Login</p>
          <div className="d-flex justify-content-center align-items-center my-3">
            <form onSubmit={formSubmit}>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="username"
                  className="form-control"
                  aria-describedby="usernameHelp"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                {invalidDetails && (
                  <div className="text-danger">
                    Invalid Username or Password
                  </div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="d-grid gap-2">
                <a href="/SignUp">New User? Sign Up Here!</a>
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

LoginScreen.propTypes = {
  setCurrentUser: PropTypes.func.isRequired,
};

export default LoginScreen;
