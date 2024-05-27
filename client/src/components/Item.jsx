import "../css/Item.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const Item = ({ id, name, newPrice, startDate, endDate }) => {
  const [timeRemaining, setTimeRemaining] = useState("");

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const end = new Date(endDate);
      const difference = end - now;

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
    };

    const intervalId = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(intervalId);
  }, [endDate]);

  return (
    <Link to={`/item/${id}`}>
      <div className="item">
        <p>{name}</p>
        <div className="item-prices">
          <div className="item-price-new">${newPrice}</div>
        </div>
        <div className="item-timer">Time remaining: {timeRemaining}</div>
      </div>
    </Link>
  );
};

Item.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  newPrice: PropTypes.number.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
};

export default Item;
