import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: rgb(var(--background));
`;

export const SideBar = styled.div`
  display: flex;
  flex-direction: column;
  width: 15%;
  padding: 35px 20px;
  gap: 15px;
  border-right: 1px solid rgb(var(--border));
  background-color: white;
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
  padding: 0 2% 0 2%;
`;

export const Div = styled.div`
  width: 100%;
`;
