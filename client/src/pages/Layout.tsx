import React from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  DivSpaceBettwen,
  SvgPosition,
} from "../components/Style/Style";
import { Button } from "antd";
import { AiOutlinePlusSquare , AiOutlineUnorderedList} from "react-icons/ai";

import { Wrapper, SideBar, Main } from "../components/Style/Style";


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
      <Main>
        <DivSpaceBettwen>
          <h2>{location.pathname.replace("/","")}</h2>
          <Button
            onClick={() => {
              navigate("Home");
            }}
          >
            <SvgPosition>
              <AiOutlinePlusSquare />
            </SvgPosition>
            <span>Home</span>
          </Button>
        </DivSpaceBettwen>
        <Outlet />
      </Main>
    </Wrapper>

  );
}
