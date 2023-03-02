import { useState, useCallback, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";

import Link from "../components/shared/Link";
import { message, Popconfirm, Row, Space, Table } from "antd";
import { MdOutlinePreview } from "react-icons/md";

import PageHeader from "../components/PageHeader";
import { DeleteIcon, Div } from "./styles/Archive.style";
import Column from "antd/es/table/Column";
import useAxios from "../hooks/useAxios";

type article = {
  article_id: string;
  titre: string;
  niveau: string;
  created_at: string;
};

export default function PendingArticle() {
  //@ts-ignore
  const { token } = useAuth();
  const axios = useAxios();
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState<article[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const columnActionsRenderer = (_: any, record: article) => (
    <Space size="middle">
      <Link to={`/PendingActicleDetail/${record.article_id}`}>
        <MdOutlinePreview />
      </Link>
    </Space>
  );

  const getArticlesByUserRole = useCallback(
    async (controller: AbortController) => {
      setDataLoading(true);
      try {
        const res = await axios.get("/articles/pending", {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal,
        });
        console.log(res.data);
        if (res.status === 200) {
          const newData = res.data.data.map((el: article) => {
            el.created_at = el.created_at.replace("T", " ").split(".")[0];
            return el;
          });
          setData(newData);
          setDataLoading(false);
        }
      } catch (error: any) {
        if (error.response?.status === 403) {
          console.log("im in 403");
          messageApi.open({
            type: "error",
            content: "Please log in",
          });
          setDataLoading(false);
        } else if (error.code === "ERR_NETWORK") {
          console.log("else 403");
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
    getArticlesByUserRole(controller);

    return () => controller.abort();
  }, []);

  return (
    <>
      <PageHeader />
      <Div>
        {contextHolder}
        <Table
          dataSource={data}
          loading={dataLoading}
          pagination={{ position: ["bottomCenter"] }}
          rowKey="article_id"
        >
          <Column
            title="Title"
            key="article_id"
            dataIndex="titre"
            ellipsis={true}
          />
          <Column
            title="Niveau"
            key="article_id"
            dataIndex="niveau"
            ellipsis={true}
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
          <Column title="Date" dataIndex="created_at" key="article_id" />
          <Column
            title="Action"
            key="article_id"
            render={columnActionsRenderer}
          ></Column>
        </Table>
      </Div>
    </>
  );
}
