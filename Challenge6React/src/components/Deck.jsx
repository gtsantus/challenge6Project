const Deck = ({ name, color }) => {
  const boxClasses = `d-flex justify-content-center align-items-center text-white bg-${color} p-3`;

  const boxStyle = {
    width: "80%",
    margin: "0 auto",
  };

  return (
    <div className={boxClasses} style={boxStyle}>
      {name}
    </div>
  );
};

export default Deck;
