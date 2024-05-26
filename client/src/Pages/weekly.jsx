import React from "react";
import { useParams } from "react-router-dom";
import data_product from "../components/Assets/data.js";

const ItemDetail = () => {
  const { id } = useParams();

  // Find the item with the matching id from the route parameter
  const item = data_product.find((item) => item.id === parseInt(id));

  // If no item is found, display a message
  if (!item) {
    return <div>Item not found</div>;
  }

  return (
    <div>
      <h2>{item.name}</h2>
      <img src={item.image} alt={item.name} />
      <p>New Price: ${item.new_price}</p>
      <p>Old Price: ${item.old_price}</p>
    </div>
  );
};

export default ItemDetail;
