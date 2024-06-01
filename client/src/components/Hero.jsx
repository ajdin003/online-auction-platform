import React from "react";
import "../css/Hero.css";
import hand_icon from "./Assets/hand_icon.png"; /* PROMJENIT */
import arrow_icon from "./Assets/arrow.png";
import hero_image from "./Assets/hero_image.png";
import Item from "./Item";
import Popular from "./Popular";
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <>
      <div className="hero">
        <div className="hero-left">
          {" "}
          {/* PROMJENIT */}
          <h2>Welcome to Online Auction Platform</h2>
          <div>
            <div className="hero-hand-icon">
              {" "}
              {/* PROMJENIT */}
              
              
            </div>
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
            <Item id="1" name="Example Item" newPrice={100} />
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
