import { useState, useCallback, useEffect } from "react";

import { message, Popconfirm, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlinePreview } from "react-icons/md";

import Link from "../components/shared/Link";
import { DeleteIcon, Div } from "./styles/Archive.style";
import { useAuth } from "../context/AuthProvider";
import useAxios from "../hooks/useAxios";

type article = {
  article_id: string;
  titre: string;
  niveau: string;
  created_at: string;
};

export default function Archive() {
  //@ts-ignore
  const { token } = useAuth();
  const axios = useAxios();
  const [messageApi, contextHolder] = message.useMessage();

  const [confirmLoading, setConfirmLoading] = useState(false);

  const [data, setData] = useState<article[]>([]);

  const columns: ColumnsType<article> = [
    {
      title: "Titre",
      dataIndex: "titre",
      key: "article_id",
    },
    {
      title: "niveau",
      dataIndex: "niveau",
      key: "article_id",
      filters: [
        { text: "License 1", value: "l1" },
        { text: "License 2", value: "l2" },
        { text: "License 3", value: "l3" },
        { text: "Master 1", value: "m1" },
        { text: "Master 2", value: "m2" },
      ],
      onFilter: (value, record) => record.niveau.includes(value as string),
      sorter: (a, b) => a.niveau[0].localeCompare(b.niveau[0]),
    },
    {
      title: "Date",
      dataIndex: "created_at",
      key: "article_id",
    },
    {
      title: "Action",
      key: "article_id",
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
          const newData = res.data.data.map((el: article) => {
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
      <Table
        columns={columns}
        dataSource={data}
        loading={!data.length}
        pagination={{ position: ["bottomCenter"] }}
      />
    </Div>
  );
}
