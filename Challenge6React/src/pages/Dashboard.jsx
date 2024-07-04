import { Link } from "react-router-dom";
import CardsImage from "../components/images/three cards.jpg";
import purpleDecksImage from "../components/images/purple decks.jpg";

const Dashboard = () => {
  return (
    <>
      <div
        className="d-flex flex-column align-items-center justify-content-center py-5 gap-3 px-5 flex-lg-row"
        style={{ minHeight: "calc(100vh - 132px)" }}
      >
        <div className="card col py-4 position-relative text-container">
          <img
            src={purpleDecksImage}
            className="card-img position-absolute"
            alt="View Your Decks"
          />
          <div className="card-body position-relative">
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
        <div className="card col py-4 position-relative text-container">
          <img
            src={CardsImage}
            className="card-img position-absolute"
            alt="View Cards"
          />
          <div className="card-body position-relative">
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
