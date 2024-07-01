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

    fetchCards;
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
          <div>
            {cards.map((card) => (
              <Card key={card.id} name={card.name} image={card.image} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCards;
