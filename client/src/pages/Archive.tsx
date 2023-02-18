import { Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useCallback, useEffect } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlinePreview } from "react-icons/md";

import Link from "../components/shared/Link";
import { Div } from "../components/Style/Style";
import axios from "../api";
import { useAuth } from "../context/AuthProvider";

interface DataType {
  id: string;
  titre: string;
  categrie: string;
  date: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Titre",
    dataIndex: "titre",
    key: "titre",
  },
  {
    title: "Categrie",
    dataIndex: "categrie",
    key: "categrie",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Link to={`edit/${record.id}`}>
          <AiOutlineEdit />
        </Link>
        <Link to={`${record.id}`}>
          <MdOutlinePreview />
        </Link>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    id: "1",
    titre: "John Brown",
    categrie: "text",
    date: "20-12-2023 20:20:00",
  },
  {
    id: "2",
    titre: "Jim Green",
    categrie: "text",
    date: "20-12-2023 20:20:00",
  },
  {
    id: "3",
    titre: "Joe Black",
    categrie: "text",
    date: "20-12-2023 20:20:00",
  },
  {
    id: "3",
    titre: "Joe Black",
    categrie: "text",
    date: "20-12-2023 20:20:00",
  },
  {
    id: "3",
    titre: "Joe Black",
    categrie: "text",
    date: "20-12-2023 20:20:00",
  },
  {
    id: "3",
    titre: "Joe Black",
    categrie: "text",
    date: "20-12-2023 20:20:00",
  },
  {
    id: "3",
    titre: "Joe Black",
    categrie: "text",
    date: "20-12-2023 20:20:00",
  },
  {
    id: "3",
    titre: "Joe Black",
    categrie: "text",
    date: "20-12-2023 20:20:00",
  },
  {
    id: "3",
    titre: "Joe Black",
    categrie: "text",
    date: "20-12-2023 20:20:00",
  },
  {
    id: "3",
    titre: "Joe Black",
    categrie: "text",
    date: "20-12-2023 20:20:00",
  },
  {
    id: "3",
    titre: "Joe Black",
    categrie: "text",
    date: "20-12-2023 20:20:00",
  },
];
export default function Archive() {
  //@ts-ignore
  const { token } = useAuth();

  const getArticles = useCallback(
    async (controller: AbortController) => {
      try {
        const res = await axios.get("/articles", {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal,
        });

        console.log(res);
      } catch (error: any) {
        console.log(error);
        if (error.response.status === 403) {
          //TODO: handle not authenticated error
          console.log("auth");
          console.log(error.response.data.message);
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
      <Table columns={columns} dataSource={data} />
    </Div>
  );
}
