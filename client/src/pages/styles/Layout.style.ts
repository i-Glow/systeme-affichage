import styled from "styled-components";
import Link from "../../components/shared/Link";
import NativeLink from "../../components/shared/Link";

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
  gap: 2px;
  padding: 35px 0;
  border-right: 1px solid rgb(var(--border));
  background-color: white;
  z-index: 10;
`;

export const LinkContainer = styled(Link)`
  padding: 10px 20px;
  margin: 0 10px;
  border-radius: 6px;
  border: 1px solid transparent;
  transition: 0.15s ease-in-out;
  cursor: pointer;
  position: relative;

  &:hover {
    background-color: rgba(var(--blue), 0.09);
  }

  &::before {
    content: "";
    width: 4px;
    height: 45px;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    background-color: rgba(var(--blue));
    position: absolute;
    left: -11px;
    top: -1px;
  }
`;

export const Main1 = styled.div`
  width: 100%;
  margin-left: 200px;
  padding: 24px;

  @media (min-width: 1366px) {
    margin-left: 15%;
  }
`;

type params = {
  mt?: string;
};
export const Buton = styled.p`
  margin-top: ${({ mt }: params) => mt};
  color: gray;
  cursor: pointer;
`;
