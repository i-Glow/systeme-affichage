import { Outlet, useNavigate, useLocation } from "react-router-dom";

import { Button } from "antd";
import { AiOutlinePlusSquare } from "react-icons/ai";

import { DivSpaceBettwen, SvgPosition , Wrapper, SideBar, Main1 } from "./styles/Layout.style";

import Link from "../components/shared/Link";
import { useAuth } from "../context/AuthProvider";
import routes from "../lib/routes";

export default function HomePage() {
  const navigate = useNavigate();

  const location = useLocation();
  //@ts-ignore
  const { token } = useAuth();

  return (
    <Wrapper>
      <SideBar>
        {routes.map((route, key) => (
          <Link to={route.link} key={key}>
            <h4>{route.name}</h4>
          </Link>
        ))}
        {!token ? (
          <Link to="/signin" style={{ marginTop: "auto" }}>
            <h4>login</h4>
          </Link>
        ) : null}
      </SideBar>
      <Main1>
        <DivSpaceBettwen>
          <p>{location.pathname.replaceAll("/", " > ")}</p>
          <Button
            type="default"
            onClick={() => {
              navigate("nouveau");
            }}
          >
            <SvgPosition>
              <AiOutlinePlusSquare />
            </SvgPosition>
            <span>Créer</span>
          </Button>
        </DivSpaceBettwen>
        <Outlet />
      </Main1>
    </Wrapper>
  );
}
