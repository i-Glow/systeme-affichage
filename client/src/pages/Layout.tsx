import React from "react";
import { Outlet } from "react-router-dom";
import { Wrapper, SideBar, Main } from "../components/Style/Style";
import Link from "../components/shared/Link";

const routes = ["archive", "brouillons"];

export default function HomePage() {
  return (
    <Wrapper>
      <SideBar>
        {routes.map((route, key) => (
          <Link to={route} key={key}>
            {route}
          </Link>
        ))}
      </SideBar>
      <Main>
        <Outlet />
      </Main>
    </Wrapper>
  );
}
