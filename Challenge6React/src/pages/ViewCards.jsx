import Card from "../components/Card"; // Adjust the import path as necessary

const ViewCards = () => {
  // Example array of card data
  const cards = [
    { id: 1, name: "Card 1", image: "path/to/image1.jpg" },
    { id: 2, name: "Card 2", image: "path/to/image2.jpg" },
    // Add more card objects here
  ];

  return (
    <div>
      <div>
        {cards.map((card) => (
          <Card key={card.id} name={card.name} image={card.image} />
        ))}
      </div>
    </div>
  );
};

export default ViewCards;
