import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../services/CustomizeAxios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserInfo(token);
    }
  }, [token]);

  const fetchUserInfo = async (token) => {
    // if (!token) return;
    // const token = localStorage.getItem("token");

    try {
      const res = await axios.get("/users/my-info", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        console.log(res);
        setUser(res.data);
      } else {
        console.error("Failed to fetch user info");
        logOut();
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
      logOut();
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ token, setToken, user, logOut, fetchUserInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

// Hook
export const useAuth = () => {
  return useContext(AuthContext);
};
