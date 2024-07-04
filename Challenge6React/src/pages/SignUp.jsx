import { useState } from "react";
import authService from "../services/auth.service.js";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [invalidDetails, setInvalidDetails] = useState(false);
  const navigate = useNavigate();

  const signUpAttempt = async (e) => {
    e.preventDefault();
    if (authService.validatePassword(password)) {
      const signUpResponse = await authService.signUp(username, password);
      setInvalidDetails(false);
      if (authService.getCurrentUser()) {
        navigate("/dashboard");
      } else {
        console.dir(signUpResponse);
        setInvalidDetails(true);
      }
    } else {
      setInvalidDetails(true);
      console.log("invalid Username or Password");
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center">
      <div className="card text-center">
        <div className="card-body d-flex flex-column justify-content-center">
          <p className="card-title">Sign Up</p>
          <div className="d-flex justify-content-center align-items-center my-3">
            <form onSubmit={signUpAttempt}>
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
                <a href="/Login">Not a new User? Login Here!</a>
                <button type="submit" className="btn btn-primary">
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
