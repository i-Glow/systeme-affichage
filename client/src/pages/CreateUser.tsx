import { useState } from "react";
import { Button, Form, Input, Select } from "antd";
import { FormWrapper } from "./styles/CreateArticles.styles";
import useAxios from "../hooks/useAxios";
import { useAuth } from "../context/AuthProvider";

export default function CreateUser() {
  const axios = useAxios();
  //@ts-ignore
  const { token } = useAuth();

  const [userDeatils, setUserDetails] = useState();

  async function onFinish(values: any) {
    console.log(values);

    const res = await axios.post("/create-user", userDeatils, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log(res);
  }

  return (
    <FormWrapper>
      <Form
        onFinish={onFinish}
        labelAlign={"left"}
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item name="username" label="username">
          <Input />
        </Form.Item>
        <Form.Item name="password" label="password">
          <Input.Password />
        </Form.Item>
        <Form.Item name="nom" label="nom">
          <Input />
        </Form.Item>
        <Form.Item name="prenom" label="prenom">
          <Input />
        </Form.Item>
        <Form.Item label="role">
          <Select style={{ maxWidth: "120px" }} />
        </Form.Item>
        <Form.Item label=" " colon={false}>
          <Button type="primary">Créer</Button>
        </Form.Item>
      </Form>
    </FormWrapper>
  );
}
