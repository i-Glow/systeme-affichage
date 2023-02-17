import React from "react";
import { Items,Div } from "../components/Style/Style";
import { Link, Navigate } from "react-router-dom"
const array = [
  {
    id:1,
    titre: "Affichage du 1 er semestre",
    date: "12:53",
    categorie: "text",
  },
  {
    id:2,
    titre: "Affichage du 1 er semestre",
    date: "12:53",
    categorie: "text",
  },
  {
    id:3,
    titre: "Affichage du 1 er semestre",
    date: "12:53",
    categorie: "text",
  },
  {
    id:4,
    titre: "Affichage du 1 er semestre",
    date: "12:53",
    categorie: "text",
  },
  {
    id:5,
    titre: "Affichage du 1 er semestre",
    date: "12:53",
    categorie: "text",
  },
  {
    id:6,
    titre: "Affichage du 1 er semestre",
    date: "12:53",
    categorie: "text",
  },
  {
    id:7,
    titre: "Affichage du 1 er semestre",
    date: "12:53",
    categorie: "text",
  },
  {
    id:8,
    titre: "Affichage du 1 er semestre",
    date: "12:53",
    categorie: "text",
  },
  {
    id:9,
    titre: "Affichage du 1 er semestre",
    date: "12:53",
    categorie: "text",
  },
];
export default function Archive() {
  return (
  <Div>
    {array.map((item, index) => (
      <Link to={`${item.id}`}>
    <Items key={index}>
      
      <p>
        <b>{item.titre}</b>
      </p>
      <p>{item.categorie}</p>
      <p>{item.date}</p>
      
    </Items>
    </Link>
  ))}
  </Div>)
  
    
}
