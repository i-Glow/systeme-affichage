//@ts-nocheck
import { useState, useEffect, useCallback, useRef } from "react";
import axios from "../api";
import isArabic from "../utils/isArabic";
import useThrottle from "../hooks/useThrottle";
//components
import { Empty, QRCode } from "antd";
import { FaGlobeAfrica } from "react-icons/fa";
// styles
import {
  CenterDiv,
  Card,
  Title,
  Parag,
  Niveau,
  CardVoid,
  CardTop,
  CardBottom,
  CardVoidBottom,
  CardVoidTop,
  InputContainer,
  IconCtn,
} from "./styles/ArticleShow.style";
import Flex from "../components/shared/Flex";

type article = {
  titre: string;
  contenu: string;
  niveau: string[];
};

type allArticles = {
  L1: article[] | undefined;
  L2: article[] | undefined;
  L3: article[] | undefined;
  M1: article[] | undefined;
  M2: article[] | undefined;
  D: article[] | undefined;
};

export default function Affichage() {
  const [articles, setArticles] = useState<allArticles>();
  const [data, setData] = useState<article[]>();
  const [count, setCount] = useState([0, 0, 0, 0, 0, 0]);

  const getData = useCallback(async () => {
    try {
      const res = await axios.get("/affichage");

      if (res.status === 200) {
        setData(res.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const filterData = useCallback(() => {
    const niveaux = ["L1", "L2", "L3", "M1", "M2", "D"];
    let filtered: allArticles = {
      L1: undefined,
      L2: undefined,
      L3: undefined,
      M1: undefined,
      M2: undefined,
      D: undefined,
    };

    niveaux.map((niveau: any) => {
      filtered[niveau as keyof typeof filtered] = data?.filter(
        (article: article) => article.niveau.includes(niveau)
      ) as article[];
    });

    setArticles(filtered);
  }, [data]);

  useEffect(() => {
    getData();

    //short polling
    const interval = setInterval(() => {
      getData(); // Fetch data at regular intervals
    }, 300000); // Polling interval is 5 minutes in milliseconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (data) filterData();
  }, [data]);

  useEffect(() => {
    let slideTimer: any;
    if (articles) {
      slideTimer = setTimeout(() => {
        const niveaux = ["L1", "L2", "L3", "M1", "M2", "D"];

        setCount((prev) =>
          prev.map((el, idx) => {
            if (!articles[niveaux[idx] as keyof typeof articles]?.length)
              return 0;
            return el !==
              //@ts-ignore
              articles[niveaux[idx] as keyof typeof articles].length - 1
              ? el + 1
              : 0;
          })
        );
      }, 5000);
    }

    return () => clearTimeout(slideTimer);
  }, [count, articles]);

  return (
    <CenterDiv>
      {articles &&
        Object.keys(articles).map((art, key) => {
          return articles[art as keyof allArticles][count[key]] ? (
            <Card key={key}>
              <CardBottom>
                <Niveau>
                  {key < 3
                    ? "License " + (key + 1)
                    : key < 5
                    ? "Master " + (key - 2)
                    : "Doctorat"}
                </Niveau>
              </CardBottom>

              <CardTop>
                <Title
                  style={{
                    fontSize: isArabic(articles[art][count[key]].titre)
                      ? "24px"
                      : "18px",
                  }}
                >
                  {articles[art][count[key]].titre}
                </Title>
                <Content
                  content={articles[art][count[key]].contenu}
                  title={articles[art][count[key]].titre}
                />
              </CardTop>
            </Card>
          ) : (
            <CardVoid key={key}>
              <CardVoidTop>
                <Empty description={"Pas D'affichage"}></Empty>
              </CardVoidTop>
              <CardVoidBottom>
                <Niveau>
                  {key < 3 ? "L" + (key + 1) : key < 5 ? "M" + (key - 2) : "D"}
                </Niveau>
              </CardVoidBottom>
            </CardVoid>
          );
        })}
    </CenterDiv>
  );
}

const urlRegex = /\[url:((https?:\/\/)?[\w-]+\.[\w-]+\S*)\]/gi;
const qrRegex = /\[qr:(.*?)\]/g;
const regex = /(\[url:(?:(?:https?:\/\/)?[\w-]+\.[\w-]+\S*)\])|(\[qr:.*?\])/g;

function Content({ content, title }: { content: string; title: string }) {
  let parts = content.split(regex);
  //remove falsy values
  parts = parts.filter((value) => value !== undefined && value !== "");
  const ref = useRef(null);

  return (
    <div
      ref={ref}
      style={{
        direction: isArabic(title) ? "rtl" : "ltr",
        fontFamily: isArabic(title)
          ? "'Inter', sans-serif"
          : "'ReadexPro', sans-serif",
        fontSize: isArabic(title) ? "22px" : "18px",
      }}
    >
      {parts.map((part, key) => {
        if (part.match(qrRegex))
          return parts.length === 1 ? (
            <Flex key={key} h="100%">
              <SingleQRcode data={part} parentRef={ref} />
            </Flex>
          ) : (
            <QRCode
              errorLevel="L"
              key={key}
              value={part.split(qrRegex)[1]}
              style={{ width: "max-content", margin: "0 auto" }}
            />
          );
        else if (part.match(urlRegex))
          return (
            <InputContainer key={key}>
              <IconCtn>
                <FaGlobeAfrica />
              </IconCtn>
              <p>{part.split(urlRegex)[1]}</p>
            </InputContainer>
          );
        else return <span key={key}>{part}</span>;
      })}
    </div>
  );
}

function SingleQRcode({ data, parentRef }) {
  const [dimensions, setDimensions] = useState({ width: 200, height: 200 });
  const [qrSize, setQrSize] = useState<number>(100);
  const throttledDimensions = useThrottle(dimensions, 250);

  useEffect(() => {
    const size =
      throttledDimensions.height < throttledDimensions.width
        ? throttledDimensions.height
        : throttledDimensions.width;

    setQrSize(size);
  }, [throttledDimensions]);

  useEffect(() => {
    function handleWindowResize() {
      setDimensions({
        width: parentRef.current.clientWidth,
        height: parentRef.current.clientHeight,
      });
    }

    //get dimensions on page load
    handleWindowResize();

    //then hook an event listener
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <QRCode
      errorLevel="L"
      size={Number(qrSize)}
      value={data.split(qrRegex)[1]}
    />
  );
}
