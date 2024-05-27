import React from "react";
import "../css/Hero.css";
import hand_icon from "./Assets/hand_icon.png"; /* PROMJENIT */
import arrow_icon from "./Assets/arrow.png";
import hero_image from "./Assets/hero_image.png";
import Item from "./Item";
import Popular from "./Popular";
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
            {" "}
            {/* PROMJENIT */}
            <div>View Latest Auctions</div>
            
          </div>
        </div>

        <div className="hero-right">
          {" "}
          <div className="weekly-auctions">
            <h3>Weekly Auctions</h3>
            <p>Discover our latest weekly auctions featuring unique items!</p>
            {/* Add your Item component or any content for weekly auctions here */}
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
