import { useState } from "react";
import { Button, Form, Input, message, Select } from "antd";
import { FormWrapper } from "./styles/CreateArticles.styles";
import useAxios from "../hooks/useAxios";
import { useAuth } from "../context/AuthProvider";
import { roles } from "../utils/roles";
import { useNavigate } from "react-router-dom";

export default function CreateUser() {
  //@ts-ignore
  const { token } = useAuth();
  const axios = useAxios();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const [userDeatils, setUserDetails] = useState({
    username: "",
    password: "",
    nom: "",
    prenom: "",
    role: roles.affichage,
  });

  async function onFinish() {
    try {
      const res = await axios.post("/auth/create-user", userDeatils, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 200) {
        messageApi.open({
          type: "success",
          content: "User created",
        });
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
    <FormWrapper>
      {contextHolder}
      <Form
        onFinish={onFinish}
        labelAlign={"left"}
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 12 }}
      >
        <Form.Item
          rules={[{ required: true, message: "username must be specified" }]}
          required={false}
          name="username"
          label="username"
        >
          <Input
            onChange={(e) =>
              setUserDetails((prev) => ({ ...prev, username: e.target.value }))
            }
          />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "password must contain at least 8 characters",
              min: 8,
            },
          ]}
          required={false}
          name="password"
          label="password"
        >
          <Input.Password
            onChange={(e) =>
              setUserDetails((prev) => ({ ...prev, password: e.target.value }))
            }
          />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "name must be specified" }]}
          required={false}
          name="nom"
          label="name"
        >
          <Input
            onChange={(e) =>
              setUserDetails((prev) => ({ ...prev, nom: e.target.value }))
            }
          />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "lastname must be specified" }]}
          required={false}
          name="prenom"
          label="lastname"
        >
          <Input
            onChange={(e) =>
              setUserDetails((prev) => ({ ...prev, prenom: e.target.value }))
            }
          />
        </Form.Item>
        <Form.Item label="role">
          <Select
            defaultValue={roles.affichage}
            options={Object.entries(roles).map((role: any) => ({
              label: role[0],
              value: role[1],
            }))}
            style={{ maxWidth: "120px" }}
            onChange={(value) =>
              setUserDetails((prev) => ({ ...prev, role: value }))
            }
          />
        </Form.Item>
        <Form.Item label=" " colon={false}>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>
    </FormWrapper>
  );
}
