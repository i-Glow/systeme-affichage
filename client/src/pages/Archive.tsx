import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import levelColors from "../utils/levelColors";
import useAxios from "../hooks/useAxios";
import useDebounce from "../hooks/useDebounce";
// components
import { Input, Select, Table, Tag } from "antd";
import Column from "antd/es/table/Column";
import Link from "../components/shared/Link";
import Flex from "../components/shared/Flex";
import { AiOutlineSearch } from "react-icons/ai";
import { VscOpenPreview } from "react-icons/vsc";
// types
import { article } from "../types";

const PAGE_SIZE = 10;

interface creator {
  nom: string;
  prenom: string;
}

export default function Archive() {
  const axios = useAxios();
  const [searchParams, setSearchParams] = useSearchParams({});
  const { token } = useAuth();

  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParams.get("page")) || 1
  );

  const [articles, setArticles] = useState<article[]>([]);
  const [articleCount, setArticleCount] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState(searchParams.get("query") || "");
  const [creator, setCreator] = useState<creator>({
    nom: searchParams.get("name") || "",
    prenom: searchParams.get("firstname") || "",
  });
  const [allCreators, setAllCreators] = useState<creator[]>([]);

  const debouncedSearchTerm = useDebounce(searchTerm, 200);

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchTerm(event.target.value);
  };

  async function getArchive(
    page = 1,
    pageSize = 10,
    search = "",
    creator: creator
  ) {
    //update url params
    setSearchParams({
      query: search,
      page: `${page}`,
      name: creator.nom,
      firstname: creator.prenom,
    });
    setLoading(true);
    try {
      const res = await axios.get("/articles/archive", {
        params: {
          page,
          pageSize,
          search,
          nom: creator.nom,
          prenom: creator.prenom,
        },
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setArticles(res.data.data);
      setArticleCount(res.data.count);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function getAllCreators() {
    try {
      const res = await axios.get("/users", {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        setAllCreators(res.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (debouncedSearchTerm) {
      setCurrentPage(1);
      getArchive(currentPage, PAGE_SIZE, debouncedSearchTerm, creator);
    } else {
      getArchive(currentPage, PAGE_SIZE, searchTerm, creator);
    }
  }, [debouncedSearchTerm, currentPage, creator]);

  useEffect(() => {
    getAllCreators();
  }, []);

  return (
    <div>
      <h3>Archive</h3>
      <Flex wrap={true} jc="flex-start" gap="5px" mt="10px">
        <Input
          style={{
            minWidth: "260px",
            maxWidth: "420px",
            padding: "4px 7px 5px 7px",
          }}
          value={searchTerm}
          placeholder="search title or content"
          onChange={(e) => handleSearchTermChange(e)}
          allowClear
          prefix={<AiOutlineSearch fontSize={16} />}
        />
        <Select
          style={{ width: 120 }}
          value={creator.nom ? `${creator.nom}+${creator.prenom}` : "creator"}
          onChange={(value) => {
            setCurrentPage(1);
            setCreator({
              nom: value?.split("+")[0] || "",
              prenom: value?.split("+")[1] || "",
            });
          }}
          options={allCreators.map((creator) => {
            return {
              label: `${creator.nom} ${creator.prenom}`,
              value: `${creator.nom}+${creator.prenom}`,
            };
          })}
          allowClear
        />
      </Flex>
      <Table
        loading={loading}
        size="middle"
        pagination={{
          pageSize: PAGE_SIZE,
          current: currentPage,
          total: articleCount,
          position: ["bottomCenter"],
          hideOnSinglePage: true,
          simple: true,
        }}
        rowKey="article_id"
        dataSource={articles}
        onChange={(val) =>
          val.current ? setCurrentPage(val.current) : setCurrentPage(1)
        }
      >
        <Column
          title="Title"
          ellipsis={true}
          render={(article: article) => (
            <Link to={`/articles/${article.article_id}`}>{article.titre}</Link>
          )}
        />
        <Column
          title="Creator"
          render={({ creator }) => (
            <>
              <span>{creator.nom} </span>
              <span>{creator.prenom}</span>
            </>
          )}
          // filters={creators}
          // onFilter={(value, record: article) => {
          //   let user = record.creator.nom + " " + record.creator.prenom;
          //   return user.includes(value as string);
          // }}
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
        />
        <Column
          title="Date"
          render={({ created_at }) => (
            <p>{created_at.replace("T", " ").split(".")[0]}</p>
          )}
        />
        <Column
          title="Actions"
          render={(article: article) => (
            <Link
              to={`/articles/${article.article_id}`}
              state={{ lastPage: currentPage }}
            >
              <VscOpenPreview fontSize={18} cursor="pointer" />
            </Link>
          )}
        />
      </Table>
    </div>
  );
}
