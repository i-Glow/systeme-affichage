import { useState, useCallback, useEffect } from "react";

import { message, Popconfirm, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete, MdOutlinePreview } from "react-icons/md";

import Link from "../components/shared/Link";
import { DeleteIcon, Div } from "./styles/Archive.style";
import { useAuth } from "../context/AuthProvider";
import axios from "../api";

interface DataType {
  article_id: string;
  titre: string;
  categorie: string;
  created_at: string;
}

export default function Archive() {
  //@ts-ignore
  const { token } = useAuth();
  const [messageApi, contextHolder] = message.useMessage();

  const [confirmLoading, setConfirmLoading] = useState(false);

  const [data, setData] = useState<DataType[]>([]);

  const columns: ColumnsType<DataType> = [
    {
      title: "Titre",
      dataIndex: "titre",
      key: "titre",
    },
    {
      title: "Categorie",
      dataIndex: "categorie",
      key: "categorie",
    },
    {
      title: "Date",
      dataIndex: "created_at",
      key: "date",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link
            to={`archive/edit/${record.article_id}`}
            state={{ data: record }}
          >
            <AiOutlineEdit style={{ fontSize: "18px" }} />
          </Link>
          <Link to={`/archive/${record.article_id}`}>
            <MdOutlinePreview />
          </Link>
          <Popconfirm
            title="supprimer"
            description="Voulez-vous supprimer ce article?"
            okText="Supprimer"
            okType="danger"
            cancelText="Annuler"
            okButtonProps={{ loading: confirmLoading }}
            onConfirm={() => deleteArticle(record.article_id)}
          >
            <DeleteIcon />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const deleteArticle = useCallback(async (id: string) => {
    try {
      setConfirmLoading(true);
      const res = await axios.delete(`/articles/${id}`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 204) {
        setData((prev) => prev.filter((item) => item.article_id !== id));
        setConfirmLoading(false);
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
      try {
        const res = await axios.get("/articles", {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal,
        });

        if (res.status === 200) {
          const newData = res.data.data.map((el: DataType) => {
            el.created_at = el.created_at.replace("T", " ").split(".")[0];
            return el;
          });
          setData(newData);
        }
      } catch (error: any) {
        if (error.response?.status === 403) {
          messageApi.open({
            type: "error",
            content: "Please log in",
          });
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
    <Div>
      {contextHolder}
      <Table columns={columns} dataSource={data} />
    </Div>
  );
}
