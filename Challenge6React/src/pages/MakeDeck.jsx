import { useState, useEffect, useRef } from "react";
import Card from "../components/Card";
import cardService from "../services/cards.service.js";
import decksService from "../services/decks.service.js";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const MakeDeck = ({ currentUser }) => {
  const location = useLocation();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deck, setDeck] = useState(
    location.state?.displayDeck || { name: "", cards: [] }
  );
  const deckRef = useRef(deck);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const tempCards = await cardService.getAllCards();
        setCards(tempCards);
      } catch (error) {
        console.error("Failed to fetch cards:", error);
        setCards([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  useEffect(() => {
    const fetchDeckCardsDetails = async () => {
      if (deck.cards.length > 0) {
        const fullCardsDetails = await Promise.all(
          deck.cards.map(async (cardId) => {
            try {
              const cardDetails = await cardService.getCardById(cardId);
              return cardDetails;
            } catch (error) {
              console.error(
                `Failed to fetch card details for card ID ${cardId}:`,
                error
              );
              return null;
            }
          })
        );
        setDeck({
          ...deck,
          cards: fullCardsDetails.filter((card) => card !== null),
        });
      }
    };
    if (deckRef.current.cards.length > 0) {
      fetchDeckCardsDetails();
    }
  }, []);

  const addToDeck = (cardToAdd) => {
    if (!deck.cards.find((card) => card._id === cardToAdd._id)) {
      const updatedDeck = {
        ...deck,
        cards: [...deck.cards, cardToAdd],
      };
      setDeck(updatedDeck);
    }
  };

  const saveDeck = () => {
    if (currentUser && currentUser.id) {
      decksService.updateDeck(currentUser.id, deck.name, deck.cards);
      alert("Deck saved!");
    } else {
      console.error("User is not logged in.");
    }
  };

  const removeCardFromDeck = (cardId) => () => {
    setDeck((prevDeck) => ({
      ...prevDeck,
      cards: prevDeck.cards.filter((card) => card._id !== cardId),
    }));
  };

  if (!deck) {
    return (
      <h1 className="text-center">
        Deck is undefined. Please select a deck through your My Decks page.
      </h1>
    );
  }

  if (!currentUser) {
    return <h1 className="text-center">Please log in to create a deck</h1>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <div className="row">
            {cards.map((card) => (
              <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={card._id}>
                <Card
                  displayCard={card}
                  onAddToDeck={() => addToDeck(card)}
                  showAddToDeckButton={true}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              {deck.name} - {deck.cards.length} / 40
            </div>
            {
              <ul className="list-group list-group-flush">
                {deck.cards.map((card, index) => (
                  <li
                    className="list-group-item d-flex justify-content-between align-items-center"
                    key={index}
                  >
                    {card.name} - Cost: {card.cost}
                    <button
                      className="btn btn-danger"
                      onClick={removeCardFromDeck(card._id)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            }
            <div className="card-body">
              <button className="btn btn-primary" onClick={saveDeck}>
                Save Deck
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

MakeDeck.propTypes = {
  currentUser: PropTypes.object,
};

export default MakeDeck;
