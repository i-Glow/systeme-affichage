import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Button } from "antd";
import { AiOutlinePlusSquare } from "react-icons/ai";

import { DivSpaceBettwen, SvgPosition } from "../components/Style/Style";
import { Wrapper, SideBar, Main1 } from "../components/Style/Style";
import Link from "../components/shared/Link";
import { useAuth } from "../context/AuthProvider";

const routes = ["archive", "brouillons"];

export default function HomePage() {
  const navigate = useNavigate();
  const location = useLocation();
  //@ts-ignore
  const { token } = useAuth();

  return (
    <Wrapper>
      <SideBar>
        {routes.map((route, key) => (
          <Link to={route} key={key}>
            <h4>{route}</h4>
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
          <h2>{location.pathname.replace("/", "")}</h2>
          <Button
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
