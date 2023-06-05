import { Button, Form, Input } from "antd";
import { useAuth } from "../context/AuthProvider";
import { Wrapper } from "./styles/Signin.styles";

export default () => {
  const { login, loading, contextHolder } = useAuth();

  async function onFinish(values: any) {
    login(values.username, values.password);
  }

  return (
    <Wrapper>
      {contextHolder}
      <Form name="basic" layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input autoFocus />
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
