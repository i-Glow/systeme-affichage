import React from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  ConatinerFLex,
  LeftSide,
  Main,
  DivSpaceBettwen,
  SvgPosition,
} from "../components/Style/Style";
import { Button } from "antd";
import { AiOutlinePlusSquare , AiOutlineUnorderedList} from "react-icons/ai";
export default function HomePage() {
  const navigate = useNavigate();
  let location = useLocation();
  return (
    <ConatinerFLex>
      <LeftSide>
        <Link to="archive"><SvgPosition>{<AiOutlineUnorderedList/>}</SvgPosition>Archive</Link>
        <Link to="Brouillons"><SvgPosition>{<AiOutlineUnorderedList/>}</SvgPosition>Brouillons</Link>
      </LeftSide>
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
    </ConatinerFLex>
  );
}
