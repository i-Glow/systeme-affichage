import React, { useCallback, useEffect, useState } from "react";
import axios from "../api/";
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
import { BottomBar, Content, TopBar } from "./ArchiveDetail.styles";
import { TbHistory } from "react-icons/tb";
import { AiOutlineSwapRight } from "react-icons/ai";
import { Tag, Tooltip } from "antd";

import Flex from "../components/shared/Flex";

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

  const [data, setData] = useState();

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
    <Wrapper style={{ padding: 0 }}>
      <TopBar>
        <h4>user</h4>
        <Flex gap="10px">
          <Tag>text</Tag>
          <p style={{ fontSize: ".9em" }}>17-23-2022</p>
          <Tooltip arrow={false} title="2 edits">
            <TbHistory style={{ fontSize: "22px", cursor: "pointer" }} />
          </Tooltip>
        </Flex>
      </TopBar>
      <Flex direction="v" gap="15px" p="20px 50px">
        <h2>Title</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta,
          praesentium nesciunt. Placeat quam officiis natus doloremque accusamus
          tempora recusandae ex rerum beatae, consectetur ipsum incidunt eveniet
          exercitationem, perspiciatis sint aliquam! Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Consequuntur, natus? Ducimus culpa, eos
          ex voluptate nesciunt, minima porro ea, obcaecati neque architecto
          consectetur veritatis nostrum libero nulla sunt inventore distinctio.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta,
          praesentium nesciunt. Placeat quam officiis natus doloremque accusamus
          tempora recusandae ex rerum beatae, consectetur ipsum incidunt eveniet
          exercitationem, perspiciatis sint aliquam! Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Consequuntur, natus? Ducimus culpa, eos
          ex voluptate nesciunt, minima porro ea, obcaecati neque architecto
          consectetur veritatis nostrum libero nulla sunt inventore distinctio.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta,
          praesentium nesciunt. Placeat quam officiis natus doloremque accusamus
          tempora recusandae ex rerum beatae, consectetur ipsum incidunt eveniet
          exercitationem, perspiciatis sint aliquam! Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Consequuntur, natus? Ducimus culpa, eos
          ex voluptate nesciunt, minima porro ea, obcaecati neque architecto
          consectetur veritatis nostrum libero nulla sunt inventore distinctio.
        </p>
        <Flex style={{ marginLeft: "auto" }} gap="7px">
          <h4>l1</h4>
          <h4>l2</h4>
          <h4>m1</h4>
        </Flex>
      </Flex>
      <BottomBar>
        <p style={{ fontSize: ".9em" }}>17-23-2022</p>
        <AiOutlineSwapRight />
        <p style={{ fontSize: ".9em" }}>18-23-2022</p>
      </BottomBar>
    </Wrapper>
  );
}
