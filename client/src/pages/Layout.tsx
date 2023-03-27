import { Outlet } from "react-router-dom";
import { PendingArticlesProvider } from "../context/PendingArticlesContext";

import Sidebar from "../components/Sidebar";

import { Wrapper, Main1 } from "./styles/Layout.style";

export default function HomePage() {
  return (
    <Wrapper>
      <PendingArticlesProvider>
        <Sidebar />
        <Main1>
          <Outlet />
        </Main1>
      </PendingArticlesProvider>
    </Wrapper>
  );
}
