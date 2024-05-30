import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useCookies } from "react-cookie";

const BidButton = ({ articleId }) => {
  const [bidAmount, setBidAmount] = useState(0);
  const [cookie] = useCookies();

  const handleBid = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3001/articles/${articleId}/bid`,
        { bidAmount },
        {
          headers: {
            Authorization: `Bearer ${cookie.token}`,
          },
        }
      );
      console.log(response.data);
      window.location.reload();
    } catch (error) {
      console.error("Error bidding on article:", error);
    }
  };

  return (
    <div>
      <input
        type="number"
        value={bidAmount}
        onChange={(e) => setBidAmount(e.target.value)}
      />
      <button onClick={handleBid}>Bid</button>
    </div>
  );
};

BidButton.propTypes = {
  articleId: PropTypes.string.isRequired,
};

export default BidButton;
