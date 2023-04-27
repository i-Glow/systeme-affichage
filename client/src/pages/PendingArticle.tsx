import { useState, useCallback, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { usePendingArticles } from "../context/PendingArticlesContext";
import useAxios from "../hooks/useAxios";
import levelColors from "../utils/levelColors";
// components
import { message, Space, Table, Tag } from "antd";
import Column from "antd/es/table/Column";
import Link from "../components/shared/Link";
import { VscOpenPreview } from "react-icons/vsc";
// styles
import { Div } from "./styles/Archive.style";

type article = {
  article_id: string;
  titre: string;
  niveau: string[];
  created_at: string;
};

export default function PendingArticle() {
  const { token } = useAuth();
  const axios = useAxios();
  const [messageApi, contextHolder] = message.useMessage();
  const { pendingArticles, setPendingArticles } = usePendingArticles();
  const [dataLoading, setDataLoading] = useState(true);

  const columnActionsRenderer = (_: any, record: article) => (
    <Space size="middle">
      <Link to={record.article_id}>
        <VscOpenPreview fontSize={18} cursor="pointer" />
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
        if (res.status === 200) {
          const newData = res.data.data.map((el: article) => {
            el.created_at = el.created_at.replace("T", " ").split(".")[0];
            return el;
          });
          setPendingArticles(newData);
          setDataLoading(false);
        }
      } catch (error: any) {
        if (error.code === "ERR_NETWORK") {
          messageApi.open({
            type: "error",
            content: "Network error",
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
      <h3>Pending articles</h3>
      <Div>
        {contextHolder}
        <Table
          dataSource={pendingArticles}
          loading={dataLoading}
          pagination={{ position: ["bottomCenter"] }}
          rowKey="article_id"
          size="middle"
        >
          <Column
            title="Title"
            ellipsis={true}
            render={(article: article) => (
              <Link to={`${article.article_id}`}>{article.titre}</Link>
            )}
          />
          <Column
            title="Level"
            render={(article: article) =>
              article.niveau.map((niv, key) => (
                <Tag color={levelColors.get(niv)} key={key}>
                  {niv}
                </Tag>
              ))
            }
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
          <Column title="Date" dataIndex="created_at" />
          <Column title="Actions" render={columnActionsRenderer}></Column>
        </Table>
      </Div>
    </>
  );
}
