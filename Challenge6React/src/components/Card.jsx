const Card = () => {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <div className="card-header">Card Name</div>
      <div className="card-body">
        <img src="" className="card-img-top" alt="Card Image" />
      </div>
      <div className="card-footer">
        <div className="row">
          <div className="col text-start">1</div>
          <div className="col text-end">2</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
