import styled from "styled-components";

export const CenterDiv = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  /* column-gap: 3%; */
  /* padding-left: 0.3%; */
  /* padding-right: 0.3%; */
`;
export const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 33.3%;
  border: 1px solid black;
  height: 50%;
  max-width: 33.3%;
  max-height: 50vh;
  background-color: white;
  overflow: hidden;
  & > * {
    padding: 2px 20px;
  }
`;
export const CardTop = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 100%;
  overflow-wrap: break-word;
  padding-top: 10px;
`;
export const CardBottom = styled.div`
  display: flex;
  justify-content: center;
  overflow-wrap: break-word;
  /* max-width: 100%; */
  line-height: 32px;
  border-bottom: 1px solid gray;
  width: calc(100% +20px);
`;

export const Title = styled.h1`
  letter-spacing: 1, 7px;
  font-size: 18px;
  overflow-wrap: break-word;
  max-width: 100ch;
  overflow: hidden;
  text-align: center;
  font-weight: 700;
`;

export const Parag = styled.p`
  font-size: 18px;
  font-weight: 500;
  overflow-wrap: break-word;
  max-width: 500ch;
  overflow: hidden;
  font-weight: 600;
`;
export const Niveau = styled.p`
  font-size: 20px;
`;

export const CardVoid = styled(Card)`
  justify-content: none;
  gap: 0;
`;
export const CardVoidTop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80%;
`;
export const CardVoidBottom = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  height: 20%;
`;
export const TitleVoid = styled.h1`
  letter-spacing: 1, 7px;

  font-size: 28px;
`;
export const NiveauVoid = styled.p`
  /* margin: 0 0 0 70%; */

  font-weight: bolder;
`;
