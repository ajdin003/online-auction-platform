import { useState } from "react";
import "./Navbar.css";
import logo from "../Assets/auction_logo.jpeg";
import cart_icon from "../Assets/cart_icon.png";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useCookies } from "react-cookie";

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const [cookies] = useCookies(["token"]);

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      if (!cookies.token) {
        throw new Error("No token found");
      }
      const response = await axios.get("http://localhost:3001/users/current", {
        headers: { Authorization: `Bearer ${cookies.token}` },
      });
      return response.data.data.user;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("Error fetching user:", error);
  }

  console.log(user);

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="Auction Logo" />
      </div>
      <ul className="nav-menu">
        <li onClick={() => setMenu("shop")}>
          <Link style={{ textDecoration: "none" }} to="/">
            Home
          </Link>
          {menu === "shop" && <hr />}
        </li>
        <li onClick={() => setMenu("shop")}>
          <Link style={{ textDecoration: "none" }} to="/Shop">
            Shop
          </Link>
          {menu === "shop" && <hr />}
        </li>
        <li onClick={() => setMenu("about")}>
          <Link style={{ textDecoration: "none" }} to="/about">
            About us
          </Link>
          {menu === "about" && <hr />}
        </li>
        <li onClick={() => setMenu("contact")}>
          <Link style={{ textDecoration: "none" }} to="/contact">
            Contact us
          </Link>
          {menu === "contact" && <hr />}
        </li>
        {user && user.role === "admin" && (
          <li onClick={() => setMenu("users")}>
            <Link style={{ textDecoration: "none" }} to="/users">
              Users
            </Link>
            {menu === "users" && <hr />}
          </li>
        )}
      </ul>
      <div className="nav-login-cart">
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/cart">
          <img src={cart_icon} alt="Cart Icon" />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
