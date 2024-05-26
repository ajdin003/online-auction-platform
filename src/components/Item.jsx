import React from "react";
import "../css/Item.css";
import { Link } from "react-router-dom";
const Item = (props) => {
  return (
    <Link to={`/item/${props.id}`}>
      <div className="item">
        <img src={props.image} alt="" />
        <p>{props.name}</p>
        <div className="item-prices">
          <div className="item-price-new">${props.new_price}</div>

          <div className="item-price-old">${props.new_price}</div>
        </div>
      </div>
    </Link>
  );
};

export default Item;
