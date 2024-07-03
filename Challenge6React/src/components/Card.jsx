import PropTypes from "prop-types";
import "../styles/CardStyles.css";

const Card = ({ displayCard, onAddToDeck, showAddToDeckButton = false }) => {
  const formatCardText = (text) => {
    return text.split(" ").map((word, index, words) => {
      const nextWord = words[index + 1] ? ` ${words[index + 1]}` : "";
      const phrase = word + nextWord;
      const isLeading = word === "Leading:";
      const isPerfectCast =
        phrase.startsWith("Perfect Cast:") && displayCard.type === "Spell";
      const prefix =
        index === 0 ? "" : isLeading || isPerfectCast ? <br /> : " ";
      const modifiedWord = isPerfectCast ? phrase : word;

      return (
        <span key={index}>
          {prefix}
          {modifiedWord}
        </span>
      );
    });
  };

  const getFactionClass = (faction) => {
    switch (faction) {
      case "Tech":
        return "faction-orange";
      case "Undead":
        return "faction-grey";
      case "Order":
        return "faction-silver";
      case "Druid":
        return "faction-green";
      case "Guerilla":
        return "faction-brown";
      case "Wizard":
        return "faction-purple";
      default:
        return "faction-default";
    }
  };

  return (
    <div className={`card ${getFactionClass(displayCard.faction)}`}>
      <div className="card-header">
        <span className="card-name">{displayCard.name}</span>
        {!(displayCard.type === "Camp") && (
          <span className="cost-circle">{displayCard.cost}</span>
        )}
      </div>
      <div className="card-body">
        {displayCard.legendary && <div>Legendary</div>}
        {formatCardText(displayCard.cardText)}
        {["Minion", "Camp", "Commander", "Token"].includes(
          displayCard.type
        ) && <div>Rows: {displayCard.rows.join(" ")}</div>}
      </div>
      {["Minion", "Commander", "Token"].includes(displayCard.type) && (
        <div className="card-footer">
          <div className="row">
            <div className="col text-start">{displayCard.power}</div>
            <div className="col text-end">{displayCard.toughness}</div>
          </div>
        </div>
      )}
      {showAddToDeckButton && (
        <button
          className="btn btn-primary"
          onClick={() => onAddToDeck(displayCard)}
        >
          Add to Deck
        </button>
      )}
    </div>
  );
};

Card.propTypes = {
  displayCard: PropTypes.object.isRequired,
  onAddToDeck: PropTypes.func,
  showAddToDeckButton: PropTypes.bool,
};

export default Card;
