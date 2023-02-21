import { MdOutlineDelete } from "react-icons/md";
import styled from "styled-components";

export const Div = styled.div`
  width: 100%;
`;

export const DeleteIcon = styled(MdOutlineDelete)`
  cursor: pointer;
  font-size: 18px;

  &:hover {
    color: red;
  }
`;
