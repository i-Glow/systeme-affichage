import styled from "styled-components";
import { Form as NativeForm } from "antd";

export const Form = styled(NativeForm)`
  /* padding-top: 50px; */
`;

export const Wrapper = styled.div`
  background-color: white;
  width: 100%;
  height: min-content;
  padding: 20px;
  margin: 15px 0 0 0 ;
  border: 1px solid rgb(var(--border));
  border-radius: 8px;
`;
