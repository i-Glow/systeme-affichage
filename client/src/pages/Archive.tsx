import { useState, useEffect } from "react";
import { Input, Table } from "antd";
import Column from "antd/es/table/Column";
import { useAuth } from "../context/AuthProvider";
import { VscOpenPreview } from "react-icons/vsc";
import useAxios from "../hooks/useAxios";
import useDebounce from "../hooks/useDebounce";
import { AiOutlineSearch } from "react-icons/ai";
import { article } from "../types";
import Link from "../components/shared/Link";
import { useSearchParams } from "react-router-dom";

const PAGE_SIZE = 10;

export default function Archive() {
  const axios = useAxios();
  const [searchParams, setSearchParams] = useSearchParams({});
  //@ts-ignore
  const { token } = useAuth();

  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParams.get("page")) || 1
  );

  const [articles, setArticles] = useState<article[]>([]);
  const [articleCount, setArticleCount] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState(searchParams.get("query") || "");
  const [creators, setCreators] = useState<any>([]);

  const debouncedSearchTerm = useDebounce(searchTerm, 200);

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchTerm(event.target.value);
  };

  async function getArchive(page = 1, pageSize = 10, search = "") {
    setSearchParams({
      query: search,
      page: `${page}`,
    });
    setLoading(true);
    try {
      const res = await axios.get("/articles/archive", {
        params: {
          page,
          pageSize,
          search,
        },
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });

      setArticles(res.data.data);
      setArticleCount(res.data.count);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (debouncedSearchTerm) {
      getArchive(currentPage, PAGE_SIZE, debouncedSearchTerm);
    } else {
      getArchive(currentPage, PAGE_SIZE, searchTerm);
    }
  }, [debouncedSearchTerm, currentPage]);

  useEffect(() => {
    // get all creator by name and lastName and put them in array
    const allCreators = articles.map((article) => {
      return { text: article.creator.nom, value: article.creator.prenom };
    });
    //filter the duplicated data from allCreators and than set the creators state
    setCreators(
      allCreators.filter(
        (obj, index) =>
          allCreators.findIndex((item) => item.text === obj.text) === index
      )
    );
  }, [articles]);

  return (
    <div>
      <h3>Archive</h3>
      <Input
        style={{
          minWidth: "260px",
          maxWidth: "420px",
          margin: "10px 0",
          padding: "3px 7px 4px 7px",
        }}
        value={searchTerm}
        placeholder="search title or content"
        onChange={(e) => handleSearchTermChange(e)}
        allowClear
        prefix={<AiOutlineSearch fontSize={16} />}
      />
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
        dataSource={articles}
        onChange={(val) =>
          val.current ? setCurrentPage(val.current) : setCurrentPage(1)
        }
      >
        <Column
          title="Titre"
          key="article_id"
          ellipsis={true}
          render={(article: article) => (
            <Link to={`/articles/${article.article_id}`}>{article.titre}</Link>
          )}
        />
        <Column
          title="Creator"
          key="article_id"
          render={({ creator }) => (
            <>
              <span>{creator.nom} </span>
              <span>{creator.prenom}</span>
            </>
          )}
          filters={creators}
          onFilter={(value, record: article) => {
            let user = record.creator.nom + " " + record.creator.prenom;
            return user.includes(value as string);
          }}
        />
        <Column
          title="Level"
          key="article_id"
          ellipsis={true}
          render={(article: article) =>
            article.niveau.map((niv, key) => <span key={key}>{niv} </span>)
          }
        />
        <Column
          title="Date"
          key="article_id"
          render={({ created_at }) => (
            <p>{created_at.replace("T", " ").split(".")[0]}</p>
          )}
        />
        <Column
          title="Actions"
          key="article_id"
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
