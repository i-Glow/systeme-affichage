import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { roles } from "../utils/roles";
import useAxios from "../hooks/useAxios";
import { useAuth } from "../context/AuthProvider";
// components
import { Button, Form, Input, message, Select } from "antd";
// styles
import { FormWrapper } from "./styles/CreateArticles.styles";

export default function CreateStudent() {
  const { token } = useAuth();
  const axios = useAxios();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const [studentDetails, setStudentDetails] = useState({});

  async function onFinish() {
    try {
      const res = await axios.post("/student", studentDetails, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 204) {
        // show toast
        messageApi.open({
          type: "success",
          content: "Student created",
        });
      }
    } catch (error) {
      // show toast
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
          rules={[{ required: true, message: "matricule must be specified" }]}
          required={false}
          name="matricule"
          label="matricule"
        >
          <Input
            onChange={(e) =>
              setStudentDetails((prev) => ({
                ...prev,
                matricule: e.target.value,
              }))
            }
          />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "name must be specified" }]}
          required={false}
          name="name"
          label="name"
        >
          <Input
            onChange={(e) =>
              setStudentDetails((prev) => ({ ...prev, nom: e.target.value }))
            }
          />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "prenom must be specified" }]}
          required={false}
          name="prenom"
          label="prenom"
        >
          <Input
            onChange={(e) =>
              setStudentDetails((prev) => ({ ...prev, prenom: e.target.value }))
            }
          />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "level must be specified" }]}
          required={false}
          name="level"
          label="level"
        >
          <Input
            onChange={(e) =>
              setStudentDetails((prev) => ({ ...prev, niveau: e.target.value }))
            }
          />
        </Form.Item>
        <Form.Item
          rules={[
            { required: true, message: "place of birth must be specified" },
          ]}
          required={false}
          name="place of birth"
          label="place of birth"
        >
          <Input
            onChange={(e) =>
              setStudentDetails((prev) => ({
                ...prev,
                location: e.target.value,
              }))
            }
          />
        </Form.Item>
        <Form.Item
          rules={[
            { required: true, message: "date of birth must be specified" },
          ]}
          required={false}
          name="date of birth"
          label="date of birth"
        >
          <Input
            onChange={(e) =>
              setStudentDetails((prev) => ({
                ...prev,
                dateOfBirth: e.target.value,
              }))
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
