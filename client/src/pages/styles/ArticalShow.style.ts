import styled from "styled-components";

export const CenterDiv = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  column-gap: 3%;
  padding-left: 0.3%;
  padding-right: 0.3%;
`;
export const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  width: 31%;
  height: 48%;
  background-color: #f7f7f7;
  border-radius: 15px;
  box-shadow: 7px 7px 3px black;
  padding: 2%;
`;
export const CardVoid = styled(Card)`
  align-items: center;
  justify-content: center;
`;
export const Title = styled.h1`
  letter-spacing: 1, 7px;
`;
export const Parag = styled.p``;
export const Niveau = styled.p`
  margin: 0 0 0 70%;
  font-weight: bolder;
`;
