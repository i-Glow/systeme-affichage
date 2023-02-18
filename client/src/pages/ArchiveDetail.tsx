import React, { useCallback, useEffect, useState } from "react";
import axios from "../api/"
import {
  MainContainer,
  Div,
  DivSpaceAround,
  Header,
  DivSpaceAround1,
  FlexStart,
} from "../components/Style/Style";
import { Wrapper } from "./CreateArticles.styles";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const array = [
  {
    id: 1,
    titre: "Affichage du 1 er semestre",
    creator_name: "hamid barbarouse",
    categorie: "text",
    version: "2",
    contenu: "this is a garbage message you dont need to read it",
    created_at: "2023-02-17T21:22:40.254Z",
    edited_at: "2023-02-17T21:22:40.254Z",
    date_debut: "2023-02-17T21:22:40.254Z",
    date_fin: "2023-02-17T21:22:40.254Z",
    niveau: ["L1", "L2", "L3"],
  },
];
array[0].created_at = array[0].created_at.replace("T", " ");
array[0].created_at = array[0].created_at.split(".")[0];

array[0].edited_at = array[0].edited_at.replace("T", " ");
array[0].edited_at = array[0].edited_at.split(".")[0];

array[0].date_debut = array[0].date_debut.replace("T", " ");
array[0].date_debut = array[0].date_debut.split(".")[0];

array[0].date_fin = array[0].date_fin.replace("T", " ");
array[0].date_fin = array[0].date_fin.split(".")[0];



export default function ArchiveDetail() {
  //@ts-ignore
  const { token } = useAuth();
  const location = useLocation();

const [data , setData] = useState();

  const getData = useCallback(async (controller: AbortController) => {
    const id = location.state?.data?.article_id;
    if (id) {
      const url = `/articles/${id}`;
      const res = await axios.get(url, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
        signal: controller.signal,
      });

      

      if (res.status === 200) {
        
      }
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    getData(controller);

    return () => controller.abort();
  }, []);

  return (
    <Wrapper>
      {array.map((item) => (
        <MainContainer key={item.id}>
          <Header>
            <h4>
              <b>{item.creator_name}</b>
            </h4>
            <DivSpaceAround1>
              <p>cree le: {item.created_at}</p>
              <p>{item.version}</p>
            </DivSpaceAround1>
          </Header>
          <h2>{item.titre}</h2>
          <FlexStart>
            <p>
              Categorie : <b> {item.categorie}</b>
            </p>
            <p>{item.contenu}</p>
          </FlexStart>
          <DivSpaceAround>
            <p>Publie le : {item.date_debut}</p>
            <p>Fin de publiment le : {item.date_fin}</p>
          </DivSpaceAround>
          <p>Niveau : {item.niveau}</p>
        </MainContainer>
      ))}
    </Wrapper>
  );
}
