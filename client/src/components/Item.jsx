import "../css/Item.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const Item = ({ id, name, newPrice, startDate, endDate, image }) => {
  const [timeRemaining, setTimeRemaining] = useState("");

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        setTimeRemaining("Invalid start or end date");
        return;
      }

      if (now < start) {
        setTimeRemaining("Auction has not started yet");
        return;
      }

      const difference = end - start;

      if (difference <= 0) {
        setTimeRemaining("Time's up");
        return;
      }

      const intervalId = setInterval(() => {
        const currentTime = new Date();
        const timeElapsed = currentTime - start;

        const remainingTime = difference - timeElapsed;

        if (remainingTime <= 0) {
          clearInterval(intervalId);
          setTimeRemaining("Time's up");
        } else {
          const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor(
            (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

          setTimeRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        }
      }, 1000);

      return () => clearInterval(intervalId);
    };

    calculateTimeRemaining();
  }, [startDate, endDate]);

  return (
    <div className="item">
      <Link to={`/item/${id}`}>
        <img src={`http://localhost:3001/${image}`} alt="" />
        <p>{name}</p>
        <div className="item-prices">
          <div className="item-price-new">${newPrice}</div>
        </div>
        <div className="item-timer">Time remaining: {timeRemaining}</div>
      </Link>
    </div>
  );
};

Item.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  newPrice: PropTypes.number.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  image: PropTypes.string,
};

export default Item;
