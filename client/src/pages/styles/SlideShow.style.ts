import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: ${({ fd }: params) => fd};
`;
export const ArticlList = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  scroll-behavior: smooth;
  ::-webkit-scrollbar {
    display: none;
    transition: all 4s ease;
  }
  background-color: ${({ bc }: params) => (bc ? bc : "#ecf6ff")};
  position: relative;
`;
export const RightContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
`;

export const DateCtainer = styled.div`
  width: 80%;
  align-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  border-radius: 0 0 15px 15px;
  background-color: #ecf6ff;
  border: 1px solid #d9d9d9;
`;
type params = {
  ta?: string;
  mb?: string;
  bc?: string;
  jt?: string;
  hg?: string;
  fz?: string;
  pd?: string;
  dir?: string;
  zi?: string;
  po?: string;
  ds?: string;
  ga?: string;
  fd?: string;
  wd?: string;
  jc?: string;
  speed?: number;
  index?: number;
};
export const Text = styled.p`
  text-align: ${({ ta }: params) => ta};
  justify-self: ${({ jt }: params) => jt};
  height: ${({ hg }: params) => hg};
  margin-bottom: ${({ mb }: params) => mb};
  font-size: ${({ fz }: params) => fz};
  padding: ${({ pd }: params) => pd};
  direction: ${({ dir }: params) => dir};
  z-index: ${({ zi }: params) => zi};
  position: ${({ po }: params) => po};
  width: ${({ wd }: params) => wd};
  word-wrap: break-word;
`;

export const Level = styled.div`
  text-align: ${({ ta }: params) => ta};
  margin-top: auto;
  font-size: ${({ fz }: params) => fz};
  margin-bottom: ${({ mb }: params) => mb};
  z-index: ${({ zi }: params) => zi};
  position: ${({ po }: params) => po};
  display: ${({ ds }: params) => ds};
  flex-direction: ${({ fd }: params) => fd};
  gap: ${({ ga }: params) => ga};
  justify-content: center;
`;

export const Title = styled.h1`
  text-align: ${({ ta }: params) => ta};
  margin-top: 20px;
  margin-bottom: 20px;
  direction: ${({ dir }: params) => dir};
  font-size: ${({ fz }: params) => fz};
`;

export const Affichage = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
`;

export const Div = styled.div`
  width: 100%;
  justify-content: center;
  padding: 15px 5px 15px 5px;
  height: 150px;
  min-height: 150px;
  border-left: 1px solid #d9d9d9;
  &::after {
    content: "";
    display: block;
    margin-top: 20px;
    /* height: 2px; */
    background-color: #2a2a2a;
    width: 60%;
    margin-left: auto;
    margin-right: auto;
  }
`;
export const WhiteDiv = styled.div`
  position: absolute;
  right: 0;
  z-index: 0;
  background-color: white;
  height: 150px;
  width: calc(100% + 3px);
  top: ${({ index = 0 }: params) => index * 150}px;
  border-top: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
  /* animation-name: move;
  animation-duration: 4s;
  animation-timing-function: ease;
  animation-fill-mode: forwards; */
  transition: top 4s ease;
  &::before {
    content: "";
    position: absolute;
    transform: translateY(-100%);
    border-radius: 0 0 0 35px;
    left: 3px;
    box-shadow: -10px 5px 0px 5px white;
    width: 50px;
    background-color: transparent;
    border-bottom: 1px solid #d9d9d9;
    border-left: 1px solid #d9d9d9;
    aspect-ratio: 1/1;
  }
  &::after {
    box-sizing: border-box;
    content: "";
    position: absolute;
    bottom: 0px;
    left: 3px;
    transform: translateY(100%);
    border-radius: 35px 0 0 0;
    box-shadow: -10px -5px 0px 5px white;
    width: 50px;
    background-color: transparent;
    border-top: 1px solid #d9d9d9;
    border-left: 1px solid #d9d9d9;
    aspect-ratio: 1/1;
  }
`;

export const BottomBar = styled.div`
  background-color: #f07459;
  height: 100px;
  align-items: center;
  display: flex;
  width: 100%;
  padding-left: 15px;
  overflow: hidden;
`;

export const QrCodeContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TextQr = styled.div`
  padding: ${({ pd }: params) => pd};
`;
export const AboveQr = styled.div`
  > div {
    width: 100%;
    height: 100%;
    justify-content: ${({ jc }: params) => jc};
  }
`;
export const TextMove = styled.h1`
  ::-webkit-scrollbar {
    display: none;
    height: 0px;
  }
  white-space: nowrap;
  min-width: 100%;
  animation: moveText ${({ speed = 0 }: params) => speed}ms linear infinite;
  @keyframes moveText {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-100%);
    }
  }
`;
