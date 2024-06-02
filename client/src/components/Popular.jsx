import "../css/Popular.css";
import Item from "./Item";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

const Popular = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cookie] = useCookies();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/articles/cart",
          { headers: { Authorization: `Bearer ${cookie.token}` } }
        );
        setCartItems(response.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  console.log(cartItems);
  return (
    <div className="popular">
      <h1>SPECIAL OFFER, BLUE HAIRED DADDY ISSUES GIRL </h1>
      <hr />

      <div className="popular-item">
        {cartItems.map((item, i) => (
          <Item
            key={i}
            id={item._id}
            name={item.name}
            image={item.image}
            newPrice={item.price}
            startDate={item.startDate}
            endDate={item.endDate}
          />
        ))}
      </div>
    </div>
  );
};

export default Popular;
