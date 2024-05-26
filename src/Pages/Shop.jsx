import React from "react";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar/Navbar";
import ItemList from "../components/item_list";
import "../css/shop.css";

const Shop = () => {
  return (
    <div className="shop-container">
      <ItemList />
    </div>
  );
};

export default Shop;
