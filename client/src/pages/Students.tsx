import { useCallback, useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { useAuth } from "../context/AuthProvider";

import { List, Spin } from "antd";
import PageHeader from "../components/PageHeader";
import Flex from "../components/shared/Flex";

import { Wrapper } from "./styles/Users.styles";

export default function Students() {
  const [students, setStudents] = useState<any[]>();
  const { token, user } = useAuth();
  const axios = useAxios();

  const getData = useCallback(async () => {
    try {
      const res = await axios.get("/student", {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        setStudents(res.data.data);
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
      <PageHeader page="Students" />
      <Wrapper>
        <List size="small">
          {students && students.length ? (
            students.map((userData) => (
              <List.Item key={userData.matricule}>
                <Flex jc="space-between" ai="flex-start" gap="20px">
                  <div style={{ width: "150px" }}>
                    <Flex jc="flex-start" gap="5px">
                      <h4
                        style={{
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                        }}
                      >
                        {userData.nom} {userData.prenom}
                      </h4>
                      {userData.user_id === user?.user_id ? (
                        <h5 style={{ color: "green" }}>(You)</h5>
                      ) : null}
                    </Flex>
                    <Flex jc="flex-start" gap="10px">
                      {/* <p>{userData.username}</p> */}
                      <p>{userData.matricule}</p>
                    </Flex>
                  </div>
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
