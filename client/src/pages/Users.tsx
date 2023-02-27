import { List } from "antd";
import { useCallback, useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import Flex from "../components/shared/Flex";
import { useAuth } from "../context/AuthProvider";
import useAxios from "../hooks/useAxios";
import { user } from "../types";
import { Edit, Pause, Wrapper } from "./styles/Users.styles";

export default function Users() {
  const [users, setUsers] = useState<user[]>([]);
  //@ts-ignore
  const { token } = useAuth();
  const axios = useAxios();

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
      <PageHeader />
      <Wrapper>
        <List>
          {users.length
            ? users.map((user: user) => (
                <List.Item
                  key={user.user_id}
                  actions={[
                    <Pause
                      style={{
                        fontSize: "18px",
                        margin: "0 10px",
                        cursor: "pointer",
                      }}
                    />,
                    <Edit
                      style={{
                        fontSize: "18px",
                        margin: "0 10px",
                        cursor: "pointer",
                      }}
                    />,
                  ]}
                >
                  <Flex jc="space-between">
                    <div>
                      <Flex jc="flex-start" gap="5px">
                        <h4>{user.nom}</h4>
                        <h4>{user.prenom}</h4>
                      </Flex>
                      <Flex jc="flex-start" gap="10px">
                        <p>{user.username}</p>
                        <p>*****</p>
                      </Flex>
                    </div>
                  </Flex>
                </List.Item>
              ))
            : null}
        </List>
      </Wrapper>
    </>
  );
}
