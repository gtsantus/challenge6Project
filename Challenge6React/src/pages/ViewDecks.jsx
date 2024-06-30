import Deck from "../components/Deck";

const ViewDecks = () => {
  const decks = [
    { name: "Deck 1", color: "primary" },
    { name: "Deck 2", color: "success" },
    { name: "Deck 3", color: "danger" },
  ];

  return (
    <>
      <h1 className="text-center">Your Decks</h1>
      {decks.map((deck, index) => (
        <Deck key={index} name={deck.name} color={deck.color} />
      ))}
    </>
  );
};

export default ViewDecks;
