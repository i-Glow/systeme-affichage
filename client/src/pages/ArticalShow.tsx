import React, { useState } from "react";
import { useEffect, useCallback } from "react";
import axios from "../api";
import { useAuth } from "../context/AuthProvider";
import {
  CenterDiv,
  Card,
  Title,
  Parag,
  Niveau,
} from "./styles/ArticalShow.style";
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
  niveau: string;
  category_id: number;
};
const array = [
  {
    titre: "Note aux etudiant L3 Validation TP DE REMPLACEMENT",
    contenu:
      "les Etudiant sont informes que la validation de TP de remplacment cencernat le module genie logiciel est prevu le mercredi 11/01/2023 a 09h45",
    niveau: "L1",
  },
  {
    titre: "Validation TP DE REMPLACEMENT",
    contenu:
      "les Etudiant sont informes que la validation de TP de remplacment cencernat le module genie logiciel est prevu le mercredi 11/01/2023 a 09h45",
    niveau: "L1",
  },
  {
    titre: "Note aux etudiant L3 ",
    contenu:
      "les Etudiant sont informes que la validation de TP de remplacment cencernat le module genie logiciel est prevu le mercredi 11/01/2023 a 09h45",
    niveau: "L1",
  },
  {
    titre: "Note aux etudiant L3 Validation TP DE REMPLACEMENT",
    contenu:
      "les Etudiant sont informes que la validation de TP de remplacment cencernat le module genie logiciel est prevu le mercredi 11/01/2023 a 09h45",
    niveau: "L2",
  },
  {
    titre: "Note aux etudiant L3 ",
    contenu:
      "les Etudiant sont informes que la validation de TP de remplacment cencernat le module genie logiciel est prevu le mercredi 11/01/2023 a 09h45",
    niveau: "L2",
  },
  {
    titre: "Validation TP DE REMPLACEMENT",
    contenu:
      "les Etudiant sont informes que la validation de TP de remplacment cencernat le module genie logiciel est prevu le mercredi 11/01/2023 a 09h45",
    niveau: "L2",
  },
  {
    titre: "Note aux etudiant L3 Validation TP DE REMPLACEMENT",
    contenu:
      "les Etudiant sont informes que la validation de TP de remplacment cencernat le module genie logiciel est prevu le mercredi 11/01/2023 a 09h45",
    niveau: "L3",
  },
  {
    titre: "Note aux etudiant L3 ",
    contenu:
      "les Etudiant sont informes que la validation de TP de remplacment cencernat le module genie logiciel est prevu le mercredi 11/01/2023 a 09h45",
    niveau: "L3",
  },
  {
    titre: "Validation TP DE REMPLACEMENT",
    contenu:
      "les Etudiant sont informes que la validation de TP de remplacment cencernat le module genie logiciel est prevu le mercredi 11/01/2023 a 09h45",
    niveau: "L3",
  },
  {
    titre: "Note aux etudiant L3 Validation TP DE REMPLACEMENT",
    contenu:
      "les Etudiant sont informes que la validation de TP de remplacment cencernat le module genie logiciel est prevu le mercredi 11/01/2023 a 09h45",
    niveau: "M1",
  },
  {
    titre: "Validation TP DE REMPLACEMENT",
    contenu:
      "les Etudiant sont informes que la validation de TP de remplacment cencernat le module genie logiciel est prevu le mercredi 11/01/2023 a 09h45",
    niveau: "M1",
  },
  {
    titre: "Note aux etudiant L3 ",
    contenu:
      "les Etudiant sont informes que la validation de TP de remplacment cencernat le module genie logiciel est prevu le mercredi 11/01/2023 a 09h45",
    niveau: "M1",
  },
  {
    titre: "Note aux etudiant L3 Validation TP DE REMPLACEMENT",
    contenu:
      "les Etudiant sont informes que la validation de TP de remplacment cencernat le module genie logiciel est prevu le mercredi 11/01/2023 a 09h45",
    niveau: "M2",
  },
  {
    titre: "Validation TP DE REMPLACEMENT",
    contenu:
      "les Etudiant sont informes que la validation de TP de remplacment cencernat le module genie logiciel est prevu le mercredi 11/01/2023 a 09h45",
    niveau: "M2",
  },
  {
    titre: "Note aux etudiant L3 ",
    contenu:
      "les Etudiant sont informes que la validation de TP de remplacment cencernat le module genie logiciel est prevu le mercredi 11/01/2023 a 09h45",
    niveau: "M2",
  },
];
/* const myData = array.sort((a, b) => a.niveau.localeCompare(b.niveau));
console.log(myData); */
const ArrayL1: any = [];
const ArrayL2: any = [];
const ArrayL3: any = [];
const ArrayM1: any = [];
const ArrayM2: any = [];
const ArrayD: any = [];
array.map((item, index) => {
  if (item.niveau == "L1") {
    ArrayL1.push(array[index]);
  } else if (item.niveau == "L2") {
    ArrayL2.push(array[index]);
  } else if (item.niveau == "L3") {
    ArrayL3.push(array[index]);
  } else if (item.niveau == "M1") {
    ArrayM1.push(array[index]);
  } else if (item.niveau == "M2") {
    ArrayM2.push(array[index]);
  } else if (item.niveau == "D") {
    ArrayD.push(array[index]);
  }
});
export default function ArticalShow() {
  const location = useLocation();
  //@ts-ignore
  const { token } = useAuth();

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
  const [countL1, setCountL1] = useState(0);
  const [countL2, setCountL2] = useState(0);
  const [countL3, setCountL3] = useState(0);
  const [countM1, setCountM1] = useState(0);
  const [countM2, setCountM2] = useState(0);
  const [countD, setCountD] = useState(0);
  function AddCountL1() {
    if (countL1 === ArrayL1.length - 1) {
      setCountL1(0);
    } else {
      setCountL1(countL1 + 1);
    }
  }
  function AddCountL2() {
    if (countL2 === ArrayL2.length - 1) {
      setCountL2(0);
    } else {
      setCountL2(countL2 + 1);
    }
  }
  function AddCountL3() {
    if (countL3 === ArrayL3.length - 1) {
      setCountL3(0);
    } else {
      setCountL3(countL3 + 1);
    }
  }
  function AddCountM1() {
    if (countM1 === ArrayM1.length - 1) {
      setCountM1(0);
    } else {
      setCountM1(countM1 + 1);
    }
  }
  function AddCountM2() {
    if (countM2 === ArrayM2.length - 1) {
      setCountM2(0);
    } else {
      setCountM2(countM2 + 1);
    }
  }
  function AddCountD() {
    if (countD === ArrayD.length - 1) {
      setCountD(0);
    } else {
      setCountD(countD + 1);
    }
  }
  setInterval(AddCountL1, 15000);
  setInterval(AddCountL2, 15000);
  setInterval(AddCountL3, 15000);
  setInterval(AddCountM1, 15000);
  setInterval(AddCountM2, 15000);
  setInterval(AddCountD, 15000);
  /*
  <CenterDiv>
      <Card>
        <Title>{array[1].titre}</Title>
        <Parag>{array[1].contenu}</Parag>
        <Niveau>Niveau : {array[1].niveau}</Niveau>
      </Card>
    </CenterDiv>
 */
  return (
    <CenterDiv>
      {ArrayL1.length > 0 ? (
        <Card>
          <Title>{ArrayL1[countL1].titre}</Title>
          <Parag>{ArrayL1[countL1].contenu}</Parag>
          <Niveau>Niveau : {ArrayL1[countL1].niveau}</Niveau>
        </Card>
      ) : (
        <Card>
          <h1>Pas D'affichage</h1>
        </Card>
      )}
      {ArrayL2.length > 0 ? (
        <Card>
          <Title>{ArrayL2[countL2].titre}</Title>
          <Parag>{ArrayL2[countL2].contenu}</Parag>
          <Niveau>Niveau : {ArrayL2[countL2].niveau}</Niveau>
        </Card>
      ) : (
        <Card>
          <h1>Pas D'affichage</h1>
        </Card>
      )}

      {ArrayL3.length > 0 ? (
        <Card>
          <Title>{ArrayL3[countL3].titre}</Title>
          <Parag>{ArrayL3[countL3].contenu}</Parag>
          <Niveau>Niveau : {ArrayL3[countL3].niveau}</Niveau>
        </Card>
      ) : (
        <Card>
          <h1>Pas D'affichage</h1>
        </Card>
      )}

      {ArrayM1.length > 0 ? (
        <Card>
          <Title>{ArrayM1[countM1].titre}</Title>
          <Parag>{ArrayM1[countM1].contenu}</Parag>
          <Niveau>Niveau : {ArrayM1[countM1].niveau}</Niveau>
        </Card>
      ) : (
        <Card>
          <h1>Pas D'affichage</h1>
        </Card>
      )}

      {ArrayM2.length > 0 ? (
        <Card>
          <Title>{ArrayM2[countM2].titre}</Title>
          <Parag>{ArrayM2[countM2].contenu}</Parag>
          <Niveau>Niveau : {ArrayM2[countM2].niveau}</Niveau>
        </Card>
      ) : (
        <Card>
          <h1>Pas D'affichage</h1>
        </Card>
      )}

      {ArrayD.length > 0 ? (
        <Card>
          <Title>{ArrayD[countD].titre}</Title>
          <Parag>{ArrayD[countD].contenu}</Parag>
          <Niveau>Niveau : {ArrayD[countD].niveau}</Niveau>
        </Card>
      ) : (
        <Card>
          <h1>Pas D'affichage</h1>
        </Card>
      )}
    </CenterDiv>
  );
}
