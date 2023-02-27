import { Collapse, Tag } from "antd";
import { Heading, Wrapper } from "./Style/LatestArticles.style";
import isArabic from "../utils/isArabic";

//types
import { article } from "../types";
import Flex from "./shared/Flex";
import { AiOutlineSwapRight } from "react-icons/ai";

type props = {
  newArticles: article[];
};

export default function LatestArticles({ newArticles }: props) {
  return (
    <Wrapper>
      <Heading style={{ padding: "10px" }}>Articles récemment créés</Heading>
      <Collapse style={{ backgroundColor: "white" }} onChange={() => {}}>
        {newArticles.map((article) => (
          <Collapse.Panel
            extra={<Tag>{article.categorie.nom}</Tag>}
            header={<p>{article.titre}</p>}
            style={{
              direction: isArabic(article.titre) ? "rtl" : "ltr",
            }}
            key={article.article_id}
          >
            <h4>{article.contenu}</h4>
            <Flex jc="flex-end" gap="7px">
              <h4>{article.date_debut.replace("T", " ").split(".")[0]}</h4>
              <AiOutlineSwapRight />
              <h4>{article.date_fin.replace("T", " ").split(".")[0]}</h4>
              <h3>-</h3>
              {article.niveau.map((niv, key) => (
                <p style={{ fontWeight: 600 }} key={key}>
                  {niv}
                </p>
              ))}
            </Flex>
          </Collapse.Panel>
        ))}
      </Collapse>
    </Wrapper>
  );
}
