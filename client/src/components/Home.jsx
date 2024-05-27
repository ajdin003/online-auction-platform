import { useCookies } from "react-cookie";
import "../css/home.css";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();
  console.log(cookies.token); // 

  return (
    
    <div className="home-wrapper">
      {!cookies.token && (
        <div className="not-logged-in-wrapper">
          <div className="not-logged-in">
            <h1 className="not-logged-in-info">
              To access Online Auction Platform, please either log in with an
              existing account or register a new account.
            </h1>
            <div className="not-logged-in-buttons">
              <button onClick={() => navigate("/login")}>Log In</button>
              <button onClick={() => navigate("/register")}>
                Create Account
                
              </button>
            </div>
          </div>
        </div>
      )}
      {cookies.token && <div>Welcome to Online Auction Platform</div>}
    </div>
  );
};

export default Home;
