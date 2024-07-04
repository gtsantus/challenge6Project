import Deck from "../components/Deck";
import decksService from "../services/decks.service.js";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const ViewDecks = ({ currentUser }) => {
  const [userId, setUserId] = useState(currentUser?.id);
  const [loading, setLoading] = useState(true);
  const [issue, setIssue] = useState(false);
  const [decks, setDecks] = useState([]);
  const [newDeckName, setNewDeckName] = useState("");
  const [newDeckFaction, setNewDeckFaction] = useState("Tech");

  useEffect(() => {
    if (currentUser?.id !== userId) {
      setUserId(currentUser?.id);
    }
  }, [currentUser, userId]);

  useEffect(() => {
    async function fetchCards() {
      if (userId) {
        try {
          const decks = await decksService.getDecks(userId);
          if (decks.message === "Request failed with status code 404") {
            setDecks([]);
            setLoading(false);
          } else {
            setDecks(decks);
            setLoading(false);
          }
        } catch {
          setIssue(true);
        }
      } else {
        setLoading(false);
      }
    }

    fetchCards();
  }, [userId]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!newDeckName.trim()) return;
    await decksService.addDeck(currentUser.id, newDeckName, newDeckFaction, []);
    setNewDeckName("");
    const updatedDecks = await decksService.getDecks(currentUser.id);
    setDecks(updatedDecks);
  };

  const handleDeleteDeck = async (deckId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this deck?"
    );
    if (isConfirmed) {
      const updatedDecks = await decksService.deleteDeck(
        currentUser.id,
        deckId
      );
      setDecks([...updatedDecks]);
    }
  };

  if (issue) {
    return <div>Failed to fetch decks</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {userId && (
        <>
          <h1 className="text-center">
            Choose a Deck to edit, or create a new one!
          </h1>
          {decks.map((deck) => (
            <div
              key={deck._id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Deck displayDeck={deck} />
              <button
                onClick={() => handleDeleteDeck(deck._id)}
                className="btn btn-danger"
              >
                Delete Deck
              </button>
            </div>
          ))}
          <div style={{ width: "80%", margin: "0 auto", marginTop: "20px" }}>
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="deckName">Deck Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="deckName"
                  value={newDeckName}
                  onChange={(e) => setNewDeckName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="deckFaction">Faction</label>
                <select
                  className="form-control"
                  id="deckFaction"
                  value={newDeckFaction}
                  onChange={(e) => setNewDeckFaction(e.target.value)}
                >
                  <option value="Tech">Tech</option>
                  <option value="Undead">Undead</option>
                  <option value="Order">Order</option>
                  <option value="Druid">Druid</option>
                  <option value="Guerilla">Guerilla</option>
                  <option value="Wizard">Wizard</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary">
                Create Deck
              </button>
            </form>
          </div>
        </>
      )}

      {!userId && (
        <h1 className="text-center">Please log in to view your decks</h1>
      )}
    </>
  );
};

ViewDecks.propTypes = {
  currentUser: PropTypes.object,
};

export default ViewDecks;
