import { useEffect, useState } from "react";
import cardsService from "../services/cards.service.js";
import authService from "../services/auth.service.js";

const AddCard = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const role = await authService.getCurrentUser();
        console.log(role);
        if (role.admin === true) {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error("Failed to fetch user role:", error);
      }
    };

    fetchRole();
  }, []);

  const [cardData, setCardData] = useState({
    name: "",
    type: "",
    cost: "",
    faction: "",
    power: "",
    toughness: "",
    rows: [],
    cardText: "",
    flavorText: "",
    legendary: false,
  });

  if (!isAdmin) {
    return (
      <h1 className="text-center">You are not authorised to see this page</h1>
    );
  }

  const handleInputChange = (e) => {
    const { name, value, type: inputType, checked } = e.target;
    if (name === "rows") {
      let newRows;
      if (checked) {
        newRows = Array.isArray(cardData.rows)
          ? [...cardData.rows, value]
          : [value];
      } else {
        newRows = Array.isArray(cardData.rows)
          ? cardData.rows.filter((row) => row !== value)
          : [];
      }
      setCardData({ ...cardData, rows: newRows });
    } else {
      let newData = {
        ...cardData,
        [name]: inputType === "checkbox" ? checked : value,
      };

      if (name === "type") {
        switch (value) {
          case "Commander":
            newData = { ...newData, legendary: true };
            break;
          case "Spell":
            newData = { ...newData, power: 0, toughness: 0, rows: [] };
            break;
          case "Camp":
            newData = { ...newData, cost: "0" };
            break;
          default:
            break;
        }
      }

      setCardData(newData);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    cardsService
      .addCard(cardData)
      .then((response) => {
        if (response.name) {
          alert("Card added successfully: " + response.name);
        } else {
          alert("Failed to add card: " + response.message);
        }
      })
      .catch((error) => {
        alert("Failed to add card:", error);
      });
  };

  const customStyles = {
    card: {
      minWidth: "50%",
      height: "auto",
    },
    container: {
      minHeight: "80vh",
    },
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={customStyles.container}
    >
      <div className="card text-center" style={customStyles.card}>
        <div className="card-body d-flex flex-column justify-content-center">
          <form onSubmit={handleSubmit} className="w-100">
            <div className="mb-3">
              <input
                type="text"
                name="name"
                value={cardData.name}
                onChange={handleInputChange}
                placeholder="Name"
                required
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <select
                name="type"
                value={cardData.type}
                onChange={handleInputChange}
                required
                className="form-select"
                data-testid="Select Type"
              >
                <option value="">Select Type</option>
                <option value="Commander">Commander</option>
                <option value="Minion">Minion</option>
                <option value="Spell">Spell</option>
                <option value="Camp">Camp</option>
                <option value="Token">Token</option>
              </select>
            </div>
            <div className="mb-3">
              <input
                type="number"
                name="cost"
                value={cardData.cost}
                onChange={handleInputChange}
                placeholder="Cost"
                required
                className="form-control"
                disabled={cardData.type === "Camp"}
              />
            </div>
            <div className="mb-3">
              <select
                name="faction"
                value={cardData.faction}
                onChange={handleInputChange}
                required
                className="form-select"
              >
                <option value="">Select Faction</option>
                <option value="Tech">Tech</option>
                <option value="Undead">Undead</option>
                <option value="Order">Order</option>
                <option value="Druid">Druid</option>
                <option value="Guerilla">Guerilla</option>
                <option value="Wizard">Wizard</option>
              </select>
            </div>
            <div className="mb-3">
              <input
                type="number"
                name="power"
                value={cardData.power}
                onChange={handleInputChange}
                placeholder="Power"
                className="form-control"
                disabled={cardData.type === "Spell"}
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                name="toughness"
                value={cardData.toughness}
                onChange={handleInputChange}
                placeholder="Toughness"
                className="form-control"
                disabled={cardData.type === "Spell"}
              />
            </div>
            <div disabled={cardData.type === "Spell"}>
              Rows:
              <label className="ms-3 me-3">
                <input
                  type="checkbox"
                  name="rows"
                  value="Front"
                  checked={cardData.rows.includes("Front")}
                  onChange={handleInputChange}
                  className="form-check-input"
                  disabled={cardData.type === "Spell"}
                />
                Front
              </label>
              <label className="me-3">
                <input
                  type="checkbox"
                  name="rows"
                  value="Middle"
                  checked={cardData.rows.includes("Middle")}
                  onChange={handleInputChange}
                  className="form-check-input"
                  disabled={cardData.type === "Spell"}
                />
                Middle
              </label>
              <label>
                <input
                  type="checkbox"
                  name="rows"
                  value="Back"
                  checked={cardData.rows.includes("Back")}
                  onChange={handleInputChange}
                  className="form-check-input"
                  disabled={cardData.type === "Spell"}
                />
                Back
              </label>
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="cardText"
                value={cardData.cardText}
                onChange={handleInputChange}
                placeholder="Card Text"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="flavorText"
                value={cardData.flavorText}
                onChange={handleInputChange}
                placeholder="Flavour Text"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label>
                <input
                  type="checkbox"
                  name="legendary"
                  checked={cardData.legendary}
                  onChange={handleInputChange}
                  className="form-check-input"
                  disabled={cardData.type === "Commander"}
                />
                Legendary
              </label>
            </div>
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary">
                Create Card
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCard;
