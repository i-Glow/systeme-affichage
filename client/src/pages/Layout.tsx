import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import routes from "../utils/routes";

import Link from "../components/shared/Link";

import { Breadcrumb, Button } from "antd";
import { AiOutlinePlusSquare } from "react-icons/ai";
import {
  DivSpaceBettwen,
  SvgPosition,
  Wrapper,
  SideBar,
  Main1,
  Buton,
} from "./styles/Layout.style";
import { roles } from "../utils/roles";
import PageHeader from "../components/PageHeader";

export default function HomePage() {
  const navigate = useNavigate();
  const location = useLocation();
  //@ts-ignore
  const { user, token, setToken } = useAuth();

  return (
    <Wrapper>
      <SideBar>
        {routes.map((route, key) =>
          user.role === route.authorization || user.role === roles.admin ? (
            <Link to={route.link} key={key}>
              <h4>{route.name}</h4>
            </Link>
          ) : null
        )}
        {!token ? (
          <Link to="/signin" style={{ marginTop: "auto" }}>
            <h4>login</h4>
          </Link>
        ) : null}
        <Buton
          mt={"auto"}
          onClick={() => {
            console.log(localStorage);
            localStorage.removeItem("auth-key");
            setToken(null);
          }}
        >
          logout
        </Buton>
      </SideBar>
      <Main1>
        <Outlet />
      </Main1>
    </Wrapper>
  );
}
