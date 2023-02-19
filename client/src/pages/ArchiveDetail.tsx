import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Skeleton, Tag, Tooltip } from "antd";
import { TbHistory } from "react-icons/tb";
import { AiOutlineSwapRight } from "react-icons/ai";

import { Wrapper } from "./CreateArticles.styles";
import { useAuth } from "../context/AuthProvider";
import { BottomBar, TopBar } from "./ArchiveDetail.styles";
import Flex from "../components/shared/Flex";
import axios from "../api/";

type Article = {
  titre: string;
  contenu: string;
  creator_id: string;
  niveau: string[];
  date_debut: string;
  date_fin: string;
  created_at: string;
  edited_at: string | null;
  brouillon: boolean;
  categorie_id: number;
};

export default function ArchiveDetail() {
  //@ts-ignore
  const { token } = useAuth();
  const location = useLocation();

  const [data, setData] = useState<Article | undefined>();

  const getData = useCallback(async (controller: AbortController) => {
    try {
      const id = location.pathname.split("/").at(-1);
      if (id) {
        const url = `/articles/${id}`;
        const res = await axios.get(url, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal,
        });

        if (res.status === 200) {
          const dataObj = res.data.data;
          dataObj.created_at = dataObj.created_at
            .replace("T", " ")
            .split(".")[0];
          dataObj.date_debut = dataObj.date_debut
            .replace("T", " ")
            .split(".")[0];
          dataObj.date_fin = dataObj.date_fin.replace("T", " ").split(".")[0];

          setData(dataObj);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    getData(controller);

    return () => controller.abort();
  }, []);

  return (
    <Wrapper style={{ padding: 0 }}>
      {data ? (
        <>
          <TopBar>
            <h4>{data.creator_id}</h4>
            <Flex gap="10px">
              <Tag>text</Tag>
              <p style={{ fontSize: ".9em" }}>{data.created_at}</p>
              <Tooltip
                arrow={false}
                title={data?.edited_at?.replace("T", " ").split(".")[0]}
              >
                <TbHistory style={{ fontSize: "22px", cursor: "pointer" }} />
              </Tooltip>
            </Flex>
          </TopBar>
          <Flex direction="v" gap="15px" p="20px 50px">
            <h2>Title</h2>
            <p>{data.contenu}</p>
            <Flex style={{ marginLeft: "auto" }} gap="7px">
              {data.niveau.map((el, key) => (
                <h4 key={key}>{el}</h4>
              ))}
            </Flex>
          </Flex>
          <BottomBar>
            <p style={{ fontSize: ".9em" }}>{data.date_debut}</p>
            <AiOutlineSwapRight />
            <p style={{ fontSize: ".9em" }}>{data.date_fin}</p>
          </BottomBar>
        </>
      ) : (
        <>
          <TopBar />
          <Flex p="20px 50px">
            <Skeleton active />
          </Flex>
          <BottomBar />
        </>
      )}
    </Wrapper>
  );
}
