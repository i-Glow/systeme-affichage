import { message } from "antd";
import { createContext, useState, useContext, useEffect } from "react";
import axios from "../api";

enum Roles {
  responsable_affichage,
  super_user,
}
type user = {
  user_id: string;
  username: string;
  nom: string;
  prenom: string;
  role: Roles.responsable_affichage;
};

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: any) => {
  const [messageApi, contextHolder] = message.useMessage();

  const [user, setUser] = useState<user | null>(null);
  const [token, setToken] = useState<string | null>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = window.localStorage.getItem("auth-key");
    setToken(token);
    // axios.post
  }, []);

  async function login(username: string, password: string): Promise<boolean> {
    setLoading(true);
    try {
      const res = await axios.post("/auth/signin", {
        username,
        password,
      });

      window.localStorage.setItem("auth-key", res.data.token);
      setUser(res.data.user);
      setLoading(false);

      return true;
    } catch (error: any) {
      console.error(error);
      if (error.response.status === 403) {
        console.log(error.response.data.message);
        messageApi.open({
          type: "error",
          content: error.response.data.message,
        });
      }
      setLoading(false);
      return false;
    }
  }
  function createUser() {}

  const value: any = {
    user,
    token,
    login,
    loading,
    contextHolder,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
