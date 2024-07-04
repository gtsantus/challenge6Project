import PropTypes from "prop-types";
import styleService from "../services/style.service";
import "../styles/CardStyles.css";
import React from "react";

const Card = ({ displayCard, onAddToDeck, showAddToDeckButton = false }) => {
  return (
    <div
      className={`card ${styleService.getFactionClass(
        displayCard.faction,
        displayCard.type
      )}`}
    >
      <div className="card-header">
        <span className="card-name">{displayCard.name}</span>
        {!(displayCard.type === "Camp") && (
          <span className="cost-circle">{displayCard.cost}</span>
        )}
      </div>
      <div className="card-body">
        {displayCard.legendary && <div>Legendary</div>}
        {styleService
          .formatCardText(displayCard.cardText, displayCard)
          .map(({ key, prefix, word }) => (
            <React.Fragment key={key}>
              {prefix === "\n" ? <br /> : prefix}
              <span>{word}</span>
            </React.Fragment>
          ))}
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
