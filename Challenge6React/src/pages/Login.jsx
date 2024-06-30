import { useState } from "react";

/* import login from "../services/authenticateUser";
import signUp from "../services/addNewUser";
import { useNavigate } from "react-router-dom"; */

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [invalidDetails] = useState(false);
  /*const [newUser, setNewUser] = useState(false);
  const navigate = useNavigate(); */

  /* async function formSubmit(e) {
    e.preventDefault();
    if (newUser) {
      await signUpAttempt();
    } else {
      await loginAttempt();
    }
    await updateAuth();
    if (auth) {
      navigate("/");
    }
  }

  const signUpAttempt = async () => {
    if (validatePassword() && validateEmail()) {
      const signUpResponse = await signUp(username, password);
      setInvalidDetails(false);
      localStorage.setItem("accessToken", signUpResponse.accessToken);
      localStorage.setItem("userId", signUpResponse.id);
    } else {
      setInvalidDetails(true);
      console.log("invalid Username or Password");
    }
  };

  const loginAttempt = async () => {
    if (validateEmail()) {
      const loginResponse = await login(username, password);
      console.log(loginResponse);
      setInvalidDetails(false);
      localStorage.setItem("accessToken", loginResponse.accessToken);
      localStorage.setItem("userId", loginResponse.id);
    } else {
      setInvalidDetails(true);
      console.log("invalid Username or Password");
    }
  };

  const updateAuth = async () => {
    const token = localStorage.getItem("accessToken");
    const id = localStorage.getItem("userId");
    if (token && id) {
      setAuth({ token, id });
    }
  };

  const validatePassword = () => {
    const passwordRegEx =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[1-9])(?=.*[@$!%*?&])[A-Za-zd@$!%*?&1-9]{8,}$/;
    return passwordRegEx.test(password);
  };

  const handleNewUserBox = () => {
    setNewUser(!newUser);
  }; */

  function formSubmit() {
    console.log("Form submitted");
  }

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

export default LoginScreen;
