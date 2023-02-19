import styled from "styled-components";

const Bar = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;

export const TopBar = styled(Bar)`
  border-bottom: 1px solid rgb(var(--border));
  /* margin-bottom: 20px; */
`;

export const BottomBar = styled(Bar)`
  /* margin-top: 20px; */
  border-top: 1px solid rgb(var(--border));
  justify-content: flex-end;
  gap: 10px;
`;

export const Content = styled.div`
  padding: 20px;
`;
