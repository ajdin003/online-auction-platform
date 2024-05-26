import React from "react";
import "../css/Popular.css";
import data_product from "./Assets/data";
import Item from "./Item";
import { Link } from "react-router-dom";

const Popular = () => {
  return (
    <div className="popular">
      <h1>WEEKLY OOGA BOOGA </h1>
      <hr />

      <div className="popular-item">
        {data_product.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  );
};

export default Popular;