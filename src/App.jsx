import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from './components/Navbar/Navbar'
import Shop from './Pages/Shop.jsx'
import ShopCategory from "./Pages/ShopCategory.jsx";
import Product from './Pages/Product.jsx'
import Cart from './Pages/Cart.jsx'
import LoginSignup from './Pages/LoginSignup.jsx'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Hero from "./components/Hero.jsx";

function App() {
  return (
    <div>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;