import { useCookies } from "react-cookie";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import "../css/Users.css";

const Users = () => {
  const [cookies] = useCookies();
  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      if (!cookies.token) {
        throw new Error("No token found");
      }
      const response = await axios.get("http://localhost:3001/users", {
        headers: { Authorization: `Bearer ${cookies.token}` },
      });
      return response.data.data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("Error fetching users:", error);
    return <div>Error fetching users. Please try again later.</div>;
  }

  return (
    <div className="users-container">
      <h2 className="jj">Users</h2>
      <div className="user-list">
        {users &&
          users.users.map((user) => (
            <div key={user._id} className="user-card">
              <h3>{`${user.firstName} ${user.lastName}`}</h3>
              <p>Username: {user.username}</p>
              <p>Role: {user.role}</p>
            </div>
          ))}
      </div>
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    </div>
  );
};

export default Users;
