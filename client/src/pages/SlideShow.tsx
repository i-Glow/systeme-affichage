import React, { useCallback, useEffect, useRef, useState } from "react";
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
} from "./styles/SlideShow.style";
import { GoPrimitiveDot } from "react-icons/go";
import axios from "../api";
import isArabic from "../utils/isArabic";
import Flex from "../components/shared/Flex";
import { Empty, QRCode } from "antd";
import { FaGlobeAfrica } from "react-icons/fa";
import { IconCtn, InputContainer } from "./styles/ArticleShow.style";
import useThrottle from "../hooks/useThrottle";

const Levels = new Map([
  ["L1", "License 1 ليسانس"],
  ["L2", "License 2 ليسانس"],
  ["L3", "License 3 ليسانس"],
  ["M1", "Master 1 ماستر"],
  ["M2", "Master 2 ماستر"],
  ["D", "Doctorat  دكتور"],
]);

export default function () {
  type article = {
    titre: string;
    contenu: string;
    niveau: string[];
    duration: number;
  };

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
  const [data, setData] = useState<article[]>();
  const [index, setIndex] = useState(1);
  const [date, setDate] = useState(new Date().toLocaleString("ar-DZ", options));

  useEffect(() => {
    const interval = setInterval(() => {
      let objectDate = new Date();

      let dateString = objectDate.toLocaleString("ar-DZ", options);
      dateString = dateString.replace("،", ""); // Remove comma
      setDate(dateString);
    }, 1000); // update the date state every second

    return () => clearInterval(interval);
  }, []);

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

  useEffect(() => {
    getData();

    //short polling
    const interval = setInterval(() => {
      getData(); // Fetch data at regular intervals
    }, 300000); // Polling interval is 5 minutes in milliseconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let slideTimer: any;
    if (data) {
      slideTimer = setTimeout(() => {
        setIndex((index) => (index + 1 < data.length ? index + 1 : 0));
      }, data[index].duration);
    }

    return () => clearTimeout(slideTimer);
  }, [data, index]);
  console.log(data);
  return (
    <Container>
      <RightContainer>
        <DateCtainer>
          <Text fz="40px">{date.toString()}</Text>
        </DateCtainer>

        <Affichage>
          {data ? (
            <>
              <Title ta="center" fz="48px">
                {data[index].titre}
              </Title>
              <Text>
                <Content
                  content={data[index].contenu}
                  title={data[index].titre}
                />
              </Text>
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
                    <Flex>
                      <p key={ind}> {Levels.get(niv)} </p>
                      {/* {niv.match("D") ? <></> : <GoPrimitiveDot size={15} />} */}
                    </Flex>
                  );
                })}
              </Level>
            </>
          ) : (
            <></>
          )}
        </Affichage>
      </RightContainer>
      <ArticlList>
        <WhiteDiv index={index}></WhiteDiv>
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
  );
}

const qrRegex = /\[qr:(.*?)\]/g;
const regex = /(\[url:(?:(?:https?:\/\/)?[\w-]+\.[\w-]+\S*)\])|(\[qr:.*?\])/g;

function Content({ content, title }: { content: string; title: string }) {
  const parts = content.split(regex).filter(Boolean);
  const ref = useRef<HTMLDivElement>(null);

  const qrcode = parts
    .map((part) => part.match(/\[qr:(.*?)\]/)?.[1])
    .filter(Boolean);

  const text = parts.map((part) => part.replace(qrRegex, "")).filter(Boolean);

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
      {qrcode ? (
        <>
          <Text
            fz="48px"
            pd="30px"
            style={{
              // textAlign: isArabic(title) ? "end" : "start",
              direction: isArabic(title) ? "rtl" : "ltr",
            }}
          >
            {text.join("")}
          </Text>
          {qrcode.length > 0 && (
            <QRCode
              errorLevel="L"
              value={qrcode[0] || ""}
              style={{ width: "max-content", margin: "0 auto" }}
            />
          )}
        </>
      ) : (
        <Text
          fz="48px"
          pd="30px"
          style={{
            // textAlign: isArabic(title) ? "end" : "start",
            direction: isArabic(title) ? "rtl" : "ltr",
          }}
        >
          {text.join("")}
        </Text>
      )}
    </div>
  );
}

/* 
  {parts.map((part, key) => {
        if (part.match(qrRegex)) {
          let qrcode = part.split(qrRegex)[1];

          return (
            <>
              <p>{part}</p>
              <QRCode
                errorLevel="L"
                key={key}
                value={qrcode}
                style={{ width: "max-content", margin: "0 auto" }}
              />
            </>
          );
        } else
          return (
            <Text
              fz="48px"
              pd="30px"
              style={{
                textAlign: isArabic(title) ? "end" : "start",
              }}
              key={key}
            >
              {part}
            </Text>
          );
      })}
*/
