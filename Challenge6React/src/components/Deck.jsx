import PropTypes from "prop-types";
import "../styles/DeckStyles.css";
import styleService from "../services/style.service";
import { useNavigate } from "react-router-dom";

const Deck = ({ displayDeck }) => {
  const navigate = useNavigate();

  const handleDeckClick = () => {
    navigate("/MakeDeck", { state: { displayDeck } });
  };

  const factionStyles = styleService.getFactionColour(displayDeck.faction);
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
