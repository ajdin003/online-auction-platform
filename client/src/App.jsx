import "./App.css";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Shop from "./Pages/Shop.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Hero from "./components/Hero.jsx";
import Popular from "./components/Popular.jsx";
import ItemPage from "./Pages/ItemPage.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ContactForm from "./Pages/ContactForm.jsx";
import AboutUs from "./Pages/AboutUs.jsx";
import CreateArticleForm from "./Pages/CreateArticleForm.jsx";
import Cart from "./Pages/Cart.jsx";
import Users from "./Pages/Users.jsx";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/Shop" element={<Shop />}></Route>
            <Route path="/Contact" element={<ContactForm />}></Route>
            <Route path="/About" element={<AboutUs />}></Route>
            <Route path="/popular" element={<Popular />} />
            <Route path="/item/:id" element={<ItemPage />} />
            <Route path="/create-article" element={<CreateArticleForm />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </Router>
      </div>
    </QueryClientProvider>
  );
}

export default App;
