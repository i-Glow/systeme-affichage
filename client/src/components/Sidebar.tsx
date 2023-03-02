import { useState, useCallback, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import Flex from "./shared/Flex";
import Link from "./shared/Link";
import { LinkContainer, Logout, SideBar } from "./Style/Sidebar.styles";
import routes from "../utils/routes";
import { BiLogOut } from "react-icons/bi";
import { roles } from "../utils/roles";
import { useLocation, useNavigationType } from "react-router-dom";

export default function Sidebar() {
  //@ts-ignore
  const { user, token, setToken } = useAuth();
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  const getCurrentPath = useCallback((): number => {
    const path = pathname.split("/")[1];

    return routes.findIndex((link) => link.link === "/" + path);
  }, [pathname]);

  const [openTab, setOpenTab] = useState<number>(getCurrentPath);

  useEffect(() => {
    // if (navigationType === "POP") {
    setOpenTab(getCurrentPath);
    // }
  }, [pathname]);

  return (
    <SideBar>
      {routes.map((route, key) =>
        user.role === route.authorization || user.role === roles.admin ? (
          <LinkContainer
            isFocused={key === openTab}
            to={route.link}
            key={key}
            onClick={() => setOpenTab(key)}
          >
            <Flex jc="flex-start" gap="7px">
              {route.icon}
              <p>{route.name}</p>
            </Flex>
          </LinkContainer>
        ) : null
      )}
      {!token ? (
        <Link to="/signin" style={{ marginTop: "auto" }}>
          <h4>login</h4>
        </Link>
      ) : null}
      <Logout
        onClick={() => {
          localStorage.removeItem("auth-key");
          setToken(null);
        }}
      >
        <BiLogOut />
        <p>logout</p>
      </Logout>
    </SideBar>
  );
}
