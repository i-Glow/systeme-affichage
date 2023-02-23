import { AxiosInstance } from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import nativeAxios from "../api";

export default function axios(): AxiosInstance {
  const navigate = useNavigate();

  useEffect(() => {
    const resInterceptor = nativeAxios.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error?.response?.status === 403) {
          navigate("/signin");
        }

        return Promise.reject(error);
      }
    );

    return () => {
      nativeAxios.interceptors.response.eject(resInterceptor);
    };
  }, []);

  return nativeAxios;
}
