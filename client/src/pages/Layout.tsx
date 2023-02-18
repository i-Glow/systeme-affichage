import React from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { DivSpaceBettwen, SvgPosition } from "../components/Style/Style";
import { Button } from "antd";
import { AiOutlinePlusSquare, AiOutlineUnorderedList } from "react-icons/ai";

import { Wrapper, SideBar, Main1 } from "../components/Style/Style";

const routes = ["archive", "brouillons"];

export default function HomePage() {
  const navigate = useNavigate();
  let location = useLocation();
  return (
    <Wrapper>
      <SideBar>
        {routes.map((route, key) => (
          <Link to={route} key={key}>
            {route}
          </Link>
        ))}
      </SideBar>
      <Main1>
        <DivSpaceBettwen>
          <h2>{location.pathname.replace("/", "")}</h2>
          <Button
            onClick={() => {
              navigate("CreateArticle");
            }}
          >
            <SvgPosition>
              <AiOutlinePlusSquare />
            </SvgPosition>
            <span>Home</span>
          </Button>
        </DivSpaceBettwen>
        <Outlet />
      </Main1>
    </Wrapper>
  );
}
