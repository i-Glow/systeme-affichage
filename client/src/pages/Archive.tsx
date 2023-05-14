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
import type { article } from "../types";

const PAGE_SIZE = 10;

interface creator {
  nom: string;
  prenom: string;
}

interface DefaultParams {
  page: number;
  pageSize: number;
  search: string;
  levels: string[];
}

interface SearchParams extends DefaultParams {
  creator: creator;
}

interface URLSearchParams extends DefaultParams {
  nom: string;
  prenom: string;
}

// type ParamsFields = 'page' | 'pageSize' | 'search' | 'levels' | 'creator' | 'nom' | 'prenom';

export default function Archive() {
  const axios = useAxios();
  const [searchParams, setSearchParams] = useSearchParams({});
  const { token } = useAuth();

  const [loading, setLoading] = useState<boolean>(false);

  const [articles, setArticles] = useState<article[]>([]);
  const [articleCount, setArticleCount] = useState<number>(0);
  //filters
  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParams.get("page")) || 1
  );
  const [searchTerm, setSearchTerm] = useState(searchParams.get("query") || "");
  const debouncedSearchTerm = useDebounce(searchTerm, 200);
  const [creator, setCreator] = useState<creator>({
    nom: searchParams.get("name") || "",
    prenom: searchParams.get("firstname") || "",
  });
  const [levels, setLevels] = useState(
    searchParams.get("levels")?.split(",") || []
  );
  const [allCreators, setAllCreators] = useState<creator[]>([]);

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchTerm(event.target.value);
  };

  async function getArchive(params: SearchParams) {
    const { page = 1, pageSize = 10, search = "", creator, levels } = params;

    let urlSearchParams: URLSearchParams | {} = {};

    //update url with only existing values
    for (const [key, value] of Object.entries(params)) {
      if (key === "creator") {
        if (value.nom !== undefined && value.nom !== null && value.nom !== "") {
          (urlSearchParams as URLSearchParams)["nom"] = value.nom;
          (urlSearchParams as URLSearchParams)["prenom"] = value.prenom;
        }
      } else {
        if (value !== undefined && value !== null && value !== "") {
          //@ts-ignore
          (urlSearchParams as URLSearchParams)[key] = value;
        }
      }
    }

    //update url params
    setSearchParams(urlSearchParams);
    setLoading(true);
    try {
      const res = await axios.get("/articles/archive", {
        params: {
          page,
          pageSize,
          search,
          nom: creator.nom,
          prenom: creator.prenom,
          levels: `${levels}`,
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

  //fetches search results
  useEffect(() => {
    if (debouncedSearchTerm) {
      setCurrentPage(1);
      getArchive({
        page: currentPage,
        pageSize: PAGE_SIZE,
        search: debouncedSearchTerm,
        creator,
        levels,
      });
    } else {
      getArchive({
        page: currentPage,
        pageSize: PAGE_SIZE,
        search: searchTerm,
        creator,
        levels,
      });
    }
  }, [debouncedSearchTerm, currentPage, creator, levels]);

  // fetches all creators
  useEffect(() => {
    getAllCreators();
  }, []);

  function tagRender({ label, value, onClose }: any) {
    return (
      <Tag
        color={levelColors.get(value)}
        onMouseDown={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setLevels((levels) => levels.filter((level) => level !== value));
        }}
        closable
        onClose={() => {
          onClose();
          setLevels((levels) => levels.filter((level) => level !== value));
        }}
        style={{ marginRight: 3 }}
      >
        {label}
      </Tag>
    );
  }

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
          value={creator.nom ? `${creator.nom}+${creator.prenom}` : null}
          placeholder="creator"
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
        <Select
          mode="multiple"
          showArrow
          tagRender={tagRender}
          placeholder="level"
          allowClear
          value={levels.length ? levels : undefined}
          style={{ minWidth: "130px", paddingRight: "5px" }}
          maxTagCount={6}
          onChange={(value) => {
            setLevels(value);
          }}
          options={[
            { value: "L1" },
            { value: "L2" },
            { value: "L3" },
            { value: "M1" },
            { value: "M2" },
            { value: "D" },
          ]}
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
        />
        <Column
          title="Level"
          ellipsis={true}
          render={(article: article) =>
            article.niveau.map((niv, key) => (
              <Tag color={levelColors.get(niv)} key={key}>
                {" "}
                {/* give each tag a color */}
                {niv}
              </Tag>
            ))
          }
        />
        <Column
          title="Date"
          render={({ created_at }) => (
            <p>{created_at.replace("T", " ").split(".")[0]}</p> // format date
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
