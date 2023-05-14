import React, { useCallback, useEffect, useState } from "react";
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
import axios from "../api";
import isArabic from "../utils/isArabic";
export default function () {
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
  const [articles, setArticles] = useState<allArticles>();
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
      }, 5000);
    }

    return () => clearTimeout(slideTimer);
  }, [data, index]);

  return (
    <Container>
      <RightContainer>
        <DateCtainer>
          <Text fz="40px">{date.toString()}</Text>
        </DateCtainer>

        <Affichage>
          <Title ta="center" fz="48px">
            {data && data[index].titre}
          </Title>
          <Text fz="48px" pd="30px" ta="end">
            {data && data[index].contenu}
          </Text>
          <Level ta="center" fz="32px" mb="10px">
            {data && data[index].niveau}
          </Level>
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
