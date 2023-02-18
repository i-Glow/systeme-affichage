import React from "react";

import { Items, Div, SvgPosition } from "../components/Style/Style";
import { Link, Navigate, useNavigate } from "react-router-dom";

const array = [
  {
    id: 1,
    titre: "Affichage du 1 er semestre",
    date: "12:53",
    categorie: "text",
  },
  {
    id: 2,
    titre: "Affichage du 1 er semestre",
    date: "12:53",
    categorie: "text",
  },
  {
    id: 3,
    titre: "Affichage du 1 er semestre",
    date: "12:53",
    categorie: "text",
  },
  {
    id: 4,
    titre: "Affichage du 1 er semestre",
    date: "12:53",
    categorie: "text",
  },
  {
    id: 5,
    titre: "Affichage du 1 er semestre",
    date: "12:53",
    categorie: "text",
  },
  {
    id: 6,
    titre: "Affichage du 1 er semestre",
    date: "12:53",
    categorie: "text",
  },
  {
    id: 7,
    titre: "Affichage du 1 er semestre",
    date: "12:53",
    categorie: "text",
  },
  {
    id: 8,
    titre: "Affichage du 1 er semestre",
    date: "12:53",
    categorie: "text",
  },
  {
    id: 9,
    titre: "Affichage du 1 er semestre",
    date: "12:53",
    categorie: "text",
  },
];

import { Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlinePreview } from "react-icons/md";
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
    render: (_, recorde) => (
      <Space size="middle">
        <a href={`edit/${recorde.id}`}>
          <AiOutlineEdit />
          </a>
        <a href={`/archive/${recorde.id}`}>
          <MdOutlinePreview />
          </a>
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
  const navigate = useNavigate();

  return (
    <Div>

      <Table columns={columns} dataSource={data} />
      {/* {array.map((item) => (
        <div
          key={item.id}
          onClick={() => {
            navigate(`${item.id}`);
          }}
        >
          <Items>

    </Div>
  );
}
