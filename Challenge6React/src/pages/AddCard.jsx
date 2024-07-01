import UserService from "../services/user.service.js";
import { useState } from "react";

const AddCard = () => {
  const [reply, setReply] = useState("");

  const handleCardAttempt = async () => {
    await UserService.getAdminContent().then(
      (response) => setReply(response.data),
      (error) => {
        const errorReply =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        setReply(errorReply);
      }
    );
  };

  return (
    <div>
      <h3>{reply}</h3>
      <button
        type="button"
        className="btn btn-light"
        onClick={handleCardAttempt}
      >
        Add Card
      </button>
    </div>
  );
};

export default AddCard;
