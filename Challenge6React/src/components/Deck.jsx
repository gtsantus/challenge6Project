import PropTypes from "prop-types";
import "../styles/DeckStyles.css";
import { useNavigate } from "react-router-dom";

const Deck = ({ displayDeck }) => {
  const navigate = useNavigate();
  const getFactionColour = (faction) => {
    switch (faction) {
      case "Tech":
        return {
          bg: "bg-warning",
          text: "text-dark",
          button: "btn btn-danger",
        };
      case "Undead":
        return {
          bg: "bg-secondary-subtle",
          text: "text-secondary-emphasis",
          button: "btn btn-secondary",
        };
      case "Order":
        return { bg: "bg-light", text: "text-dark", button: "btn btn-dark" };
      case "Druid":
        return {
          bg: "bg-success",
          text: "text-white",
          button: "btn btn-light",
        };
      case "Guerilla":
        return {
          bg: "bg-success-subtle",
          text: "text-success-emphasis",
          button: "btn btn-success",
        };
      case "Wizard":
        return { bg: "bg-info", text: "text-dark", button: "btn btn-primary" };
      default:
        return { bg: "bg-white", text: "text-dark", button: "btn btn-dark" };
    }
  };

  const handleDeckClick = () => {
    navigate("/MakeDeck", { state: { displayDeck } });
  };

  const factionStyles = getFactionColour(displayDeck.faction);
  const boxClasses = `d-flex justify-content-center align-items-center ${factionStyles.bg} ${factionStyles.text} p-3 box`;

  return (
    <div className={boxClasses}>
      <div className="d-flex justify-content-between align-items-center w-100">
        <span>
          {displayDeck.name} - {displayDeck.faction}
        </span>
        <button className={factionStyles.button} onClick={handleDeckClick}>
          Edit Deck
        </button>
      </div>
    </div>
  );
};

Deck.propTypes = {
  displayDeck: PropTypes.object,
};

export default Deck;
