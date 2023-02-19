import React from "react";
import {  useEffect, useCallback } from "react";
import axios from "../api";
import { useAuth } from "../context/AuthProvider";
import {} from "./styles/ArticalShow.style"
import { useLocation } from "react-router-dom";

const contentStyle: React.CSSProperties = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};
type data = {
  titre: string;
  contenu: string;
  date_debut: string;
  date_fin: string;
  niveau: string[];
  category_id: number;
};
export default function ArticalShow() {
  const location = useLocation();
  //@ts-ignore
  const { token } = useAuth();

  const getData = useCallback(async (controller: AbortController) => {
    const id = location.state?.data?.article_id;
    console.log("this is "+ location.state?.data?.article_id);
    if (id) {
      const url = `/show`;
      const res = await axios.get(url, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
        signal: controller.signal,
      });

      if (res.status === 200) {
        
        const data = res.data;
        console.log(data);
      }
    }
  }, []);
  useEffect(() => {
    const controller = new AbortController();
    getData(controller);

    return () => controller.abort();
  }, []);
  return <div></div>;
}
