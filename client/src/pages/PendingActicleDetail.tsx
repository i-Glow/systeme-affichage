import { useState } from "react";
import ArticleCard from "../components/ArticleCard";
import Flex from "../components/shared/Flex";
import { AxiosRequestConfig } from "axios";
import { useAuth } from "../context/AuthProvider";
import { roles } from "../utils/roles";
import { Button, Space, message } from "antd";
import useAxios from "../hooks/useAxios";
import { AiOutlineCheckCircle, AiOutlineStop } from "react-icons/ai";

export default function PendingActicleDetail() {
  const [loadingAccept, setLoadingAccept] = useState<boolean>(false);
  const [loadingReject, setLoadingReject] = useState<boolean>(false);
  const [articlesState, setarticlesState] = useState(false);
  const [aproved, setaproved] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const axios = useAxios();
  //@ts-ignore
  const { token, user } = useAuth();

  async function onFinishAccept() {
    try {
      setLoadingAccept(true);
      if (user.role === roles.admin) {
        let config: AxiosRequestConfig;
        const id = location.pathname.split("/").at(-1);
        config = {
          method: "put",
          url: `/articles/aprove/${id}`,
        };
        const res = await axios({
          ...config,
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(res.data);
        if (res.status === 200) {
          messageApi.open({
            type: "success",
            content: "Article aproved",
          });
          setarticlesState(true);
          setaproved(res.data);
        }
      }
    } catch (error) {
      console.log(error);
      messageApi.open({
        type: "error",
        content: "Erreur",
      });
    } finally {
      setLoadingAccept(false);
    }
  }

  async function onFinishReject() {
    try {
      setLoadingReject(true);
      if (user.role === roles.admin) {
        const id = location.pathname.split("/").at(-1);
        const res = await axios.delete(`/articles/${id}`, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.status === 204) {
          messageApi.open({
            type: "success",
            content: "Article Deleted",
          });
          setarticlesState(true);
        }
      }
    } catch (error) {
      console.log(error);
      messageApi.open({
        type: "error",
        content: "Erreur",
      });
    } finally {
      setLoadingReject(false);
    }
  }

  return (
    <>
      {contextHolder}
      <Flex jc={"flex-end"}>
        <Space wrap>
          {user.role === roles.admin ? (
            !articlesState ? (
              <>
                <Button
                  disabled={loadingReject}
                  loading={loadingAccept}
                  onClick={onFinishAccept}
                  style={{ border: "1px solid green", color: "green" }}
                >
                  Accept
                </Button>
                <Button
                  disabled={loadingAccept}
                  loading={loadingReject}
                  onClick={onFinishReject}
                  type="primary"
                  danger
                >
                  Reject
                </Button>
              </>
            ) : (
              <>
                {aproved ? (
                  <Flex m={"auto"}>
                    <AiOutlineCheckCircle
                      fontSize={20}
                      color={"green"}
                    ></AiOutlineCheckCircle>
                    <h4 style={{ color: "green" }}>approved</h4>
                  </Flex>
                ) : (
                  <>
                    <AiOutlineStop fontSize={20} color={"red"}></AiOutlineStop>
                    <h4 style={{ color: "red" }}>rejected</h4>
                  </>
                )}
              </>
            )
          ) : null}
        </Space>
      </Flex>
      <ArticleCard pathname=""></ArticleCard>
    </>
  );
}
