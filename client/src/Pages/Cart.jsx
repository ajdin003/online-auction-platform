import { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

const Cart = () => {
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
    <div>
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item._id}>
              <img src={`http://localhost:3001/${item.image}`} alt="" />
              <div>
                <h3>{item.articleName}</h3>
                <p>${item.price}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
