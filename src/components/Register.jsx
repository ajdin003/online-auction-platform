import axios from "axios";
import { useState } from "react";
import "../css/register.css";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/users/register",
        { firstName, lastName, username, password }
      );
      console.log("Response: ", response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="register-wrapper">
      <h1 className="register-title">Register your account</h1>
      <div className="register-content-wrapper">
        <input
          type="text"
          placeholder="First Name"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          onChange={(e) => setLastName(e.target.value)}
        />
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
        <button onClick={handleSubmit}>Create Account</button>
      </div>
    </div>
  );
};

export default Register;
