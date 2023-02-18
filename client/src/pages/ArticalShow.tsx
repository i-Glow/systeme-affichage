import React from "react";
import { useState, useEffect } from "react";
import { Carousel } from "antd";

const contentStyle: React.CSSProperties = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};
const Data = [
  {
    id: "1",
    titre: "John Brown",
    categrie: "text",
    date: "20-12-2023 20:20:00",
    contenu:
      "this is a garbage collecteur plz dont mind it tkdsf dsfkds jsdlfnsd kdf lsnfd lsd knfsdl kndfls knfdk nsldkfnsdkfn lsdf",
  },
  {
    id: "2",
    titre: "Jim Green",
    categrie: "text",
    date: "20-12-2023 20:20:00",
    contenu:
      "this is a garbage collecteur plz dont mind it tkdsf dsfkds jsdlfnsd kdf lsnfd lsd knfsdl kndfls knfdk nsldkfnsdkfn lsdf",
  },
  {
    id: "3",
    titre: "Joe Black",
    categrie: "text",
    date: "20-12-2023 20:20:00",
    contenu:
      "this is a garbage collecteur plz dont mind it tkdsf dsfkds jsdlfnsd kdf lsnfd lsd knfsdl kndfls knfdk nsldkfnsdkfn lsdf",
  },
  {
    id: "3",
    titre: "Joe gree",
    categrie: "text",
    date: "20-12-2023 20:20:00",
    contenu:
      "this is a garbage collecteur plz dont mind it tkdsf dsfkds jsdlfnsd kdf lsnfd lsd knfsdl kndfls knfdk nsldkfnsdkfn lsdf",
  },
  {
    id: "3",
    titre: "Joe thic",
    categrie: "text",
    date: "20-12-2023 20:20:00",
    contenu:
      "this is a garbage collecteur plz dont mind it tkdsf dsfkds jsdlfnsd kdf lsnfd lsd knfsdl kndfls knfdk nsldkfnsdkfn lsdf",
  },
];

export default function ArticalShow() {
  return (
    <Carousel autoplay >
      {Data.map((item)=>(
        <div>
            <h2>{item.titre}</h2>
            <p>{item.contenu}</p>
        </div>))}
    </Carousel>
  );
}
