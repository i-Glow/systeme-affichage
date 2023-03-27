import { Button } from "antd";
import styled from "styled-components";

export const Success = styled(Button)`
  background-color: #2ea043;
  color: white;
  box-shadow: 0 2px 0 #4bb54333;

  &:hover {
    background-color: #4bb543 !important;
  }
`;

export const MessageBox = styled.div`
  padding: 4px 10px;
  display: flex;
  gap: 7px;
  border: 1px solid rgb(var(--border));
  border-radius: 4px;
  background-color: rgba(var(--success), 0.1);
  color: rgb(var(--success));

  & > h4 {
    line-height: 17px;
  }
`;
