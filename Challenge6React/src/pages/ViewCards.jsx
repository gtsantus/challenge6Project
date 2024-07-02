import Card from "../components/Card";
import cardService from "../services/cards.service.js";
import { useState, useEffect } from "react";

const ViewCards = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      const cards = await cardService.getAllCards();
      setCards(cards);
      setLoading(false);
    };

    fetchCards();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="row">
        {cards.map((card) => (
          <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={card._id}>
            <Card displayCard={card} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewCards;
