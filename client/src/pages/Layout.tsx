import { Outlet } from "react-router-dom";
import { Wrapper, Main1 } from "./styles/Layout.style";
import Sidebar from "../components/Sidebar";

export default function HomePage() {
  return (
    <Wrapper>
      <Sidebar />
      <Main1>
        <Outlet />
      </Main1>
    </Wrapper>
  );
}
