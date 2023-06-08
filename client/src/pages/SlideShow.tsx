import { useCallback, useEffect, useRef, useState } from "react";
import {
  Container,
  RightContainer,
  ArticlList,
  DateCtainer,
  Text,
  Affichage,
  Title,
  Level,
  Div,
  WhiteDiv,
  QrCodeContainer,
  TextQr,
  AboveQr,
  BottomBar,
  TextMove,
} from "./styles/SlideShow.style";
import { GoPrimitiveDot } from "react-icons/go";
import axios from "../api";
import isArabic from "../utils/isArabic";
import Flex from "../components/shared/Flex";
import { QRCode } from "antd";

const Levels = new Map([
  ["L1", "License 1 ليسانس"],
  ["L2", "License 2 ليسانس"],
  ["L3", "License 3 ليسانس"],
  ["M1", "Master 1 ماستر"],
  ["M2", "Master 2 ماستر"],
  ["D", "Doctorat دكتوراه"],
]);

type article = {
  titre: string;
  contenu: string;
  niveau: string[];
  duration: number;
  importance: number;
};

export default function SlideShow() {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  const [index, setIndex] = useState(0);
  const [importantData, setImportantData] = useState<article[]>();
  const [data, setData] = useState<article[]>();
  const [date, setDate] = useState(
    new Date().toLocaleString("ar-DZ", options as any)
  );
  const [indexImportance, setIndexImportance] = useState(0);

  const listRef = useRef<HTMLDivElement>(null);

  const getData = useCallback(async (type: "IMPORTANT" | "NORMAL") => {
    try {
      const res = await axios.get("/affichage");

      if (res.status === 200) {
        const importanceArray: article[] = [];
        const filteredData = res.data.data.filter((item: article) => {
          if (item.importance) {
            importanceArray.push(item);
            return false; // Remove the item from the filtered array
          }
          return true; // Keep the item in the filtered array
        });

        if (type === "IMPORTANT") setImportantData(importanceArray);
        else if (type === "NORMAL") setData(filteredData);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  /* const refreshData = async () => {
    try {
      const res = await axios.get("/affichage");

      if (res.status === 200) {
        const filteredData = res.data.data.filter(
          (item: article) => !item.importance
        );

        if (data && data.length > 0) {
          setTimeout(() => {
            setData(filteredData);
          }, data[index].duration);
        } else {
          setData(filteredData);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const refreshImportant = async () => {
    try {
      const res = await axios.get("/affichage");
      if (res.status === 200) {
        let importanceArray: article[] = [];
        importanceArray = res.data.data.filter(
          (item: article) => item.importance
        );

        if (importantData && importantData.length > 0)
          setTimeout(() => {
            setImportantData(importanceArray);
          }, importantData[indexImportance].duration);
        else {
          setImportantData(importanceArray);
        }
      }
    } catch (e) {}
  };
 */
  //important data fetcher and controller
  useEffect(() => {
    // runs first time only
    if (!importantData) {
      getData("IMPORTANT");
      // runs in an interval when there is no articles
    } else if (importantData.length === 0) {
      const interval = setTimeout(() => {
        getData("IMPORTANT");
      }, 10000);

      return () => {
        clearTimeout(interval);
      };
      // controls the rotation and refreshes
    } else {
      let slideTimer: number;
      // refresh data when last article starts displaying
      if (indexImportance + 1 === importantData.length) {
        setTimeout(() => {
          getData("IMPORTANT");
        }, importantData[indexImportance].duration);
        if (indexImportance !== 0)
          slideTimer = setTimeout(() => {
            setIndexImportance(0);
          }, importantData[indexImportance].duration);

        // else increment the rotator
      } else {
        slideTimer = setTimeout(() => {
          setIndexImportance(indexImportance + 1);
        }, importantData[indexImportance].duration);
      }

      return () => {
        clearTimeout(slideTimer);
      };
    }
  }, [importantData, indexImportance]);

  // normal data fetcher and non important articles controller
  useEffect(() => {
    // runs first time only
    if (!data) {
      getData("NORMAL");
      // runs in an interval when there is no articles
    } else if (data.length === 0) {
      const interval = setTimeout(() => {
        getData("NORMAL");
      }, 10000);

      return () => {
        clearTimeout(interval);
      };
      // controls the rotation and refreshes
    } else {
      let slideTimer: number;
      // refresh data when last article starts displaying
      if (index + 1 === data.length) {
        setTimeout(() => {
          getData("NORMAL");
        }, data[index].duration);
        if (index !== 0)
          slideTimer = setTimeout(() => {
            setIndex(0);
          }, data[index]?.duration);

        // else increment the rotator
      } else {
        slideTimer = setTimeout(() => {
          setIndex(index + 1);
        }, data[index].duration);
      }

      return () => {
        clearTimeout(slideTimer);
      };
    }
  }, [data, index]);

  // clock
  useEffect(() => {
    const interval = setInterval(() => {
      let objectDate = new Date();

      let dateString = objectDate.toLocaleString("ar-DZ", options as any);
      dateString = dateString.replace("،", ""); // Remove comma
      setDate(dateString);
    }, 1000); // update the date state every second

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (listRef.current) {
      if (index % 6 === 0) {
        const scrollTop = index * 150; // calculate the desired scroll position
        listRef.current.scrollTop = scrollTop;
      }
    }
  }, [index]);

  return (
    <Container fd="column">
      <Container
        style={{
          height: importantData && importantData.length > 0 ? "95vh" : "100vh",
        }}
      >
        <RightContainer>
          <DateCtainer>
            <Text fz="40px">{date.toString()}</Text>
          </DateCtainer>
          <Affichage>
            {data && data.length > 0 ? (
              <>
                <Title
                  ta="center"
                  fz={
                    importantData && importantData.length > 0 ? "40px" : "48px"
                  }
                >
                  {data[index].titre}
                </Title>
                <Content
                  content={data[index].contenu}
                  title={data[index].titre}
                />
                <Level
                  ta="center"
                  fz="32px"
                  mb="10px"
                  ds="flex"
                  fd="row"
                  ga="5px"
                >
                  {data[index].niveau.map((niv, ind) => {
                    return (
                      <Flex key={ind}>
                        <p key={ind}> {Levels.get(niv)} </p>
                        {ind + 1 < data[index].niveau.length ? (
                          <GoPrimitiveDot size={15} />
                        ) : (
                          <></>
                        )}
                      </Flex>
                    );
                  })}
                </Level>
              </>
            ) : (
              <Title ta="center" fz="48px">
                لا يوجد اعلانات
              </Title>
            )}
          </Affichage>
        </RightContainer>
        <ArticlList ref={listRef}>
          {data && data.length > 0 ? (
            <WhiteDiv index={index}></WhiteDiv>
          ) : (
            <></>
          )}
          {data &&
            data.map((art, key) => {
              return (
                <Div key={key} style={key === index ? { border: "none" } : {}}>
                  <Text ta="center" mb="15px" fz="24px" zi="1" po="relative">
                    {art.titre}
                  </Text>
                  <Level ta="center" fz="24px" zi="1" po="relative">
                    {art.niveau}
                  </Level>
                </Div>
              );
            })}
        </ArticlList>
      </Container>
      {importantData && importantData.length > 0 ? (
        <BottomBar>
          <TextMove speed={importantData[indexImportance].duration}>
            {importantData[indexImportance].titre +
              ": " +
              importantData[indexImportance].contenu}
          </TextMove>
        </BottomBar>
      ) : null}
    </Container>
  );
}

const regex = /(\[url:(?:(?:https?:\/\/)?[\w-]+\.[\w-]+\S*)\])|(\[qr:.*?\])/g;

function Content({ content, title }: { content: string; title: string }) {
  const parts = content.split(regex).filter(Boolean);
  const ref = useRef<HTMLDivElement>(null);

  const qrcode = parts
    .map((part) => part.match(/\[qr:(.*?)\]/)?.[1])
    .filter(Boolean);

  return (
    <QrCodeContainer
      ref={ref}
      style={{
        direction: isArabic(title) ? "rtl" : "ltr",
        fontFamily: isArabic(title)
          ? "'Inter', sans-serif"
          : "'ReadexPro', sans-serif",
        fontSize: isArabic(title) ? "22px" : "18px",
      }}
    >
      {qrcode.length > 0 ? (
        <TextQr pd="0px 30px 0px 30px" jc="center">
          {parts[0].length > 300 ? (
            <Text
              fz="45px"
              pd={isArabic(title) ? "0 0px 30px 15px" : "0 15px 30px 0"}
              style={{
                direction: isArabic(title) ? "rtl" : "ltr",
                flexGrow: 1,
              }}
            >
              {qrcode.length > 0 && (
                <QRCode
                  size={300}
                  errorLevel="L"
                  value={qrcode[0] || ""}
                  style={{
                    width: "20%",
                    margin: "0 auto",
                    height: "auto",
                    float: "right",
                  }}
                />
              )}
              {parts[0]}
            </Text>
          ) : (
            <>
              <Text
                fz="45px"
                pd={isArabic(title) ? "0 0px 30px 15px" : "0 15px 30px 0"}
                style={{
                  direction: isArabic(title) ? "rtl" : "ltr",
                  flexGrow: 1,
                }}
              >
                {parts[0]}
              </Text>
              <AboveQr>
                {qrcode.length > 0 && (
                  <QRCode
                    size={300}
                    errorLevel="L"
                    value={qrcode[0] || ""}
                    style={{
                      width: "20%",
                      margin: "0 auto",
                      height: "auto",
                    }}
                  />
                )}
              </AboveQr>
            </>
          )}
        </TextQr>
      ) : (
        <Text
          fz="48px"
          pd="30px"
          style={{
            direction: isArabic(title) ? "rtl" : "ltr",
          }}
        >
          {parts[0]}
        </Text>
      )}
    </QrCodeContainer>
  );
}
