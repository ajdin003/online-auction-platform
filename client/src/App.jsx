import "./App.css";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Shop from "./Pages/Shop.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Hero from "./components/Hero.jsx";
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
