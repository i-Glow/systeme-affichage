import { useContext, useState } from "react";
import useAxios from "../hooks/useAxios";
import { roles } from "../utils/roles";
import { useAuth } from "../context/AuthProvider";
import PendingArticlesContext from "../context/PendingArticlesContext";
// components
import ArticleCard from "../components/ArticleCard";
import Flex from "../components/shared/Flex";
import { Button, message, Popconfirm, Tag } from "antd";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { BsCheckAll } from "react-icons/bs";
// styles
import { Success } from "./styles/PendingArticleDetail";
// types
import { AxiosRequestConfig } from "axios";

type ArticleState = "approved" | "pending" | "rejected" | "deleted";

export default function PendingActicleDetail() {
  const { token, user } = useAuth();
  const axios = useAxios();
  const [messageApi, contextHolder] = message.useMessage();
  const { setPendingCount } = useContext(PendingArticlesContext);

  const [loadingAccept, setLoadingAccept] = useState<boolean>(false);
  const [loadingReject, setLoadingReject] = useState<boolean>(false);
  const [articlesState, setarticlesState] = useState(false);
  const [approved, setapproved] = useState(false);

  async function onFinishAccept(state: ArticleState = "approved") {
    try {
      setLoadingAccept(true);
      if (user?.role === roles.admin) {
        let config: AxiosRequestConfig;
        const id = location.pathname.split("/").at(-1);
        config = {
          method: "put",
          url: `/articles/state/${id}`,
          data: { state },
        };
        const res = await axios({
          ...config,
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 200) {
          messageApi.open({
            type: "success",
            content: "Article approved",
          });
          setarticlesState(true);
          setapproved(res.data);
          setPendingCount((prev) => prev - 1);
        }
      }
    } catch (error) {
      console.error(error);
      messageApi.open({
        type: "error",
        content: "Error",
      });
    } finally {
      setLoadingAccept(false);
    }
  }

  async function onFinishReject(state: ArticleState = "rejected") {
    try {
      setLoadingReject(true);
      if (user?.role === roles.admin) {
        const id = location.pathname.split("/").at(-1);
        const res = await axios({
          url: `/articles/state/${id}`,
          method: "put",
          data: { state },
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.status === 200) {
          messageApi.open({
            type: "success",
            content: "Article Rejected",
          });
          setarticlesState(true);
          setPendingCount((prev) => prev - 1);
        }
      }
    } catch (error) {
      console.error(error);
      messageApi.open({
        type: "error",
        content: "Error",
      });
    } finally {
      setLoadingReject(false);
    }
  }

  return (
    <>
      {contextHolder}
      <Flex jc={"flex-end"}>
        <Flex gap="15px">
          {user?.role === roles.admin ? (
            !articlesState ? (
              <>
                <Success
                  type="primary"
                  disabled={loadingReject}
                  loading={loadingAccept}
                  onClick={() => onFinishAccept()}
                >
                  <h4>Accept</h4>
                </Success>
                <Popconfirm
                  title="reject"
                  description="Do you want to reject this article?"
                  okText="Reject"
                  okType="danger"
                  cancelText="Cancel"
                  okButtonProps={{ loading: loadingReject }}
                  onConfirm={() => onFinishReject()}
                >
                  <Button disabled={loadingAccept} type="primary" danger>
                    <h4>Reject</h4>
                  </Button>
                </Popconfirm>
              </>
            ) : approved ? (
              <Tag color="success">
                <Flex gap="7px" p="3px 7px">
                  <BsCheckAll fontSize={20}></BsCheckAll>
                  <h4>approved</h4>
                </Flex>
              </Tag>
            ) : (
              <Tag color="error">
                <Flex gap="7px" p="3px 7px">
                  <IoIosCloseCircleOutline
                    fontSize={20}
                  ></IoIosCloseCircleOutline>
                  <h4>rejected</h4>
                </Flex>
              </Tag>
            )
          ) : null}
        </Flex>
      </Flex>
      <ArticleCard pathname="" />
    </>
  );
}
