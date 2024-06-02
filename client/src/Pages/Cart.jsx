import { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import "../css/Cart.css";

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
    <div className="cart-container">
      <h2 className="cart-title">Cart</h2>
      <div className="cart-item-list-container">
        <div className="cart-item-list">
          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cartItems.map((item) => (
              <div key={item._id} className="cart-item">
                <img
                  src={`http://localhost:3001/${item.image}`}
                  alt={item.articleName}
                  className="cart-item-image"
                />
                <p className="cart-item-name">{item.articleName}</p>
                <div className="cart-item-prices">
                  <p className="cart-item-price-new">${item.highestBid}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
