import styled from "styled-components";
export const Input = styled.input`
  border: 1px solid #787ce3;
`;
export const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 15%;
  background-color: #001529;
  color: white;
  gap: 20px;
  padding-top: 2%;
  padding-left: 1.65%;
`;
export const ConatinerFLex = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
`;
export const Items = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 2%;
`;
export const Main = styled.div`
  display: flex;
  width: 100%;
  padding: 24px;
  flex-direction: column;
`;
export const Div = styled.div`
  width: 100%;
`;
export const MainContainer = styled(Main)`
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  height: 100%;
  & > * {
    display: flex;
    margin: 2% auto;
  }
`;
export const DivSpaceAround = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`;
export const DivSpaceBettwen = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 1.4%;
`;
export const SvgPosition = styled.span`
  margin-right: 5px;
  transform: translateY(1.5px);
`;
