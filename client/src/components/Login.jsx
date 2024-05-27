import axios from "axios";
import { useState } from "react";
import "../css/register.css";
import { useCookies } from "react-cookie";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:3001/users/login", {
        username,
        password,
      });
      setCookie("token", response.data.token, { path: "/" });
    } catch (error) {
      console.error(error);
    } finally {
      navigate("/");
    }
  };

  return (
    <div className="register-wrapper">
      <div className="login-box">
      <h1 className="register-title">Log in to your account</h1>
      
      <div className="register-content-wrapper">
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <p>Don't have an account? <Link to="/register">Register here</Link>
      </p>
        <button onClick={handleSubmit}>Log In</button>
      </div>
      </div>
    </div>
  );
};

export default Login;
