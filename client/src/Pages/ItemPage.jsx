import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import "../css/itemPage.css";
import { useEffect, useState } from "react";
import BidButton from "../components/BidButton";
import { useCookies } from "react-cookie";

const ItemPage = () => {
  const { id } = useParams();
  const [timeRemaining, setTimeRemaining] = useState("");
  const [cookie] = useCookies();

  const query = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:3001/articles/${id}`);
      return response.data;
    },
  });

  useEffect(() => {
    const calculateTimeRemaining = () => {
      if (
        query.isLoading ||
        !query.data ||
        !query.data.data ||
        !query.data.data.article
      ) {
        return;
      }

      const article = query.data.data.article;
      const start = new Date(article.startDate);
      const end = new Date(article.endDate);

      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        setTimeRemaining("Invalid start or end date");
        return;
      }

      if (Date.now() < start) {
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
          handleEndAuction(); // Call the function to handle end of auction
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
  }, [id, query.isLoading, query.data]);

  const handleBuyNow = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3001/articles/${id}/buy-now`,
        {},
        {
          headers: {
            Authorization: `Bearer ${cookie.token}`,
          },
        }
      );
      console.log(response.data);
      // Add logic to handle success and update UI as needed
    } catch (error) {
      console.error("Error buying now:", error);
    }
  };

  const handleEndAuction = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3001/articles/${id}/end-auction`
      );
      console.log(response.data);
      // Add logic to handle success and update UI as needed
    } catch (error) {
      console.error("Error ending auction:", error);
    }
  };

  if (
    query.isLoading ||
    !query.data ||
    !query.data.data ||
    !query.data.data.article
  ) {
    return <h1>loading</h1>;
  }

  const article = query.data.data.article;
  const conditionClass = article.condition === "New" ? "green" : "yellow";

  return (
    <div className="item-page-wrapper">
      <div className="item-page-content">
        <img src={`http://localhost:3001/${article.image}`} alt="" />
        <div className="article-name-condition">
          <h1 className="article-name">{article.articleName}</h1>
          <p className={`article-condition ${conditionClass}`}>
            <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &#40;{article.condition}&#41;
          </p>
        </div>
        <h2 className="article-price">${article.price}</h2>
        <h2>
          Highest bid:
          <span className="highest-bid-number"> ${article.highestBid}</span>
        </h2>
        {/* Render the Item component and pass the timeRemaining prop */}
        <h2>
          Time remaining: <br />
          &nbsp;<span>{timeRemaining}</span>
        </h2>
        <div>
          <BidButton articleId={article._id} />
          <br />
          <button onClick={handleBuyNow}>Buy Now</button>
          <br /><br />
          {/* Add cancel bid button */}
          <button>CANCEL BID</button>
          <br /><br />
        </div>
      </div>
    </div>
  );
};

export default ItemPage;
