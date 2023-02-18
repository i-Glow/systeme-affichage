import { Button, Form, Input } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { Wrapper } from "./Signin.styles";

export default () => {
  const navigate = useNavigate();
  const s = useLocation();
  //@ts-ignore
  const { user, login, loading, contextHolder } = useAuth();

  async function onFinish(values: any) {
    const redirect = await login(values.username, values.password);
    if (redirect) navigate("/");
  }

  console.log(user);

  return (
    <Wrapper>
      {contextHolder}
      <Form name="basic" layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" loading={loading} htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Wrapper>
  );
};
