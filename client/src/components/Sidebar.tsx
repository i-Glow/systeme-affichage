import { useState, useCallback, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import Flex from "./shared/Flex";
import {
  LinkContainer,
  Logout,
  Notification,
  SideBar,
} from "./Style/Sidebar.styles";
import routes from "../utils/routes";
import { BiLogOut } from "react-icons/bi";
import { roles } from "../utils/roles";
import { useLocation, useNavigate } from "react-router-dom";
import { EventSourcePolyfill } from "event-source-polyfill";
import { Button, notification } from "antd";
import Link from "./shared/Link";
import { usePendingArticles } from "../context/PendingArticlesContext";

const SSE_HEARTBEAT_TIMEMOUT = 300000;

export default function Sidebar() {
  //@ts-ignore
  const { user, setToken, token } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const { setPendingArticles, pendingCount, setPendingCount } =
    usePendingArticles();

  const getArticlesCount = async () => {
    const events = new EventSourcePolyfill(
      "http://localhost:8080/api/articles/pending/count",
      {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
          Authorization: `Bearer ${token}`,
        },
        heartbeatTimeout: SSE_HEARTBEAT_TIMEMOUT,
        withCredentials: true,
      }
    );

    events.onmessage = (event: any) => {
      const parsedData = JSON.parse(event.data);

      if (parsedData.article) {
        setPendingArticles((prev: any) => [...prev, parsedData.article]);
        api.open({
          message: "New Pending Article",
          description: "New article waiting for your action",
          btn: (
            <Button
              onClick={() => {
                navigate(`/pendingarticles/${parsedData.article.article_id}`);
                api.destroy();
              }}
            >
              take action
            </Button>
          ),
          key: Date.now(),
          onClose: () => {},
        });

        setPendingCount((prev) => prev + 1);
      } else if (parsedData.count) setPendingCount(Number(parsedData.count));
    };

    events.onerror = (event: any) => {
      if (
        event.error.message !==
        `No activity within ${SSE_HEARTBEAT_TIMEMOUT} milliseconds. 20 chars received. Reconnecting.`
      )
        events.close();
    };
  };

  const getCurrentPath = useCallback((): number => {
    const path = pathname.split("/")[1];

    return routes.findIndex((link) => link.link === "/" + path);
  }, [pathname]);

  const [openTab, setOpenTab] = useState<number>(getCurrentPath);

  useEffect(() => {
    setOpenTab(getCurrentPath);
  }, [pathname]);

  useEffect(() => {
    getArticlesCount();
  }, []);

  return (
    <SideBar>
      {contextHolder}
      {routes.map((route, key) =>
        user?.role === route.authorization || user?.role === roles.admin ? (
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
            {route.name === "pending articles" && pendingCount > 0 && (
              <Notification>{pendingCount}</Notification>
            )}
          </LinkContainer>
        ) : null
      )}
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
