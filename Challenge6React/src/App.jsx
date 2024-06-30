import Header from "./components/Header";
import AddCard from "./pages/AddCard";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import MakeDeck from "./pages/MakeDeck";
import SignUp from "./pages/SignUp";
import ViewCards from "./pages/ViewCards";
import ViewDecks from "./pages/ViewDecks";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <>
      <Header loggedIn={loggedIn} />
      <div className="background-image">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/Login" element={<Login setLoggedIn={setLoggedIn} />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/AddCard" element={<AddCard />} />
          <Route path="/ViewCards" element={<ViewCards />} />
          <Route path="/ViewDecks" element={<ViewDecks />} />
          <Route path="/MakeDeck" element={<MakeDeck />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
