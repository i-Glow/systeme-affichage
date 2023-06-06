import { AiOutlineEdit, AiOutlinePause, AiOutlineStop } from "react-icons/ai";
import { FiPlay } from "react-icons/fi";
import styled from "styled-components";

export const Wrapper = styled.div`
  background-color: white;
  width: 100%;
  height: min-content;
  padding: 20px;
  margin: 15px 0 0 0;
  border: 1px solid rgb(var(--border));
  border-radius: 8px;
`;

export const Resume = styled(FiPlay)`
  font-size: 18px;
  margin: 0 10px;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    color: orange;
  }
`;

export const Edit = styled(AiOutlineEdit)`
  font-size: 18px;
  margin: 0 10px;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    color: blue;
  }
`;

export const Pause = styled(AiOutlineStop)`
  font-size: 18px;
  margin: 0 10px;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    color: orange;
  }
`;
