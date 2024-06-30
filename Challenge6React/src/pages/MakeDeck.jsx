import React, { useState } from "react";
import Card from "../components/Card"; // Adjust the import path as necessary

const MakeDeck = () => {
  // Example array of card data
  const [cards, setCards] = useState([
    { id: 1, name: "Card 1", image: "path/to/image1.jpg" },
    { id: 2, name: "Card 2", image: "path/to/image2.jpg" },
    // Add more card objects here
  ]);

  // Example deck data
  const [deck, setDeck] = useState({
    name: "My Deck",
    cards: [], // Initially empty
  });

  // Function to handle saving the deck (implementation depends on your requirements)
  const saveDeck = () => {
    console.log("Deck saved:", deck);
    // Implement save logic here
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <div className="row">
            {cards.map((card) => (
              <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={card.id}>
                <Card name={card.name} image={card.image} />
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              {deck.name} - {deck.cards.length} / 40
            </div>
            <ul className="list-group list-group-flush">
              {deck.cards.map((card, index) => (
                <li className="list-group-item" key={index}>
                  {card.name}
                </li>
              ))}
            </ul>
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

export default MakeDeck;
