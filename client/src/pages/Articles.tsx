import { useState, useCallback, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import useAxios from "../hooks/useAxios";
import levelColors from "../utils/levelColors";
//components
import PageHeader from "../components/PageHeader";
import Link from "../components/shared/Link";
import { message, Popconfirm, Space, Table, Tag } from "antd";
import Column from "antd/es/table/Column";
import { AiOutlineEdit } from "react-icons/ai";
import { VscOpenPreview } from "react-icons/vsc";
// styles
import { DeleteIcon, Div } from "./styles/Archive.style";
//types
import { article } from "../types";
import { AxiosRequestConfig } from "axios";
import { useLocation } from "react-router";

export default function Archive() {
  const { token } = useAuth();
  const { pathname } = useLocation();
  const axios = useAxios();
  const [messageApi, contextHolder] = message.useMessage();

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);

  const [data, setData] = useState<article[]>([]);

  const columnActionsRenderer = (_: any, record: article) => (
    <Space size="middle">
      <Link
        to={`${pathname === "/" ? "articles/" : ""}edit/${record.article_id}`}
        state={{ data: record }}
      >
        <AiOutlineEdit fontSize={18} />
      </Link>
      <Link to={`${pathname === "/" ? "articles/" : ""}${record.article_id}`}>
        <VscOpenPreview fontSize={18} cursor="pointer" />
      </Link>
      <Popconfirm
        title="delete"
        description="Are you sure you want to delete this article?"
        okText="Delete"
        okType="danger"
        cancelText="Cancel"
        okButtonProps={{ loading: confirmLoading }}
        onConfirm={() => ChangeArticleState(record.article_id)}
      >
        <DeleteIcon fontSize={18} />
      </Popconfirm>
    </Space>
  );

  const ChangeArticleState = useCallback(async (id: string) => {
    try {
      setConfirmLoading(true);
      let config: AxiosRequestConfig;
      config = {
        method: "put",
        url: `/articles/state/${id}`,
        data: { state: "deleted" },
      };
      const res = await axios({
        ...config,
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 200) {
        setData((prev) => prev.filter((item) => item.article_id !== id));
        setConfirmLoading(false);
        messageApi.open({
          type: "success",
          content: "Article Archived",
        });
      }
    } catch (error: any) {
      if (error.response?.status === 403) {
        messageApi.open({
          type: "error",
          content: "Please log in",
        });
      } else {
        messageApi.open({
          type: "error",
          content: "error",
        });
      }
    }
  }, []);

  const getArticles = useCallback(
    async (controller: AbortController) => {
      setDataLoading(true);
      try {
        const res = await axios.get("/articles", {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal,
        });

        if (res.status === 200) {
          const newData = res.data.data.map((el: article) => {
            //@ts-ignore
            el.created_at = el.created_at.replace("T", " ").split(".")[0];
            return el;
          });
          setData(newData);
          setDataLoading(false);
        }
      } catch (error: any) {
        if (error.response?.status === 403) {
          messageApi.open({
            type: "error",
            content: "Please log in",
          });
          setDataLoading(false);
        } else if (error.code === "ERR_NETWORK") {
          messageApi.open({
            type: "error",
            content: "network error",
          });
          setDataLoading(false);
        }
      }
    },
    [token]
  );

  useEffect(() => {
    const controller = new AbortController();
    getArticles(controller);

    return () => controller.abort();
  }, []);

  return (
    <>
      <PageHeader page="Articles" />
      <Div>
        {contextHolder}
        <Table
          dataSource={data}
          loading={dataLoading}
          pagination={{ position: ["bottomCenter"] }}
          rowKey="article_id"
          size="middle"
        >
          <Column
            title="Title"
            ellipsis={true}
            render={(article: article) => (
              <Link to={`/articles/${article.article_id}`}>
                {article.titre}
              </Link>
            )}
          />
          <Column
            title="Level"
            ellipsis={true}
            render={(article: article) =>
              article.niveau.map((niv, key) => (
                <Tag color={levelColors.get(niv)} key={key}>
                  {niv}
                </Tag>
              ))
            }
            filters={[
              { text: "License 1", value: "L1" },
              { text: "License 2", value: "L2" },
              { text: "License 3", value: "L3" },
              { text: "Master 1", value: "M1" },
              { text: "Master 2", value: "M2" },
              { text: "Doctorat", value: "D" },
            ]}
            onFilter={(value, record: article) =>
              record.niveau.includes(value as string)
            }
          />
          <Column title="Date" dataIndex="created_at" />
          <Column title="Actions" render={columnActionsRenderer}></Column>
        </Table>
      </Div>
    </>
  );
}
