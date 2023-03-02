import { List, Popconfirm, Space, Spin, Tooltip } from "antd";
import { ReactNode, useCallback, useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import Flex from "../components/shared/Flex";
import { useAuth } from "../context/AuthProvider";
import useAxios from "../hooks/useAxios";
import { user } from "../types";
import { Edit, Pause, Resume, Wrapper } from "./styles/Users.styles";

export default function Users() {
  const [users, setUsers] = useState<user[]>([]);
  //@ts-ignore
  const { token } = useAuth();
  const axios = useAxios();

  function UserAdminActions(user: user): ReactNode[] {
    const actionProps = user.suspended
      ? {
          title: "unsuspend",
          description: "Voulez-vous resumer ce utilisateur?",
          okText: "Resumer",
          okType: "primary",
        }
      : {
          title: "suspend",
          description: "Voulez-vous suspend ce utilisateur?",
          okText: "Suspend",
          okType: "danger",
        };

    return [
      <Popconfirm
        {...actionProps}
        cancelText="Annuler"
        onConfirm={() => suspendUser(user.user_id, !user.suspended)}
      >
        {user.suspended ? (
          <Tooltip title="lift suspension">
            <Resume />
          </Tooltip>
        ) : (
          <Tooltip title="suspend account">
            <Pause />
          </Tooltip>
        )}
      </Popconfirm>,
      // <Edit
      //   style={{
      //     fontSize: "18px",
      //     margin: "0 10px",
      //     cursor: "pointer",
      //   }}
      // />,
    ];
  }

  const suspendUser = useCallback(async (id: string, suspend: boolean) => {
    try {
      const res = await axios.put(
        `/users/${id}/suspend`,
        {
          suspend,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 204) {
        //TODO: update ui (suspend button)
        setUsers((prev) =>
          prev.map((user) => {
            if (user.user_id === id) {
              user.suspended = suspend;
            }
            return user;
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  }, []);
  // console.log(users);
  const getData = useCallback(async () => {
    try {
      const res = await axios.get("/users", {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <PageHeader page="Users" />
      <Wrapper>
        <List size="small">
          {users.length ? (
            users.map((user: user) => (
              <List.Item key={user.user_id} actions={UserAdminActions(user)}>
                <Flex jc="space-between" ai="flex-start" gap="50px">
                  <div style={{ width: "100px" }}>
                    <Flex jc="flex-start" gap="5px">
                      <h4>{user.nom}</h4>
                      <h4>{user.prenom}</h4>
                    </Flex>
                    <Flex jc="flex-start" gap="10px">
                      <p>{user.username}</p>
                      <p>********</p>
                    </Flex>
                  </div>
                  <p>{user._count.article} articles</p>
                </Flex>
              </List.Item>
            ))
          ) : (
            <Flex h="300px">
              <Spin />
            </Flex>
          )}
        </List>
      </Wrapper>
    </>
  );
}
