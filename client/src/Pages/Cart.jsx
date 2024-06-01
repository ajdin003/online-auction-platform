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
    <div className="shop-container">
      <h2>Cart</h2>
      <div className="item-list-container">
        <div className="item-list">
          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cartItems.map((item) => (
              <div key={item._id} className="item">
                <img
                  src={`http://localhost:3001/${item.image}`}
                  alt={item.articleName}
                  className="item-image"
                />
                <p>{item.articleName}</p>
                <div className="item-prices">
                  <p className="item-price-new">${item.price}</p>
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
