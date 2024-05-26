import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar/Navbar";
import Shop from "./Pages/Shop.jsx";
import ShopCategory from "./Pages/ShopCategory.jsx";
import Product from "./Pages/Product.jsx";
import Cart from "./Pages/Cart.jsx";
import LoginSignup from "./Pages/LoginSignup.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Hero from "./components/Hero.jsx";
import Item from "./components/Item.jsx";
import Popular from "./components/Popular.jsx";
import ItemDetail from "./Pages/weekly.jsx";

function App() {
  return (
    <div>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/Shop" element={<Shop />}></Route>
          <Route path="/popular" element={<Popular />} />
          <Route path="/item/:id" element={<ItemDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
