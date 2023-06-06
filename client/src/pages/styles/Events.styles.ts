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

export const Description = styled.p`
  margin: 10px 0;
  width: 70%;
  max-height: 6em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* Number of lines to display */
  -webkit-box-orient: vertical;
`;

export const MapWrapper = styled.div`
  & .bloc {
    white-space: nowrap;
    font-size: 10px;
  }
`;
