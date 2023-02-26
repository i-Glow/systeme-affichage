import styled from "styled-components";

export const DivSpaceBettwen = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const SvgPosition = styled.span`
  margin-right: 5px;
  transform: translateY(1.5px);
`;

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  background-color: rgb(var(--background));
`;
export const SideBar = styled.div`
  position: fixed;
  width: 15%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 35px 20px;
  gap: 15px;
  border-right: 1px solid rgb(var(--border));
  background-color: white;
  z-index: 10;
`;

export const Main1 = styled.div`
  /* display: flex; */
  width: 100%;
  margin-left: 15%;
  padding: 24px;
  /* flex-direction: column; */
`;

type params = {
  mt?: string;
};
export const Buton = styled.p`
  margin-top: ${({ mt }: params) => mt};
  color: gray;
  cursor: pointer;
`;
