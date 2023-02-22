import React, { useState } from "react";
import { useEffect, useCallback } from "react";
import axios from "../api";
import { useAuth } from "../context/AuthProvider";
import { CenterDiv, Card, Title , Parag ,Niveau} from "./styles/ArticalShow.style";
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
const array = [
  {
    titre: "",
    contenu:
      " ",
    niveau: "L3",
  },
  {
    titre: "Note aux etudiant L3 Validation TP DE REMPLACEMENT",
    contenu:
      "les Etudiant sont informes que la validation de TP de remplacment cencernat le module genie logiciel est prevu le mercredi 11/01/2023 a 09h45",
    niveau: "L1",
  },
  {
    titre: "3",
    contenu:
      "",
    niveau: "L2",
  },
  {
    titre: "4",
    contenu:
      "thsss  ssssssssss sssssssss sssssssss ssssssssss sssssssss ssssssssss ssssssss ssssssss",
    niveau: "M4",
  },
  {
    titre: "5",
    contenu:
      "thsss  ssssssssss sssssssss sssssssss ssssssssss sssssssss ssssssssss ssssssss ssssssss",
    niveau: "M4",
  },
];
const myData = array.sort((a, b) => a.niveau.localeCompare(b.niveau));
console.log(myData);
/* const ArrayL1 = [];
const ArrayL2 = [];
const ArrayL3 = [];
const ArrayM1 = [];
const ArrayM2 = [];
array.map((item,index)=>{
  if(item.niveau == "L1"){
    ArrayL1.push(array[index]); 
  } else if(item.niveau == "L2"){
    ArrayL2.push(array[index]); 
  }else if(item.niveau == "L3"){
    ArrayL3.push(array[index]); 
  }else if(item.niveau == "M1"){
    ArrayM1.push(array[index]); 
  }else if(item.niveau == "M2"){
    ArrayM2.push(array[index]); 
  }
});
function slide(array , index){
  if(index <= array.length){
    
  }
} 
<Title>
<h1>Niveau : L1</h1>
<Div>
{array.map((item, index) =>
          index >= 0 && index <= 3 ? (
            <Items key={index}>
              <CardDiv>
                <h1>{item.titre}</h1>
                <p>{item.contenu}</p>
              </CardDiv>
            </Items>
          ) : null
        )}



*/
export default function ArticalShow() {
  const location = useLocation();
  //@ts-ignore
  const { token } = useAuth();
  const [count, setCount] = useState(0);
  const getData = useCallback(async (controller: AbortController) => {
    const url = `/show`;
    const res = await axios.get(url, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
      signal: controller.signal,
    });

    if (res.status === 200) {
      // console.log(res.data.data);
    }
  }, []);
  useEffect(() => {
    const controller = new AbortController();
    getData(controller);

    return () => controller.abort();
  }, []);
  function AddCount() {
    setCount(count + 1);
    if (count == myData.length - 1) {
      setCount(0);
    }
  }
  setInterval(AddCount, 15000);

  return (
    <CenterDiv>
      <Card>
        <Title>{myData[count].titre}</Title>
        <Parag>{myData[count].contenu}</Parag>
        <Niveau>Niveau : {myData[count].niveau}</Niveau>
      </Card>
    </CenterDiv>
  );
}
