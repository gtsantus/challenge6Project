import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <div
        className="d-flex flex-column align-items-center justify-content-center py-5 gap-3 px-5 flex-lg-row"
        style={{ minHeight: "calc(100vh - 132px)" }}
      >
        <div className="card col py-4">
          <img
            src=""
            className="card-img-top rounded-3 img-fluid"
            alt="View Your Decks"
          ></img>
          <div className="card-body">
            <div className="card-text">
              <h2 className="text-center">
                <Link
                  to={"/ViewDecks"}
                  className="link-underline link-underline-opacity-0 text-black"
                >
                  View My Decks
                </Link>
              </h2>
            </div>
          </div>
        </div>
        <div className=" card col py-4">
          <img src="" className="card-img-top rounded-3" alt="View Cards"></img>
          <div className="card-body">
            <div className="card-text">
              <h2 className="text-center">
                <Link
                  to={"/ViewCards"}
                  className="link-underline link-underline-opacity-0 text-black"
                >
                  View All Cards
                </Link>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
