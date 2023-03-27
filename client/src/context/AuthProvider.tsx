import { message } from "antd";
import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api";
import { user } from "../types";

interface Auth {
  user: user | null;
  token: string | null;
  login: (username: string, password: string) => Promise<false | undefined>;
  loading: boolean;
  contextHolder: React.ReactElement<
    any,
    string | React.JSXElementConstructor<any>
  >;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const AuthContext = createContext<Auth>({} as Auth);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: any) => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const [user, setUser] = useState<user | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    refreshToken();
  }, []);

  async function refreshToken() {
    const token = localStorage.getItem("auth-key");
    try {
      const res = await axios.get("/auth/refresh", {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });

      setToken(res.data.token);
      setUser(res.data.user);
      localStorage.setItem("auth-key", res.data.token);
      setLoading(false);
    } catch (error) {
      setToken(null);
      setLoading(false);
    }
  }

  async function login(
    username: string,
    password: string
  ): Promise<false | undefined> {
    setLoading(true);
    try {
      const res = await axios.post("/auth/signin", {
        username,
        password,
      });
      localStorage.setItem("auth-key", res.data.token);
      setToken(res.data.token);
      setUser(res.data.user);
      setLoading(false);

      navigate("/");
    } catch (error: any) {
      if (error.response.status === 403) {
        messageApi.open({
          type: "error",
          content: error.response.data.message,
        });
      } else if (error.response.status === 401) {
        messageApi.open({
          type: "error",
          content: error.response.data.message,
        });
      }
      setLoading(false);
      return false;
    }
  }

  const value: Auth = {
    user,
    token,
    login,
    loading,
    contextHolder,
    setToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
