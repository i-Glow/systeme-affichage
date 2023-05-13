import { useCallback, useEffect, useState, useRef } from "react";
import useAxios from "../hooks/useAxios";
import { useAuth } from "../context/AuthProvider";

import {
  Button,
  Form,
  Input,
  List,
  message,
  Popconfirm,
  Space,
  Spin,
  Tooltip,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Flex from "../components/shared/Flex";

import { Edit, Pause, Resume, Wrapper } from "./styles/Users.styles";

import type { user } from "../types";
import { BsCheckLg } from "react-icons/bs";
import { GrFormClose } from "react-icons/gr";

export default function Users() {
  const [users, setUsers] = useState<user[]>([]);
  const { token, user } = useAuth();
  const axios = useAxios();

  function UserAdminActions(userData: user) {
    const actionProps = userData.suspended
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

    return userData.user_id !== user?.user_id
      ? [
          //@ts-ignore
          <Popconfirm
            {...actionProps}
            cancelText="Cancel"
            onConfirm={() => suspendUser(userData.user_id, !userData.suspended)}
          >
            {userData.suspended ? (
              <Tooltip title="lift suspension">
                <Resume />
              </Tooltip>
            ) : (
              <Tooltip title="suspend account">
                <Pause />
              </Tooltip>
            )}
          </Popconfirm>,
          <ChangePassword userid={userData.user_id} />,
        ]
      : [<ChangePassword userid={userData.user_id} />];
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
            users.map((userData: user) => (
              <List.Item
                key={userData.user_id}
                actions={UserAdminActions(userData)}
              >
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
                      <p>{userData.username}</p>
                      <p>********</p>
                    </Flex>
                  </div>
                  <Link
                    to={`/archive?query=&page=1&name=${userData.nom}&firstname=${userData.prenom}`}
                  >
                    {userData._count.article} articles
                  </Link>
                  <p>{userData.role}</p>
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

function ChangePassword({ userid }: { userid: string }) {
  const axios = useAxios();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [messageApi, contextHolder] = message.useMessage();

  const [isChangePassword, setIsChangePassword] = useState(false);
  const newPassword = useRef("");

  async function handlePasswordChange() {
    if (newPassword.current.length < 8) return;

    try {
      const res = await axios.put(
        `/users/${userid}/changePassword`,
        { newPassword: newPassword.current },
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.status === 200) {
        messageApi.open({
          type: "success",
          content: res.data.message,
        });

        setIsChangePassword(false);
      }
      navigate("/users");
    } catch (error) {
      console.error(error);
      messageApi.open({
        type: "error",
        content: "Error",
      });
    }
  }

  return (
    <>
      {contextHolder}
      {isChangePassword ? (
        <>
          <Form style={{ height: "25px" }}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "at least 8 characters",
                  min: 8,
                },
              ]}
              name=""
            >
              <Space.Compact style={{ width: "180px" }}>
                <Input
                  placeholder="New password"
                  onChange={(e) => (newPassword.current = e.target.value)}
                />
                <Button type="primary" onClick={handlePasswordChange}>
                  <BsCheckLg />
                </Button>
              </Space.Compact>
              <Button
                style={{ marginLeft: "4px" }}
                type="dashed"
                shape="circle"
                icon={<GrFormClose />}
                onClick={() => setIsChangePassword(false)}
              />
            </Form.Item>
          </Form>
        </>
      ) : (
        <Tooltip title="change password">
          <Edit onClick={() => setIsChangePassword(true)} />
        </Tooltip>
      )}
    </>
  );
}
