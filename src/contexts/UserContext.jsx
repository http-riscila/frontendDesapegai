import { createContext, useContext, useState, useEffect } from "react";
import { getUserById } from "../services/user-service";
import { useNavigate } from "react-router-dom";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  async function fetchUser() {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        const userInfo = await getUserById(userData.id);
        setUser(userInfo);
      }
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("user");

    }
  }

  useEffect(() => {

    if (
      localStorage.getItem("user") === null ||
      localStorage.getItem("user") === "[]"
    ) {
      navigate("/");
    }
    fetchUser();
  }, [navigate]);

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const refreshUser = async () => {
    if (!user?.id) return;
    try {
      const response = await getUserById(user.id);
      setUser(response);
      localStorage.setItem("user", JSON.stringify(response));
    } catch (error) {
      console.error("Erro ao atualizar dados do usuário:", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUser() {
  return useContext(UserContext);
}
