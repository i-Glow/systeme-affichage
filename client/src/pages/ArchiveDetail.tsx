import React from "react";
import { MainContainer, Div ,DivSpaceAround } from "../components/Style/Style";
const array = [
  {
    id: 1,
    titre: "Affichage du 1 er semestre",

    categorie: "text",
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
  return (
    <Div>
      {array.map((item) => (
        <MainContainer key={item.id}>
          <h2>{item.titre}</h2>
          <p>Categorie : {item.categorie}</p>
          <p>{item.contenu}</p>
          <p>Cree le : {item.created_at}</p>
          <p>Edit le : {item.edited_at}</p>
          <DivSpaceAround>
            <p>Publie le : {item.date_debut}</p>
            <p>Fin de publiment le : {item.date_fin}</p>
          </DivSpaceAround>
          <p>Niveau : {item.niveau}</p>
        </MainContainer>
      ))}
    </Div>
  );
}
