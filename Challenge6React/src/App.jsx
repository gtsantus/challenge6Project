import Header from "./components/Header";
import AddCard from "./pages/AddCard";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import MakeDeck from "./pages/MakeDeck";
import SignUp from "./pages/SignUp";
import ViewCards from "./pages/ViewCards";
import ViewDecks from "./pages/ViewDecks";
import AuthService from "./services/auth.service";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [showAdminContent, setShowAdminContent] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const user = await AuthService.getCurrentUser();
      if (user) {
        setCurrentUser(user);
        setShowAdminContent(user.admin);
      } else {
        setCurrentUser(undefined);
        setShowAdminContent(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Header
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        showAdminContent={showAdminContent}
      />
      <div className="background-image">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/Login"
            element={<Login setCurrentUser={setCurrentUser} />}
          />
          <Route
            path="/SignUp"
            element={<SignUp setCurrentUser={setCurrentUser} />}
          />
          <Route path="/AddCard" element={<AddCard />} />
          <Route path="/ViewCards" element={<ViewCards />} />
          <Route
            path="/ViewDecks"
            element={<ViewDecks currentUser={currentUser} />}
          />
          <Route
            path="/MakeDeck"
            element={<MakeDeck currentUser={currentUser} />}
          />
        </Routes>
      </div>
    </>
  );
};

export default App;
