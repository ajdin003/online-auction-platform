import "../css/Hero.css";

import hero_image from "./Assets/hero_image.png";
import Item from "./Item";
import Popular from "./Popular";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

const Hero = () => {
  const [cartItem, setCartItem] = useState([]);
  const [cookie] = useCookies();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/articles/cart",
          { headers: { Authorization: `Bearer ${cookie.token}` } }
        );
        setCartItem(response.data[0]);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  console.log(cartItem);
  return (
    <>
      <div className="hero">
        <div className="hero-left">
          {" "}
          {/* PROMJENIT */}
          <h2>Welcome to Online Auction Platform</h2>
          <div>
            <div className="hero-hand-icon"> {/* PROMJENIT */}</div>
            <p>Find unique items</p>
          </div>
          <div className="hero-latest-btn">
            <Link to="/Shop" className="latest-auctions-btn">
              View Latest Auctions
            </Link>
          </div>
        </div>

        <div className="hero-right">
          {" "}
          <div className="weekly-auctions">
            <h3>Weekly Auctions</h3>
            <p>Discover our latest weekly auctions featuring unique items!</p>
            <img src={hero_image} alt="Hero Image" className="hero-image" />
            <Item
              id={cartItem._id}
              name={cartItem.articleName}
              newPrice={cartItem.price}
              image={cartItem.image}
              startDate={cartItem.startDate}
              endDate={cartItem.endDate}
            />
          </div>
        </div>
      </div>
      <Popular />
    </>
  );
};

/* promjenit imena divova, promjenit slike, promjenit text u nesto sto se tice nase teme 
sliku treba izbacit (hand icon), i promjenit raspored ovog texta da ne bude isto (boja etc)           */

export default Hero;
