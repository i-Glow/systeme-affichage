import { useCallback, useEffect, useState } from "react";
import { Params, useLocation } from "react-router-dom";
import { message, Skeleton, Tag, Tooltip } from "antd";
import { AiOutlineSwapRight } from "react-icons/ai";
import { FaFacebookSquare } from "react-icons/fa";

import { Wrapper } from "../pages/styles/ArchiveDetail.styles";
import { useAuth } from "../context/AuthProvider";
import {
  BottomBar,
  HistoryIcon,
  TopBar,
} from "../pages/styles/ArchiveDetail.styles";
import Flex from "../components/shared/Flex";
import useAxios from "../hooks/useAxios";
import levelColors from "../utils/levelColors";
import { PresetColorType } from "antd/es/_util/colors";
import Link from "./shared/Link";

type Categorie = {
  categorie_id: number;
  nom: string;
};

type user = {
  nom: string;
  prenom: string;
};

type Article = {
  titre: string;
  contenu: string;
  creator: user;
  niveau: string[];
  date_debut: string;
  date_fin: string;
  created_at: string;
  edited_at: string | null;
  state: string;
  fbPostId: string;
  categorie: Categorie;
};

export default function ArticleCard(props: Params) {
  //@ts-ignore
  const { token } = useAuth();
  const axios = useAxios();
  const location = useLocation();
  const [messageApi, contextHolder] = message.useMessage();

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
    } catch (error: any) {
      if (error.response?.status === 403) {
        messageApi.open({
          type: "error",
          content: "Please log in",
        });
      }
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    getData(controller);

    return () => controller.abort();
  }, []);

  const colorPicker = (state: string): PresetColorType => {
    switch (state) {
      case "approved":
        return "green";
      case "pending":
        return "orange";
      case "rejected":
        return "red";
      case "deleted":
        return "red";
      default:
        return "blue";
    }
  };

  return (
    <>
      {contextHolder}
      <Wrapper style={{ padding: 0 }}>
        {data ? (
          <>
            <TopBar>
              <Flex gap="7px">
                <h4>{data.creator.nom}</h4>
                <h4>{data.creator.prenom}</h4>
              </Flex>
              <Flex gap="10px">
                <Flex>
                  <Tag color={colorPicker(data.state)}>{data.state}</Tag>
                  <Tag>{data.categorie.nom}</Tag>
                </Flex>
                {!!data.fbPostId && (
                  <Link
                    target="_blank"
                    to={`https://www.facebook.com/${data.fbPostId}`}
                  >
                    <FaFacebookSquare
                      style={{ marginTop: "3px" }}
                      color="#4267B2"
                      size={24}
                    />
                  </Link>
                )}
                <p style={{ fontSize: ".9em" }}>{data.created_at}</p>
                <Tooltip
                  placement="topRight"
                  arrow={false}
                  title={data?.edited_at?.replace("T", " ").split(".")[0]}
                >
                  <HistoryIcon
                    style={
                      data?.edited_at ? {} : { cursor: "default", opacity: 0.3 }
                    }
                  />
                </Tooltip>
              </Flex>
            </TopBar>
            <Flex direction="v" gap="15px" p="20px 50px">
              <h2>{data.titre}</h2>
              <p>{data.contenu}</p>
              <Flex style={{ marginLeft: "auto" }} gap="7px">
                {data.niveau.map((niv, key) => (
                  <Tag color={levelColors.get(niv)} key={key}>
                    {niv}
                  </Tag>
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
    </>
  );
}
