import styled from "styled-components";
import Link from "../shared/Link";

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  background-color: rgb(var(--background));
`;

export const SideBar = styled.div`
  position: fixed;
  width: 15%;
  min-width: 200px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 35px 0;
  border-right: 1px solid rgb(var(--border));
  background-color: white;
  z-index: 10;

  @media (max-width: 768px) {
    width: 60px;
    min-width: 60px;
  }
`;

export const LinkContainer = styled(Link)`
  padding: 10px 20px;
  margin: 0 10px;
  border-radius: 6px;
  transition: 0.15s ease-in-out;
  white-space: nowrap;
  cursor: pointer;
  position: relative;

  background-color: ${({ isfocused: isfocused }: { isfocused: boolean }) =>
    isfocused ? "rgba(var(--blue), 0.09)" : "transparent"};

  &:hover {
    background-color: rgba(var(--blue), 0.09);
  }

  &::before {
    content: "";
    width: 4px;
    height: 44px;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    background-color: ${({ isfocused }: params) =>
      isfocused ? "rgba(var(--blue))" : "transparent"};
    position: absolute;
    left: -11px;
    top: -2px;
  }

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const Notification = styled.div`
  min-width: 20px;
  min-height: 20px;
  font-size: 12px;
  background-color: rgb(var(--blue));
  color: white;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 10px;
  top: 11px;
  /* margin-left: auto; */
`;

type params = {
  isfocused?: boolean;
};

export const Logout = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: auto;
  padding-left: 25px;
  color: gray;
  cursor: pointer;
`;

export const RouteName = styled.p`
  @media (max-width: 768px) {
    display: none;
  }
`;
